/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/i18n/server-hooks.ts
// Server-compatible translation hooks and utilities for SSR support
// Provides translation functionality that works identically on server and client
// RELEVANT FILES: translations.ts, server-locale.ts, loader.ts, formatters.ts

import {
  createLocaleFormatters,
  type CurrencyFormatOptions,
  type DateFormatOptions,
  type NumberFormatOptions,
} from './formatters';
import { isLocaleSupported, loadTranslations } from './loader';
import { detectServerLocale, type LocaleInfo } from './server-locale';
import {
  createScopedTranslator,
  translate,
  translateWithFallback,
  type TranslationFunction,
  type TranslationKey,
  type TranslationParams,
} from './translations';

/**
 * Server translation helper with formatting utilities
 */
export interface ServerTranslationHelper {
  /** Current locale information */
  locale: LocaleInfo;
  /** Translation function */
  t: TranslationFunction;
  /** Translation with explicit fallback */
  tf: (
    key: TranslationKey,
    fallback: string,
    params?: TranslationParams,
  ) => string;
  /** Scoped translation function */
  scope: (namespace: string) => TranslationFunction;
  /** Formatting utilities */
  format: {
    number: (value: number, options?: NumberFormatOptions) => string;
    currency: (
      value: number,
      options?: Partial<CurrencyFormatOptions>,
    ) => string;
    date: (date: Date | string | number, options?: DateFormatOptions) => string;
    relativeTime: (date: Date | string | number, baseDate?: Date) => string;
    price: (value: number) => string;
    percent: (value: number) => string;
    shortDate: (date: Date | string | number) => string;
    longDate: (date: Date | string | number) => string;
    time: (date: Date | string | number) => string;
  };
}

/**
 * Server-side translation hook
 * Provides a complete translation and formatting solution for SSR
 */
export async function getServerTranslation(
  requestedLocale?: string,
  fallbackLocale = 'en-US',
): Promise<ServerTranslationHelper> {
  // Detect locale if not provided
  const locale = requestedLocale
    ? await getLocaleInfo(requestedLocale)
    : await detectServerLocale();

  // Ensure translations are loaded
  await ensureTranslationsLoaded(locale.locale, fallbackLocale);

  // Create formatters
  const formatters = createLocaleFormatters(locale);

  // Create translation functions
  const t: TranslationFunction = (key, params) =>
    translate(key, locale.locale, params, fallbackLocale);

  const tf = (
    key: TranslationKey,
    fallback: string,
    params?: TranslationParams,
  ): string => translateWithFallback(key, locale.locale, fallback, params);

  const scope = (namespace: string): TranslationFunction =>
    createScopedTranslator(namespace, locale.locale);

  return {
    locale,
    t,
    tf,
    scope,
    format: {
      number: formatters.formatNumber,
      currency: formatters.formatCurrency,
      date: formatters.formatDate,
      relativeTime: formatters.formatRelativeTime,
      price: formatters.formatPrice,
      percent: formatters.formatPercent,
      shortDate: formatters.formatShortDate,
      longDate: formatters.formatLongDate,
      time: formatters.formatTime,
    },
  };
}

/**
 * Create a translation helper for a specific locale
 * Useful for components that need to work with a specific locale
 */
export async function createTranslationHelper(
  localeCode: string,
  fallbackLocale = 'en-US',
): Promise<ServerTranslationHelper> {
  return await getServerTranslation(localeCode, fallbackLocale);
}

/**
 * Get locale information for a specific locale code
 */
async function getLocaleInfo(localeCode: string): Promise<LocaleInfo> {
  try {
    // Import server locale detection to build locale info
    //const { getServerLocaleInfo } = await import('./server-locale');

    // For now, we'll create a basic locale info
    // In a real implementation, this might involve more sophisticated detection
    const [language, region] = localeCode.split('-');
    const { getLanguageConfig, getServerTextDirection } = await import(
      '../theme/rtl-detection'
    );

    const languageConfig = getLanguageConfig(language);
    const direction = await getServerTextDirection();

    return {
      locale: localeCode,
      language,
      region,
      direction,
      languageConfig,
      currency: getDefaultCurrency(localeCode),
      timezone: getDefaultTimezone(localeCode),
    };
  } catch (error) {
    console.warn('Failed to get locale info, using defaults:', error);

    // Fallback locale info
    return {
      locale: localeCode,
      language: localeCode.split('-')[0],
      region: localeCode.split('-')[1],
      direction: 'ltr',
      languageConfig: {
        code: localeCode.split('-')[0],
        name: localeCode,
        direction: 'ltr',
      },
    };
  }
}

/**
 * Ensure translations are loaded for the given locales
 */
async function ensureTranslationsLoaded(
  primaryLocale: string,
  fallbackLocale: string,
): Promise<void> {
  const loadingPromises: Promise<any>[] = [];

  // Load primary locale if supported
  if (isLocaleSupported(primaryLocale)) {
    loadingPromises.push(
      loadTranslations(primaryLocale).catch((error) => {
        console.warn(
          `Failed to load translations for ${primaryLocale}:`,
          error,
        );
      }),
    );
  }

  // Load fallback locale if different and supported
  if (fallbackLocale !== primaryLocale && isLocaleSupported(fallbackLocale)) {
    loadingPromises.push(
      loadTranslations(fallbackLocale).catch((error) => {
        console.warn(
          `Failed to load fallback translations for ${fallbackLocale}:`,
          error,
        );
      }),
    );
  }

  // Wait for all translations to load
  await Promise.all(loadingPromises);
}

/**
 * Get default currency for a locale
 */
