#!/usr/bin/env node
// /scripts/audit-side-effects.js
// Comprehensive audit script to detect side effects in component modules
// Analyzes imports, globals, and potential side effect patterns
// RELEVANT FILES: performance-budgets.config.js, eslint-rules/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import config from '../performance-budgets.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  SIDE_EFFECT_FREE_COMPONENTS,
  CONTROLLED_SIDE_EFFECTS_ALLOWED,
} = config;

/**
 * Side Effects Auditor
 * 
 * This script performs static analysis to detect potential side effects
 * in component modules that could impact tree-shaking and performance.
 */

class SideEffectsAuditor {
  constructor() {
    this.results = {
      sideEffectFree: [],
      controlledSideEffects: [],
      violations: [],
      warnings: [],
      summary: {},
    };
  }

  /**
   * Patterns that indicate side effects
   */
  getSideEffectPatterns() {
    return [
      // Global listeners
      {
        pattern: /\.addEventListener\s*\(/g,
        type: 'global-listener',
        severity: 'error',
        message: 'Global event listener detected',
      },
      {
        pattern: /window\./g,
        type: 'window-access',
        severity: 'warning',
        message: 'Window object access detected',
      },
      {
        pattern: /document\./g,
        type: 'document-access',
        severity: 'warning',
        message: 'Document object access detected',
      },
      
      // Immediate function calls
      {
        pattern: /^\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/m,
        type: 'immediate-call',
        severity: 'warning',
        message: 'Potential immediate function call',
      },
      
      // Timer functions
      {
        pattern: /setTimeout|setInterval|setImmediate/g,
        type: 'timer',
        severity: 'error',
        message: 'Timer function detected',
      },
      
      // Storage access
      {
        pattern: /localStorage|sessionStorage/g,
        type: 'storage',
        severity: 'error',
        message: 'Storage access detected',
      },
      
      // Network requests
      {
        pattern: /fetch\s*\(|XMLHttpRequest|axios\.|$.ajax/g,
        type: 'network',
        severity: 'error',
        message: 'Network request detected',
      },
      
      // Console statements
      {
        pattern: /console\.(log|warn|error|info)/g,
        type: 'console',
        severity: 'info',
        message: 'Console statement detected',
      },
      
      // Global mutations
      {
        pattern: /Object\.(defineProperty|assign|freeze)/g,
        type: 'global-mutation',
        severity: 'warning',
        message: 'Global object mutation detected',
      },
      
      // Process/environment access
      {
        pattern: /process\.env|process\./g,
        type: 'process',
        severity: 'info',
        message: 'Process object access detected',
      },
    ];
  }

  /**
   * Safe patterns that are allowed
   */
  getSafePatterns() {
    return [
      // React imports and calls
      /^import.*from\s+['"]react['"]$/m,
      /React\./g,
      /useState|useEffect|useCallback|useMemo/g,
      
      // Type imports
      /^import\s+type/m,
      /^export\s+type/m,
      
      // Component definitions
      /^export\s+(const|function)/m,
      /forwardRef|memo/g,
      
      // Style imports (vanilla-extract)
      /\.css\.ts$/g,
      /style|className/g,
      
      // Object/Array utilities
      /Object\.(keys|values|entries)/g,
      /Array\.(from|of)/g,
    ];
  }

  /**
   * Analyze a single file for side effects
   */
  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const analysis = {
        file: filePath,
        violations: [],
        warnings: [],
        info: [],
        sideEffectFree: true,
      };

      const patterns = this.getSideEffectPatterns();
      const safePatterns = this.getSafePatterns();

      // Check for side effect patterns
      for (const { pattern, type, severity, message } of patterns) {
        const matches = Array.from(content.matchAll(pattern));
        
        for (const match of matches) {
          const lineNumber = this.getLineNumber(content, match.index);
          const lineContent = this.getLineContent(content, match.index);
          
          // Check if this match is in a safe context
          const isSafe = safePatterns.some(safePattern => 
            safePattern.test(lineContent) || this.isInSafeContext(content, match.index)
          );

          if (!isSafe) {
            const violation = {
              type,
              severity,
              message,
              line: lineNumber,
              content: lineContent.trim(),
              match: match[0],
            };

            if (severity === 'error') {
              analysis.violations.push(violation);
              analysis.sideEffectFree = false;
            } else if (severity === 'warning') {
              analysis.warnings.push(violation);
            } else {
              analysis.info.push(violation);
            }
          }
        }
      }

      return analysis;
    } catch (error) {
      return {
        file: filePath,
        error: error.message,
        violations: [],
        warnings: [],
        info: [],
        sideEffectFree: false,
      };
    }
  }

  /**
   * Check if a match is in a safe context (inside function, hook, etc.)
   */
  isInSafeContext(content, index) {
    const beforeMatch = content.substring(0, index);
    const lines = beforeMatch.split('\n');
    
    // Look for function/hook/component context
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      
      // Inside a function
      if (/^\s*(function|const|let)\s+[a-zA-Z_$]/.test(line) ||
          /=>\s*{?\s*$/.test(line)) {
        return true;
      }
      
      // Inside a React hook
      if (/use[A-Z][a-zA-Z]*\s*\(/.test(line)) {
        return true;
      }
      
      // Inside useEffect
      if (/useEffect\s*\(/.test(line)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get line number from index
   */
  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  /**
   * Get line content from index
   */
  getLineContent(content, index) {
    const lines = content.split('\n');
    const lineNumber = this.getLineNumber(content, index) - 1;
    return lines[lineNumber] || '';
  }

  /**
   * Get all component files to analyze
   */
  getComponentFiles() {
    const componentsDir = path.resolve(process.cwd(), 'src/ui');
    const files = [];

    function collectFiles(dir) {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          collectFiles(fullPath);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          files.push(fullPath);
        }
      }
    }

    collectFiles(componentsDir);
    return files;
  }

  /**
   * Get component name from file path
   */
  getComponentName(filePath) {
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    const dirName = parts[parts.length - 2];
    
    if (fileName === 'index.ts' || fileName === 'index.tsx') {
      return dirName;
    }
    
    return fileName.replace(/\.(ts|tsx)$/, '');
  }

  /**
   * Analyze all components
   */
  async analyzeComponents() {
    console.log('🔍 Auditing components for side effects...\n');

    const files = this.getComponentFiles();
    const analyses = [];

    for (const file of files) {
      const analysis = this.analyzeFile(file);
      const componentName = this.getComponentName(file);
      
      analysis.component = componentName;
      analyses.push(analysis);

      // Categorize results
      if (analysis.sideEffectFree && analysis.violations.length === 0) {
        this.results.sideEffectFree.push(analysis);
      } else if (CONTROLLED_SIDE_EFFECTS_ALLOWED.includes(componentName)) {
        this.results.controlledSideEffects.push(analysis);
      } else {
        this.results.violations.push(analysis);
      }

      if (analysis.warnings.length > 0) {
        this.results.warnings.push(analysis);
      }

      // Log progress
      const statusIcon = analysis.violations.length > 0 ? '❌' : 
                        analysis.warnings.length > 0 ? '⚠️' : '✅';
      const sideEffectsCount = analysis.violations.length + analysis.warnings.length;
      console.log(
        `${statusIcon} ${componentName.padEnd(25)} ${sideEffectsCount > 0 ? `${sideEffectsCount} issues` : 'clean'}`
      );
    }

    return analyses;
  }

  /**
   * Generate summary report
   */
  generateSummary() {
    const total = this.results.sideEffectFree.length + 
                 this.results.controlledSideEffects.length + 
                 this.results.violations.length;

    this.results.summary = {
      total,
      sideEffectFree: this.results.sideEffectFree.length,
      controlledSideEffects: this.results.controlledSideEffects.length,
      violations: this.results.violations.length,
      warnings: this.results.warnings.length,
    };

    console.log('\n📊 Side Effects Audit Summary');
    console.log('==============================');
    console.log(`✅ Side-effect free:     ${this.results.summary.sideEffectFree}/${total} components`);
    console.log(`🎛️  Controlled effects:   ${this.results.summary.controlledSideEffects}/${total} components`);
    console.log(`❌ Violations:          ${this.results.summary.violations}/${total} components`);
    console.log(`⚠️  Warnings:            ${this.results.summary.warnings}/${total} components`);

    if (this.results.violations.length > 0) {
      console.log('\n🚨 Components with side effect violations:');
      console.log('==========================================');
      
      for (const analysis of this.results.violations) {
        console.log(`\n❌ ${analysis.component}:`);
        for (const violation of analysis.violations) {
          console.log(`  Line ${violation.line}: ${violation.message}`);
          console.log(`    ${violation.content}`);
        }
      }
    }

    if (this.results.warnings.length > 0) {
      console.log('\n⚠️  Components with warnings:');
      console.log('============================');
      
      for (const analysis of this.results.warnings) {
        if (analysis.warnings.length > 0) {
          console.log(`\n⚠️  ${analysis.component}:`);
          for (const warning of analysis.warnings) {
            console.log(`  Line ${warning.line}: ${warning.message}`);
          }
        }
      }
    }
  }

  /**
   * Save results to file
   */
  saveResults() {
    const outputDir = path.resolve(process.cwd(), 'performance-reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const resultsFile = path.join(outputDir, 'side-effects-audit.json');
    const report = {
      timestamp: new Date().toISOString(),
      ...this.results,
    };

    fs.writeFileSync(resultsFile, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed audit saved to: ${resultsFile}`);
  }

  /**
   * Run ESLint with our custom rules
   */
  async runESLintAnalysis() {
    console.log('\n🔧 Running ESLint with side effects rules...');
    
    try {
      const output = execSync(
        'npx eslint src/ui --ext .ts,.tsx --format json --no-color',
        { encoding: 'utf8', stdio: 'pipe' }
      );
      
      const eslintResults = JSON.parse(output);
      const sideEffectIssues = eslintResults
        .filter(result => result.messages.some(msg => 
          msg.ruleId && msg.ruleId.startsWith('no-global-effects/')
        ))
        .map(result => ({
          file: result.filePath,
          issues: result.messages.filter(msg => 
            msg.ruleId && msg.ruleId.startsWith('no-global-effects/')
          ),
        }));

      console.log(`Found ${sideEffectIssues.length} files with ESLint side effect issues`);
      return sideEffectIssues;
    } catch (error) {
      console.warn('ESLint analysis failed:', error.message);
      return [];
    }
  }

  /**
   * Run the complete audit
   */
  async run() {
    console.log('⚡ Side Effects Auditor');
    console.log('======================\n');

    await this.analyzeComponents();
    this.generateSummary();
    
    const eslintResults = await this.runESLintAnalysis();
    if (eslintResults.length > 0) {
      this.results.eslintIssues = eslintResults;
    }

    this.saveResults();

    // Exit with appropriate code for CI
    if (this.results.violations.length > 0) {
      console.log('\n💥 Side effects audit FAILED - violations found');
      process.exit(1);
    } else if (this.results.warnings.length > 0) {
      console.log('\n⚠️  Side effects audit PASSED with warnings');
      process.exit(0);
    } else {
      console.log('\n🎉 Side effects audit PASSED - all components clean');
      process.exit(0);
    }
  }
}

// Run the auditor
const auditor = new SideEffectsAuditor();
auditor.run().catch(error => {
  console.error('Side effects audit failed:', error);
  process.exit(1);
});