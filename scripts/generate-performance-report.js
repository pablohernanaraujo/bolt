#!/usr/bin/env node
// /scripts/generate-performance-report.js
// Comprehensive performance report generator that combines all analysis results
// Creates unified dashboards and trend reports for performance monitoring
// RELEVANT FILES: check-bundle-size.js, audit-side-effects.js, analyze-bundles.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../performance-budgets.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { ANALYSIS_CONFIG } = config;

/**
 * Performance Report Generator
 * 
 * This script combines results from all performance analysis tools
 * to generate comprehensive reports and trend analysis.
 */

class PerformanceReportGenerator {
  constructor() {
    this.data = {
      bundleSizes: null,
      sideEffects: null,
      globalListeners: null,
      bundleAnalysis: null,
      criticalCSS: null,
    };
    
    this.report = {
      timestamp: new Date().toISOString(),
      summary: {},
      details: {},
      trends: {},
      recommendations: [],
      scores: {},
    };
  }

  /**
   * Load all analysis results
   */
  loadAnalysisResults() {
    console.log('📊 Loading analysis results...');
    
    const reportsDir = path.resolve(process.cwd(), ANALYSIS_CONFIG.outputDir);
    if (!fs.existsSync(reportsDir)) {
      throw new Error('No performance reports found. Run analysis scripts first.');
    }

    const files = {
      bundleSizes: 'bundle-size-check.json',
      sideEffects: 'side-effects-audit.json',
      globalListeners: 'global-listeners-audit.json',
      bundleAnalysis: 'bundle-analysis.json',
      criticalCSS: 'critical-css-analysis.json',
    };

    for (const [key, filename] of Object.entries(files)) {
      const filePath = path.join(reportsDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          this.data[key] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          console.log(`✅ Loaded ${filename}`);
        } catch (error) {
          console.warn(`⚠️  Failed to load ${filename}: ${error.message}`);
        }
      } else {
        console.warn(`⚠️  ${filename} not found`);
      }
    }
  }

  /**
   * Calculate performance scores
   */
  calculateScores() {
    console.log('🎯 Calculating performance scores...');
    
    const scores = {
      bundleSize: 0,
      sideEffects: 0,
      cleanup: 0,
      optimization: 0,
      overall: 0,
    };

    // Bundle size score (0-100)
    if (this.data.bundleSizes) {
      const { summary } = this.data.bundleSizes;
      const total = summary.total || 1;
      const passing = summary.passing || 0;
      scores.bundleSize = Math.round((passing / total) * 100);
    }

    // Side effects score (0-100)
    if (this.data.sideEffects) {
      const { summary } = this.data.sideEffects;
      const total = summary.total || 1;
      const clean = summary.sideEffectFree + summary.controlledSideEffects;
      scores.sideEffects = Math.round((clean / total) * 100);
    }

    // Cleanup score (0-100)
    if (this.data.globalListeners) {
      const { summary } = this.data.globalListeners;
      const componentsWithListeners = summary.componentsWithListeners || 0;
      const componentsWithIssues = summary.componentsWithIssues || 0;
      
      if (componentsWithListeners > 0) {
        scores.cleanup = Math.round(((componentsWithListeners - componentsWithIssues) / componentsWithListeners) * 100);
      } else {
        scores.cleanup = 100; // No listeners = perfect cleanup
      }
    }

    // Optimization score based on bundle analysis
    if (this.data.bundleAnalysis) {
      const { opportunities } = this.data.bundleAnalysis;
      const maxOpportunities = 10; // Arbitrary baseline
      const actualOpportunities = opportunities?.length || 0;
      scores.optimization = Math.max(0, Math.round(((maxOpportunities - actualOpportunities) / maxOpportunities) * 100));
    }

    // Overall score (weighted average)
    scores.overall = Math.round(
      (scores.bundleSize * 0.3) +
      (scores.sideEffects * 0.25) +
      (scores.cleanup * 0.25) +
      (scores.optimization * 0.2)
    );

    this.report.scores = scores;
  }

  /**
   * Generate summary
   */
  generateSummary() {
    console.log('📋 Generating summary...');
    
    const summary = {
      performance: {
        score: this.report.scores.overall,
        grade: this.getPerformanceGrade(this.report.scores.overall),
      },
      components: {},
      bundles: {},
      issues: {
        critical: 0,
        warnings: 0,
        total: 0,
      },
    };

    // Bundle size summary
    if (this.data.bundleSizes) {
      summary.components.total = this.data.bundleSizes.summary.total;
      summary.components.passing = this.data.bundleSizes.summary.passing;
      summary.components.warnings = this.data.bundleSizes.summary.warnings;
      summary.components.errors = this.data.bundleSizes.summary.errors;
    }

    // Bundle analysis summary
    if (this.data.bundleAnalysis) {
      summary.bundles.totalSize = this.data.bundleAnalysis.summary?.totalSize || 0;
      summary.bundles.jsSize = this.data.bundleAnalysis.summary?.jsSize || 0;
      summary.bundles.cssSize = this.data.bundleAnalysis.summary?.cssSize || 0;
      summary.bundles.dependencies = this.data.bundleAnalysis.dependencies?.length || 0;
      summary.bundles.duplicates = this.data.bundleAnalysis.duplicates?.length || 0;
    }

    // Issues summary
    if (this.data.sideEffects) {
      summary.issues.critical += this.data.sideEffects.summary.violations;
      summary.issues.warnings += this.data.sideEffects.summary.warnings;
    }
    
    if (this.data.globalListeners) {
      summary.issues.critical += this.data.globalListeners.summary.componentsWithIssues;
    }
    
    summary.issues.total = summary.issues.critical + summary.issues.warnings;

    this.report.summary = summary;
  }

  /**
   * Get performance grade based on score
   */
  getPerformanceGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  /**
   * Analyze trends from historical data
   */
  analyzeTrends() {
    console.log('📈 Analyzing trends...');
    
    const trends = {
      bundleSize: { direction: 'stable', change: 0 },
      components: { direction: 'stable', change: 0 },
      issues: { direction: 'stable', change: 0 },
    };

    // Load historical data for trend analysis
    const historyFile = path.resolve(process.cwd(), ANALYSIS_CONFIG.historyFile);
    if (fs.existsSync(historyFile)) {
      try {
        const history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
        if (history.length >= 2) {
          const current = history[history.length - 1];
          const previous = history[history.length - 2];
          
          // Calculate bundle size trend
          const currentTotalSize = current.components?.reduce((sum, c) => sum + c.actualKB, 0) || 0;
          const previousTotalSize = previous.components?.reduce((sum, c) => sum + c.actualKB, 0) || 0;
          
          if (previousTotalSize > 0) {
            const change = ((currentTotalSize - previousTotalSize) / previousTotalSize) * 100;
            trends.bundleSize.change = change;
            trends.bundleSize.direction = change > 5 ? 'increasing' : change < -5 ? 'decreasing' : 'stable';
          }
        }
      } catch (error) {
        console.warn('Could not analyze trends:', error.message);
      }
    }

    this.report.trends = trends;
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    console.log('💡 Generating recommendations...');
    
    const recommendations = [];

    // Bundle size recommendations
    if (this.data.bundleSizes?.summary.errors > 0) {
      recommendations.push({
        type: 'critical',
        category: 'bundle-size',
        title: 'Components exceed budget limits',
        description: `${this.data.bundleSizes.summary.errors} components are over their size budgets`,
        action: 'Review and optimize oversized components',
        impact: 'high',
      });
    }

    // Side effects recommendations
    if (this.data.sideEffects?.summary.violations > 0) {
      recommendations.push({
        type: 'critical',
        category: 'side-effects',
        title: 'Components have side effects',
        description: `${this.data.sideEffects.summary.violations} components create side effects on import`,
        action: 'Move side effects to React hooks or components',
        impact: 'high',
      });
    }

    // Global listeners recommendations
    if (this.data.globalListeners?.summary.cleanupIssues > 0) {
      recommendations.push({
        type: 'warning',
        category: 'cleanup',
        title: 'Missing event listener cleanup',
        description: `${this.data.globalListeners.summary.cleanupIssues} listeners lack proper cleanup`,
        action: 'Add cleanup functions in useEffect returns',
        impact: 'medium',
      });
    }

    // Bundle optimization recommendations
    if (this.data.bundleAnalysis?.duplicates?.length > 0) {
      recommendations.push({
        type: 'warning',
        category: 'optimization',
        title: 'Duplicate dependencies detected',
        description: `${this.data.bundleAnalysis.duplicates.length} dependencies are duplicated`,
        action: 'Consolidate dependency versions',
        impact: 'medium',
      });
    }

    // Critical CSS recommendations
    if (this.data.criticalCSS && !this.data.criticalCSS.budget?.withinBudget) {
      recommendations.push({
        type: 'warning',
        category: 'css',
        title: 'Critical CSS over budget',
        description: 'Critical CSS exceeds size budget',
        action: 'Optimize critical styles and defer non-essential CSS',
        impact: 'medium',
      });
    }

    // Performance score recommendations
    if (this.report.scores.overall < 80) {
      recommendations.push({
        type: 'info',
        category: 'overall',
        title: 'Performance score below target',
        description: `Current score: ${this.report.scores.overall}/100`,
        action: 'Address high-impact issues first',
        impact: 'high',
      });
    }

    this.report.recommendations = recommendations;
  }

  /**
   * Generate detailed analysis
   */
  generateDetails() {
    this.report.details = {
      bundleSizes: this.data.bundleSizes,
      sideEffects: this.data.sideEffects,
      globalListeners: this.data.globalListeners,
      bundleAnalysis: this.data.bundleAnalysis,
      criticalCSS: this.data.criticalCSS,
    };
  }

  /**
   * Generate HTML report
   */
  generateHTMLReport() {
    const { summary, scores, recommendations } = this.report;
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .score-badge { display: inline-block; padding: 10px 20px; border-radius: 50px; color: white; font-weight: bold; font-size: 24px; }
        .score-a { background: #4CAF50; }
        .score-b { background: #8BC34A; }
        .score-c { background: #FFC107; }
        .score-d { background: #FF9800; }
        .score-f { background: #F44336; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .metric { text-align: center; padding: 15px; background: #f9f9f9; border-radius: 8px; }
        .metric-value { font-size: 2em; font-weight: bold; color: #333; }
        .metric-label { color: #666; margin-top: 5px; }
        .recommendations { list-style: none; padding: 0; }
        .recommendation { padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid; }
        .rec-critical { background: #ffebee; border-color: #f44336; }
        .rec-warning { background: #fff3e0; border-color: #ff9800; }
        .rec-info { background: #e3f2fd; border-color: #2196f3; }
        .trend { padding: 10px; margin: 5px 0; border-radius: 4px; }
        .trend-increasing { background: #ffebee; color: #c62828; }
        .trend-decreasing { background: #e8f5e8; color: #2e7d32; }
        .trend-stable { background: #f5f5f5; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Performance Report</h1>
            <p>${new Date().toLocaleString()}</p>
            <div class="score-badge score-${summary.performance.grade.toLowerCase()}">
                ${summary.performance.score}/100 (${summary.performance.grade})
            </div>
        </div>

        <div class="card">
            <h2>📊 Performance Metrics</h2>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">${scores.bundleSize}</div>
                    <div class="metric-label">Bundle Size Score</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${scores.sideEffects}</div>
                    <div class="metric-label">Side Effects Score</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${scores.cleanup}</div>
                    <div class="metric-label">Cleanup Score</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${scores.optimization}</div>
                    <div class="metric-label">Optimization Score</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>📈 Summary</h2>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">${summary.components.total || 0}</div>
                    <div class="metric-label">Total Components</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${summary.components.passing || 0}</div>
                    <div class="metric-label">Passing Budget</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${Math.round((summary.bundles.totalSize || 0) / 1024)}KB</div>
                    <div class="metric-label">Total Bundle Size</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${summary.issues.total || 0}</div>
                    <div class="metric-label">Total Issues</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>💡 Recommendations</h2>
            <ul class="recommendations">
                ${recommendations.map(rec => `
                    <li class="recommendation rec-${rec.type}">
                        <strong>${rec.title}</strong><br>
                        ${rec.description}<br>
                        <em>Action: ${rec.action}</em>
                    </li>
                `).join('')}
            </ul>
        </div>
    </div>
</body>
</html>`;

    return html;
  }

  /**
   * Save all reports
   */
  saveReports() {
    const outputDir = path.resolve(process.cwd(), ANALYSIS_CONFIG.outputDir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save JSON report
    const jsonFile = path.join(outputDir, 'performance-report.json');
    fs.writeFileSync(jsonFile, JSON.stringify(this.report, null, 2));

    // Save HTML report
    const htmlFile = path.join(outputDir, 'performance-report.html');
    const html = this.generateHTMLReport();
    fs.writeFileSync(htmlFile, html);

    console.log(`\n📄 Reports saved:`);
    console.log(`   JSON: ${jsonFile}`);
    console.log(`   HTML: ${htmlFile}`);
  }

  /**
   * Display console summary
   */
  displaySummary() {
    const { summary, scores, recommendations } = this.report;
    
    console.log('\n📊 Performance Report Summary');
    console.log('=============================');
    console.log(`🎯 Overall Score:       ${scores.overall}/100 (${summary.performance.grade})`);
    console.log(`📦 Bundle Size Score:   ${scores.bundleSize}/100`);
    console.log(`🔒 Side Effects Score:  ${scores.sideEffects}/100`);
    console.log(`🧹 Cleanup Score:       ${scores.cleanup}/100`);
    console.log(`⚡ Optimization Score:  ${scores.optimization}/100`);
    
    console.log('\n📈 Key Metrics');
    console.log('===============');
    console.log(`Components:             ${summary.components.total || 0} total, ${summary.components.passing || 0} passing`);
    console.log(`Bundle Size:            ${Math.round((summary.bundles.totalSize || 0) / 1024)}KB total`);
    console.log(`Issues:                 ${summary.issues.critical || 0} critical, ${summary.issues.warnings || 0} warnings`);
    
    if (recommendations.length > 0) {
      console.log('\n💡 Top Recommendations');
      console.log('======================');
      const topRecs = recommendations.slice(0, 3);
      for (const rec of topRecs) {
        const icon = rec.type === 'critical' ? '🚨' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`${icon} ${rec.title}`);
        console.log(`   ${rec.action}`);
      }
    }
  }

  /**
   * Run complete report generation
   */
  async run() {
    console.log('⚡ Performance Report Generator');
    console.log('===============================\n');

    try {
      this.loadAnalysisResults();
      this.calculateScores();
      this.generateSummary();
      this.analyzeTrends();
      this.generateRecommendations();
      this.generateDetails();
      
      this.displaySummary();
      this.saveReports();

      console.log('\n🎉 Performance report generated successfully');
    } catch (error) {
      console.error('Report generation failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the generator
const generator = new PerformanceReportGenerator();
generator.run().catch(error => {
  console.error('Report generation failed:', error);
  process.exit(1);
});