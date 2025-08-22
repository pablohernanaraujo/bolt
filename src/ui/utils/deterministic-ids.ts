/* eslint-disable max-statements */
// /src/ui/utils/deterministic-ids.ts
// Deterministic ID generation system for SSR-compatible accessibility
// Provides consistent ID generation that works identically on server and client
// RELEVANT FILES: accessibility.ts, form-field.tsx, input.tsx, server-theme.ts

/**
 * Global counter for deterministic ID generation
 * Reset on server-side rendering to ensure consistency
 */
let globalIdCounter = 0;

/**
 * Map to store component-specific counters
 * Ensures deterministic IDs within component instances
 */
const componentCounters = new Map<string, number>();

/**
 * Map to store cached IDs for specific keys
 * Prevents regeneration of IDs during re-renders
 */
const idCache = new Map<string, string>();

/**
 * Configuration for ID generation behavior
 */
interface IdGeneratorConfig {
  /** Prefix for all generated IDs */
  prefix?: string;
  /** Whether to include component name in ID */
  includeComponent?: boolean;
  /** Whether to cache generated IDs */
  useCache?: boolean;
  /** Separator character between ID parts */
  separator?: string;
  /** Whether to reset counter for each component instance */
  resetPerInstance?: boolean;
}

/**
 * Default configuration for ID generation
 */
const DEFAULT_CONFIG: Required<IdGeneratorConfig> = {
  prefix: 'ds', // design system
  includeComponent: true,
  useCache: true,
  separator: '-',
  resetPerInstance: false,
};

/**
 * Reset all ID counters and caches
 * Called during server-side rendering initialization
 */
export function resetIdGeneration(): void {
  globalIdCounter = 0;
  componentCounters.clear();
  idCache.clear();
}

/**
 * Generate a deterministic ID for SSR compatibility
 *
 * @param componentName - Name of the component requesting the ID
 * @param purpose - Purpose/type of the ID (e.g., 'input', 'label', 'error')
 * @param key - Optional unique key for caching
 * @param config - Configuration options
 * @returns Deterministic ID string
 */
export function generateDeterministicId(
  componentName: string,
  purpose: string,
  key?: string,
  config: Partial<IdGeneratorConfig> = {},
): string {
  const finalConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  // Create cache key if caching is enabled
  const cacheKey =
    finalConfig.useCache && key ? `${componentName}-${purpose}-${key}` : '';

  // Check cache first
  if (cacheKey && idCache.has(cacheKey)) {
    return idCache.get(cacheKey)!;
  }

  // Generate new ID
  const parts: string[] = [];

  // Add prefix
  if (finalConfig.prefix) {
    parts.push(finalConfig.prefix);
  }

  // Add component name if requested
  if (finalConfig.includeComponent) {
    parts.push(componentName.toLowerCase());
  }

  // Add purpose
  parts.push(purpose.toLowerCase());

  // Get counter value
  let counter: number;
  if (finalConfig.resetPerInstance) {
    const counterKey = `${componentName}-${purpose}`;
    counter = (componentCounters.get(counterKey) || 0) + 1;
    componentCounters.set(counterKey, counter);
  } else {
    counter = ++globalIdCounter;
  }

  // Add counter
  parts.push(counter.toString());

  // Join all parts
  const id = parts.join(finalConfig.separator);

  // Cache if enabled
  if (cacheKey) {
    idCache.set(cacheKey, id);
  }

  return id;
}

/**
 * Generate deterministic IDs for form field relationships
 * Creates consistent IDs for input, label, error, and help text
 */
export function generateFormFieldIds(
  componentName: string,
  fieldName?: string,
): {
  input: string;
  label: string;
  error: string;
  helpText: string;
  field: string;
} {
  const key = fieldName || '';

  return {
    field: generateDeterministicId(componentName, 'field', key),
    input: generateDeterministicId(componentName, 'input', key),
    label: generateDeterministicId(componentName, 'label', key),
    error: generateDeterministicId(componentName, 'error', key),
    helpText: generateDeterministicId(componentName, 'help', key),
  };
}

/**
 * Generate deterministic IDs for ARIA relationships
 * Creates IDs for labelledby, describedby, and controls relationships
 */
export function generateAriaIds(
  componentName: string,
  elementName: string,
  key?: string,
): {
  element: string;
  labelledBy: string;
  describedBy: string;
  controls: string;
} {
  const baseKey = key || elementName;

  return {
    element: generateDeterministicId(componentName, elementName, baseKey),
    labelledBy: generateDeterministicId(
      componentName,
      `${elementName}-labelledby`,
      baseKey,
    ),
    describedBy: generateDeterministicId(
      componentName,
      `${elementName}-describedby`,
      baseKey,
    ),
    controls: generateDeterministicId(
      componentName,
      `${elementName}-controls`,
      baseKey,
    ),
  };
}

