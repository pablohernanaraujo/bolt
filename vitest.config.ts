// /vitest.config.ts
// Vitest configuration for React component testing with SSR/RSC support
// Sets up jsdom environment, SSR/RSC test utilities, and comprehensive coverage reporting
// RELEVANT FILES: package.json, test-setup.ts, ssr-test-utils.tsx, rsc-test-utils.tsx

import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  // Plugins for CSS processing
  plugins: [vanillaExtractPlugin()],
  
  test: {
    // Use jsdom for React component testing
    environment: 'jsdom',
    
    // Global setup and teardown
    setupFiles: ['./src/ui/utils/test-setup.ts'],
    
    // Global test utilities (makes expect, describe, it available without imports)
    globals: true,
    
    // File patterns for test discovery
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'src/**/__tests__/**/*.{ts,tsx}'
    ],
    
    // Files to exclude from testing
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'storybook-static',
      '**/*.stories.{ts,tsx}'
    ],
    
    // SSR/RSC specific test configuration
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000',
        resources: 'usable',
        pretendToBeVisual: true,
      },
    },
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules',
        'dist',
        '.next',
        'storybook-static',
        '**/*.stories.{ts,tsx}',
        '**/*.config.{ts,js}',
        '**/*.d.ts',
        '**/types.ts',
        'src/ui/utils/test-setup.ts',
        'src/ui/utils/test-utils.tsx',
        'src/ui/utils/ssr-test-utils.tsx',
        'src/ui/utils/rsc-test-utils.tsx',
        'src/ui/utils/hydration-test-utils.tsx'
      ],
      // Coverage thresholds
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // Test timeout (30 seconds)
    testTimeout: 30000,
    
    // Hooks timeout (10 seconds)
    hookTimeout: 10000,
    
    // Reporter configuration
    reporters: ['default', 'json'],
    
    // Watch mode configuration
    watch: false,
    
    // Pool options for parallel test execution
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        useAtomics: true
      }
    }
  },
  
  // Resolve configuration for path mapping
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/ui': resolve(__dirname, './src/ui'),
      '@/tokens': resolve(__dirname, './src/tokens'),
      '@/theme': resolve(__dirname, './src/theme'),
      '@/icons': resolve(__dirname, './src/icons'),
      '@/i18n': resolve(__dirname, './src/i18n')
    }
  },
  
  // Environment configuration
  define: {
    // Make process.env available in tests
    'process.env': process.env,
    
    // Mock Next.js environment variables
    'process.env.__NEXT_TEST_MODE': JSON.stringify(true),
    
    // SSR/RSC test flags
    'global.__SSR_TEST__': JSON.stringify(true),
    'global.__RSC_TEST__': JSON.stringify(true)
  },
  
  // EsBuild configuration for JSX
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});