/* eslint-disable max-statements */
// /src/i18n/formatters.ts
// Internationalized formatting utilities for numbers, currency, and dates
// Provides server-compatible formatting with locale awareness and RTL support
// RELEVANT FILES: server-locale.ts, rtl-detection.ts, translations.ts

import { type LocaleInfo } from './server-locale';

/**
 * Number formatting options extending Intl.NumberFormatOptions
 */
export interface NumberFormatOptions extends Intl.NumberFormatOptions {
  /** Whether to use localized numerals (e.g., Arabic-Indic digits) */
  useLocalizedNumerals?: boolean;
  /** Custom thousands separator */
  thousandsSeparator?: string;
  /** Custom decimal separator */
  decimalSeparator?: string;
}

/**
 * Currency formatting options extending Intl.NumberFormatOptions
 */
export interface CurrencyFormatOptions extends Intl.NumberFormatOptions {
  /** Currency code (e.g., 'USD', 'EUR', 'SAR') */
  currency: string;
  /** Currency display mode */
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  /** Whether to show currency on the end (for RTL languages) */
  currencyPosition?: 'start' | 'end' | 'auto';
}

/**
 * Date formatting options extending Intl.DateTimeFormatOptions
 */
export interface DateFormatOptions extends Intl.DateTimeFormatOptions {
  /** Whether to use localized calendar system */
  useLocalizedCalendar?: boolean;
  /** Custom format template */
  template?: string;
  /** Whether to show relative time when appropriate */
  preferRelative?: boolean;
  /** Relative time threshold in hours */
  relativeThreshold?: number;
}

/**
 * Format a number according to locale preferences
 * Handles localized numerals and RTL-aware formatting
 */
export function formatNumber(
  value: number,
  locale: string,
  options: NumberFormatOptions = {},
): string {
  const {
    useLocalizedNumerals = false,
    thousandsSeparator,
    decimalSeparator,
    ...intlOptions
  } = options;

  try {
    // Use Intl.NumberFormat for base formatting
    const formatter = new Intl.NumberFormat(locale, intlOptions);
    let formatted = formatter.format(value);

    // Apply custom separators if specified
    if (thousandsSeparator || decimalSeparator) {
      formatted = applyCustomSeparators(formatted, locale, {
        thousandsSeparator,
        decimalSeparator,
      });
    }

    // Convert to localized numerals if requested
    if (useLocalizedNumerals) {
      formatted = convertToLocalizedNumerals(formatted, locale);
    }

    return formatted;
  } catch (error) {
    console.warn('Number formatting failed:', error);
    return String(value);
  }
}

/**
 * Format currency according to locale and currency preferences
 * Handles RTL currency positioning and localized symbols
 */
export function formatCurrency(
  value: number,
  locale: string,
  options: CurrencyFormatOptions,
): string {
  const {
    currency,
    currencyDisplay = 'symbol',
    currencyPosition = 'auto',
    ...intlOptions
  } = options;

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay,
      ...intlOptions,
    });

    let formatted = formatter.format(value);

    // Handle custom currency positioning for RTL languages
    if (currencyPosition !== 'auto') {
      formatted = adjustCurrencyPosition(
        formatted,
        currency,
        currencyPosition,
        locale,
      );
    }

    return formatted;
  } catch (error) {
    console.warn('Currency formatting failed:', error);
    return `${currency} ${value}`;
  }
}

/**
 * Format date according to locale preferences
 * Supports localized calendars and relative time formatting
 */
export function formatDate(
  date: Date | string | number,
  locale: string,
  options: DateFormatOptions = {},
): string {
  const {
    useLocalizedCalendar = false,
    template,
    preferRelative = false,
    relativeThreshold = 24,
    ...intlOptions
  } = options;

  try {
    const dateObj =
      typeof date === 'string' || typeof date === 'number'
        ? new Date(date)
        : date;

    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    // Check for relative time formatting
    if (preferRelative) {
      const relativeFormat = tryFormatRelativeTime(
        dateObj,
        locale,
        relativeThreshold,
      );
      if (relativeFormat) {
        return relativeFormat;
      }
    }

    // Use custom template if provided
    if (template) {
      return formatDateWithTemplate(dateObj, locale, template);
    }

    // Use localized calendar if requested
    const formatOptions = useLocalizedCalendar
      ? {
          ...intlOptions,
          calendar: getLocalizedCalendar(locale),
        }
      : intlOptions;

    const formatter = new Intl.DateTimeFormat(locale, formatOptions);
    return formatter.format(dateObj);
  } catch (error) {
    console.warn('Date formatting failed:', error);
    return String(date);
  }
}

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale: string,
  baseDate: Date = new Date(),
): string {
  try {
    const dateObj =
      typeof date === 'string' || typeof date === 'number'
        ? new Date(date)
        : date;

    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    const diffMs = dateObj.getTime() - baseDate.getTime();
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);
    const diffWeeks = Math.round(diffDays / 7);
    const diffMonths = Math.round(diffDays / 30);
    const diffYears = Math.round(diffDays / 365);

    // Determine the appropriate unit and value
    let value: number;
    let unit: Intl.RelativeTimeFormatUnit;

    if (Math.abs(diffYears) >= 1) {
      value = diffYears;
      unit = 'year';
    } else if (Math.abs(diffMonths) >= 1) {
      value = diffMonths;
      unit = 'month';
    } else if (Math.abs(diffWeeks) >= 1) {
      value = diffWeeks;
      unit = 'week';
    } else if (Math.abs(diffDays) >= 1) {
      value = diffDays;
      unit = 'day';
    } else if (Math.abs(diffHours) >= 1) {
      value = diffHours;
      unit = 'hour';
    } else if (Math.abs(diffMinutes) >= 1) {
      value = diffMinutes;
      unit = 'minute';
    } else {
      value = diffSeconds;
      unit = 'second';
    }

    const formatter = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
      style: 'long',
    });

    return formatter.format(value, unit);
  } catch (error) {
    console.warn('Relative time formatting failed:', error);
    return String(date);
  }
}

