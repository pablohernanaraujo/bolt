#!/usr/bin/env node
// /scripts/extract-critical-css.js
// Critical CSS extraction and optimization for above-the-fold content
// Identifies and extracts minimal CSS needed for initial page load
// RELEVANT FILES: performance-budgets.config.js, src/tokens/, next.config.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSize } from 'gzip-size';
import config from '../performance-budgets.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { CRITICAL_CSS_COMPONENTS, GLOBAL_BUDGETS } = config;

/**
 * Critical CSS Extractor
 * 
 * This script analyzes CSS files and extracts critical styles needed
 * for above-the-fold content rendering.
 */

class CriticalCSSExtractor {
  constructor() {
    this.results = {
      criticalCSS: '',
      nonCriticalCSS: '',
      analysis: {
        totalSize: 0,
        criticalSize: 0,
        nonCriticalSize: 0,
        compressionRatio: 0,
        componentBreakdown: {},
      },
      budget: {
        limit: GLOBAL_BUDGETS.totalCSS.gzip,
        warning: GLOBAL_BUDGETS.totalCSS.warning,
        withinBudget: false,
      },
    };
  }

  /**
   * Critical CSS selectors patterns
   * These patterns identify above-the-fold styles
   */
  getCriticalSelectors() {
    return [
      // Base reset and normalize styles
      /^html\b/,
      /^body\b/,
      /^\*\b/,
      /^::?before\b/,
      /^::?after\b/,
      
      // Typography essentials
      /^h[1-6]\b/,
      /^p\b/,
      /^a\b/,
      /^strong\b/,
      /^em\b/,
      
      // Layout fundamentals
      /\.container\b/,
      /\.flex\b/,
      /\.grid\b/,
      /\.layout\b/,
      /\.main\b/,
      /\.header\b/,
      
      // Visibility and display
      /display:\s*(block|flex|grid|inline-block)/,
      /visibility:\s*hidden/,
      /opacity:\s*0/,
      
      // Critical positioning
      /position:\s*(fixed|absolute|sticky)/,
      /z-index/,
      /top:\s*0/,
      /left:\s*0/,
      /right:\s*0/,
      /bottom:\s*0/,
      
      // Essential font properties
      /font-family/,
      /font-size/,
      /font-weight/,
      /line-height/,
      /color:/,
      
      // Background for above-the-fold
      /background(-color|-image)?:/,
      
      // Critical margins and padding for layout
      /margin(-top|-bottom)?:\s*0/,
      /padding(-top|-bottom)?:\s*0/,
      
      // Essential borders
      /border(-top|-bottom|-left|-right)?:\s*(none|0)/,
      
      // CSS custom properties (design tokens)
      /--[a-zA-Z-]+/,
      
      // Critical component styles
      ...CRITICAL_CSS_COMPONENTS.map(component => new RegExp(`\\.${component}\\b`, 'g')),
    ];
  }

