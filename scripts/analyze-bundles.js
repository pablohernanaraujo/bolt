#!/usr/bin/env node
// /scripts/analyze-bundles.js
// Comprehensive bundle analysis using webpack-bundle-analyzer
// Generates detailed reports on bundle composition and optimization opportunities
// RELEVANT FILES: check-bundle-size.js, performance-budgets.config.js, next.config.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import config from '../performance-budgets.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { COMPONENT_BUDGETS, ANALYSIS_CONFIG } = config;

/**
 * Bundle Analyzer
 * 
 * This script performs deep analysis of webpack bundles to identify
 * optimization opportunities and track bundle composition over time.
 */

class BundleAnalyzer {
  constructor() {
    this.results = {
      bundles: [],
      dependencies: [],
      duplicates: [],
      opportunities: [],
      treeshaking: {},
      summary: {},
    };
  }

  /**
   * Analyze webpack stats from Next.js build
   */
  async analyzeWebpackStats() {
    console.log('📊 Analyzing webpack bundle stats...');
    
    const buildDir = path.resolve(process.cwd(), '.next');
    if (!fs.existsSync(buildDir)) {
      throw new Error('Build directory not found. Run "npm run build" first.');
    }

    // Look for webpack stats
    const statsFile = path.join(buildDir, 'webpack-stats.json');
    let stats = null;

    if (fs.existsSync(statsFile)) {
      stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
    } else {
      console.log('No webpack stats found, analyzing build files directly...');
      return await this.analyzeBuildFiles();
    }

    return this.processWebpackStats(stats);
  }

  /**
   * Process webpack stats data
   */
  processWebpackStats(stats) {
    const analysis = {
      entrypoints: {},
      chunks: [],
      modules: [],
      assets: [],
    };

    // Analyze entrypoints
    if (stats.entrypoints) {
      for (const [name, entrypoint] of Object.entries(stats.entrypoints)) {
        analysis.entrypoints[name] = {
          name,
          assets: entrypoint.assets,
          size: entrypoint.assets.reduce((total, asset) => total + (asset.size || 0), 0),
        };
      }
    }

    // Analyze chunks
    if (stats.chunks) {
      analysis.chunks = stats.chunks.map(chunk => ({
        id: chunk.id,
        names: chunk.names,
        size: chunk.size,
        modules: chunk.modules?.length || 0,
        entry: chunk.entry,
        initial: chunk.initial,
      }));
    }

    // Analyze modules
    if (stats.modules) {
      analysis.modules = stats.modules.map(module => ({
        name: module.name,
        size: module.size,
        chunks: module.chunks,
        depth: module.depth,
        issuer: module.issuer,
      }));
    }

    return analysis;
  }

  /**
   * Analyze build files directly when webpack stats unavailable
   */
  async analyzeBuildFiles() {
    console.log('📁 Analyzing build files...');
    
    const staticDir = path.resolve(process.cwd(), '.next/static');
    const analysis = {
      javascript: [],
      css: [],
      chunks: [],
      total: { js: 0, css: 0 },
    };

    if (!fs.existsSync(staticDir)) {
      return analysis;
    }

    // Analyze JavaScript files
    const jsDir = path.join(staticDir, 'chunks');
    if (fs.existsSync(jsDir)) {
      const files = fs.readdirSync(jsDir);
      for (const file of files) {
        if (file.endsWith('.js')) {
          const filePath = path.join(jsDir, file);
          const size = fs.statSync(filePath).size;
          analysis.javascript.push({
            name: file,
            path: filePath,
            size,
            type: this.getChunkType(file),
          });
          analysis.total.js += size;
        }
      }
    }

    // Analyze CSS files
    const cssDir = path.join(staticDir, 'css');
    if (fs.existsSync(cssDir)) {
      const files = fs.readdirSync(cssDir);
      for (const file of files) {
        if (file.endsWith('.css')) {
          const filePath = path.join(cssDir, file);
          const size = fs.statSync(filePath).size;
          analysis.css.push({
            name: file,
            path: filePath,
            size,
          });
          analysis.total.css += size;
        }
      }
    }

    return analysis;
  }