function getDefaultCurrency(locale: string): string {
  const currencyMap: Record<string, string> = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-CA': 'CAD',
    'en-AU': 'AUD',
    'ar-SA': 'SAR',
    'ar-AE': 'AED',
    'ar-EG': 'EGP',
    'ar-MA': 'MAD',
    'he-IL': 'ILS',
    'fa-IR': 'IRR',
    'fr-FR': 'EUR',
    'de-DE': 'EUR',
    'es-ES': 'EUR',
    'it-IT': 'EUR',
    'ja-JP': 'JPY',
    'ko-KR': 'KRW',
    'zh-CN': 'CNY',
    'zh-TW': 'TWD',
  };

  return currencyMap[locale] || 'USD';
}

/**
 * Get default timezone for a locale
 */
function getDefaultTimezone(locale: string): string {
  const timezoneMap: Record<string, string> = {
    'en-US': 'America/New_York',
    'en-GB': 'Europe/London',
    'en-CA': 'America/Toronto',
    'en-AU': 'Australia/Sydney',
    'ar-SA': 'Asia/Riyadh',
    'ar-AE': 'Asia/Dubai',
    'ar-EG': 'Africa/Cairo',
    'ar-MA': 'Africa/Casablanca',
    'he-IL': 'Asia/Jerusalem',
    'fa-IR': 'Asia/Tehran',
    'fr-FR': 'Europe/Paris',
    'de-DE': 'Europe/Berlin',
    'es-ES': 'Europe/Madrid',
    'it-IT': 'Europe/Rome',
    'ja-JP': 'Asia/Tokyo',
    'ko-KR': 'Asia/Seoul',
    'zh-CN': 'Asia/Shanghai',
    'zh-TW': 'Asia/Taipei',
  };

  return timezoneMap[locale] || 'UTC';
}

/**
 * Create a component-scoped translation helper
 * Provides automatic key prefixing for component translations
 */
export async function createComponentTranslationHelper(
  componentName: string,
  locale?: string,
  fallbackLocale = 'en-US',
): Promise<{
  t: TranslationFunction;
  tf: (
    key: TranslationKey,
    fallback: string,
    params?: TranslationParams,
  ) => string;
  format: ServerTranslationHelper['format'];
}> {
  const helper = await getServerTranslation(locale, fallbackLocale);

  const componentT: TranslationFunction = (key, params) => {
    const scopedKey = `${componentName}.${key}`;
    return helper.t(scopedKey, params);
  };

  const componentTf = (
    key: TranslationKey,
    fallback: string,
    params?: TranslationParams,
  ): string => {
    const scopedKey = `${componentName}.${key}`;
    return helper.tf(scopedKey, fallback, params);
  };

  return {
    t: componentT,
    tf: componentTf,
    format: helper.format,
  };
}

/**
 * Server-side translation provider for component trees
 * Provides a way to pass translation context down through server components
 */
export class ServerTranslationProvider {
  private helper: ServerTranslationHelper | null = null;

  async initialize(locale?: string, fallbackLocale = 'en-US'): Promise<void> {
    this.helper = await getServerTranslation(locale, fallbackLocale);
  }

  getHelper(): ServerTranslationHelper {
    if (!this.helper) {
      throw new Error(
        'ServerTranslationProvider not initialized. Call initialize() first.',
      );
    }
    return this.helper;
  }

  t(key: TranslationKey, params?: TranslationParams): string {
    return this.getHelper().t(key, params);
  }

  tf(
    key: TranslationKey,
    fallback: string,
    params?: TranslationParams,
  ): string {
    return this.getHelper().tf(key, fallback, params);
  }

  scope(namespace: string): TranslationFunction {
    return this.getHelper().scope(namespace);
  }

  get format(): ServerTranslationHelper['format'] {
    return this.getHelper().format;
  }

  get locale(): LocaleInfo {
    return this.getHelper().locale;
  }
}

/**
 * Create a server translation provider
 */
export function createServerTranslationProvider(): ServerTranslationProvider {
  return new ServerTranslationProvider();
}

/**
 * Utility for server-side conditional translation
 * Useful for rendering different content based on locale/direction
 */
export function translateConditional(
  condition: boolean,
  trueKey: TranslationKey,
  falseKey: TranslationKey,
  helper: ServerTranslationHelper,
  params?: TranslationParams,
): string {
  const key = condition ? trueKey : falseKey;
  return helper.t(key, params);
}

/**
 * Utility for direction-aware translation
 * Chooses translation based on text direction (RTL vs LTR)
 */
export function translateDirectional(
  ltrKey: TranslationKey,
  rtlKey: TranslationKey,
  helper: ServerTranslationHelper,
  params?: TranslationParams,
): string {
  const isRTL = helper.locale.direction === 'rtl';
  return translateConditional(isRTL, rtlKey, ltrKey, helper, params);
}

/**
 * Utility for pluralization in server-side translations
 * Handles basic plural rules for different languages
 */
export function translatePlural(
  key: TranslationKey,
  count: number,
  helper: ServerTranslationHelper,
  params?: TranslationParams,
): string {
  const language = helper.locale.language;
  const pluralRule = getPluralRule(count, language);
  const pluralKey = `${key}.${pluralRule}`;

  const finalParams = {
    ...params,
    count,
  } as TranslationParams;

  // Try plural key first, then fallback to base key
  const translation = helper.t(pluralKey, finalParams);
  return translation === pluralKey ? helper.t(key, finalParams) : translation;
}

/**
 * Get plural rule for a count and language
 */
function getPluralRule(count: number, language: string): string {
  // Simplified plural rules - in production, use Intl.PluralRules
  if (count === 0) return 'zero';
  if (count === 1) return 'one';
  if (count === 2 && (language === 'ar' || language === 'he')) return 'two';
  return 'other';
}
