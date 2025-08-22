/* eslint-disable max-statements */
// /src/theme/rtl-detection.ts
// Server-side RTL detection utilities for internationalization support
// Provides RTL/LTR detection from headers, locale, and user preferences with SSR compatibility
// RELEVANT FILES: server-theme.ts, layout.tsx, i18n/index.ts, logical-properties.css.ts

import { cookies, headers } from 'next/headers';

/**
 * Text direction types
 */
export type TextDirection = 'ltr' | 'rtl';

/**
 * Language configuration with direction information
 */
export interface LanguageConfig {
  /** Language code (e.g., 'en', 'ar', 'he') */
  code: string;
  /** Display name of the language */
  name: string;
  /** Text direction for this language */
  direction: TextDirection;
  /** Whether this language uses complex script shaping */
  isComplexScript?: boolean;
  /** Preferred font families for this language */
  preferredFonts?: string[];
}

/**
 * Comprehensive list of RTL languages and their configurations
 * Based on Unicode Bidirectional Algorithm and common web usage
 */
const RTL_LANGUAGES: Record<string, LanguageConfig> = {
  // Arabic variants
  ar: {
    code: 'ar',
    name: 'العربية',
    direction: 'rtl',
    isComplexScript: true,
  },
  'ar-SA': {
    code: 'ar-SA',
    name: 'العربية (السعودية)',
    direction: 'rtl',
    isComplexScript: true,
  },
  'ar-EG': {
    code: 'ar-EG',
    name: 'العربية (مصر)',
    direction: 'rtl',
    isComplexScript: true,
  },
  'ar-AE': {
    code: 'ar-AE',
    name: 'العربية (الإمارات)',
    direction: 'rtl',
    isComplexScript: true,
  },
  'ar-MA': {
    code: 'ar-MA',
    name: 'العربية (المغرب)',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Hebrew
  he: {
    code: 'he',
    name: 'עברית',
    direction: 'rtl',
    isComplexScript: true,
  },
  'he-IL': {
    code: 'he-IL',
    name: 'עברית (ישראל)',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Persian/Farsi
  fa: {
    code: 'fa',
    name: 'فارسی',
    direction: 'rtl',
    isComplexScript: true,
  },
  'fa-IR': {
    code: 'fa-IR',
    name: 'فارسی (ایران)',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Urdu
  ur: {
    code: 'ur',
    name: 'اردو',
    direction: 'rtl',
    isComplexScript: true,
  },
  'ur-PK': {
    code: 'ur-PK',
    name: 'اردو (پاکستان)',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Kurdish (Sorani)
  ckb: {
    code: 'ckb',
    name: 'کوردی',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Sindhi
  sd: {
    code: 'sd',
    name: 'سنڌي',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Pashto
  ps: {
    code: 'ps',
    name: 'پښتو',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Yiddish
  yi: {
    code: 'yi',
    name: 'ייִדיש',
    direction: 'rtl',
    isComplexScript: true,
  },

  // Dhivehi/Maldivian
  dv: {
    code: 'dv',
    name: 'ދިވެހި',
    direction: 'rtl',
    isComplexScript: true,
  },
};

/**
 * Default LTR language configuration
 */
const DEFAULT_LTR_CONFIG: LanguageConfig = {
  code: 'en',
  name: 'English',
  direction: 'ltr',
  isComplexScript: false,
};

/**
 * Server-side RTL detection with comprehensive locale support
 * Determines text direction from multiple sources with proper fallbacks
 *
 * Detection priority:
 * 1. Explicit user preference (cookie)
 * 2. Primary language from Accept-Language header
 * 3. Page-specific locale parameter
 * 4. Default to LTR
 */
export async function getServerTextDirection(): Promise<TextDirection> {
  try {
    // Check for explicit user preference in cookies
    const cookieStore = await cookies();
    const directionCookie = cookieStore.get('text-direction')?.value;

    if (directionCookie === 'rtl' || directionCookie === 'ltr') {
      return directionCookie as TextDirection;
    }

    // Detect from locale/language preference
    const detectedLanguage = await detectServerLanguage();
    const languageConfig = getLanguageConfig(detectedLanguage);

    return languageConfig.direction;
  } catch (error) {
    console.warn('RTL detection failed, defaulting to LTR:', error);
    return 'ltr';
  }
}

/**
 * Enhanced server-side language detection
 * Reads language preference from headers with quality value parsing
 */
export async function detectServerLanguage(): Promise<string> {
  try {
    const headersList = await headers();

    // Get Accept-Language header
    const acceptLanguage = headersList.get('accept-language');
    if (!acceptLanguage) {
      return DEFAULT_LTR_CONFIG.code;
    }

    // Parse Accept-Language header with quality values
    const languages = parseAcceptLanguage(acceptLanguage);

    // Find first supported language
    for (const lang of languages) {
      // Check exact match first (e.g., 'ar-SA')
      if (RTL_LANGUAGES[lang.code] || lang.code === 'en') {
        return lang.code;
      }

      // Check language family (e.g., 'ar' from 'ar-SA')
      const languageFamily = lang.code.split('-')[0];
      if (RTL_LANGUAGES[languageFamily]) {
        return languageFamily;
      }
    }

    // Fallback to English
    return DEFAULT_LTR_CONFIG.code;
  } catch (error) {
    console.warn('Language detection failed, defaulting to English:', error);
    return DEFAULT_LTR_CONFIG.code;
  }
}

/**
 * Parse Accept-Language header with quality values
 * Returns sorted array of languages by preference
 */
function parseAcceptLanguage(
  acceptLanguage: string,
): Array<{ code: string; quality: number }> {
  return acceptLanguage
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
}

/**
 * Get language configuration for a given language code
 * Supports both exact matches and language family fallbacks
 */
export function getLanguageConfig(languageCode: string): LanguageConfig {
  // Try exact match first
  const exactMatch = RTL_LANGUAGES[languageCode];
  if (exactMatch) {
    return exactMatch;
  }

  // Try language family (e.g., 'ar' from 'ar-SA')
  const languageFamily = languageCode.split('-')[0];
  const familyMatch = RTL_LANGUAGES[languageFamily];
  if (familyMatch) {
    return {
      ...familyMatch,
      code: languageCode, // Keep the specific variant code
    };
  }

  // Fallback to default LTR
  return {
    ...DEFAULT_LTR_CONFIG,
    code: languageCode,
  };
}

/**
 * Check if a language code represents an RTL language
 */
export function isRTLLanguage(languageCode: string): boolean {
  const config = getLanguageConfig(languageCode);
  return config.direction === 'rtl';
}

/**
 * Get all supported RTL languages
 */
export function getSupportedRTLLanguages(): LanguageConfig[] {
  return Object.values(RTL_LANGUAGES);
}

/**
 * Get all supported languages (both RTL and LTR)
 */
export function getSupportedLanguages(): LanguageConfig[] {
  return [DEFAULT_LTR_CONFIG, ...Object.values(RTL_LANGUAGES)];
}

/**
 * Generate HTML attributes for text direction
 * Provides consistent dir and lang attributes for layout components
 */
export function getTextDirectionAttributes(
  languageCode: string,
  direction?: TextDirection,
): Record<string, string> {
  const config = getLanguageConfig(languageCode);
  const finalDirection = direction || config.direction;

  return {
    lang: languageCode,
    dir: finalDirection,
  };
}

/**
 * Server-side utility to get complete locale information
 * Combines language, direction, and regional preferences
 */
export async function getServerLocaleInfo(): Promise<{
  language: string;
  direction: TextDirection;
  config: LanguageConfig;
  attributes: Record<string, string>;
}> {
  const language = await detectServerLanguage();
  const direction = await getServerTextDirection();
  const config = getLanguageConfig(language);
  const attributes = getTextDirectionAttributes(language, direction);

  return {
    language,
    direction,
    config,
    attributes,
  };
}

/**
 * CSS class name generator for text direction
 * Provides consistent class naming for directional styling
 */
export function getDirectionClassName(direction: TextDirection): string {
  return `direction-${direction}`;
}

/**
 * Get data attributes for text direction
 * Used in components that need to conditionally style based on direction
 */
export function getDirectionDataAttributes(
  direction: TextDirection,
): Record<string, string> {
  return {
    'data-direction': direction,
    'data-rtl': direction === 'rtl' ? 'true' : 'false',
  };
}

/**
 * Detect if browser supports RTL features
 * Useful for progressive enhancement of RTL functionality
 */
export function detectRTLSupport(): boolean {
  if (typeof window === 'undefined') {
    // Server-side, assume modern browser support
    return true;
  }

  // Check for CSS logical properties support
  const testElement = document.createElement('div');
  testElement.style.marginInlineStart = '1px';
  return testElement.style.marginInlineStart === '1px';
}

/**
 * Generate CSS for direction-specific styles
 * Helper for creating conditional styles in components
 */
export function createDirectionalStyles(
  ltrStyles: Record<string, string>,
  rtlStyles: Record<string, string>,
): string {
  const ltrCss = Object.entries(ltrStyles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');

  const rtlCss = Object.entries(rtlStyles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');

  return `
    [dir="ltr"] & { ${ltrCss} }
    [dir="rtl"] & { ${rtlCss} }
  `;
}
