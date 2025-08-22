# Performance Budget System

## Rendimiento y tamaño: Budgets por componente (KB gzip) y checks en CI

Esta documentación describe el sistema completo de performance budgets implementado en el design system, que incluye monitoreo de tamaño de bundles, detección de efectos globales, y optimización de CSS crítico.

## 🎯 Objetivos

1. **Performance Budgets**: Límites de tamaño por componente en KB gzip
2. **Sin efectos globales**: Componentes puros sin listeners globales al import
3. **Critical CSS**: Estilos mínimos y extraíbles para above-the-fold

## 📊 Sistema de Budgets

### Configuración de Budgets

Los budgets están definidos en `performance-budgets.config.js`:

```javascript
export const COMPONENT_BUDGETS = {
  'button': { gzip: 2.5, warning: 2.0 },
  'input': { gzip: 4.0, warning: 3.5 },
  'modal': { gzip: 7.0, warning: 6.0 },
  // ... más componentes
};
```

### Categorías de Budget

- **Componentes básicos (1-3 KB)**: Button, Badge, Avatar, Spinner
- **Componentes de formulario (3-5 KB)**: Input, Textarea, Checkbox, Radio
- **Componentes de layout (2-4 KB)**: Container, Flex, Grid, Layout
- **Componentes overlay (5-8 KB)**: Modal, Drawer, Popover, Tooltip
- **Componentes de datos (8-15 KB)**: Charts, Tables complejas

## 🔧 Scripts de Performance

### 1. Verificación de Bundle Size

```bash
pnpm run performance:check
```

**Qué hace:**
- Analiza el tamaño gzipped de cada componente
- Compara contra budgets definidos
- Genera reportes de violations
- Falla CI si hay componentes over-budget

**Output ejemplo:**
```
✅ button                    2.1KB / 2.5KB (84%)
⚠️  input                    3.8KB / 4.0KB (95%)
❌ modal                     7.5KB / 7.0KB (107%)
```

### 2. Análisis de Bundles

```bash
pnpm run performance:analyze
```

**Qué hace:**
- Usa webpack-bundle-analyzer para análisis detallado
- Identifica dependencies duplicadas
- Detecta oportunidades de tree-shaking
- Genera reportes de optimización

### 3. Auditoría de Side Effects

```bash
pnpm run audit:side-effects
```

**Qué hace:**
- Detecta efectos globales en imports
- Identifica listeners globales
- Verifica mutaciones de prototipos
- Valida que componentes sean puros

### 4. Auditoría de Global Listeners

```bash
pnpm run audit:global-listeners
```

**Qué hace:**
- Encuentra todos los event listeners globales
- Verifica que tengan cleanup apropiado
- Detecta memory leaks potenciales
- Valida uso en hooks vs módulos

### 5. Extracción de Critical CSS

```bash
pnpm run performance:report
```

**Qué hace:**
- Extrae CSS crítico para above-the-fold
- Optimiza y minifica estilos
- Verifica budgets de CSS
- Genera CSS separado crítico vs no-crítico

## 🚦 Integración CI

### GitHub Actions

El workflow `.github/workflows/performance-check.yml` ejecuta automáticamente:

1. **Bundle size check** - Falla si componentes exceden budgets
2. **Side effects audit** - Falla si hay efectos globales
3. **Global listeners audit** - Falla si hay cleanup issues
4. **Bundle analysis** - Genera reportes de optimización
5. **Critical CSS check** - Valida budgets de CSS

### PR Comments

Los checks automáticamente comentan en PRs con:

```markdown
## 📊 Performance Budget Report

- ✅ **23** components within budget
- ⚠️ **2** components over warning threshold  
- ❌ **1** components over budget

### Components exceeding thresholds:
| Component | Actual | Budget | Status |
|-----------|--------|---------|---------|
| modal | 7.5KB | 7.0KB | ❌ |
```

## 🏗️ Arquitectura del Sistema

### 1. Performance Budgets Config

`performance-budgets.config.js` define:
- Budgets por componente
- Límites globales
- Componentes critical CSS
- Componentes allowed side effects

### 2. Scripts de Análisis

#### `scripts/check-bundle-size.js`
- Análisis principal de tamaños
- Comparación contra budgets
- Tracking histórico de cambios

#### `scripts/audit-side-effects.js`
- Static analysis de efectos globales
- Detección de patrones problemáticos
- Integración con ESLint rules

#### `scripts/audit-global-listeners.js`
- Análisis específico de event listeners
- Verificación de cleanup patterns
- Context analysis (hook vs módulo)

#### `scripts/extract-critical-css.js`
- Extracción automática de CSS crítico
- Optimización y minificación
- Budget compliance checking

#### `scripts/analyze-bundles.js`
- Webpack bundle analysis
- Dependency analysis
- Tree-shaking effectiveness

#### `scripts/generate-performance-report.js`
- Consolidación de todos los análisis
- Reportes HTML interactivos
- Trend analysis y recomendaciones

### 3. ESLint Rules Personalizadas

Ubicadas en `eslint-rules/`:

#### `no-global-listeners.js`
```javascript
// ❌ Mal - global listener en módulo
window.addEventListener('resize', handler);

// ✅ Bien - listener en hook
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

#### `no-immediate-execution.js`
```javascript
// ❌ Mal - ejecución inmediata
console.log('Component loaded');
const result = heavyComputation();

