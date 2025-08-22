// /src/i18n/translations.ts
// Translation utilities with server-side support and type safety
// Provides translation functions with interpolation and fallback support
// RELEVANT FILES: server-locale.ts, loader.ts, server-hooks.ts, rtl-detection.ts

/**
 * Translation parameters for interpolation
 */
export type TranslationParams = Record<string, string | number | boolean>;

/**
 * Translation key type for type safety
 */
export type TranslationKey = string;

/**
 * Translation function signature
 */
export type TranslationFunction = (
  key: TranslationKey,
  params?: TranslationParams,
) => string;

/**
 * Translation value can be a string or a function that returns a string
 */
export type TranslationValue =
  | string
  | ((params?: TranslationParams) => string);

/**
 * Nested translation object structure
 */
export type TranslationObject = {
  [key: string]: TranslationValue | TranslationObject;
};

/**
 * Flat translation map for runtime lookups
 */
export type FlatTranslations = Record<string, TranslationValue>;

/**
 * Global translation store
 */
let globalTranslations: Record<string, FlatTranslations> = {};

/**
 * Default locale for fallbacks
 */
let defaultLocale = 'en-US';

/**
 * Set the default locale for fallbacks
 */
export function setDefaultLocale(locale: string): void {
  defaultLocale = locale;
}

/**
 * Add translations for a specific locale
 * Flattens nested objects into dot-notation keys
 */
export function addTranslations(
  locale: string,
  translations: TranslationObject,
): void {
  if (!globalTranslations[locale]) {
    globalTranslations[locale] = {};
  }

  const flattened = flattenTranslations(translations);
  Object.assign(globalTranslations[locale], flattened);
}

/**
 * Get all translations for a locale
 */
export function getTranslations(locale: string): FlatTranslations {
  return globalTranslations[locale] || {};
}

/**
 * Check if translations exist for a locale
 */
export function hasTranslations(locale: string): boolean {
  return Boolean(globalTranslations[locale]);
}

/**
 * Clear all translations (useful for testing)
 */
export function clearTranslations(): void {
  globalTranslations = {};
}

/**
 * Main translation function with fallback support
 * Looks up translation keys with dot notation and performs parameter interpolation
 */
export function translate(
  key: TranslationKey,
  locale: string,
  params?: TranslationParams,
  fallbackLocale?: string,
): string {
  // Try primary locale first
  const primaryTranslation = getTranslation(key, locale, params);
  if (primaryTranslation !== key) {
    return primaryTranslation;
  }

  // Try fallback locale
  if (fallbackLocale && fallbackLocale !== locale) {
    const fallbackTranslation = getTranslation(key, fallbackLocale, params);
    if (fallbackTranslation !== key) {
      return fallbackTranslation;
    }
  }

  // Try default locale
  if (defaultLocale !== locale && defaultLocale !== fallbackLocale) {
    const defaultTranslation = getTranslation(key, defaultLocale, params);
    if (defaultTranslation !== key) {
      return defaultTranslation;
    }
  }

  // Return key as fallback
  return key;
}

/**
 * Translation function with explicit fallback value
 */
export function translateWithFallback(
  key: TranslationKey,
  locale: string,
  fallbackValue: string,
  params?: TranslationParams,
): string {
  const translation = translate(key, locale, params);
  return translation === key ? fallbackValue : translation;
}

/**
 * Get a single translation without fallbacks
 */
export function getTranslation(
  key: TranslationKey,
  locale: string,
  params?: TranslationParams,
): string {
  const translations = globalTranslations[locale];
  if (!translations) {
    return key;
  }

  const translationValue = translations[key];
  if (!translationValue) {
    return key;
  }

  // Handle function translations
  if (typeof translationValue === 'function') {
    try {
      return translationValue(params);
    } catch (error) {
      console.warn(`Translation function failed for key "${key}":`, error);
      return key;
    }
  }

  // Handle string translations with interpolation
  return interpolate(translationValue, params);
}

/**
 * Interpolate parameters into a translation string
 * Supports {{key}} syntax and basic pluralization
 */