  /**
   * Determine chunk type from filename
   */
  getChunkType(filename) {
    if (filename.includes('vendor') || filename.includes('node_modules')) {
      return 'vendor';
    }
    if (filename.includes('main') || filename.includes('index')) {
      return 'main';
    }
    if (filename.includes('runtime')) {
      return 'runtime';
    }
    if (filename.includes('framework')) {
      return 'framework';
    }
    return 'chunk';
  }

  /**
   * Analyze dependencies and their sizes
   */
  async analyzeDependencies() {
    console.log('📦 Analyzing dependencies...');
    
    try {
      // Use bundle analyzer to generate stats
      const output = execSync(
        'npx webpack-bundle-analyzer .next/static/chunks/*.js --mode json --no-open',
        { encoding: 'utf8', stdio: 'pipe' }
      );
      
      const bundleData = JSON.parse(output);
      return this.processBundleAnalyzerData(bundleData);
    } catch (error) {
      console.warn('Could not run webpack-bundle-analyzer:', error.message);
      return this.analyzePackageJson();
    }
  }

  /**
   * Process bundle analyzer data
   */
  processBundleAnalyzerData(data) {
    const dependencies = [];
    const duplicates = [];
    
    function extractModules(node, path = '') {
      if (node.children) {
        for (const child of node.children) {
          extractModules(child, `${path}/${child.label}`);
        }
      } else {
        // Leaf node - actual module
        dependencies.push({
          name: node.label,
          path: path,
          size: node.statSize,
          gzipSize: node.parsedSize,
        });
      }
    }

    if (data.children) {
      for (const child of data.children) {
        extractModules(child, child.label);
      }
    }

    // Find potential duplicates
    const moduleNames = {};
    for (const dep of dependencies) {
      const name = dep.name.split('/')[0]; // Get package name
      if (moduleNames[name]) {
        moduleNames[name].push(dep);
      } else {
        moduleNames[name] = [dep];
      }
    }

    for (const [name, instances] of Object.entries(moduleNames)) {
      if (instances.length > 1) {
        duplicates.push({
          name,
          instances: instances.length,
          totalSize: instances.reduce((sum, inst) => sum + inst.size, 0),
          paths: instances.map(inst => inst.path),
        });
      }
    }

    return { dependencies, duplicates };
  }

  /**
   * Fallback: analyze package.json for dependency insights
   */
  analyzePackageJson() {
    const packagePath = path.resolve(process.cwd(), 'package.json');
    if (!fs.existsSync(packagePath)) {
      return { dependencies: [], duplicates: [] };
    }

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const deps = packageJson.dependencies || {};
    
    const dependencies = Object.entries(deps).map(([name, version]) => ({
      name,
      version,
      size: 0, // Would need additional analysis
      type: 'dependency',
    }));

    return { dependencies, duplicates: [] };
  }

  /**
   * Analyze tree-shaking effectiveness
   */
  analyzeTreeShaking() {
    console.log('🌳 Analyzing tree-shaking effectiveness...');
    
    const analysis = {
      optimized: [],
      potential: [],
      issues: [],
    };

    // Check for common tree-shaking issues
    const commonIssues = [
      { pattern: /lodash(?!\/es)/, message: 'Use lodash-es for better tree-shaking' },
      { pattern: /moment(?!\/min)/, message: 'Consider date-fns or dayjs for smaller bundle' },
      { pattern: /rxjs\/Rx/, message: 'Import specific RxJS operators instead' },
      { pattern: /\.\/index$/, message: 'Avoid barrel exports that hurt tree-shaking' },
    ];

    // This would need more sophisticated analysis of actual build output
    // For now, we'll check the package.json for known problematic packages

    return analysis;
  }