// ✅ Bien - ejecución en componente
const Component = () => {
  useEffect(() => {
    console.log('Component mounted');
  }, []);
};
```

#### `no-global-mutations.js`
```javascript
// ❌ Mal - mutación global
Object.prototype.myMethod = function() {};
window.myGlobal = {};

// ✅ Bien - state local
const [state, setState] = useState({});
```

## 📈 Monitoreo y Reportes

### Dashboard HTML

El script `generate-performance-report.js` crea un dashboard HTML con:

- **Performance Score**: 0-100 basado en métricas combinadas
- **Trend Analysis**: Cambios desde último análisis
- **Detailed Breakdown**: Por componente y categoría
- **Recommendations**: Acciones priorizadas para optimización

### Métricas Tracked

1. **Bundle Size Score**: % componentes dentro de budget
2. **Side Effects Score**: % componentes sin efectos globales  
3. **Cleanup Score**: % listeners con cleanup apropiado
4. **Optimization Score**: Basado en oportunidades detectadas
5. **Overall Score**: Promedio ponderado de todas las métricas

### Historical Tracking

El sistema mantiene historial en `performance-reports/bundle-history.json`:

```json
{
  "timestamp": "2025-01-20T10:30:00Z",
  "components": [
    {
      "component": "button",
      "actualKB": 2.1,
      "budgetKB": 2.5,
      "status": "ok"
    }
  ]
}
```

## 🎛️ Configuración de Componentes

### Componentes Side-Effect Free

Marcados en `SIDE_EFFECT_FREE_COMPONENTS`:
```javascript
[
  'button', 'badge', 'avatar', 'typography',
  'link', 'divider', 'container', 'flex'
]
```

Estos componentes **no pueden** tener:
- Global event listeners
- Mutaciones de objetos globales
- Ejecución inmediata en import
- State global compartido

### Componentes con Side Effects Controlados

Marcados en `CONTROLLED_SIDE_EFFECTS_ALLOWED`:
```javascript
[
  'theme-toggle', 'modal', 'drawer', 'toast',
  'progressive-enhancement'
]
```

Estos componentes **pueden** tener side effects **pero deben**:
- Implementar cleanup apropiado
- Usar patterns de progressive enhancement
- Documentar efectos explícitamente

### Critical CSS Components

Marcados en `CRITICAL_CSS_COMPONENTS`:
```javascript
[
  'typography', 'container', 'flex', 'grid',
  'button', 'link', 'app-layout', 'app-header'
]
```

CSS de estos componentes se incluye en critical bundle.

## 🚀 Mejores Prácticas

### 1. Component Design

```javascript
// ✅ Patrón recomendado - Server-first
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, ...props }, ref) => (
    <AriaButton ref={ref} className={buildClassName(variant, size)} {...props}>
      {children}
    </AriaButton>
  ),
);

// ✅ Client enhancement cuando necesario
export const ButtonClient = ({ onClick, ...props }) => {
  // Client-only enhancements
};
```

### 2. Side Effects Management

```javascript
// ✅ Efectos en hooks con cleanup
export const useGlobalListener = (event, handler) => {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
};

// ✅ Progressive enhancement
export const enhanceButton = (element, onClick) => {
  if (!shouldEnhanceComponent()) return;
  
  const cleanup = () => element.removeEventListener('click', onClick);
  element.addEventListener('click', onClick);
  return cleanup;
};
```

### 3. Bundle Optimization

```javascript
// ✅ Tree-shakeable exports
export { Button } from './button';
export type { ButtonProps } from './types';

// ✅ Dynamic imports para heavy components
const HeavyChart = dynamic(() => import('./heavy-chart'), {
  loading: () => <ChartSkeleton />,
});
```

## 🔍 Debugging Performance Issues

### Bundle Size Over Budget

1. **Analizar dependencias**:
   ```bash
   pnpm run build:analyze
   ```

2. **Verificar imports**:
   ```javascript
   // ❌ Imports pesados
   import * as lodash from 'lodash';
   
   // ✅ Imports específicos
   import { debounce } from 'lodash-es';
   ```

3. **Usar dynamic imports**:
   ```javascript
   const HeavyComponent = lazy(() => import('./heavy-component'));
   ```

### Side Effects Detectados

1. **Revisar ESLint errors**:
   ```bash
   pnpm run lint
   ```

2. **Mover a hooks**:
   ```javascript
   // ❌ En módulo
   document.addEventListener('click', handler);
   
   // ✅ En hook
   useEffect(() => {
     document.addEventListener('click', handler);
     return () => document.removeEventListener('click', handler);
   }, []);
   ```

### Memory Leaks

1. **Verificar cleanup**:
   ```bash
   pnpm run audit:global-listeners
   ```

2. **Implementar cleanup**:
   ```javascript
   useEffect(() => {
     const controller = new AbortController();
     fetch('/api/data', { signal: controller.signal });
     
     return () => controller.abort();
   }, []);
   ```

## 📚 Referencias

- [Next.js Bundle Analysis](https://nextjs.org/docs/advanced-features/analyzing-bundles)
- [Web Performance Budgets](https://web.dev/performance-budgets-101/)
- [Critical CSS](https://web.dev/extract-critical-css/)
- [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

## 🔄 Workflow de Desarrollo

1. **Pre-development**: Verificar budgets actuales
2. **Durante desarrollo**: Usar ESLint rules para detectar issues
3. **Pre-commit**: Ejecutar checks locales
4. **CI/CD**: Verificación automática y reportes
5. **Post-merge**: Tracking de trends y métricas