export function interpolate(
  template: string,
  params?: TranslationParams,
): string {
  if (!params) {
    return template;
  }

  return template.replace(
    /\{\{(\w+)(?:\|([^}]+))?\}\}/g,
    (match, key, modifier) => {
      const value = params[key];

      if (value === undefined || value === null) {
        return match;
      }

      // Handle modifiers (basic pluralization)
      if (modifier && typeof value === 'number') {
        const options = modifier.split('|');

        if (value === 0 && options[0]) return options[0]; // zero
        if (value === 1 && options[1]) return options[1]; // one
        if (options[2]) return options[2]; // many

        return String(value);
      }

      return String(value);
    },
  );
}

/**
 * Flatten nested translation object into dot-notation keys
 */
function flattenTranslations(
  obj: TranslationObject,
  prefix = '',
): FlatTranslations {
  const flattened: FlatTranslations = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string' || typeof value === 'function') {
      flattened[newKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(flattened, flattenTranslations(value, newKey));
    }
  }

  return flattened;
}

/**
 * Get available translation keys for a locale
 */
export function getTranslationKeys(locale: string): string[] {
  const translations = globalTranslations[locale];
  return translations ? Object.keys(translations) : [];
}

/**
 * Check if a translation key exists
 */
export function hasTranslationKey(
  key: TranslationKey,
  locale: string,
): boolean {
  const translations = globalTranslations[locale];
  return Boolean(translations && translations[key]);
}

/**
 * Get missing translation keys by comparing two locales
 */
export function getMissingTranslationKeys(
  fromLocale: string,
  toLocale: string,
): string[] {
  const fromKeys = getTranslationKeys(fromLocale);
  const toKeys = getTranslationKeys(toLocale);

  return fromKeys.filter((key) => !toKeys.includes(key));
}

/**
 * Validate translation completeness
 */
export function validateTranslations(locale: string): {
  isComplete: boolean;
  missingKeys: string[];
  totalKeys: number;
  translatedKeys: number;
} {
  const defaultKeys = getTranslationKeys(defaultLocale);
  const localeKeys = getTranslationKeys(locale);
  const missingKeys = getMissingTranslationKeys(defaultLocale, locale);

  return {
    isComplete: missingKeys.length === 0,
    missingKeys,
    totalKeys: defaultKeys.length,
    translatedKeys: localeKeys.length,
  };
}

/**
 * Get translation statistics
 */
export function getTranslationStats(): {
  locales: string[];
  totalTranslations: Record<string, number>;
  completeness: Record<string, number>;
} {
  const locales = Object.keys(globalTranslations);
  const totalTranslations: Record<string, number> = {};
  const completeness: Record<string, number> = {};

  const defaultKeyCount = getTranslationKeys(defaultLocale).length;

  for (const locale of locales) {
    const keyCount = getTranslationKeys(locale).length;
    totalTranslations[locale] = keyCount;
    completeness[locale] =
      defaultKeyCount > 0 ? (keyCount / defaultKeyCount) * 100 : 100;
  }

  return {
    locales,
    totalTranslations,
    completeness,
  };
}

/**
 * Create a scoped translation function for a component
 * Automatically prefixes keys with component name
 */
export function createScopedTranslator(
  componentName: string,
  locale: string,
): TranslationFunction {
  return (key: TranslationKey, params?: TranslationParams) => {
    const scopedKey = `${componentName}.${key}`;
    return translate(scopedKey, locale, params);
  };
}

/**
 * Namespace-aware translation function
 * Supports namespaced keys like 'forms.validation.required'
 */
export function translateNamespaced(
  namespace: string,
  key: TranslationKey,
  locale: string,
  params?: TranslationParams,
): string {
  const namespacedKey = `${namespace}.${key}`;
  return translate(namespacedKey, locale, params);
}

/**
 * Bulk translation function for multiple keys
 */
export function translateMultiple(
  keys: TranslationKey[],
  locale: string,
  params?: TranslationParams,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key of keys) {
    result[key] = translate(key, locale, params);
  }

  return result;
}

/**
 * Translation key builder for type safety
 */
export class TranslationKeyBuilder {
  private parts: string[] = [];

  add(part: string): this {
    this.parts.push(part);
    return this;
  }

  build(): string {
    return this.parts.join('.');
  }

  reset(): this {
    this.parts = [];
    return this;
  }
}

/**
 * Create a translation key builder
 */
export function createKeyBuilder(): TranslationKeyBuilder {
  return new TranslationKeyBuilder();
}
