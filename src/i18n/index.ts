// /src/i18n/index.ts
// Main internationalization system entry point with SSR support
// Provides server-compatible translation and localization utilities
// RELEVANT FILES: server-locale.ts, translations.ts, rtl-detection.ts, server-theme.ts

export {
  formatCurrency,
  formatDate,
  formatNumber,
  formatRelativeTime,
  type CurrencyFormatOptions,
  type DateFormatOptions,
  type NumberFormatOptions,
} from './formatters';
export {
  getAvailableLocales,
  getSupportedLocales,
  isLocaleSupported,
  loadTranslations,
  type LocaleData,
  type Translations,
} from './loader';
export {
  createTranslationHelper,
  getServerTranslation,
  type ServerTranslationHelper,
} from './server-hooks';
export {
  detectServerLocale,
  getServerLocaleInfo,
  type LocaleInfo,
} from './server-locale';
export {
  getTranslation,
  interpolate,
  translate,
  translateWithFallback,
  type TranslationFunction,
  type TranslationKey,
  type TranslationParams,
} from './translations';

// Re-export RTL detection utilities for convenience
export {
  detectServerLanguage,
  getLanguageConfig,
  getServerTextDirection,
  isRTLLanguage,
  type LanguageConfig,
  type TextDirection,
} from '../theme/rtl-detection';