  /**
   * Non-critical selectors that can be deferred
   */
  getNonCriticalSelectors() {
    return [
      // Hover states
      /:hover\b/,
      /:focus\b/,
      /:active\b/,
      
      // Animation and transitions (can be progressive)
      /animation/,
      /transition/,
      /transform/,
      /@keyframes/,
      
      // Print styles
      /@media\s+print/,
      
      // Large screen optimizations
      /@media.*\(min-width:\s*(1200|1400|1600)px\)/,
      
      // Dark mode (can be loaded separately)
      /@media.*prefers-color-scheme:\s*dark/,
      /\[data-theme="dark"\]/,
      
      // Reduced motion preferences
      /@media.*prefers-reduced-motion/,
      
      // Complex selectors (often for advanced styling)
      /:nth-child\(/,
      /:nth-of-type\(/,
      /:not\(/,
      
      // Modal and overlay styles (loaded when needed)
      /\.modal\b/,
      /\.overlay\b/,
      /\.dropdown\b/,
      /\.tooltip\b/,
      
      // Form validation styles (progressive enhancement)
      /:invalid\b/,
      /:valid\b/,
      /:required\b/,
      
      // Advanced layout (can be progressive)
      /grid-template/,
      /flex-wrap/,
      /align-content/,
      /justify-content:\s*(?!center|flex-start)/,
    ];
  }

  /**
   * Read and parse CSS files from vanilla-extract output
   */
  async readCSSFiles() {
    const cssFiles = [];
    const nextDir = path.resolve(process.cwd(), '.next');
    
    if (!fs.existsSync(nextDir)) {
      throw new Error('Next.js build not found. Run "npm run build" first.');
    }

    // Find CSS files in .next/static/css
    const staticCSSDir = path.join(nextDir, 'static', 'css');
    if (fs.existsSync(staticCSSDir)) {
      const files = fs.readdirSync(staticCSSDir);
      for (const file of files) {
        if (file.endsWith('.css')) {
          const filePath = path.join(staticCSSDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          cssFiles.push({
            file,
            path: filePath,
            content,
            size: content.length,
          });
        }
      }
    }

    // Also read CSS from component files directly
    const srcCSSFiles = this.findComponentCSS();
    cssFiles.push(...srcCSSFiles);

    return cssFiles;
  }

  /**
   * Find CSS files in source components
   */
  findComponentCSS() {
    const cssFiles = [];
    const componentsDir = path.resolve(process.cwd(), 'src');
    
    function findCSS(dir) {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findCSS(fullPath);
        } else if (item.endsWith('.css.ts')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            cssFiles.push({
              file: item,
              path: fullPath,
              content,
              size: content.length,
              isVanillaExtract: true,
            });
          } catch (error) {
            console.warn(`Could not read CSS file ${fullPath}: ${error.message}`);
          }
        }
      }
    }

    findCSS(componentsDir);
    return cssFiles;
  }

  /**
   * Extract critical CSS from a single CSS file
   */
  extractCriticalFromCSS(cssContent) {
    const criticalSelectors = this.getCriticalSelectors();
    const nonCriticalSelectors = this.getNonCriticalSelectors();
    
    const lines = cssContent.split('\n');
    const criticalLines = [];
    const nonCriticalLines = [];
    
    let currentRule = '';
    let isInRule = false;
    let ruleStartIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      currentRule += line + '\n';
      
      // Detect start of CSS rule
      if (line.includes('{') && !isInRule) {
        isInRule = true;
        ruleStartIndex = i;
      }
      
      // Detect end of CSS rule
      if (line.includes('}') && isInRule) {
        isInRule = false;
        
        // Analyze the complete rule
        const isCritical = this.isRuleCritical(currentRule, criticalSelectors, nonCriticalSelectors);
        
        if (isCritical) {
          criticalLines.push(currentRule);
        } else {
          nonCriticalLines.push(currentRule);
        }
        
        currentRule = '';
      }
    }
    
    return {
      critical: criticalLines.join(''),
      nonCritical: nonCriticalLines.join(''),
    };
  }

  /**
   * Determine if a CSS rule is critical
   */
  isRuleCritical(rule, criticalSelectors, nonCriticalSelectors) {
    // First check if it's explicitly non-critical
    for (const pattern of nonCriticalSelectors) {
      if (pattern.test(rule)) {
        return false;
      }
    }
    
    // Then check if it matches critical patterns
    for (const pattern of criticalSelectors) {
      if (pattern.test(rule)) {
        return true;
      }
    }
    
    // Check for critical CSS custom properties (design tokens)
    if (rule.includes('--') && (
      rule.includes('color') ||
      rule.includes('font') ||
      rule.includes('spacing') ||
      rule.includes('radius')
    )) {
      return true;
    }
    
    // Check for CSS reset/normalize rules
    if (rule.includes('*') || rule.includes('html') || rule.includes('body')) {
      return true;
    }
    
    // Default to non-critical for safety
    return false;
  }

