/* eslint-disable max-statements */
// /src/i18n/loader.ts
// Translation loading and management system with dynamic imports
// Provides efficient translation loading with caching and fallback support
// RELEVANT FILES: translations.ts, server-locale.ts, server-hooks.ts

import { addTranslations, type TranslationObject } from './translations';

/**
 * Translation file structure
 */
export interface Translations extends TranslationObject {}

/**
 * Locale data including translations and metadata
 */
export interface LocaleData {
  /** Locale code */
  locale: string;
  /** Translation object */
  translations: Translations;
  /** Metadata about the locale */
  meta?: {
    /** Display name of the locale */
    name: string;
    /** Native name of the locale */
    nativeName: string;
    /** Completion percentage */
    completion?: number;
    /** Last updated timestamp */
    lastUpdated?: string;
    /** Contributors */
    contributors?: string[];
  };
}

/**
 * Translation loading cache
 */
const loadingCache = new Map<string, Promise<LocaleData>>();

/**
 * Loaded locales set
 */
const loadedLocales = new Set<string>();

/**
 * Available locales from the file system
 */
let availableLocales: string[] = [];

/**
 * Supported locales that have been explicitly enabled
 */
let supportedLocales: string[] = ['en-US'];

/**
 * Load translations for a specific locale
 * Uses dynamic imports for code splitting and caching
 */
export async function loadTranslations(locale: string): Promise<LocaleData> {
  // Check if already loaded
  if (loadedLocales.has(locale)) {
    return {
      locale,
      translations: {},
      meta: {
        name: locale,
        nativeName: locale,
      },
    };
  }

  // Check loading cache
  if (loadingCache.has(locale)) {
    return loadingCache.get(locale)!;
  }

  // Create loading promise
  const loadingPromise = loadTranslationsInternal(locale);
  loadingCache.set(locale, loadingPromise);

  try {
    const result = await loadingPromise;
    loadedLocales.add(locale);
    return result;
  } catch (error) {
    // Remove from cache on error to allow retry
    loadingCache.delete(locale);
    throw error;
  }
}

/**
 * Internal translation loading implementation
 */
async function loadTranslationsInternal(locale: string): Promise<LocaleData> {
  try {
    // Try to load the specific locale file
    const localeModule = await import(`../translations/${locale}.json`);
    const localeData: LocaleData = localeModule.default || localeModule;

    // Add translations to global store
    if (localeData.translations) {
      addTranslations(locale, localeData.translations);
    }

    return localeData;
  } catch (error) {
    console.warn(`Failed to load translations for locale "${locale}":`, error);

    // Try to load language family fallback (e.g., 'en' for 'en-GB')
    const language = locale.split('-')[0];
    if (language !== locale) {
      try {
        const languageModule = await import(`../translations/${language}.json`);
        const languageData: LocaleData =
          languageModule.default || languageModule;

        if (languageData.translations) {
          addTranslations(locale, languageData.translations);
        }

        return {
          ...languageData,
          locale, // Keep the requested locale
        };
      } catch (languageError) {
        console.warn(
          `Failed to load fallback language "${language}":`,
          languageError,
        );
      }
    }

    // Return empty locale data as final fallback
    return {
      locale,
      translations: {},
      meta: {
        name: locale,
        nativeName: locale,
        completion: 0,
      },
    };
  }
}

/**
 * Load multiple locales in parallel
 */
export async function loadMultipleTranslations(
  locales: string[],
): Promise<LocaleData[]> {
  const loadingPromises = locales.map((locale) => loadTranslations(locale));
  return Promise.all(loadingPromises);
}

/**
 * Preload translations for performance
 * Useful for preloading common locales or user's preferred languages
 */
export async function preloadTranslations(locales: string[]): Promise<void> {
  try {
    await loadMultipleTranslations(locales);
  } catch (error) {
    console.warn('Failed to preload some translations:', error);
  }
}

/**
 * Get list of available locales from the file system
 * This would typically be generated at build time
 */
export function getAvailableLocales(): string[] {
  // In a real implementation, this would be populated by a build script
  // that scans the translations directory
  return availableLocales.length > 0
    ? availableLocales
    : [
        'en-US',
        'en-GB',
        'ar-SA',
        'ar-AE',
        'he-IL',
        'fa-IR',
        'fr-FR',
        'de-DE',
        'es-ES',
        'ja-JP',
        'ko-KR',
        'zh-CN',
      ];
}