/**
 * Generate deterministic IDs for complex components
 * Creates a set of related IDs for components with multiple interactive elements
 */
export function generateComplexComponentIds(
  componentName: string,
  elements: string[],
  key?: string,
): Record<string, string> {
  const ids: Record<string, string> = {};

  elements.forEach((element) => {
    ids[element] = generateDeterministicId(componentName, element, key);
  });

  return ids;
}

/**
 * Create a deterministic ID hook replacement for useId
 * Provides SSR-compatible alternative to React's useId hook
 */
export function createDeterministicIdHook(
  componentName: string,
): (purpose: string, key?: string) => string {
  return function useDeterministicId(
    purpose: string = 'element',
    key?: string,
  ): string {
    // In SSR environment, generate deterministic ID
    if (typeof window === 'undefined') {
      return generateDeterministicId(componentName, purpose, key);
    }

    // On client, use cached ID or generate if not exists
    const cacheKey = `${componentName}-${purpose}-${key || ''}`;

    if (!idCache.has(cacheKey)) {
      const id = generateDeterministicId(componentName, purpose, key);
      idCache.set(cacheKey, id);
    }

    return idCache.get(cacheKey)!;
  };
}

/**
 * Validate that an ID is deterministic and SSR-safe
 * Useful for testing and development
 */
export function validateDeterministicId(id: string): boolean {
  // Check basic format
  if (!id || typeof id !== 'string') {
    return false;
  }

  // Check for non-deterministic patterns
  const nonDeterministicPatterns = [
    /Math\.random/,
    /Date\.now/,
    /timestamp/i,
    /uuid/i,
    /[0-9]{13,}/, // Timestamps
  ];

  return !nonDeterministicPatterns.some((pattern) => pattern.test(id));
}

/**
 * Get statistics about ID generation
 * Useful for debugging and optimization
 */
export function getIdGenerationStats(): {
  globalCounter: number;
  componentCounters: Record<string, number>;
  cacheSize: number;
} {
  return {
    globalCounter: globalIdCounter,
    componentCounters: Object.fromEntries(componentCounters),
    cacheSize: idCache.size,
  };
}

/**
 * Helper for generating scoped IDs within a component instance
 * Provides a component-specific ID generator
 */
export class ComponentIdGenerator {
  private componentName: string;
  private instanceKey: string;
  private localCounter = 0;

  constructor(componentName: string, instanceKey?: string) {
    this.componentName = componentName;
    this.instanceKey = instanceKey || '';
  }

  /**
   * Generate an ID scoped to this component instance
   */
  generateId(purpose: string): string {
    this.localCounter++;

    const parts = [
      DEFAULT_CONFIG.prefix,
      this.componentName.toLowerCase(),
      purpose.toLowerCase(),
    ];

    if (this.instanceKey) {
      parts.push(this.instanceKey);
    }

    parts.push(this.localCounter.toString());

    return parts.join(DEFAULT_CONFIG.separator);
  }

  /**
   * Generate form field IDs for this component instance
   */
  generateFormFieldIds(): ReturnType<typeof generateFormFieldIds> {
    return {
      field: this.generateId('field'),
      input: this.generateId('input'),
      label: this.generateId('label'),
      error: this.generateId('error'),
      helpText: this.generateId('help'),
    };
  }

  /**
   * Generate ARIA relationship IDs for this component instance
   */
  generateAriaIds(elementName: string): ReturnType<typeof generateAriaIds> {
    return {
      element: this.generateId(elementName),
      labelledBy: this.generateId(`${elementName}-labelledby`),
      describedBy: this.generateId(`${elementName}-describedby`),
      controls: this.generateId(`${elementName}-controls`),
    };
  }
}

/**
 * Utility for creating prefixed ID generators
 * Useful for creating component-family specific ID generators
 */
export function createPrefixedIdGenerator(prefix: string): {
  generate: (componentName: string, purpose: string, key?: string) => string;
  generateFormFields: (
    componentName: string,
    fieldName?: string,
  ) => ReturnType<typeof generateFormFieldIds>;
} {
  return {
    generate: (componentName: string, purpose: string, key?: string) =>
      generateDeterministicId(componentName, purpose, key, { prefix }),

    generateFormFields: (componentName: string, fieldName?: string) => {
      const key = fieldName || '';
      return {
        field: generateDeterministicId(componentName, 'field', key, { prefix }),
        input: generateDeterministicId(componentName, 'input', key, { prefix }),
        label: generateDeterministicId(componentName, 'label', key, { prefix }),
        error: generateDeterministicId(componentName, 'error', key, { prefix }),
        helpText: generateDeterministicId(componentName, 'help', key, {
          prefix,
        }),
      };
    },
  };
}

// Initialize for server-side rendering
if (typeof window === 'undefined') {
  resetIdGeneration();
}
