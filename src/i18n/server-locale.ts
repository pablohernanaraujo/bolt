/* eslint-disable max-statements */
// /src/i18n/server-locale.ts
// Server-side locale detection and configuration for SSR compatibility
// Provides comprehensive locale detection from headers and user preferences
// RELEVANT FILES: rtl-detection.ts, server-theme.ts, translations.ts, formatters.ts

import { cookies, headers } from 'next/headers';

import {
  getLanguageConfig,
  getServerTextDirection,
  type LanguageConfig,
  type TextDirection,
} from '../theme/rtl-detection';

/**
 * Complete locale information including language, region, and formatting preferences
 */
export interface LocaleInfo {
  /** Full locale code (e.g., 'en-US', 'ar-SA') */
  locale: string;
  /** Language code (e.g., 'en', 'ar') */
  language: string;
  /** Region/country code (e.g., 'US', 'SA') */
  region?: string;
  /** Text direction for this locale */
  direction: TextDirection;
  /** Language configuration */
  languageConfig: LanguageConfig;
  /** Preferred currency code */
  currency?: string;
  /** Preferred timezone */
  timezone?: string;
  /** Number formatting preferences */
  numberFormat?: Intl.NumberFormatOptions;
  /** Date formatting preferences */
  dateFormat?: Intl.DateTimeFormatOptions;
}

/**
 * Currency information for locales
 */
interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

/**
 * Locale to currency mappings based on common regional preferences
 */
