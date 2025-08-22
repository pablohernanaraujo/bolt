# Bolt Design System - Tree-shaking & RSC Guide

## Overview

Bolt Design System is optimized for **maximum tree-shaking** and **React Server Components (RSC)** compatibility. The library supports both granular component imports and full library imports with zero runtime overhead for unused components.

## Tree-shaking Configuration

### Package Configuration

- ✅ **ESM-first**: `"type": "module"` in package.json
- ✅ **No side effects**: `"sideEffects": false` enables aggressive tree-shaking
- ✅ **Granular exports**: Each component has its own export path
- ✅ **TypeScript declarations**: `.d.ts` files for every component

### Import Strategies

#### 1. Granular Imports (Recommended)

Import only the components you need for optimal bundle size:

```javascript
// ✅ Only Button and its dependencies are bundled
import { Button } from 'bolt-design-system/button';

// ✅ Only Avatar component
import { Avatar } from 'bolt-design-system/avatar';

// ✅ Layout components
import { Flex, HStack, VStack } from 'bolt-design-system/layout';

// ✅ Form components
import { Input } from 'bolt-design-system/input';
import { Checkbox } from 'bolt-design-system/checkbox';
```

#### 2. Barrel Imports (Convenience)

Use for prototyping or when you need many components:

```javascript
// ✅ Tree-shaking still works with modern bundlers
import { Button, Avatar, Input } from 'bolt-design-system';

// ❌ Avoid importing everything
import * as BoltDS from 'bolt-design-system';
```

## Available Granular Exports

All UI components support granular imports:

```javascript
// Core Components
import { Button } from 'bolt-design-system/button';
import { IconButton } from 'bolt-design-system/icon-button';
import { Badge } from 'bolt-design-system/badge';
import { Avatar } from 'bolt-design-system/avatar';

// Form Components
import { Input } from 'bolt-design-system/input';
import { Checkbox } from 'bolt-design-system/checkbox';
import { RadioGroup } from 'bolt-design-system/radio-group';
import { Toggle } from 'bolt-design-system/toggle';

// Layout Components
import { Flex, HStack, VStack, Grid } from 'bolt-design-system/layout';

// Navigation Components
import { Tabs } from 'bolt-design-system/tabs';
import { Menu } from 'bolt-design-system/menu';
import { Breadcrumb } from 'bolt-design-system/breadcrumb';

// Overlays
import { Modal } from 'bolt-design-system/modal';
import { Tooltip } from 'bolt-design-system/tooltip';
import { Popover } from 'bolt-design-system/popover';

// And many more...
```

## RSC (React Server Components) Compatibility

### Server-First Architecture

Bolt components are designed with server-first architecture:

- ✅ **Server-safe by default**: No browser APIs at module level
- ✅ **Zero hydration overhead**: Most components work without JavaScript
- ✅ **Progressive enhancement**: Interactive features enhance server-rendered HTML

### Usage in RSC

```javascript
// ✅ Works in Server Components
import { Button } from 'bolt-design-system/button';
import { Typography } from 'bolt-design-system/typography';

export default function ServerPage() {
  return (
    <div>
      <Typography variant="h1">Server-rendered title</Typography>
      <Button variant="primary">Server-rendered button</Button>
    </div>
  );
}
```

### Client Component Boundaries

Some components require client-side JavaScript:

```javascript
// pages/client-page.tsx
'use client';

import { ThemeToggle } from 'bolt-design-system/theme-toggle';
import { Modal } from 'bolt-design-system/modal';

export default function ClientPage() {
  return (
    <div>
      <ThemeToggle />
      <Modal>Interactive content</Modal>
    </div>
  );
}
```

## Bundle Analysis

### Webpack Bundle Analyzer

To verify tree-shaking is working:

```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Build and analyze
npm run build
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

### Expected Results

With proper tree-shaking:

- 📦 **Button only**: ~15KB (including React Aria base)
- 📦 **Avatar + Button**: ~18KB (shared dependencies deduplicated)
- 📦 **Full barrel import**: Only used components included

## Best Practices

### ✅ Do

```javascript
// Granular imports for production
import { Button } from 'bolt-design-system/button';
import { Input } from 'bolt-design-system/input';

// Server-safe components in RSC
import { Typography } from 'bolt-design-system/typography';
```

### ❌ Don't

```javascript
// Don't import entire library
import * as BoltDS from 'bolt-design-system';

// Don't use deep imports
import { Button } from 'bolt-design-system/dist/ui/button/button';
```

## Bundler Compatibility

Tested and optimized for:

- ✅ **Next.js 15** (App Router + RSC)
- ✅ **Vite 5**
- ✅ **Webpack 5**
- ✅ **Rollup**
- ✅ **esbuild**

## TypeScript Support

Full TypeScript support with per-component type definitions:

```typescript
import type { ButtonProps } from 'bolt-design-system/button';
import type { AvatarProps } from 'bolt-design-system/avatar';

// Types are automatically inferred
const MyButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} />
);
```

## Build Output

The library generates:

```
dist/
├── index.js              # Main entry point
├── index.d.ts            # Main types
├── ui/
│   ├── button/
│   │   ├── index.js      # Button component
│   │   └── index.d.ts    # Button types
│   └── avatar/
│       ├── index.js      # Avatar component
│       └── index.d.ts    # Avatar types
├── tokens/               # Design tokens
└── theme/                # Theme utilities
```

Each component is compiled to ES modules with source maps and TypeScript declarations for optimal development experience and bundle optimization.
