# React Server Components Compatibility Guide

This design system is built with a **server-first architecture** that prioritizes React Server Components (RSC) compatibility while providing client-side enhancements when needed.

## Architecture Overview

### Server-First Philosophy

Every component follows the principle of **surgical client boundaries**:

1. **Default to server-compatible** - All main component exports work without client-side JavaScript
2. **Progressive enhancement** - Client features are additive, not required
3. **Explicit client components** - When client-side behavior is needed, it's clearly named and separated

### Component Structure

Each interactive component follows this pattern:

```
component/
  component.tsx           # Main API - re-exports server as default
  component-server.tsx    # Server-compatible implementation
  component-client.tsx    # Client-enhanced version (optional)
  types.ts               # Shared type definitions
  helpers.ts             # Utility functions
```

## Usage Patterns

### Default Usage (Server-Compatible)

```tsx
import { Button, Input, Checkbox } from '@design-system';

// These work on the server and without JavaScript
export default function MyForm() {
  return (
    <form action="/submit" method="POST">
      <Input name="email" type="email" required />
      <Checkbox name="terms" required>
        I agree to terms
      </Checkbox>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### When You Need Client Features

```tsx
'use client';

import { ButtonClient, InputClient, CheckboxClient } from '@design-system';

// These provide React Aria enhanced interactions
export default function InteractiveForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <InputClient
        isRequired
        onValueChange={handleChange}
        validationState={isValid ? 'valid' : 'invalid'}
      />
      <CheckboxClient isSelected={checked} onChange={setChecked}>
        Advanced checkbox
      </CheckboxClient>
      <ButtonClient isDisabled={isSubmitting} onPress={handlePress}>
        Enhanced button
      </ButtonClient>
    </form>
  );
}
```

### Explicit Import Paths

For maximum clarity, you can import specific versions:

```tsx
// Explicit server-only imports
import { ButtonServer } from '@design-system/button/server';
import { InputServer } from '@design-system/input/server';

// Explicit client-only imports
import { ButtonClient } from '@design-system/button/client';
import { InputClient } from '@design-system/input/client';
```

## Component Categories

### ✅ Always Server-Compatible

These components work perfectly on the server without any JavaScript:

- **Typography**: `H1`, `H2`, `Body1`, `Body2`, etc.
- **Layout**: `Container`, `Stack`, `Grid`, `Flex`, etc.
- **Content**: `Badge`, `Code`, `Skeleton`, `Divider`, etc.
- **Links**: `Link` (with NextLink integration)

### 🔄 Server-First with Client Alternatives

These components default to server-compatible but offer enhanced client versions:

- **Button**: `Button` (server) + `ButtonClient` (React Aria enhanced)
- **Input**: `Input` (server) + `InputClient` (validation, controlled state)
- **Checkbox**: `Checkbox` (server) + `CheckboxClient` (render props, state)

### ⚠️ Client-Only Components

These components require client-side JavaScript by nature:

- **Modal**: Advanced focus management and portal rendering
- **Tooltip**: Positioning and hover state management
- **Menu**: Keyboard navigation and selection state
- **Toast**: Dynamic notifications and animations

## Progressive Enhancement Utilities

The design system provides utilities for progressive enhancement:

### Deferred Hydration

```tsx
import { DeferredHydration, ENHANCEMENT_CONFIGS } from '@design-system';

function HeavyComponent() {
  return (
    <DeferredHydration
      fallback={<ChartSkeleton />}
      enhancementOptions={ENHANCEMENT_CONFIGS.HEAVY_COMPONENT}
      observerConfig={{ rootMargin: '100px' }}
    >
      <ExpensiveChart data={data} />
    </DeferredHydration>
  );
}
```

### Enhancement Detection

```tsx
import { shouldEnhanceComponent, isJavaScriptAvailable } from '@design-system';

function ConditionalComponent() {
  const canEnhance = shouldEnhanceComponent({
    respectReducedMotion: true,
    respectDataSaver: true,
  });

  return canEnhance ? <EnhancedVersion /> : <BasicVersion />;
}
```

## Benefits

### Performance

- **Zero JavaScript** for presentational components
- **Smaller bundles** with surgical client boundaries
- **Faster initial loads** with server rendering
- **Deferred hydration** for heavy components

### Accessibility

- **Complete ARIA attributes** rendered server-side
- **Semantic HTML** that works without JavaScript
- **Keyboard navigation** available immediately
- **Screen reader compatibility** from first render

### Developer Experience

- **Clear separation** between server and client components
- **Type safety** with TypeScript throughout
- **Explicit imports** when you need specific behavior
- **Progressive enhancement** patterns built-in

### SEO & Compatibility

- **Search engine friendly** with server-rendered HTML
- **Works without JavaScript** for maximum compatibility
- **Graceful degradation** in all environments
- **Form submission** works with native browser behavior

## Migration Guide

### From Client-Only Components

If you're currently using client-only components:

```tsx
// Before (client-only)
'use client';
import { Button } from '@design-system';

// After (server-first)
import { Button } from '@design-system';
// No 'use client' needed unless you use client-specific features
```

### When You Need Client Features

```tsx
// When you need React Aria features
'use client';
import { ButtonClient as Button } from '@design-system';

// Or use explicit imports
import { ButtonClient } from '@design-system/button/client';
```

### For Complex Interactive Components

```tsx
// Separate server structure from client behavior
import { ModalServer, ModalCloseButton } from '@design-system';

function MyModal() {
  return (
    <ModalServer>
      <h2>Server-rendered content</h2>
      <p>This works without JavaScript</p>
      <ModalCloseButton /> {/* This requires client JS */}
    </ModalServer>
  );
}
```

## Best Practices

1. **Start with server components** - Use the default exports unless you need client features
2. **Be explicit about client needs** - Use `ButtonClient` when you need React Aria features
3. **Separate concerns** - Keep server structure separate from client interactivity
4. **Progressive enhancement** - Build features that work without JS and enhance with it
5. **Use deferred hydration** - For heavy components that don't need immediate interactivity
6. **Respect user preferences** - Honor reduced motion and data saver settings

## Troubleshooting

### "Cannot use X in Server Component"

- Check if you're using a client-only component
- Use the server-compatible version instead
- Move client code to a separate client component

### Missing Interactivity

- Ensure you're using client components for interactive features
- Check that you have `'use client'` directive when needed
- Verify your component needs client-side JavaScript

### TypeScript Errors

- Import both server and client types when needed
- Use the correct props interface for your component version
- Check that your component choice matches your use case
