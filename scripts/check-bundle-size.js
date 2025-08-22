#!/usr/bin/env node
// /scripts/check-bundle-size.js
// Bundle size checker that enforces performance budgets per component
// Fails CI builds if components exceed their KB gzip limits
// RELEVANT FILES: performance-budgets.config.js, package.json, next.config.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSize } from 'gzip-size';
import config from '../performance-budgets.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  COMPONENT_BUDGETS,
  GLOBAL_BUDGETS,
  ANALYSIS_CONFIG,
} = config;

/**
 * Bundle Size Checker
 * 
 * This script checks component bundle sizes against defined budgets.
 * It's designed to run in CI to prevent performance regressions.
 */

class BundleSizeChecker {
  constructor() {
    this.results = [];
    this.hasErrors = false;
    this.hasWarnings = false;
  }

  /**
   * Get component file size in KB (gzipped)
   */
  async getComponentSize(componentPath) {
    try {
      const fullPath = path.resolve(process.cwd(), componentPath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Component file not found: ${fullPath}`);
      }

      const content = fs.readFileSync(fullPath, 'utf8');
      const gzippedSize = await gzipSize(content);
      const sizeInKB = gzippedSize / 1024;
      
      return {
        raw: content.length,
        gzipped: gzippedSize,
        kb: parseFloat(sizeInKB.toFixed(2)),
      };
    } catch (error) {
      console.warn(`Warning: Could not analyze ${componentPath}: ${error.message}`);
      return { raw: 0, gzipped: 0, kb: 0 };
    }
  }

  /**
   * Check if component size is within budget
   */
  checkComponentBudget(componentName, actualSize, budget) {
    const { gzip: maxSize, warning: warningSize } = budget;
    const status = actualSize.kb > maxSize ? 'error' : 
                   actualSize.kb > warningSize ? 'warning' : 'ok';
    
    const result = {
      component: componentName,
      actualKB: actualSize.kb,
      budgetKB: maxSize,
      warningKB: warningSize,
      status,
      utilization: (actualSize.kb / maxSize * 100).toFixed(1),
    };

    if (status === 'error') {
      this.hasErrors = true;
    } else if (status === 'warning') {
      this.hasWarnings = true;
    }

    return result;
  }

  /**
   * Analyze all components
   */
  async analyzeComponents() {
    console.log('🔍 Analyzing component bundle sizes...\n');

    for (const [componentName, budget] of Object.entries(COMPONENT_BUDGETS)) {
      const componentPath = `src/ui/${componentName}/index.ts`;
      
      try {
        const size = await this.getComponentSize(componentPath);
        const result = this.checkComponentBudget(componentName, size, budget);
        this.results.push(result);
        
        // Log progress
        const statusIcon = result.status === 'error' ? '❌' : 
                          result.status === 'warning' ? '⚠️' : '✅';
        console.log(
          `${statusIcon} ${componentName.padEnd(25)} ${result.actualKB.toString().padStart(6)}KB / ${result.budgetKB}KB (${result.utilization}%)`
        );
      } catch (error) {
        console.error(`Error analyzing ${componentName}: ${error.message}`);
      }
    }
  }

  /**
   * Generate summary report
   */
  generateSummary() {
    const total = this.results.length;
    const errors = this.results.filter(r => r.status === 'error').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    const passing = total - errors - warnings;

    console.log('\n📊 Bundle Size Analysis Summary');
    console.log('=====================================');
    console.log(`✅ Passing:  ${passing}/${total} components`);
    console.log(`⚠️  Warnings: ${warnings}/${total} components`);
    console.log(`❌ Errors:   ${errors}/${total} components`);

    if (this.hasWarnings || this.hasErrors) {
      console.log('\n🚨 Components exceeding budgets:');
      console.log('=====================================');
      
      this.results
        .filter(r => r.status !== 'ok')
        .forEach(result => {
          const icon = result.status === 'error' ? '❌' : '⚠️';
          const excess = (result.actualKB - (result.status === 'error' ? result.budgetKB : result.warningKB)).toFixed(2);
          console.log(`${icon} ${result.component}: ${result.actualKB}KB (+${excess}KB over ${result.status === 'error' ? 'budget' : 'warning'})`);
        });
    }

    // Save results for CI/historical tracking
    this.saveResults();
  }

  /**
   * Save analysis results to file
   */
  saveResults() {
    const outputDir = path.resolve(process.cwd(), ANALYSIS_CONFIG.outputDir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const resultsFile = path.join(outputDir, 'bundle-size-check.json');
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.length,
        passing: this.results.filter(r => r.status === 'ok').length,
        warnings: this.results.filter(r => r.status === 'warning').length,
        errors: this.results.filter(r => r.status === 'error').length,
      },
      components: this.results,
      hasErrors: this.hasErrors,
      hasWarnings: this.hasWarnings,
    };

    fs.writeFileSync(resultsFile, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed results saved to: ${resultsFile}`);
  }

  /**
   * Check historical trends
   */
  checkHistoricalTrends() {
    const historyFile = path.resolve(process.cwd(), ANALYSIS_CONFIG.historyFile);
    
    if (!fs.existsSync(historyFile)) {
      return;
    }

    try {
      const history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
      const lastRun = history[history.length - 1];
      
      if (lastRun) {
        console.log('\n📈 Trends since last check:');
        console.log('============================');
        
        this.results.forEach(current => {
          const previous = lastRun.components.find(c => c.component === current.component);
          if (previous) {
            const change = current.actualKB - previous.actualKB;
            if (Math.abs(change) > 0.1) { // Show changes > 0.1KB
              const arrow = change > 0 ? '📈' : '📉';
              const sign = change > 0 ? '+' : '';
              console.log(`${arrow} ${current.component}: ${sign}${change.toFixed(2)}KB`);
            }
          }
        });
      }
    } catch (error) {
      console.warn('Could not read historical data:', error.message);
    }
  }

  /**
   * Update historical tracking
   */
  updateHistory() {
    const historyFile = path.resolve(process.cwd(), ANALYSIS_CONFIG.historyFile);
    const outputDir = path.dirname(historyFile);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let history = [];
    if (fs.existsSync(historyFile)) {
      try {
        history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
      } catch (error) {
        console.warn('Could not read history file, starting fresh:', error.message);
      }
    }

    // Keep last 50 entries
    if (history.length >= 50) {
      history = history.slice(-49);
    }

    history.push({
      timestamp: new Date().toISOString(),
      components: this.results.map(r => ({
        component: r.component,
        actualKB: r.actualKB,
        budgetKB: r.budgetKB,
        status: r.status,
      })),
    });

    fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
  }

  /**
   * Run the complete analysis
   */
  async run() {
    console.log('⚡ Performance Budget Checker');
    console.log('============================\n');

    await this.analyzeComponents();
    this.generateSummary();
    
    if (ANALYSIS_CONFIG.trackHistory) {
      this.checkHistoricalTrends();
      this.updateHistory();
    }

    // Exit with appropriate code for CI
    if (this.hasErrors) {
      console.log('\n💥 Bundle size check FAILED - components exceed budgets');
      process.exit(1);
    } else if (this.hasWarnings) {
      console.log('\n⚠️  Bundle size check PASSED with warnings');
      process.exit(0);
    } else {
      console.log('\n🎉 Bundle size check PASSED - all components within budgets');
      process.exit(0);
    }
  }
}

// Run the checker
const checker = new BundleSizeChecker();
checker.run().catch(error => {
  console.error('Bundle size check failed:', error);
  process.exit(1);
});