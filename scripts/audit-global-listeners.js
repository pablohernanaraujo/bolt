#!/usr/bin/env node
// /scripts/audit-global-listeners.js
// Specialized audit for global event listeners and their cleanup
// Ensures components properly manage event listeners without memory leaks
// RELEVANT FILES: audit-side-effects.js, performance-budgets.config.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../performance-budgets.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { CONTROLLED_SIDE_EFFECTS_ALLOWED } = config;

/**
 * Global Listeners Auditor
 * 
 * This script specifically focuses on finding global event listeners
 * and analyzing whether they're properly cleaned up to prevent memory leaks.
 */

class GlobalListenersAuditor {
  constructor() {
    this.results = {
      components: [],
      listeners: [],
      violations: [],
      cleanupIssues: [],
      summary: {},
    };
  }

  /**
   * Global objects that can have listeners
   */
  getGlobalObjects() {
    return [
      'window',
      'document',
      'document.body',
      'document.documentElement',
      'navigator',
      'screen',
      'history',
      'location',
      'globalThis',
      'self',
      'parent',
      'top',
    ];
  }

  /**
   * Event listener methods to detect
   */
  getListenerMethods() {
    return [
      'addEventListener',
      'removeEventListener',
      'attachEvent',
      'detachEvent',
      'on', // jQuery style
      'off',
      'bind',
      'unbind',
      'once',
    ];
  }

  /**
   * Find all global listener calls in content
   */
  findGlobalListeners(content, filePath) {
    const listeners = [];
    const globalObjects = this.getGlobalObjects();
    const listenerMethods = this.getListenerMethods();
    
    // Create pattern for global listener detection
    const patterns = [];
    for (const obj of globalObjects) {
      for (const method of listenerMethods) {
        patterns.push({
          regex: new RegExp(`${obj.replace('.', '\\.')}\\s*\\.\\s*${method}\\s*\\(`, 'g'),
          object: obj,
          method,
          type: method.includes('remove') || method.includes('off') || method.includes('unbind') ? 'remove' : 'add',
        });
      }
    }

    // Find matches
    for (const { regex, object, method, type } of patterns) {
      let match;
      while ((match = regex.exec(content)) !== null) {
        const lineNumber = this.getLineNumber(content, match.index);
        const lineContent = this.getLineContent(content, match.index);
        const context = this.getListenerContext(content, match.index);
        
        listeners.push({
          file: filePath,
          line: lineNumber,
          content: lineContent.trim(),
          object,
          method,
          type,
          event: this.extractEventType(lineContent),
          context,
          hasCleanup: type === 'remove',
        });
      }
    }

    return listeners;
  }

