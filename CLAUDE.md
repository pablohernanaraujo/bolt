# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a design system project built with Next.js 15, React 19, and TypeScript. The project is structured to support a comprehensive design system with dedicated directories for UI components, design tokens, themes, and icons.

## Package Manager

This project uses **pnpm** as the default package manager. Always use pnpm commands instead of npm.

## Development Commands

- `pnpm dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check if code is formatted correctly
- `pnpm test` - Run all tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report

## Project Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layout
- `src/ui/` - Reusable UI components (currently empty, ready for component development)
- `src/tokens/` - Design tokens (colors, spacing, typography, etc.)
- `src/theme/` - Theme configuration and utilities
- `src/icons/` - Icon components and assets
- `public/` - Static assets (SVG files, favicon)

### Key Configuration

- **TypeScript**: Configured with strict mode and path mapping (`@/*` → `./src/*`)
- **ESLint**: Comprehensive setup with TypeScript, React Hooks, Prettier integration, import sorting, and Unicorn rules for code quality
- **Prettier**: Code formatting with single quotes, semicolons, and trailing commas
- **Next.js**: App Router with Turbopack for fast development, Geist fonts configured

### Design System Structure

This project appears to be set up as a design system with the following intended structure:

- UI components in `src/ui/`
- Design tokens centralized in `src/tokens/`
- Theme system in `src/theme/`
- Icon library in `src/icons/`

When adding components, follow the design system pattern with tokens and theme integration.

## Development Guidelines

### Server-First Architecture Philosophy

**IMPORTANT: This project follows a server-first architecture with surgical client boundaries**

#### Core Principles

1. **Server-first by default**: Every component should render on the server unless it absolutely requires client-side JavaScript
2. **Surgical client boundaries**: Use "use client" only in files that truly need interactivity (buttons with onClick, modals with dynamic behavior, etc.)
3. **Headless + presentational separation**: Separate interactive logic from presentation to maximize server compatibility

#### Implementation Patterns

**✅ Good - Server-compatible component:**

```tsx
// button/button.tsx (NO "use client" directive)
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, ...props }, ref) => (
    <AriaButton ref={ref} className={buildClassName(variant, size)} {...props}>
      {children}
    </AriaButton>
  ),
);
```

**✅ Good - Surgical client boundary:**

```tsx
// theme-toggle/theme-toggle.tsx
'use client'; // Only this specific component needs client-side JS

export const ThemeToggle = ({ initialTheme }) => {
  const [theme, setTheme] = useState(initialTheme);
  // ... interactive logic
};
```

**❌ Bad - Broad client boundary:**

```tsx
// layout-client.tsx
'use client'; // Entire layout becomes client-side unnecessarily

export const Layout = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return <div>{children}</div>; // Most of this could be server-rendered
};
```

#### Component Splitting Strategy

For components that need both server compatibility and client interactivity:

1. **Create `component-server.tsx`**: Server-compatible structure and presentation
2. **Create `component-client.tsx`**: Client-only interactive parts with "use client"
3. **Main `component.tsx`**: Re-exports server components as default API

**Example: Modal component structure**

```
modal/
  modal.tsx           # Main API - re-exports server components
  modal-server.tsx    # Server-compatible modal structure
  modal-client.tsx    # Client-only close button and scroll lock
  types.ts           # Shared types
  helpers.ts         # Utility functions
```

### Progressive Enhancement & Minimal Interactivity

**CORE PRINCIPLE: Zero JavaScript where not needed, progressive enhancement where beneficial**

#### Minimal Interactivity Philosophy

1. **Cero JS donde no hace falta**: Pure presentation components (Links, Typography, Layouts, Cards) should render completely on the server
2. **Hidratación diferida**: Heavy components (charts, data tables, complex forms) should use deferred hydration
3. **Accesibilidad SSR**: All accessibility attributes (ARIA, roles, labels) must be complete in server-rendered HTML

#### Implementation Patterns

**✅ Pure Server Components (Zero JavaScript)**

```tsx
// ✅ Typography components - Pure server rendering
export const H1 = ({ children, ...props }) => (
  <h1 className={styles.h1} {...props}>
    {children}
  </h1>
);

// ✅ Link components - Server-compatible with NextLink
export const Link = ({ href, children, ...props }) => (
  <NextLink href={href} className={styles.link} {...props}>
    {children}
  </NextLink>
);

// ✅ Layout components - Pure CSS layout
export const Container = ({ children, paddingY, ...props }) => (
  <div className={buildContainerClass(paddingY)} {...props}>
    {children}
  </div>
);
```

**✅ Progressive Enhancement Pattern**

```tsx
// theme-toggle/theme-toggle-progressive.tsx
'use client';

export const ThemeToggleProgressive = ({ initialTheme }) => {
  // 1. Start with functional form (works without JS)
  // 2. Enhance with JavaScript for better UX
  // 3. Fall back gracefully if JS fails

  return (
    <form method="POST" action="/api/theme">
      <input type="hidden" name="theme" value={nextTheme} />
      <Button type="submit">Toggle Theme</Button>
    </form>
  );
};
```

**✅ Deferred Hydration for Heavy Components**

```tsx
// chart/chart-deferred.tsx
import { DeferredHydration } from '@/ui/utils/deferred-hydration';
import { ChartSkeleton } from './chart-skeleton';

export const Chart = ({ data, ...props }) => (
  <DeferredHydration
    fallback={<ChartSkeleton />}
    enhancementOptions={ENHANCEMENT_CONFIGS.HEAVY_COMPONENT}
    observerConfig={{ rootMargin: '100px' }}
  >
    <HeavyChartComponent data={data} {...props} />
  </DeferredHydration>
);
```

#### Deferred Hydration Utilities

The design system provides utilities for progressive enhancement:

**Available Utilities:**

- `DeferredHydration` - Wrapper for intersection-based loading
- `createDeferredComponent` - HOC for dynamic imports with deferred hydration
- `withDeferredHydration` - HOC for existing components
- `useDeferredHydration` - Hook for manual hydration control

**When to Use Deferred Hydration:**

- Charts and data visualizations
- Large data tables with sorting/filtering
- Complex forms with validation
- Media players and interactive widgets
- Any component that imports heavy libraries

**Configuration Examples:**

```tsx
// Heavy components (charts, tables)
enhancementOptions: ENHANCEMENT_CONFIGS.HEAVY_COMPONENT
observerConfig: { rootMargin: '100px', threshold: 0.1 }

// Interactive overlays (modals, dropdowns)
enhancementOptions: ENHANCEMENT_CONFIGS.INTERACTIVE_OVERLAY
observerConfig: { rootMargin: '0px', threshold: 0.5 }

// Form enhancements
enhancementOptions: ENHANCEMENT_CONFIGS.FORM_ENHANCEMENT
observerConfig: { rootMargin: '50px', threshold: 0.3 }
```

#### Server-Side Accessibility

All components must render complete accessibility attributes on the server:

```tsx
// ✅ Complete ARIA attributes server-side
export const Button = ({ variant, children, ...props }) => (
  <button
    className={styles.button}
    role="button"
    aria-label={getAriaLabel(variant, children)}
    tabIndex={0}
    {...props}
  >
    {children}
  </button>
);

// ✅ Semantic HTML structure
export const Modal = ({ title, children, ...props }) => (
  <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">{title}</h2>
    <div role="document">{children}</div>
  </div>
);
```

#### Performance Guidelines

1. **Measure First**: Use Chrome DevTools to identify actually slow components
2. **Progressive Loading**: Use `next/dynamic` for heavy imports
3. **Intersection Observer**: Load components when they become visible
4. **Respect User Preferences**: Honor `prefers-reduced-motion` and data-saver modes
5. **Graceful Degradation**: Ensure functionality works without JavaScript

### Adding New Components

1. Create component in `src/ui/component-name/`
2. Follow the standardized component file structure (see Component File Structure section)
3. **Start with server-compatible implementation** - no "use client" unless absolutely necessary
4. If interactivity is needed, split into server/client components
5. Add styles in `component-name.css.ts` using vanilla-extract
6. Export from `src/ui/component-name/index.ts`
7. Export from ui `src/ui/index.ts`
8. Create stories in Storybook for testing
9. Add to app for documentation

### Component File Structure

**IMPORTANT: All components MUST follow this standardized file structure**

Each component should be organized in its own directory with the following files:

```
src/ui/component-name/
  component-name.css.ts    # Styles using vanilla-extract
  component-name.tsx       # Main component implementation
  types.ts                 # Type definitions and interfaces
  index.ts                 # Export all from folder (barrel export)
  helpers.ts               # Utility functions and helpers (optional)
  __tests__/               # Test files directory
    component-name.test.tsx
```

**File Responsibilities:**

- **`component-name.tsx`**: Main component implementation with proper header comments
- **`types.ts`**: All TypeScript interfaces, types, and enums for the component
- **`index.ts`**: Barrel export file that exports the component and its types
- **`helpers.ts`**: Utility functions, className builders, or other component-specific helpers
- **`component-name.css.ts`**: All styling using vanilla-extract with design tokens

**When to create helpers.ts:**

- When you have className composition logic
- When you have utility functions specific to the component
- When you have data transformation or validation logic
- When the main component file would exceed 120 lines

**Export Pattern:**

```typescript
// ✅ Good - index.ts barrel export
export { ComponentName } from './component-name';
export type { ComponentNameProps } from './types';
export { helperFunction } from './helpers';

// ✅ Good - types.ts
export interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

// ✅ Good - helpers.ts
export const buildClassName = (variant: string, size: string): string => {
  return `${styles.base} ${styles.variants[variant]} ${styles.sizes[size]}`;
};
```

### Headless + Presentational Component Patterns

#### Pattern 1: Simple Server-Compatible Components

For components that don't need client-side state (Button, Avatar, Typography):

```tsx
// button/button.tsx (NO "use client")
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, className, ...props }, ref) => (
    <AriaButton
      ref={ref}
      className={buildButtonClassName(variant, size, className)}
      {...props}
    >
      {children}
    </AriaButton>
  ),
);
```

#### Pattern 2: Split Server/Client Architecture

For components needing both structure and interactivity (Modal, Dropdown):

**Server Component (Structure + Presentation):**

```tsx
// modal/modal-server.tsx (NO "use client")
export const ModalServer = ({ size, children, ...props }) => (
  <ModalOverlay className={styles.overlay} {...props}>
    <AriaModal>
      <Dialog className={buildModalClassName(size)}>{children}</Dialog>
    </AriaModal>
  </ModalOverlay>
);
```

**Client Component (Interactivity Only):**

```tsx
// modal/modal-client.tsx
'use client';

export const ModalCloseButton = () => {
  return (
    <AriaButton className={styles.closeButton} slot="close">
      <Icon icon={X} />
    </AriaButton>
  );
};
```

**Main API (Re-exports Server as Default):**

```tsx
// modal/modal.tsx
export {
  ModalServer as Modal, // Default server-compatible
  ModalTriggerServer as ModalTrigger,
} from './modal-server';

export {
  ModalCloseButton, // Client components when needed
  useModalScrollLock,
} from './modal-client';
```

#### Pattern 3: Server-Side Theme Detection

Replace client-side theme detection with server-compatible patterns:

**❌ Avoid:**

```tsx
'use client';
const [theme, setTheme] = useState('light');

useEffect(() => {
  const detectTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    setTheme(theme);
  };
  detectTheme();
}, []);
```

**✅ Prefer:**

```tsx
// theme/server-theme.ts (Server-compatible)
export async function getServerTheme(): Promise<ThemeVariant> {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value || 'light';
}

// Component uses server-detected theme
export const Layout = async ({ children }) => {
  const theme = await getServerTheme();
  return <div className={getThemeClassName(theme)}>{children}</div>;
};
```

### Theme Development

- Themes are defined in `src/theme/`
- **Server-side theme detection** using cookies and headers in `src/theme/server-theme.ts`
- Theme switching via CSS-only data attributes and CSS variables
- Client-side JavaScript only for theme toggle interaction, not detection

### Accessibility

- All components use React Aria Components as base
- Full keyboard navigation support
- ARIA attributes handled automatically
- Focus management built-in

### Performance

- Zero-runtime CSS with vanilla-extract
- Tree-shakeable component exports
- Optimized builds with Turborepo caching
- RSC/SSR support in Next.js app

### File and Directory Naming Conventions

**IMPORTANT: All files AND directories MUST use kebab-case naming**

- ✅ **Always use kebab-case**: Only lowercase letters `[a-z]`, hyphens `-`, and dots `.`
- ✅ **ESLint enforced**: The `unicorn/filename-case` rule automatically checks this
- ✅ **Applies to**: Files, directories, component folders, package folders
- ✅ **Extensions**: `.tsx` for React components, `.ts` for TypeScript, `.css.ts` for vanilla-extract

**Examples from this project:**

```
✅ Good - kebab-case (Files AND Directories)
user-profile.tsx
theme-toggle.tsx
button.css.ts
design-tokens.ts
react-library.json

# Directories
packages/ui/src/components/theme-toggle/
packages/config/eslint-config/
apps/web/src/components/user-profile/

❌ Bad - other cases
userProfile.tsx          # PascalCase file
UserProfile.tsx          # PascalCase file
user_profile.tsx         # snake_case file
userprofile.tsx          # no separators

# Bad directories
components/UserProfile/   # PascalCase directory
components/user_profile/  # snake_case directory
components/userProfile/   # camelCase directory
```

**Component Files Structure:**

```
packages/ui/src/components/
  button/                    # kebab-case directory
    index.tsx               # Main component
    button.css.ts           # kebab-case styles file
  theme-toggle/             # kebab-case directory
    index.tsx
    theme-toggle.css.ts     # kebab-case styles file
  data-table/               # kebab-case directory
    index.tsx
    data-table.css.ts
    data-table.stories.tsx  # kebab-case stories file
```

**Special Cases:**

- Config files: `turbo.json`, `tsconfig.json` (follow tool conventions)
- Tests: `component-name.test.tsx` in `__tests__/` directory
- Stories: `component-name.stories.tsx` for Storybook

# IMPORTANT

- Always prioritize writing clean, simple and modular code.
- Use simple & easy-to-understand language. Write in short sentences.
- DO NOT BE LAZY! Always read files IN FULL!!.

# COMMENTS

- Write lots of comments in your code. Explain exactly what you are doing in your comments.
- But be strategic, do not explain obvios syntax instead explain your thought process at the time of writing the code!.
- NEVER delete explanatory comments from the code you're editing ( unless they are wrong / obsolete ).
- Focus on explaining the non-obvious stuff in the comments, the nuances / details.
- DO NOT delete comments currently in our code. If the comment is obsolete, or wrong, then update it - but NEVER mindless remove comments without reason.

# HEADER COMMENTS

- EVERY file HAS TO start with 4 lines of comments!
  1 exact file location in codebase
  2 clear description of what this file does
  3 clear description of WHY this file exists
  4 RELEVANT FILES: comma-separated list 2-4 most relevant files
- NEVER dele these "header comments" from the files you're editing.

## Code Style Guide

### React Components

- **Import Style**: Use direct imports instead of default React import

  ```typescript
  // ✅ Preferred
  import { useState, type FC } from 'react';

  // ❌ Avoid
  import React, { useState } from 'react';
  ```

- **Component Definition**: Use `FC` (FunctionComponent) with explicit type parameters

  ```typescript
  // ✅ Preferred
  const MyComponent: FC<{ title: string; optional?: boolean }> = ({ title, optional = false }) => (
    <div>{title}</div>
  );

  // ❌ Avoid React.FC
  const MyComponent: React.FC<Props> = ({ title }) => { ... };
  ```

- **Function Return Types**: Always specify return types for functions

  ```typescript
  // ✅ Preferred
  const handleClick = (): void => {
    setCount(prev => prev + 1);
  };

  // ❌ Avoid missing return types
  const handleClick = () => { ... };
  ```

- **React Component Return Types**: Use `ReactElement` instead of `JSX.Element`

  ```typescript
  // ✅ Preferred
  import { type ReactElement } from "react";

  const MyComponent = (): ReactElement => <div>Content</div>;

  const MyComponentForward = forwardRef<HTMLDivElement, Props>(
    (props, ref): ReactElement => (
      <div ref={ref} {...props}>
        Content
      </div>
    )
  );

  // ❌ Avoid JSX.Element
  const MyComponent = (): JSX.Element => <div>Content</div>;
  ```

  ### TypeScript

- **Type Imports**: Use `type` keyword for type-only imports

  ```typescript
  import { type FC, useState } from 'react';
  import type { NextConfig } from 'next';
  ```

- **Function Components**: Prefer arrow functions with explicit return for simple components

  ```typescript
  // ✅ Preferred for simple components
  const Page: FC = () => <div>Content</div>;

  // ✅ Use block syntax for complex logic
  const Complex: FC = () => {
    const [state, setState] = useState(0);
    // logic here
    return <div>{state}</div>;
  };
  ```

  ## Comprehensive Style Guide

### Fundamentals

**Clarity at the point of use is the most important goal**

- Entities like methods and properties are declared once but used repeatedly
- Create methods/properties so usage is clear and concise
- Always examine use cases to ensure clarity in context
- Clarity is more important than brevity

**Promote clear usage**

- Include all necessary words to avoid ambiguity
- Omit needless words - every word should convey salient information
- Prefer method/function names that form grammatical English phrases at use sites

**Use terminology well**

- Avoid obscure terms if common words convey the same meaning
- Technical terms are essential communication tools but only use them to capture crucial meaning
- Avoid abbreviations - they are effectively technical terms requiring translation

### File Organization

**Things that change together should stay together**

- Components and type definitions should remain in the same file
- If file exceeds 120 lines, create new components (e.g., extract Avatar from UserProfile)

### File Naming

- **Use kebab-case**: Only lowercase English letters `[a-z]`, hyphens `-`, and dots `.`
- **Extensions**: `.tsx` for React components, `.ts` for other TypeScript code
- **Tests**: Include `.test` after module name in `__tests__` directory at same level

```typescript
// ❌ Bad
userProfile.tsx;
CardScreen.tsx / foo / bar / user - profile.test.tsx;

// ✅ Good
user - profile.tsx;
card - screen.tsx / foo / bar / __tests__ / user - profile.test.tsx;
```

### Testing

**Test behavior, not implementation**

- Test from user perspective - users care about visible loading indicators, not boolean flags
- Trigger callbacks through user interactions, not manual calls
- Use Arrange-Act-Assert (AAA) pattern with comment blocks:

```typescript
it("Should render loading after user tap submit", async () => {
  // arrange
  const renderResult = render(<SomeScreen />);

  // act
  fireEvent.press(renderResult.getByA11yLabel("submit"));

  // assert
  expect(renderResult.getByA11yLabel("loading")).not.toBeNull();
});
```

### Naming Conventions

**Constructors/React Components**: PascalCase

```typescript
// ✅ Good
class Application {}
const Avatar = ({ user }) => <img src={user.avatarUrl} />;
```

**Methods/Functions/Variables/Object Attributes**: camelCase

```typescript
// ✅ Good
const getUserPosts = () => {};
user.avatarUrl = '';
```

**No abbreviations**

```typescript
// ❌ Bad
const n = '';
const nErr = '';
const cstmrId = '';

// ✅ Good
const priceCountReader = '';
const numErrors = '';
const numDnsConnections = '';
```

**React Components use nouns** - components are things, not actions

```typescript
// ❌ Bad
const RenderAvatar = () => null;

// ✅ Good
const Avatar = () => null;
```

**Capitalize constant values**

```typescript
// ✅ Good
const HOURS_IN_DAY = 24;
```

### TypeScript Conventions

**Interfaces/Types**: PascalCase names, camelCase members

```typescript
// ✅ Good
interface Foo {
  someMember: string;
}
```

**Component Props Types**: Use `ComponentNameProps` format for component type definitions

```typescript
// ✅ Good - Component props naming
interface ProductCardProps {
  title: string;
  price: number;
  isOnSale?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  title,
  price,
  isOnSale = false,
}) => (
  <div>
    {title} - ${price}
  </div>
);

// ❌ Bad - Generic or unclear naming
interface Props {
  title: string;
}

interface ProductCard {
  title: string;
}
```

**Enums**: PascalCase for names and members

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

**Null vs Undefined**

- Prefer not using either for implicit unavailability
- Use `undefined` in general
- Use truthy/falsy checks: `if (!error) {}`

### Choosing Better Names

**Use meaningful names**

```typescript
// ❌ Bad
const getUserData = ...
const getUserInfo = ...

// ✅ Good
const getUserProfile = ...
```

**Favor descriptive over concise when in doubt**

```typescript
// ✅ Good
const findUserByNameOrEmail = ...
const setUserStatusAsApproved = ...
```

**Use consistent verbs per concept**

- Standard CRUD operations: create, get, set, add, remove, delete
- Maintain consistency across codebase

**Create booleans that read well in if-then statements**

```typescript
// ❌ Bad
if (car.sedan) {
}

// ✅ Good
if (car.isSedan) {
}
```

**TestIDs CANNOT be repeated on the same screen**

### Component Structure

```
component-folder/
  index.ts              # Export all from folder
  component.tsx         # Main component implementation
  types.ts             # Type definitions and interfaces
  base.tsx (optional)  # Base component if needed
  hooks.ts/tsx (optional) # Custom hooks
  __tests__/           # Test files directory
    component.test.tsx # Component tests
```

**Import/Export from index.ts**

```typescript
// ✅ Good
export { Component } from './component';
export type { ComponentProps } from './component';
```

**Component folder naming**: Use kebab-case for folders

```typescript
// ✅ Good folder structure
src / toggles / index.ts;
theme - toggle.tsx;
types.ts;
__tests__ / theme - toggle.test.tsx;

cards / index.ts;
product - card.tsx;
types.ts;
__tests__ / product - card.test.tsx;

theme / index.ts;
theme - provider.tsx;
theme - tokens.ts;
use - theme.ts;
types.ts;
theme.css;
```

**Use relative imports for immediate parent directory**

```typescript
import { objectKeys } from '..';
```

### Union Types for Constants

Define strict union types for constrained values:

```typescript
// ✅ Good
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// ❌ Bad - too permissive
const [theme, setTheme] = useState<string>('light');
```

## Shared Package Usage Conventions

### Import Patterns

Use consistent import patterns for shared packages:

```typescript
// ✅ Good - Shared UI components
import { ThemeToggle } from '@repo/ui/theme-toggle';
import { Card } from '@repo/ui/card';
import { Button } from '@repo/ui/button';

// ✅ Good - Next.js Image imports
import Image from 'next/image';

// ✅ Good - Type-only imports
import { type FC } from 'react';
import type { Config } from 'tailwindcss';
```

### Export Patterns from Packages

Shared packages should export cleanly from index files:

```typescript
// ✅ Good - packages/ui/index.ts
export { ThemeToggle } from './theme-toggle';
export { Card } from './card';
export type { ThemeToggleProps } from './theme-toggle';
export type { CardProps } from './card';

// ❌ Bad - don't export from subdirectories
// Users should not import from './ui/src/components/...'
```

## Testing Standards

### Vitest & React Testing Library Setup

All components use Vitest with React Testing Library for testing:

```json
// package.json scripts
{
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:coverage": "vitest --coverage"
}
```

### Coverage Requirements

- **Minimum 80% coverage** required for all projects
- Coverage enforced on: lines, functions, branches, statements
- **Builds fail** if coverage falls below threshold
- Coverage reports generated in HTML, JSON, and LCOV formats

### Testing Structure

```
apps/[app-name]/
  __tests__/
    components/
    pages/
    utils/
src/ui/
  component-name/
    __tests__/
      component-name.test.tsx
```

### Test File Naming

- **Unit tests**: `component-name.test.tsx`
- **SSR tests**: `component-name.ssr.test.tsx`
- **RSC tests**: `component-name.rsc.test.tsx`
- **Hydration tests**: `component-name.hydration.test.tsx`
- **Integration tests**: `feature-name.test.tsx`
- **Test directory**: `__tests__/` at appropriate level
- **File location**: Same directory as component being tested

### Common Test Patterns

```tsx
// ✅ Good - Testing component behavior
it('should toggle theme when button is clicked', async () => {
  // arrange
  const user = userEvent.setup();
  render(<ThemeToggle />);

  // act
  const button = screen.getByRole('button');
  await user.click(button);

  // assert
  expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
});

// ✅ Good - Testing with testID
it('should submit form when submit button is clicked', async () => {
  render(<LoginForm />);
  const submitButton = screen.getByTestId('submit-button');
  // ...
});
```

## SSR/RSC Testing

### Overview

The design system includes comprehensive SSR (Server-Side Rendering) and RSC (React Server Components) testing utilities to ensure components work correctly in server-first architectures.

### Testing Utilities

#### SSR Testing (`src/ui/utils/ssr-test-utils.tsx`)

Utilities for testing server-side rendering and hydration:

- **`renderServer()`** - Render components server-side only
- **`renderWithHydration()`** - Test full SSR → CSR hydration cycle
- **`expectNoHydrationMismatch()`** - Validate SSR/CSR consistency
- **`renderStaticOnly()`** - Test progressive enhancement without JS
- **`renderServerWithMedia()`** - Test with specific media queries
- **`expectServerClientMatch()`** - Ensure server/client render identically

```tsx
// Example: Testing SSR and hydration
import { renderServer, renderWithHydration, expectNoHydrationMismatch } from '@/ui/utils/ssr-test-utils';

it('should render correctly on the server', () => {
  const { serverHTML, staticHTML } = renderServer(
    <Button variant="primary">Click me</Button>
  );
  
  expect(serverHTML).toContain('Click me');
  expect(staticHTML).not.toContain('data-react'); // No React IDs in static HTML
});

it('should hydrate without mismatches', async () => {
  const result = await renderWithHydration(
    <Button variant="primary">Hydrate me</Button>
  );
  
  expectNoHydrationMismatch(result);
  expect(result.hydration.success).toBe(true);
});
```

#### RSC Testing (`src/ui/utils/rsc-test-utils.tsx`)

Utilities for testing React Server Components:

- **`renderServerComponent()`** - Render RSC with mocked server context
- **`analyzeServerClientBoundaries()`** - Validate server/client splits
- **`testServerAction()`** - Test server actions with form data
- **`validateServerClientSplit()`** - Ensure proper component architecture
- **`testDataSafety()`** - Check for sensitive data leaks
- **`createMockServerComponent()`** - Create test server components
- **`createMockClientComponent()`** - Create test client components

```tsx
// Example: Testing server components and boundaries
import { analyzeServerClientBoundaries, testServerAction } from '@/ui/utils/rsc-test-utils';

it('should be a server component', () => {
  const analysis = analyzeServerClientBoundaries(Button);
  
  expect(analysis.isServerComponent).toBe(true);
  expect(analysis.violations).toHaveLength(0);
  expect(Button).toBeServerComponent();
});

it('should handle server actions', async () => {
  const handleSubmit = async (formData: FormData) => {
    const value = formData.get('button');
    return { message: `Clicked: ${value}` };
  };

  const result = await testServerAction(handleSubmit, { button: 'submit' });
  
  expect(result.success).toBe(true);
  expect(result.data).toEqual({ message: 'Clicked: submit' });
});
```

#### Hydration Testing (`src/ui/utils/hydration-test-utils.tsx`)

Utilities for testing deferred hydration and progressive enhancement:

- **`renderWithDeferredHydration()`** - Test intersection observer-based hydration
- **`mockUserPreferences()`** - Mock user preferences (reduced motion, data saver)
- **`testProgressiveEnhancement()`** - Test no-JS to enhanced transitions
- **`testResponsiveHydration()`** - Test viewport-dependent hydration
- **`testNetworkAwareHydration()`** - Test network-adaptive hydration
- **`validateDeferredHydration()`** - Validate deferred hydration setup

```tsx
// Example: Testing deferred hydration
import { renderWithDeferredHydration } from '@/ui/utils/hydration-test-utils';
import { DeferredHydration } from '@/ui/utils/deferred-hydration';

it('should hydrate when visible', async () => {
  const { triggerIntersection, isHydrated } = renderWithDeferredHydration(
    <DeferredHydration>
      <Button variant="primary">Deferred</Button>
    </DeferredHydration>
  );
  
  expect(isHydrated()).toBe(false); // Not hydrated initially
  
  await triggerIntersection(); // Simulate viewport intersection
  
  expect(isHydrated()).toBe(true); // Hydrated after visible
});
```

### Custom Test Matchers

The test setup includes custom matchers for SSR/RSC testing:

- **`toHaveNoHydrationMismatch()`** - Assert no hydration errors
- **`toBeServerComponent()`** - Assert component is server-compatible
- **`toBeClientComponent()`** - Assert component requires client
- **`toRenderStatically()`** - Assert component works without JS

```tsx
// Using custom matchers
expect(result).toHaveNoHydrationMismatch();
expect(Button).toBeServerComponent();
expect(InteractiveModal).toBeClientComponent();
expect(staticHTML).toRenderStatically();
```

### Testing Best Practices

#### 1. Always Test SSR Compatibility

```tsx
describe('Component - SSR', () => {
  it('should render on server without errors', () => {
    const { serverHTML } = renderServer(<Component />);
    expect(serverHTML).toBeDefined();
  });
  
  it('should preserve accessibility attributes', () => {
    const { serverHTML } = renderServer(
      <Component aria-label="Test" role="button" />
    );
    expect(serverHTML).toContain('aria-label="Test"');
  });
});
```

#### 2. Validate Hydration Consistency

```tsx
it('should hydrate without mismatches', async () => {
  await expectServerClientMatch(<Component prop="value" />);
});
```

#### 3. Test Progressive Enhancement

```tsx
it('should work without JavaScript', () => {
  const { html, forms } = renderStaticOnly(
    <form action="/submit">
      <Button type="submit">Submit</Button>
    </form>
  );
  
  expect(forms[0].action).toBe('/submit');
});
```

#### 4. Verify Server/Client Boundaries

```tsx
it('should properly separate server and client code', () => {
  const validation = validateServerClientSplit(
    ServerComponent,
    ClientComponent
  );
  
  expect(validation.valid).toBe(true);
  expect(validation.issues).toHaveLength(0);
});
```

#### 5. Test Network and User Preferences

```tsx
it('should adapt to network conditions', async () => {
  const results = await testNetworkAwareHydration(
    <Component />,
    [
      { type: '4g', shouldHydrate: true },
      { type: '2g', shouldHydrate: true, delay: 200 },
      { type: 'slow-2g', shouldHydrate: false }
    ]
  );
  
  expect(results.get('4g')).toBe(true);
  expect(results.get('slow-2g')).toBe(false);
});
```

### HTML Snapshots for SSR

Always create HTML snapshots for server-rendered components:

```tsx
it('should match server HTML snapshot', () => {
  const { serverHTML } = renderServer(
    <Component variant="primary" size="medium" />
  );
  
  expect(serverHTML).toMatchSnapshot();
});

it('should match static HTML snapshot', () => {
  const { staticHTML } = renderStaticOnly(<Component />);
  
  expect(staticHTML).toMatchSnapshot();
});
```

### Theme and RTL Testing

Test components with different themes and text directions:

```tsx
it('should apply theme classes server-side', () => {
  const { serverHTML } = renderServer(
    <div data-theme="dark">
      <Component />
    </div>
  );
  
  expect(serverHTML).toContain('data-theme="dark"');
});

it('should handle RTL rendering', () => {
  const { serverHTML } = renderServer(
    <div dir="rtl">
      <Component />
    </div>,
    { documentProps: { dir: 'rtl' } }
  );
  
  expect(serverHTML).toContain('dir="rtl"');
});
```

### Performance Testing

Monitor SSR performance and hydration timing:

```tsx
it('should render efficiently on server', async () => {
  const iterations = 100;
  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    await renderServerComponent(<Component />);
  }
  
  const avgTime = (performance.now() - startTime) / iterations;
  expect(avgTime).toBeLessThan(1); // < 1ms per component
});

it('should track hydration metrics', async () => {
  const { triggerIntersection, getMetrics } = renderWithDeferredHydration(
    <Component />
  );
  
  await triggerIntersection();
  
  const metrics = getMetrics();
  expect(metrics.timeToHydration).toBeLessThan(100);
  expect(metrics.hydrationSuccess).toBe(true);
});
```