/**
 * Set available locales (typically called during build process)
 */
export function setAvailableLocales(locales: string[]): void {
  availableLocales = locales;
}

/**
 * Get list of supported locales
 */
export function getSupportedLocales(): string[] {
  return [...supportedLocales];
}

/**
 * Set supported locales (typically called during app initialization)
 */
export function setSupportedLocales(locales: string[]): void {
  supportedLocales = locales;
}

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  return supportedLocales.includes(locale);
}

/**
 * Check if a locale is available for loading
 */
export function isLocaleAvailable(locale: string): boolean {
  return getAvailableLocales().includes(locale);
}

/**
 * Add a new locale to the supported list
 */
export function addSupportedLocale(locale: string): void {
  if (!supportedLocales.includes(locale)) {
    supportedLocales.push(locale);
  }
}

/**
 * Remove a locale from the supported list
 */
export function removeSupportedLocale(locale: string): void {
  const index = supportedLocales.indexOf(locale);
  if (index > -1) {
    supportedLocales.splice(index, 1);
  }
}

/**
 * Get the best matching locale from available locales
 * Uses Accept-Language style matching
 */
export function getBestMatchingLocale(
  requestedLocales: string[],
  availableLocales: string[] = getAvailableLocales(),
): string | null {
  // Try exact matches first
  for (const requested of requestedLocales) {
    if (availableLocales.includes(requested)) {
      return requested;
    }
  }

  // Try language family matches
  for (const requested of requestedLocales) {
    const language = requested.split('-')[0];
    const match = availableLocales.find((available) =>
      available.startsWith(`${language}-`),
    );
    if (match) {
      return match;
    }
  }

  return null;
}

/**
 * Load translations on demand with smart caching
 * Only loads if not already loaded and available
 */
export async function loadTranslationsOnDemand(
  locale: string,
): Promise<boolean> {
  if (loadedLocales.has(locale)) {
    return true;
  }

  if (!isLocaleAvailable(locale)) {
    return false;
  }

  try {
    await loadTranslations(locale);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get loading status for locales
 */
export function getLoadingStatus(): {
  loaded: string[];
  loading: string[];
  available: string[];
  supported: string[];
} {
  return {
    loaded: Array.from(loadedLocales),
    loading: Array.from(loadingCache.keys()),
    available: getAvailableLocales(),
    supported: getSupportedLocales(),
  };
}

/**
 * Clear translation cache (useful for development/testing)
 */
export function clearTranslationCache(): void {
  loadingCache.clear();
  loadedLocales.clear();
}

/**
 * Create a locale-specific translation loader
 * Provides a convenient API for loading translations for a specific locale
 */
export function createLocaleLoader(locale: string): {
  load: () => Promise<LocaleData>;
  preload: () => Promise<void>;
  isLoaded: () => boolean;
  isAvailable: () => boolean;
  isSupported: () => boolean;
} {
  return {
    async load(): Promise<LocaleData> {
      return loadTranslations(locale);
    },

    async preload(): Promise<void> {
      try {
        await loadTranslations(locale);
      } catch {
        // Ignore preload errors
      }
    },

    isLoaded(): boolean {
      return loadedLocales.has(locale);
    },

    isAvailable(): boolean {
      return isLocaleAvailable(locale);
    },

    isSupported(): boolean {
      return isLocaleSupported(locale);
    },
  };
}

/**
 * Batch loader for efficient loading of multiple locales
 */
export class BatchTranslationLoader {
  private locales: Set<string> = new Set();
  private loadingPromise: Promise<LocaleData[]> | null = null;

  add(locale: string): this {
    this.locales.add(locale);
    return this;
  }

  remove(locale: string): this {
    this.locales.delete(locale);
    return this;
  }

  clear(): this {
    this.locales.clear();
    this.loadingPromise = null;
    return this;
  }

  async load(): Promise<LocaleData[]> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    const localeList = Array.from(this.locales);
    this.loadingPromise = loadMultipleTranslations(localeList);

    try {
      return await this.loadingPromise;
    } finally {
      this.loadingPromise = null;
    }
  }

  getLocales(): string[] {
    return Array.from(this.locales);
  }
}

/**
 * Create a batch translation loader
 */
export function createBatchLoader(): BatchTranslationLoader {
  return new BatchTranslationLoader();
}
