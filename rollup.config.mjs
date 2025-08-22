// /rollup.config.mjs
// Rollup configuration for building the Bolt design system library
// Handles TypeScript, React, and vanilla-extract CSS compilation
// RELEVANT FILES: package.json, tsconfig.lib.json, src/ui/index.ts

import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get exports configuration
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// Generate input entries from package.json exports
function generateInputs() {
  const inputs = {
    index: 'src/ui/index.ts',
  };

  // Process each export entry from package.json
  Object.entries(packageJson.exports).forEach(([key, value]) => {
    if (key === '.') return; // Skip the main entry point
    
    // Extract the component path from the export path
    const componentName = key.substring(2); // Remove './' prefix
    
    // Map to source file path
    if (componentName.includes('/')) {
      // Handle sub-exports like button/server, button/client
      const [component, variant] = componentName.split('/');
      inputs[`ui/${component}/${component}-${variant}`] = `src/ui/${component}/${component}-${variant}.tsx`;
    } else {
      // Handle main component exports
      inputs[`ui/${componentName}/index`] = `src/ui/${componentName}/index.ts`;
    }
  });

  // Add token and theme exports
  inputs['tokens/index'] = 'src/tokens/index.ts';
  inputs['theme/index'] = 'src/theme/index.ts';
  inputs['icons/index'] = 'src/icons/index.tsx';

  return inputs;
}

// Common plugins for all builds
const commonPlugins = [
  // Mark peer dependencies as external
  peerDepsExternal(),
  
  // Resolve node modules
  resolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    preferBuiltins: false,
  }),
  
  // Handle CommonJS dependencies
  commonjs(),
  
  // Handle vanilla-extract CSS
  vanillaExtractPlugin({
    identifiers: 'short',
  }),
  
];

// ESM build configuration
const esmConfig = defineConfig({
  input: generateInputs(),
  
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
    // Preserve the 'use client' directive in the output
    banner: (chunk) => {
      if (chunk.fileName.includes('-client')) {
        return "'use client';";
      }
      return '';
    },
  },
  
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'next',
    'next/link',
    'next/image',
    'next/navigation',
    'next/headers',
    '@vanilla-extract/css',
    '@vanilla-extract/recipes',
    'react-aria-components',
    'lucide-react',
    'clsx',
  ],
  
  plugins: [
    ...commonPlugins,
    
    // TypeScript compilation
    typescript({
      tsconfig: './tsconfig.lib.json',
      declaration: true,
      declarationDir: './dist',
      exclude: [
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/*.stories.tsx',
        '**/__tests__/**',
      ],
      // Handle TypeScript errors more gracefully
      noEmitOnError: false,
      // Handle JSX properly
      jsx: 'react-jsx',
    }),
  ],
  
  // Suppress warnings for 'use client' directives
  onwarn(warning, warn) {
    // Ignore warnings about 'use client' directive
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
      return;
    }
    // Ignore circular dependency warnings for now
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    warn(warning);
  },
});

// Minified production build
const prodConfig = defineConfig({
  ...esmConfig,
  
  output: {
    ...esmConfig.output,
    dir: 'dist-min',
    sourcemap: false,
  },
  
  plugins: [
    ...esmConfig.plugins,
    
    // Minify the output
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
      format: {
        comments: false,
      },
    }),
  ],
});

// Export both configurations (you can choose which one to build)
export default [esmConfig];