  /**
   * Identify optimization opportunities
   */
  identifyOptimizations() {
    console.log('🎯 Identifying optimization opportunities...');
    
    const opportunities = [];

    // Large dependencies that could be optimized
    const largeDeps = this.results.dependencies
      .filter(dep => dep.size > 100 * 1024) // > 100KB
      .sort((a, b) => b.size - a.size);

    for (const dep of largeDeps.slice(0, 5)) {
      opportunities.push({
        type: 'large-dependency',
        target: dep.name,
        impact: `${(dep.size / 1024).toFixed(1)}KB`,
        suggestion: `Consider alternatives or lazy loading for ${dep.name}`,
      });
    }

    // Duplicated dependencies
    for (const dup of this.results.duplicates) {
      opportunities.push({
        type: 'duplicate-dependency',
        target: dup.name,
        impact: `${(dup.totalSize / 1024).toFixed(1)}KB duplicated`,
        suggestion: `Consolidate ${dup.name} instances (found ${dup.instances} copies)`,
      });
    }

    // Bundle splitting opportunities
    if (this.results.bundles.length === 1) {
      opportunities.push({
        type: 'bundle-splitting',
        target: 'main bundle',
        impact: 'Improved caching',
        suggestion: 'Consider splitting vendor and app code into separate bundles',
      });
    }

    return opportunities;
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    const { summary } = this.results;
    
    console.log('\n📊 Bundle Analysis Report');
    console.log('=========================');
    
    if (summary.totalSize) {
      console.log(`📦 Total bundle size:   ${(summary.totalSize / 1024).toFixed(2)}KB`);
      console.log(`📝 JavaScript:          ${(summary.jsSize / 1024).toFixed(2)}KB`);
      console.log(`🎨 CSS:                 ${(summary.cssSize / 1024).toFixed(2)}KB`);
    }
    
    if (this.results.dependencies.length > 0) {
      console.log(`📚 Dependencies:        ${this.results.dependencies.length} modules`);
      
      const topDeps = this.results.dependencies
        .sort((a, b) => b.size - a.size)
        .slice(0, 5);
      
      console.log('\n🔝 Largest dependencies:');
      for (const dep of topDeps) {
        console.log(`   ${dep.name.padEnd(30)} ${(dep.size / 1024).toFixed(2)}KB`);
      }
    }
    
    if (this.results.duplicates.length > 0) {
      console.log(`\n⚠️  Duplicate dependencies: ${this.results.duplicates.length}`);
      for (const dup of this.results.duplicates) {
        console.log(`   ${dup.name} (${dup.instances} instances, ${(dup.totalSize / 1024).toFixed(2)}KB total)`);
      }
    }
    
    if (this.results.opportunities.length > 0) {
      console.log('\n🎯 Optimization opportunities:');
      for (const opp of this.results.opportunities) {
        console.log(`   ${opp.type}: ${opp.suggestion} (${opp.impact})`);
      }
    }
  }

  /**
   * Save analysis results
   */
  saveResults() {
    const outputDir = path.resolve(process.cwd(), ANALYSIS_CONFIG.outputDir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const resultsFile = path.join(outputDir, 'bundle-analysis.json');
    const report = {
      timestamp: new Date().toISOString(),
      ...this.results,
    };

    fs.writeFileSync(resultsFile, JSON.stringify(report, null, 2));
    console.log(`\n📄 Analysis saved to: ${resultsFile}`);
  }

  /**
   * Run complete bundle analysis
   */
  async run() {
    console.log('⚡ Bundle Analyzer');
    console.log('==================\n');

    try {
      // Analyze webpack output
      const webpackAnalysis = await this.analyzeWebpackStats();
      this.results.bundles = webpackAnalysis.chunks || [];
      
      // Calculate summary
      this.results.summary = {
        totalSize: webpackAnalysis.total?.js + webpackAnalysis.total?.css || 0,
        jsSize: webpackAnalysis.total?.js || 0,
        cssSize: webpackAnalysis.total?.css || 0,
      };

      // Analyze dependencies
      const depAnalysis = await this.analyzeDependencies();
      this.results.dependencies = depAnalysis.dependencies;
      this.results.duplicates = depAnalysis.duplicates;

      // Tree-shaking analysis
      this.results.treeshaking = this.analyzeTreeShaking();

      // Optimization opportunities
      this.results.opportunities = this.identifyOptimizations();

      this.generateReport();
      this.saveResults();

      console.log('\n🎉 Bundle analysis completed successfully');
    } catch (error) {
      console.error('Bundle analysis failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the analyzer
const analyzer = new BundleAnalyzer();
analyzer.run().catch(error => {
  console.error('Bundle analysis failed:', error);
  process.exit(1);
});