  /**
   * Extract critical CSS from vanilla-extract files
   */
  extractCriticalFromVanillaExtract(content, componentName) {
    const lines = content.split('\n');
    const criticalLines = [];
    const nonCriticalLines = [];
    
    // Check if this component is marked as critical
    const isCriticalComponent = CRITICAL_CSS_COMPONENTS.includes(componentName);
    
    for (const line of lines) {
      // Extract style definitions
      if (line.includes('style(') || line.includes('styleVariants(')) {
        if (isCriticalComponent) {
          criticalLines.push(line);
        } else {
          // Analyze the actual styles
          if (this.isVanillaExtractStyleCritical(line)) {
            criticalLines.push(line);
          } else {
            nonCriticalLines.push(line);
          }
        }
      } else {
        // Include imports and other necessary code
        criticalLines.push(line);
      }
    }
    
    return {
      critical: criticalLines.join('\n'),
      nonCritical: nonCriticalLines.join('\n'),
    };
  }

  /**
   * Check if vanilla-extract style is critical
   */
  isVanillaExtractStyleCritical(line) {
    const criticalProperties = [
      'display',
      'position',
      'font',
      'color',
      'background',
      'margin',
      'padding',
      'width',
      'height',
    ];
    
    return criticalProperties.some(prop => line.includes(`${prop}:`));
  }

  /**
   * Analyze CSS files and extract critical styles
   */
  async analyzeCSSFiles() {
    console.log('🔍 Analyzing CSS files for critical extraction...\n');
    
    const cssFiles = await this.readCSSFiles();
    let totalCritical = '';
    let totalNonCritical = '';
    
    for (const cssFile of cssFiles) {
      console.log(`Analyzing ${cssFile.file}...`);
      
      if (cssFile.isVanillaExtract) {
        // Extract component name for vanilla-extract files
        const componentName = cssFile.file.replace('.css.ts', '');
        const extracted = this.extractCriticalFromVanillaExtract(cssFile.content, componentName);
        
        this.results.analysis.componentBreakdown[componentName] = {
          total: cssFile.size,
          critical: extracted.critical.length,
          nonCritical: extracted.nonCritical.length,
        };
      } else {
        // Regular CSS files
        const extracted = this.extractCriticalFromCSS(cssFile.content);
        totalCritical += extracted.critical;
        totalNonCritical += extracted.nonCritical;
      }
    }
    
    this.results.criticalCSS = totalCritical;
    this.results.nonCriticalCSS = totalNonCritical;
    
    // Calculate sizes
    this.results.analysis.totalSize = totalCritical.length + totalNonCritical.length;
    this.results.analysis.criticalSize = totalCritical.length;
    this.results.analysis.nonCriticalSize = totalNonCritical.length;
    
    if (this.results.analysis.totalSize > 0) {
      this.results.analysis.compressionRatio = 
        this.results.analysis.criticalSize / this.results.analysis.totalSize;
    }
  }

  /**
   * Check budget compliance
   */
  async checkBudget() {
    const criticalGzippedSize = await gzipSize(this.results.criticalCSS);
    const criticalKB = criticalGzippedSize / 1024;
    
    this.results.budget.actual = criticalKB;
    this.results.budget.withinBudget = criticalKB <= this.results.budget.limit;
    this.results.budget.isWarning = criticalKB > this.results.budget.warning;
  }

  /**
   * Generate optimized critical CSS
   */
  optimizeCriticalCSS() {
    let optimized = this.results.criticalCSS;
    
    // Remove comments
    optimized = optimized.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove extra whitespace
    optimized = optimized.replace(/\s+/g, ' ');
    
    // Remove unnecessary semicolons
    optimized = optimized.replace(/;\s*}/g, '}');
    
    // Minify further
    optimized = optimized.replace(/\s*{\s*/g, '{');
    optimized = optimized.replace(/\s*}\s*/g, '}');
    optimized = optimized.replace(/\s*:\s*/g, ':');
    optimized = optimized.replace(/\s*;\s*/g, ';');
    