const LOCALE_CURRENCIES: Record<string, CurrencyInfo> = {
  // English locales
  'en-US': {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  },
  'en-GB': {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
  },
  'en-CA': {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
  },
  'en-AU': {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
  },
  // Arabic locales
  'ar-SA': {
    code: 'SAR',
    symbol: 'ر.س',
    name: 'Saudi Riyal',
  },
  'ar-AE': {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
  },
  'ar-EG': {
    code: 'EGP',
    symbol: 'ج.م',
    name: 'Egyptian Pound',
  },
  'ar-MA': {
    code: 'MAD',
    symbol: 'د.م.',
    name: 'Moroccan Dirham',
  },
  // Hebrew locales
  'he-IL': {
    code: 'ILS',
    symbol: '₪',
    name: 'Israeli Shekel',
  },

  // Persian locales
  'fa-IR': {
    code: 'IRR',
    symbol: '﷼',
    name: 'Iranian Rial',
  },

  // European locales
  'fr-FR': {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
  'de-DE': {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
  'es-ES': {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
  'it-IT': {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
  // Asian locales
  'ja-JP': {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
  },
  'ko-KR': {
    code: 'KRW',
    symbol: '₩',
    name: 'Korean Won',
  },
  'zh-CN': {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
  },
};

/**
 * Default locale configuration
 */
const DEFAULT_LOCALE_INFO: LocaleInfo = {
  locale: 'en-US',
  language: 'en',
  region: 'US',
  direction: 'ltr',
  languageConfig: {
    code: 'en',
    name: 'English',
    direction: 'ltr',
  },
  currency: 'USD',
  timezone: 'America/New_York',
  numberFormat: {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
  dateFormat: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
};

/**
 * Comprehensive server-side locale detection
 * Detects locale from multiple sources with intelligent fallbacks
 *
 * Detection priority:
 * 1. Explicit user preference (cookie)
 * 2. Accept-Language header with quality values
 * 3. Cloudflare or other CDN country headers
 * 4. Default locale
 */
export async function detectServerLocale(): Promise<LocaleInfo> {
  try {
    // Check for explicit user preference
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('locale')?.value;

    if (localeCookie && isValidLocale(localeCookie)) {
      return await buildLocaleInfo(localeCookie);
    }

    // Detect from headers
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');

    if (acceptLanguage) {
      const detectedLocale = parseAcceptLanguageForLocale(acceptLanguage);
      if (detectedLocale) {
        return await buildLocaleInfo(detectedLocale);
      }
    }

    // Try to get country from CDN headers
    const countryCode =
      headersList.get('cf-ipcountry') || // Cloudflare
      headersList.get('x-country-code') || // Other CDNs
      headersList.get('x-forwarded-country');

    if (countryCode) {
      const localeFromCountry = getLocaleFromCountry(countryCode);
      if (localeFromCountry) {
        return await buildLocaleInfo(localeFromCountry);
      }
    }

    // Fallback to default
    return DEFAULT_LOCALE_INFO;
  } catch (error) {
    console.warn('Locale detection failed, using default:', error);
    return DEFAULT_LOCALE_INFO;
  }
}

/**
 * Get complete server locale information
 * Combines locale detection with text direction and formatting preferences
 */
export async function getServerLocaleInfo(): Promise<LocaleInfo> {
  return await detectServerLocale();
}

/**
 * Parse Accept-Language header to extract preferred locale
 * Handles quality values and finds best supported locale
 */
function parseAcceptLanguageForLocale(acceptLanguage: string): string | null {
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const parts = lang.trim().split(';q=');
      const code = parts[0].trim();
      const quality = parts[1] ? parseFloat(parts[1]) : 1.0;
      return {
        code,
        quality,
      };
    })
    .filter((lang) => lang.code && lang.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  // Try to find exact locale match first
  for (const lang of languages) {
    if (isValidLocale(lang.code)) {
      return lang.code;
    }
  }

  // Try to find language family match with common region
  for (const lang of languages) {
    const languageCode = lang.code.split('-')[0];
    const commonLocale = getCommonLocaleForLanguage(languageCode);
    if (commonLocale) {
      return commonLocale;
    }
  }

  return null;
}

/**
 * Get common locale for a language code
 * Returns the most common regional variant for a language
 */
function getCommonLocaleForLanguage(languageCode: string): string | null {
  const commonLocales: Record<string, string> = {
    en: 'en-US',
    ar: 'ar-SA',
    he: 'he-IL',
    fa: 'fa-IR',
    ur: 'ur-PK',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN',
    pt: 'pt-BR',
    ru: 'ru-RU',
    tr: 'tr-TR',
    hi: 'hi-IN',
  };

  return commonLocales[languageCode] || null;
}

/**
 * Get likely locale from country code
 * Maps country codes to common locales
 */
function getLocaleFromCountry(countryCode: string): string | null {
  const countryToLocale: Record<string, string> = {
    US: 'en-US',
    GB: 'en-GB',
    CA: 'en-CA',
    AU: 'en-AU',
    SA: 'ar-SA',
    AE: 'ar-AE',
    EG: 'ar-EG',
    MA: 'ar-MA',
    IL: 'he-IL',
    IR: 'fa-IR',
    PK: 'ur-PK',
    FR: 'fr-FR',
    DE: 'de-DE',
    ES: 'es-ES',
    IT: 'it-IT',
    JP: 'ja-JP',
    KR: 'ko-KR',
    CN: 'zh-CN',
    TW: 'zh-TW',
    BR: 'pt-BR',
    RU: 'ru-RU',
    TR: 'tr-TR',
    IN: 'hi-IN',
  };

  return countryToLocale[countryCode.toUpperCase()] || null;
}

/**
 * Build complete locale information from a locale code
 */
async function buildLocaleInfo(localeCode: string): Promise<LocaleInfo> {
  const [language, region] = localeCode.split('-');

  // Get language configuration and text direction
  const languageConfig = getLanguageConfig(language);
  const direction = await getServerTextDirection();

  // Get currency information
  const currencyInfo = LOCALE_CURRENCIES[localeCode] ||
    LOCALE_CURRENCIES[
      `${language}-${getDefaultRegionForLanguage(language)}`
    ] || {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
    };

  // Get timezone (attempt to detect from headers or use default)
  const timezone = await detectTimezone(region);

  // Create number format options based on locale
  const numberFormat = createNumberFormatOptions(localeCode);

  // Create date format options based on locale
  const dateFormat = createDateFormatOptions(localeCode);

  return {
    locale: localeCode,
    language,
    region,
    direction,
    languageConfig,
    currency: currencyInfo.code,
    timezone,
    numberFormat,
    dateFormat,
  };
}

/**
 * Get default region for a language
 */
function getDefaultRegionForLanguage(language: string): string {
  const defaults: Record<string, string> = {
    en: 'US',
    ar: 'SA',
    he: 'IL',
    fa: 'IR',
    ur: 'PK',
    fr: 'FR',
    de: 'DE',
    es: 'ES',
    it: 'IT',
    ja: 'JP',
    ko: 'KR',
    zh: 'CN',
    pt: 'BR',
    ru: 'RU',
    tr: 'TR',
    hi: 'IN',
  };

  return defaults[language] || 'US';
}

/**
 * Detect timezone from region or headers
 */
async function detectTimezone(region?: string): Promise<string> {
  try {
    const headersList = await headers();

    // Try to get timezone from headers
    const timezoneHeader =
      headersList.get('x-timezone') || headersList.get('cf-timezone');

    if (timezoneHeader && isValidTimezone(timezoneHeader)) {
      return timezoneHeader;
    }

    // Fallback to region-based timezone
    if (region) {
      const regionTimezone = getTimezoneForRegion(region);
      if (regionTimezone) {
        return regionTimezone;
      }
    }

    return 'UTC';
  } catch {
    return 'UTC';
  }
}

/**
 * Get primary timezone for a region
 */
function getTimezoneForRegion(region: string): string | null {
  const regionTimezones: Record<string, string> = {
    US: 'America/New_York',
    GB: 'Europe/London',
    CA: 'America/Toronto',
    AU: 'Australia/Sydney',
    SA: 'Asia/Riyadh',
    AE: 'Asia/Dubai',
    EG: 'Africa/Cairo',
    MA: 'Africa/Casablanca',
    IL: 'Asia/Jerusalem',
    IR: 'Asia/Tehran',
    PK: 'Asia/Karachi',
    FR: 'Europe/Paris',
    DE: 'Europe/Berlin',
    ES: 'Europe/Madrid',
    IT: 'Europe/Rome',
    JP: 'Asia/Tokyo',
    KR: 'Asia/Seoul',
    CN: 'Asia/Shanghai',
    TW: 'Asia/Taipei',
    BR: 'America/Sao_Paulo',
    RU: 'Europe/Moscow',
    TR: 'Europe/Istanbul',
    IN: 'Asia/Kolkata',
  };

  return regionTimezones[region.toUpperCase()] || null;
}

/**
 * Create number format options for a locale
 */
function createNumberFormatOptions(locale: string): Intl.NumberFormatOptions {
  // Different locales may have different number formatting preferences

  return {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    // Arabic numerals vs localized numerals can be handled at component level
  };
}

/**
 * Create date format options for a locale
 */
function createDateFormatOptions(locale: string): Intl.DateTimeFormatOptions {
  const isUS = locale === 'en-US';

  return {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // US uses different date ordering
    ...(isUS && {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

/**
 * Validate if a locale code is properly formatted
 */
function isValidLocale(locale: string): boolean {
  // Basic validation for locale format (language-region)
  const localeRegex = /^[a-z]{2,3}(-[A-Z]{2})?$/;
  return localeRegex.test(locale);
}

/**
 * Validate if a timezone identifier is valid
 */
function isValidTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}
