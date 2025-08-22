// /performance-budgets.config.js
// Performance budget configuration for component-level KB gzip limits
// Defines maximum bundle sizes per component to prevent bloat
// RELEVANT FILES: package.json, next.config.ts, scripts/check-bundle-size.js

/**
 * Performance Budget Configuration
 * 
 * Each component has a gzipped size budget in KB to ensure optimal performance.
 * These budgets are enforced in CI and during builds.
 * 
 * Budget Guidelines:
 * - Basic components (Button, Badge, etc.): 1-3 KB
 * - Form components: 3-5 KB
 * - Layout components: 2-4 KB  
 * - Complex components (Modal, Menu): 5-8 KB
 * - Data components (Charts, Tables): 8-15 KB
 * - Heavy components with deps: 15-25 KB
 */

export const COMPONENT_BUDGETS = {
  // Basic UI Components (1-3 KB)
  'button': { gzip: 2.5, warning: 2.0 },
  'badge': { gzip: 1.5, warning: 1.2 },
  'avatar': { gzip: 2.0, warning: 1.8 },
  'spinner': { gzip: 1.5, warning: 1.2 },
  'skeleton': { gzip: 2.0, warning: 1.8 },
  'divider': { gzip: 1.0, warning: 0.8 },
  'code': { gzip: 1.5, warning: 1.2 },
  'link': { gzip: 1.5, warning: 1.2 },
  'toggle': { gzip: 2.0, warning: 1.8 },
  'icon-button': { gzip: 2.0, warning: 1.8 },

  // Typography Components (1-2 KB)
  'typography': { gzip: 2.0, warning: 1.8 },

  // Form Components (3-5 KB)
  'input': { gzip: 4.0, warning: 3.5 },
  'textarea': { gzip: 3.5, warning: 3.0 },
  'checkbox': { gzip: 3.0, warning: 2.5 },
  'radio': { gzip: 2.5, warning: 2.0 },
  'radio-group': { gzip: 3.5, warning: 3.0 },
  'form-field': { gzip: 3.0, warning: 2.5 },
  'input-group': { gzip: 4.0, warning: 3.5 },
  'password-input': { gzip: 4.5, warning: 4.0 },
  'password-strength-meter': { gzip: 3.5, warning: 3.0 },
  'pin-input': { gzip: 4.0, warning: 3.5 },
  'file-upload': { gzip: 6.0, warning: 5.0 },

  // Layout Components (2-4 KB)
  'layout': { gzip: 4.0, warning: 3.5 },
  'container': { gzip: 1.5, warning: 1.2 },
  'flex': { gzip: 1.5, warning: 1.2 },
  'grid': { gzip: 2.0, warning: 1.8 },
  'hstack': { gzip: 1.5, warning: 1.2 },
  'vstack': { gzip: 1.5, warning: 1.2 },
  'center': { gzip: 1.0, warning: 0.8 },
  'aspect-ratio': { gzip: 1.5, warning: 1.2 },
  'app-layout': { gzip: 3.5, warning: 3.0 },
  'app-header': { gzip: 3.0, warning: 2.5 },
  'sidebar': { gzip: 3.0, warning: 2.5 },
  'main-content': { gzip: 2.0, warning: 1.8 },
  'content-wrapper': { gzip: 2.0, warning: 1.8 },

  // Navigation Components (3-6 KB)
  'breadcrumb': { gzip: 4.0, warning: 3.5 },
  'tabs': { gzip: 5.0, warning: 4.5 },
  'pagination': { gzip: 5.0, warning: 4.5 },

  // List Components (2-4 KB)
  'list': { gzip: 3.0, warning: 2.5 },

  // Overlay Components (5-8 KB)
  'modal': { gzip: 7.0, warning: 6.0 },
  'drawer': { gzip: 6.5, warning: 5.5 },
  'popover': { gzip: 6.0, warning: 5.0 },
  'tooltip': { gzip: 4.0, warning: 3.5 },
  'menu': { gzip: 7.0, warning: 6.0 },

  // Interactive Components (4-6 KB)
  'accordion': { gzip: 5.0, warning: 4.5 },
  'theme-toggle': { gzip: 4.0, warning: 3.5 },
  'theme-provider': { gzip: 4.0, warning: 3.5 },

  // Feedback Components (3-5 KB)
  'toast': { gzip: 5.0, warning: 4.5 },
  'progress': { gzip: 3.5, warning: 3.0 },

  // Data Components (8-15 KB)
  'chart': { gzip: 12.0, warning: 10.0 },

  // Translation/Utilities (1-3 KB)
  'translation': { gzip: 2.0, warning: 1.8 },
  'progressive-enhancement': { gzip: 3.0, warning: 2.5 },
  'deferred-hydration': { gzip: 2.5, warning: 2.0 },
};

/**
 * Global budget limits for entire bundle
 */
export const GLOBAL_BUDGETS = {
  // Total JS bundle (gzipped)
  totalJS: { gzip: 150, warning: 120 },
  
  // Total CSS bundle (gzipped) 
  totalCSS: { gzip: 30, warning: 25 },
  
  // Initial page load budget
  initialLoad: { gzip: 50, warning: 40 },
  
  // Route-specific budgets
  routes: {
    '/': { gzip: 50, warning: 40 },
    '/components/*': { gzip: 80, warning: 70 },
  }
};

/**
 * Critical CSS components that should be inlined
 * These components' styles are essential for above-the-fold content
 */
export const CRITICAL_CSS_COMPONENTS = [
  'typography',
  'container', 
  'flex',
  'grid',
  'button',
  'link',
  'app-layout',
  'app-header',
];

/**
 * Components that should never have global side effects
 * These must be pure and safe to import without execution
 */
export const SIDE_EFFECT_FREE_COMPONENTS = [
  'button',
  'badge', 
  'avatar',
  'typography',
  'link',
  'divider',
  'container',
  'flex',
  'grid',
  'hstack',
  'vstack',
  'center',
  'code',
  'spinner',
  'skeleton',
  'list',
  'icon-button',
];

/**
 * Components allowed to have controlled side effects
 * These can register global listeners but must clean up properly
 */
export const CONTROLLED_SIDE_EFFECTS_ALLOWED = [
  'theme-toggle',
  'theme-provider',
  'modal',
  'drawer',
  'popover',
  'tooltip',
  'toast',
  'menu',
  'progressive-enhancement',
  'deferred-hydration',
];

/**
 * Bundle analysis configuration
 */
export const ANALYSIS_CONFIG = {
  // Files to analyze
  entryPoints: [
    'src/ui/index.ts',
    ...Object.keys(COMPONENT_BUDGETS).map(component => `src/ui/${component}/index.ts`)
  ],
  
  // Output directory for analysis reports
  outputDir: 'performance-reports',
  
  // Include source maps in analysis
  includeSourceMaps: true,
  
  // Threshold for warnings in CI
  warningThreshold: 0.8, // 80% of budget
  
  // Threshold for errors in CI  
  errorThreshold: 1.0, // 100% of budget
  
  // Historical tracking
  trackHistory: true,
  historyFile: 'performance-reports/bundle-history.json',
};

export default {
  COMPONENT_BUDGETS,
  GLOBAL_BUDGETS,
  CRITICAL_CSS_COMPONENTS,
  SIDE_EFFECT_FREE_COMPONENTS,
  CONTROLLED_SIDE_EFFECTS_ALLOWED,
  ANALYSIS_CONFIG,
};