    this.results.criticalCSS = optimized;
  }

  /**
   * Generate report
   */
  generateReport() {
    const { analysis, budget } = this.results;
    
    console.log('\n📊 Critical CSS Analysis Report');
    console.log('===============================');
    console.log(`📏 Total CSS size:      ${(analysis.totalSize / 1024).toFixed(2)}KB`);
    console.log(`🎯 Critical CSS size:   ${(analysis.criticalSize / 1024).toFixed(2)}KB`);
    console.log(`⏳ Non-critical size:   ${(analysis.nonCriticalSize / 1024).toFixed(2)}KB`);
    console.log(`📊 Compression ratio:   ${(analysis.compressionRatio * 100).toFixed(1)}%`);
    
    console.log('\n💰 Budget Analysis');
    console.log('==================');
    console.log(`🎯 Critical CSS (gzip): ${budget.actual?.toFixed(2) || 'TBD'}KB`);
    console.log(`📊 Budget limit:        ${budget.limit}KB`);
    console.log(`⚠️  Warning threshold:  ${budget.warning}KB`);
    
    const budgetStatus = budget.withinBudget ? '✅ Within budget' :
                        budget.isWarning ? '⚠️  Over warning threshold' :
                        '❌ Over budget';
    console.log(`📈 Status:             ${budgetStatus}`);
    
    if (Object.keys(analysis.componentBreakdown).length > 0) {
      console.log('\n🧩 Component Breakdown');
      console.log('======================');
      
      for (const [component, sizes] of Object.entries(analysis.componentBreakdown)) {
        const criticalRatio = sizes.total > 0 ? (sizes.critical / sizes.total * 100) : 0;
        console.log(`${component.padEnd(20)} ${(sizes.critical / 1024).toFixed(2)}KB (${criticalRatio.toFixed(1)}% critical)`);
      }
    }
  }

  /**
   * Save extracted CSS files
   */
  async saveExtractedCSS() {
    const outputDir = path.resolve(process.cwd(), 'performance-reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save critical CSS
    const criticalFile = path.join(outputDir, 'critical.css');
    fs.writeFileSync(criticalFile, this.results.criticalCSS);
    
    // Save non-critical CSS
    const nonCriticalFile = path.join(outputDir, 'non-critical.css');
    fs.writeFileSync(nonCriticalFile, this.results.nonCriticalCSS);
    
    // Save analysis report
    const reportFile = path.join(outputDir, 'critical-css-analysis.json');
    const report = {
      timestamp: new Date().toISOString(),
      ...this.results,
    };
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Files saved to ${outputDir}:`);
    console.log(`   critical.css (${(this.results.criticalCSS.length / 1024).toFixed(2)}KB)`);
    console.log(`   non-critical.css (${(this.results.nonCriticalCSS.length / 1024).toFixed(2)}KB)`);
    console.log(`   critical-css-analysis.json`);
  }

  /**
   * Run the complete extraction
   */
  async run() {
    console.log('⚡ Critical CSS Extractor');
    console.log('=========================\n');

    try {
      await this.analyzeCSSFiles();
      this.optimizeCriticalCSS();
      await this.checkBudget();
      this.generateReport();
      await this.saveExtractedCSS();

      // Exit with appropriate code for CI
      if (!this.results.budget.withinBudget) {
        console.log('\n💥 Critical CSS extraction FAILED - over budget');
        process.exit(1);
      } else if (this.results.budget.isWarning) {
        console.log('\n⚠️  Critical CSS extraction PASSED with warnings');
        process.exit(0);
      } else {
        console.log('\n🎉 Critical CSS extraction PASSED - within budget');
        process.exit(0);
      }
    } catch (error) {
      console.error('Critical CSS extraction failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the extractor
const extractor = new CriticalCSSExtractor();
extractor.run().catch(error => {
  console.error('Critical CSS extraction failed:', error);
  process.exit(1);
});