  /**
   * Extract event type from listener call
   */
  extractEventType(lineContent) {
    // Look for event name in addEventListener('event', ...)
    const eventMatch = lineContent.match(/addEventListener\s*\(\s*['"`]([^'"`]+)['"`]/);
    if (eventMatch) {
      return eventMatch[1];
    }
    
    // Look for .on patterns
    const onMatch = lineContent.match(/\.on\s*\(\s*['"`]([^'"`]+)['"`]/);
    if (onMatch) {
      return onMatch[1];
    }
    
    return 'unknown';
  }

  /**
   * Get context where listener is added (function, useEffect, etc.)
   */
  getListenerContext(content, index) {
    const beforeMatch = content.substring(0, index);
    const lines = beforeMatch.split('\n');
    
    let context = {
      type: 'module',
      inFunction: false,
      inUseEffect: false,
      inComponent: false,
      inHook: false,
      functionName: null,
    };

    // Analyze context by looking backwards
    for (let i = lines.length - 1; i >= Math.max(0, lines.length - 20); i--) {
      const line = lines[i].trim();
      
      // Check for useEffect
      if (line.includes('useEffect') && line.includes('(')) {
        context.inUseEffect = true;
        context.type = 'useEffect';
        break;
      }
      
      // Check for custom hook (starts with 'use')
      const hookMatch = line.match(/^\s*(const|function)\s+(use[A-Z][a-zA-Z]*)/);
      if (hookMatch) {
        context.inHook = true;
        context.functionName = hookMatch[2];
        context.type = 'hook';
        break;
      }
      
      // Check for React component (starts with capital)
      const componentMatch = line.match(/^\s*(const|function)\s+([A-Z][a-zA-Z]*)/);
      if (componentMatch) {
        context.inComponent = true;
        context.functionName = componentMatch[2];
        context.type = 'component';
        break;
      }
      
      // Check for regular function
      const functionMatch = line.match(/^\s*(const|function)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (functionMatch) {
        context.inFunction = true;
        context.functionName = functionMatch[2];
        context.type = 'function';
        break;
      }
    }

    return context;
  }

  /**
   * Analyze cleanup patterns for listeners
   */
  analyzeCleanup(listeners) {
    const cleanupIssues = [];
    const addListeners = listeners.filter(l => l.type === 'add');
    const removeListeners = listeners.filter(l => l.type === 'remove');

    for (const addListener of addListeners) {
      // Look for corresponding removal
      const hasRemoval = removeListeners.some(removeListener => 
        removeListener.object === addListener.object &&
        removeListener.event === addListener.event &&
        removeListener.file === addListener.file
      );

      if (!hasRemoval) {
        // Check if it's in a context that should have cleanup
        if (addListener.context.inUseEffect || 
            addListener.context.inComponent ||
            addListener.context.inHook) {
          
          cleanupIssues.push({
            ...addListener,
            issue: 'missing-cleanup',
            severity: 'error',
            message: `Event listener for '${addListener.event}' on ${addListener.object} lacks cleanup`,
          });
        } else if (addListener.context.type === 'module') {
          cleanupIssues.push({
            ...addListener,
            issue: 'module-level-listener',
            severity: 'error',
            message: `Module-level event listener creates side effects`,
          });
        }
      }
    }

    return cleanupIssues;
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
   * Analyze a single component file
   */
  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const componentName = this.getComponentName(filePath);
      
      const listeners = this.findGlobalListeners(content, filePath);
      const cleanupIssues = this.analyzeCleanup(listeners);
      
      const analysis = {
        component: componentName,
        file: filePath,
        listeners,
        cleanupIssues,
        isAllowed: CONTROLLED_SIDE_EFFECTS_ALLOWED.includes(componentName),
        summary: {
          totalListeners: listeners.length,
          addListeners: listeners.filter(l => l.type === 'add').length,
          removeListeners: listeners.filter(l => l.type === 'remove').length,
          cleanupIssues: cleanupIssues.length,
        },
      };

      return analysis;
    } catch (error) {
      return {
        component: this.getComponentName(filePath),
        file: filePath,
        error: error.message,
        listeners: [],
        cleanupIssues: [],
        isAllowed: false,
        summary: { totalListeners: 0, addListeners: 0, removeListeners: 0, cleanupIssues: 0 },
      };
    }
  }

  /**
   * Analyze all components
   */
  async analyzeComponents() {
    console.log('🔍 Auditing global event listeners...\n');

    const files = this.getComponentFiles();
    
    for (const file of files) {
      const analysis = this.analyzeFile(file);
      this.results.components.push(analysis);
      
      // Collect all listeners
      this.results.listeners.push(...analysis.listeners);
      
      // Collect violations
      if (analysis.cleanupIssues.length > 0 && !analysis.isAllowed) {
        this.results.violations.push(analysis);
      }
      
      // Collect cleanup issues
      this.results.cleanupIssues.push(...analysis.cleanupIssues);
      
      // Log progress
      const statusIcon = analysis.cleanupIssues.length > 0 && !analysis.isAllowed ? '❌' : 
                        analysis.listeners.length > 0 ? '⚠️' : '✅';
      const listenerCount = analysis.listeners.length;
      const issueCount = analysis.cleanupIssues.length;
      
      console.log(
        `${statusIcon} ${analysis.component.padEnd(25)} ${listenerCount} listeners, ${issueCount} issues${analysis.isAllowed ? ' (allowed)' : ''}`
      );
    }
  }

  /**
   * Generate summary report
   */
  generateSummary() {
    const totalComponents = this.results.components.length;
    const componentsWithListeners = this.results.components.filter(c => c.listeners.length > 0).length;
    const componentsWithIssues = this.results.violations.length;
    
    this.results.summary = {
      totalComponents,
      componentsWithListeners,
      componentsWithIssues,
      totalListeners: this.results.listeners.length,
      addListeners: this.results.listeners.filter(l => l.type === 'add').length,
      removeListeners: this.results.listeners.filter(l => l.type === 'remove').length,
      cleanupIssues: this.results.cleanupIssues.length,
    };

    console.log('\n📊 Global Listeners Audit Summary');
    console.log('==================================');
    console.log(`📁 Total components:        ${totalComponents}`);
    console.log(`🎧 Components with listeners: ${componentsWithListeners}`);
    console.log(`❌ Components with issues:   ${componentsWithIssues}`);
    console.log(`📢 Total listeners found:   ${this.results.summary.totalListeners}`);
    console.log(`➕ Add listeners:          ${this.results.summary.addListeners}`);
    console.log(`➖ Remove listeners:       ${this.results.summary.removeListeners}`);
    console.log(`🧹 Cleanup issues:         ${this.results.summary.cleanupIssues}`);

    if (this.results.violations.length > 0) {
      console.log('\n🚨 Components with listener issues:');
      console.log('===================================');
      
      for (const component of this.results.violations) {
        console.log(`\n❌ ${component.component}:`);
        for (const issue of component.cleanupIssues) {
          console.log(`  Line ${issue.line}: ${issue.message}`);
          console.log(`    Event: ${issue.event} on ${issue.object}`);
          console.log(`    Context: ${issue.context.type}${issue.context.functionName ? ` (${issue.context.functionName})` : ''}`);
        }
      }
    }

    // Event type statistics
    const eventTypes = {};
    for (const listener of this.results.listeners) {
      if (listener.type === 'add') {
        eventTypes[listener.event] = (eventTypes[listener.event] || 0) + 1;
      }
    }

    if (Object.keys(eventTypes).length > 0) {
      console.log('\n📊 Most common event types:');
      console.log('===========================');
      const sortedEvents = Object.entries(eventTypes)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
      
      for (const [event, count] of sortedEvents) {
        console.log(`${event.padEnd(20)} ${count} listeners`);
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

    const resultsFile = path.join(outputDir, 'global-listeners-audit.json');
    const report = {
      timestamp: new Date().toISOString(),
      ...this.results,
    };

    fs.writeFileSync(resultsFile, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed audit saved to: ${resultsFile}`);
  }

  /**
   * Run the complete audit
   */
  async run() {
    console.log('⚡ Global Listeners Auditor');
    console.log('===========================\n');

    await this.analyzeComponents();
    this.generateSummary();
    this.saveResults();

    // Exit with appropriate code for CI
    if (this.results.violations.length > 0) {
      console.log('\n💥 Global listeners audit FAILED - cleanup issues found');
      process.exit(1);
    } else if (this.results.summary.cleanupIssues > 0) {
      console.log('\n⚠️  Global listeners audit PASSED with warnings');
      process.exit(0);
    } else {
      console.log('\n🎉 Global listeners audit PASSED - all listeners properly managed');
      process.exit(0);
    }
  }
}

// Run the auditor
const auditor = new GlobalListenersAuditor();
auditor.run().catch(error => {
  console.error('Global listeners audit failed:', error);
  process.exit(1);
});