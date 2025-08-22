/* eslint-disable complexity */
/* eslint-disable max-statements */
// /src/ui/translation/formatted-date.tsx
// Server-compatible date formatting component with locale awareness
// Renders dates with locale-specific formatting and calendar systems
// RELEVANT FILES: types.ts, formatted-relative-time.tsx, formatters.ts, server-locale.ts

import { type ReactElement } from 'react';

import { formatDate, formatRelativeTime } from '@/i18n/formatters';
import { getServerLocaleInfo } from '@/i18n/server-locale';

import { type FormattedDateProps } from './types';

/**
 * Server-compatible FormattedDate component
 *
 * Renders dates with locale-specific formatting, including:
 * - Localized date formats
 * - Calendar system support (Gregorian, Islamic, Hebrew, etc.)
 * - Relative time formatting
 * - Time zone support
 * - Custom format styles
 *
 * Features:
 * - Zero JavaScript required
 * - Server-side date formatting
 * - Multiple calendar systems
 * - Relative time support
 * - Time zone awareness
 * - Accessibility attributes
 *
 * Usage:
 * ```tsx
 * <FormattedDate value={new Date()} />
 * <FormattedDate value="2024-01-15" style="long" />
 * <FormattedDate
 *   value={new Date()}
 *   relative
 *   relativeThreshold={24}
 *   locale="ar-SA"
 * />
 * <FormattedDate
 *   value={new Date()}
 *   options={{
 *     weekday: 'long',
 *     year: 'numeric',
 *     month: 'long',
 *     day: 'numeric'
 *   }}
 * />
 * ```
 */
export async function FormattedDate({
  value,
  options = {},
  style,
  relative = false,
  relativeThreshold = 24,
  locale: customLocale,
  as: Component = 'time',
  className,
  fallbackChildren,
  ...props
}: FormattedDateProps): Promise<ReactElement> {
  try {
    // Get locale information
    const localeInfo = customLocale
      ? { locale: customLocale } // Simplified for custom locale
      : await getServerLocaleInfo();

    // Convert value to Date object
    const dateObj =
      typeof value === 'string' || typeof value === 'number'
        ? new Date(value)
        : value;

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date value');
    }

    // Build formatting options based on style shorthand
    let finalOptions = { ...options };
    if (style && !Object.keys(options).length) {
      finalOptions = getStyleOptions(style);
    }

    // Check if we should use relative time formatting
    let formattedDate: string;
    if (relative) {
      const now = new Date();
      const diffHours =
        Math.abs(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);

      if (diffHours <= relativeThreshold) {
        formattedDate = formatRelativeTime(dateObj, localeInfo.locale, now);
      } else {
        formattedDate = formatDate(dateObj, localeInfo.locale, finalOptions);
      }
    } else {
      formattedDate = formatDate(dateObj, localeInfo.locale, finalOptions);
    }

    // Build accessibility attributes
    const isoString = dateObj.toISOString();
    const accessibilityProps = {
      dateTime: isoString,
      'data-value': isoString,
      'data-locale': localeInfo.locale,
      'data-formatted': 'date',
      'data-relative': relative,
      title: formatDate(dateObj, localeInfo.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    };

    // Render formatted date
    return (
      <Component className={className} {...accessibilityProps} {...props}>
        {formattedDate}
      </Component>
    );
  } catch (error) {
    console.warn('Date formatting failed:', error);

    // Fallback rendering
    const fallbackText =
      value instanceof Date ? value.toLocaleDateString() : String(value);

    return (
      <Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || fallbackText}
      </Component>
    );
  }
}

/**
 * Get formatting options for style shorthand
 */
function getStyleOptions(
  style: 'short' | 'medium' | 'long' | 'full',
): Intl.DateTimeFormatOptions {
  switch (style) {
    case 'short':
      return {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
    case 'medium':
      return {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
    case 'long':
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    case 'full':
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      };
    default:
      return {};
  }
}

/**
 * Synchronous version for client components
 */
export function FormattedDateSync({
  value,
  options = {},
  style,
  relative = false,
  relativeThreshold = 24,
  locale = 'en-US',
  as: Component = 'time',
  className,
  fallbackChildren,
  ...props
}: FormattedDateProps & { locale: string }): ReactElement {
  try {
    // Convert value to Date object
    const dateObj =
      typeof value === 'string' || typeof value === 'number'
        ? new Date(value)
        : value;

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date value');
    }

    // Build formatting options based on style shorthand
    let finalOptions = { ...options };
    if (style && !Object.keys(options).length) {
      finalOptions = getStyleOptions(style);
    }

    // Check if we should use relative time formatting
    let formattedDate: string;
    if (relative) {
      const now = new Date();
      const diffHours =
        Math.abs(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);

      if (diffHours <= relativeThreshold) {
        formattedDate = formatRelativeTime(dateObj, locale, now);
      } else {
        formattedDate = formatDate(dateObj, locale, finalOptions);
      }
    } else {
      formattedDate = formatDate(dateObj, locale, finalOptions);
    }

    // Build accessibility attributes
    const isoString = dateObj.toISOString();
    const accessibilityProps = {
      dateTime: isoString,
      'data-value': isoString,
      'data-locale': locale,
      'data-formatted': 'date',
      'data-relative': relative,
      title: formatDate(dateObj, locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    };

    // Render formatted date
    return (
      <Component className={className} {...accessibilityProps} {...props}>
        {formattedDate}
      </Component>
    );
  } catch (error) {
    console.warn('Date formatting failed:', error);

    // Fallback rendering
    const fallbackText =
      value instanceof Date ? value.toLocaleDateString() : String(value);

    return (
      <Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || fallbackText}
      </Component>
    );
  }
}