/**
 * Helper function to apply custom separators
 */
function applyCustomSeparators(
  formatted: string,
  locale: string,
  separators: {
    thousandsSeparator?: string;
    decimalSeparator?: string;
  },
): string {
  const { thousandsSeparator, decimalSeparator } = separators;

  // Get current separators from locale
  const currentSeparators = getLocaleSeparators(locale);

  let result = formatted;

  if (decimalSeparator && currentSeparators.decimal !== decimalSeparator) {
    result = result.replace(currentSeparators.decimal, decimalSeparator);
  }

  if (
    thousandsSeparator &&
    currentSeparators.thousands !== thousandsSeparator
  ) {
    const regex = new RegExp(`\\${currentSeparators.thousands}`, 'g');
    result = result.replace(regex, thousandsSeparator);
  }

  return result;
}

/**
 * Get locale-specific number separators
 */
function getLocaleSeparators(locale: string): {
  thousands: string;
  decimal: string;
} {
  try {
    const formatter = new Intl.NumberFormat(locale);
    const parts = formatter.formatToParts(1234.5);

    const thousands = parts.find((part) => part.type === 'group')?.value || ',';
    const decimal = parts.find((part) => part.type === 'decimal')?.value || '.';

    return {
      thousands,
      decimal,
    };
  } catch {
    return {
      thousands: ',',
      decimal: '.',
    };
  }
}

/**
 * Convert numbers to localized numerals
 */
function convertToLocalizedNumerals(text: string, locale: string): string {
  // Arabic-Indic numerals mapping
  const arabicNumerals: Record<string, string> = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
  };

  // Persian numerals mapping
  const persianNumerals: Record<string, string> = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };

  const language = locale.split('-')[0];

  let numeralMap: Record<string, string> | null = null;

  if (language === 'ar') {
    numeralMap = arabicNumerals;
  } else if (language === 'fa') {
    numeralMap = persianNumerals;
  }

  if (!numeralMap) {
    return text;
  }

  return text.replace(/[0-9]/g, (digit) => numeralMap![digit] || digit);
}

/**
 * Adjust currency position for RTL languages
 */
function adjustCurrencyPosition(
  formatted: string,
  currency: string,
  position: 'start' | 'end',
  locale: string,
): string {
  // This is a simplified implementation
  // In practice, you might need more sophisticated currency symbol detection
  const currencySymbols = ['$', '€', '£', '¥', '₹', '₪', 'ر.س', 'د.إ'];
  const foundSymbol = currencySymbols.find((symbol) =>
    formatted.includes(symbol),
  );

  if (!foundSymbol) {
    return formatted;
  }

  const number = formatted.replace(foundSymbol, '').trim();

  return position === 'start'
    ? `${foundSymbol} ${number}`
    : `${number} ${foundSymbol}`;
}

/**
 * Try to format relative time if within threshold
 */
function tryFormatRelativeTime(
  date: Date,
  locale: string,
  thresholdHours: number,
): string | null {
  const now = new Date();
  const diffHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffHours <= thresholdHours) {
    return formatRelativeTime(date, locale, now);
  }

  return null;
}

/**
 * Format date with custom template
 */
function formatDateWithTemplate(
  date: Date,
  locale: string,
  template: string,
): string {
  // Simple template replacement
  // In practice, you might want to use a more sophisticated templating system
  const replacements: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    HH: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0'),
  };

  let result = template;
  for (const [token, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(token, 'g'), value);
  }

  return result;
}

/**
 * Get localized calendar for a locale
 */
function getLocalizedCalendar(locale: string): string {
  const language = locale.split('-')[0];

  const calendarMap: Record<string, string> = {
    ar: 'islamic',
    fa: 'persian',
    he: 'hebrew',
    ja: 'japanese',
    th: 'buddhist',
  };

  return calendarMap[language] || 'gregory';
}

/**
 * Create formatters for a specific locale
 * Returns a set of pre-configured formatting functions
 */
export function createLocaleFormatters(
  localeInfo: LocaleInfo,
): Record<string, (...args: any[]) => string> {
  const { locale, currency, numberFormat, dateFormat } = localeInfo;

  return {
    formatNumber: (value: number, options?: NumberFormatOptions) =>
      formatNumber(value, locale, {
        ...numberFormat,
        ...options,
      }),

    formatCurrency: (value: number, options?: Partial<CurrencyFormatOptions>) =>
      formatCurrency(value, locale, {
        currency: currency || 'USD',
        ...options,
      }),

    formatDate: (date: Date | string | number, options?: DateFormatOptions) =>
      formatDate(date, locale, {
        ...dateFormat,
        ...options,
      }),

    formatRelativeTime: (date: Date | string | number, baseDate?: Date) =>
      formatRelativeTime(date, locale, baseDate),

    // Convenience methods for common formatting
    formatPrice: (value: number) =>
      formatCurrency(value, locale, {
        currency: currency || 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),

    formatPercent: (value: number) =>
      formatNumber(value, locale, {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),

    formatShortDate: (date: Date | string | number) =>
      formatDate(date, locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),

    formatLongDate: (date: Date | string | number) =>
      formatDate(date, locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }),

    formatTime: (date: Date | string | number) =>
      formatDate(date, locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: locale.startsWith('en-US'),
      }),
  };
}
