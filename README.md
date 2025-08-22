# Bolt ⚡

Modern React component library with server-first architecture, built for Next.js and performance.

[![npm version](https://badge.fury.io/js/bolt.svg)](https://badge.fury.io/js/bolt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-Supported-green.svg)](https://webpack.js.org/guides/tree-shaking/)

## Features

- 🚀 **Server-First Architecture**: SSR/RSC compatible components
- 🌳 **Tree-Shaking Ready**: Import only what you need
- 📱 **Responsive Design**: Mobile-first approach
- ♿ **Accessibility First**: Built with React Aria Components
- 🎨 **Design Tokens**: Consistent theming system
- 🔧 **TypeScript**: Full type safety out of the box
- ⚡ **Performance**: Zero-runtime CSS with vanilla-extract
- 🧪 **Well Tested**: Comprehensive test coverage with Vitest

## Installation

```bash
# npm
npm install bolt

# pnpm
pnpm add bolt

# yarn
yarn add bolt
```

### Peer Dependencies

```bash
npm install react react-dom
```

## Quick Start

```tsx
import { Button, Modal, ThemeProvider } from 'bolt';

export default function App() {
  return (
    <ThemeProvider>
      <Button variant="primary" size="medium">
        Click me!
      </Button>
      
      <Modal>
        <Modal.Trigger asChild>
          <Button>Open Modal</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Welcome to Bolt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This is a modal built with Bolt components.</p>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ThemeProvider>
  );
}
```

## Usage Patterns

### 1. Full Bundle Import (Recommended)

Import all components from the main package with automatic tree-shaking:

```tsx
import { Button, Input, Modal, Card } from 'bolt';
```

**Bundle Impact**: Only the components you actually use will be included in your bundle thanks to ES modules and tree-shaking.

### 2. Granular Imports

For maximum control over bundle size, import components individually:

```tsx
import { Button } from 'bolt/button';
import { Input } from 'bolt/input';
import { Modal } from 'bolt/modal';
```

### 3. Server/Client Component Splitting

Bolt supports Next.js Server Components with surgical client boundaries:

```tsx
// Server Component (default)
import { Button } from 'bolt/button';

// Client Component (when needed)
import { ButtonClient } from 'bolt/button/client';

// Or use the server variant explicitly
import { ButtonServer } from 'bolt/button/server';
```

## Component Categories

### Controls
```tsx
import { 
  Button, 
  IconButton, 
  Checkbox, 
  RadioGroup, 
  Toggle, 
  Link 
} from 'bolt';
```

### Forms
```tsx
import { 
  Input, 
  Textarea, 
  PasswordInput, 
  PinInput, 
  FileUpload, 
  FormField 
} from 'bolt';
```

### Layout
```tsx
import { 
  Container, 
  Flex, 
  Grid, 
  HStack, 
  VStack, 
  Center,
  AspectRatio 
} from 'bolt';
```

### Navigation
```tsx
import { 
  Breadcrumb, 
  Tabs, 
  Pagination, 
  Accordion 
} from 'bolt';
```

### Overlays
```tsx
import { 
  Modal, 
  Drawer, 
  Popover, 
  Tooltip, 
  Menu 
} from 'bolt';
```

### Content
```tsx
import { 
  Avatar, 
  Badge, 
  Code, 
  List, 
  Divider 
} from 'bolt';
```

### Feedback
```tsx
import { 
  Toast, 
  Spinner, 
  Skeleton, 
  Progress 
} from 'bolt';
```

### Typography
```tsx
import { 
  H1, H2, H3, H4, H5, 
  Body1, Body2, Body3, 
  Subtitle, 
  Caption, 
  Overline 
} from 'bolt';
```

## Next.js Integration

### App Router (Recommended)

```tsx
// app/layout.tsx
import { ThemeProvider } from 'bolt';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Server Components

```tsx
// app/page.tsx (Server Component)
import { Container, H1, Button } from 'bolt';

export default function HomePage() {
  return (
    <Container>
      <H1>Welcome to Bolt</H1>
      <Button variant="primary">
        Server-rendered button
      </Button>
    </Container>
  );
}
```

### Client Components

```tsx
'use client';

import { useState } from 'react';
import { Button, Modal } from 'bolt';

export default function ClientComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Modal.Trigger asChild>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Interactive Modal</Modal.Title>
        </Modal.Header>
      </Modal.Content>
    </Modal>
  );
}
```

## Theming

### Using Built-in Themes

```tsx
import { ThemeProvider } from 'bolt';

export default function App() {
  return (
    <ThemeProvider theme="dark">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Server-Side Theme Detection

```tsx
// app/layout.tsx
import { cookies } from 'next/headers';
import { ThemeProvider } from 'bolt';

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';
  
  return (
    <html data-theme={theme}>
      <body>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## TypeScript Support

Bolt is built with TypeScript and provides complete type definitions:

```tsx
import type { ButtonProps, ModalProps } from 'bolt';

// All component props are fully typed
const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

// Granular type imports
import type { ButtonVariant, ButtonSize } from 'bolt/button';
```

## Bundle Size & Performance

### Tree Shaking

Bolt is designed for optimal tree-shaking:

```tsx
// ✅ Good - Only Button code is bundled
import { Button } from 'bolt';

// ✅ Also good - Explicit import
import { Button } from 'bolt/button';

// ❌ Avoid - Could bundle more than needed
import * as Bolt from 'bolt';
```

### Bundle Size Examples

| Import Pattern | Bundle Size | Gzipped |
|---------------|------------|---------|
| `import { Button }` | ~12KB | ~4KB |
| `import { Button, Input, Modal }` | ~28KB | ~9KB |
| Full component set | ~150KB | ~45KB |

### Performance Features

- **Zero-runtime CSS**: Styles are extracted at build time
- **Server-side rendering**: Components work without JavaScript
- **Progressive enhancement**: Interactive features layer on top
- **Deferred hydration**: Heavy components load when needed

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **Node.js**: 18+ for SSR

## Migration Guide

### From Chakra UI

```tsx
// Before (Chakra UI)
import { Button, Box, Text } from '@chakra-ui/react';

// After (Bolt)
import { Button, Container, Body1 } from 'bolt';
```

### From Material-UI

```tsx
// Before (Material-UI)
import { Button, Container, Typography } from '@mui/material';

// After (Bolt)
import { Button, Container, H1 } from 'bolt';
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Pablo Araujo](https://github.com/pabloaraujo)

## Links

- [Documentation](https://bolt-ui.dev)
- [Storybook](https://bolt-ui.dev/storybook)
- [GitHub](https://github.com/pabloaraujo/bolt)
- [npm](https://www.npmjs.com/package/bolt)

---

Built with ⚡ by the Bolt team