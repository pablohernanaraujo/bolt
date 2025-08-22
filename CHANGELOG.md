# Changelog

All notable changes to the Bolt Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-22

### Added

- **Complete design system foundation** with 46+ React components across 9 categories
- **Server-first architecture** with React Server Components (RSC) and SSR support
- **Theme management system** with ThemeProvider, ThemeScript, and enhanced ThemeToggle
- **Comprehensive component library** including:
  - **Form controls**: Button, Input, Checkbox, Radio, Toggle, Textarea, Select
  - **Layout components**: Container, Stack, Grid, Divider, Breadcrumb
  - **Navigation**: Link, Pagination, Menu, Tabs
  - **Overlays**: Modal, Drawer, Popover, Tooltip, Toast
  - **Feedback**: Progress, Spinner, Skeleton, Badge
  - **Data display**: Avatar, Typography, List, Code, File Upload
  - **Specialized**: Theme Toggle, Pin Input, Password components
- **Zero-runtime CSS** with vanilla-extract for optimal performance
- **Accessibility-first** approach with React Aria Components integration
- **Tree-shakeable exports** with individual component importing
- **TypeScript support** with comprehensive type definitions
- **Storybook integration** with accessibility testing and documentation
- **Performance monitoring** with bundle size tracking and budgets
- **Comprehensive testing** with Vitest, SSR/CSR compatibility tests
- **Development tooling** with ESLint, Prettier, and custom rules

### Features

- **ThemeProvider**: Context-based theme management with system preference support
- **ThemeScript**: Prevents flash of unstyled content during SSR
- **Enhanced ThemeToggle**: Accessible theme switching with smooth transitions
- **Server/Client component separation** for optimal performance
- **Progressive enhancement** with deferred hydration utilities
- **Design tokens** with consistent spacing, colors, typography, and shadows
- **Icon library** with Lucide React integration
- **Responsive design** with mobile-first approach
- **Dark/light theme** support with CSS variables
- **WCAG 2.1 AA compliance** with automated accessibility testing

### Technical

- **Build system**: Rollup with TypeScript, vanilla-extract, and terser
- **Package exports**: Individual component exports for tree-shaking
- **ESM modules** with proper TypeScript declarations
- **Peer dependencies**: React 18+, React DOM 18+
- **Node.js**: 18+ requirement with pnpm 8+ support
- **License**: MIT with public NPM publishing
- **Documentation**: Comprehensive Storybook stories and examples

### Performance

- **Bundle size**: All components within performance budgets
- **Tree-shaking**: Individual imports reduce bundle size by up to 90%
- **Zero-runtime**: CSS-in-JS with vanilla-extract compiles to static CSS
- **Server rendering**: Full SSR support with hydration testing
- **Lazy loading**: Progressive enhancement for heavy components

### Development Experience

- **Hot reloading**: Fast development with Turbopack
- **Type safety**: Strict TypeScript configuration with path mapping
- **Code quality**: ESLint with React Hooks, TypeScript, and Unicorn rules
- **Testing**: Comprehensive test suite with coverage reporting
- **Stories**: Interactive component documentation with Storybook
- **Performance**: Automated bundle analysis and size monitoring

[0.1.0]: https://github.com/pablohernanaraujo/bolt/releases/tag/v0.1.0