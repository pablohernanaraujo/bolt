// /src/ui/translation/formatted-number.tsx
// Server-compatible number formatting component
// Renders formatted numbers with locale-aware formatting and RTL support
// RELEVANT FILES: types.ts, text.tsx, formatters.ts, server-locale.ts

import { type ReactElement } from 'react';

import { formatNumber } from '@/i18n/formatters';
import { getServerLocaleInfo } from '@/i18n/server-locale';

import { type FormattedNumberProps } from './types';

/**
 * Server-compatible FormattedNumber component
 *
 * Renders numbers with locale-specific formatting, including:
 * - Decimal and thousands separators
 * - Localized numerals (Arabic-Indic, Persian, etc.)
 * - RTL-aware number positioning
 * - Currency and percentage formatting
 * - Custom formatting options
 *
 * Features:
 * - Zero JavaScript required
 * - Server-side number formatting
 * - Full locale support
 * - RTL/LTR compatibility
 * - Custom formatting options
 * - Accessibility attributes
 *
 * Usage:
 * ```tsx
 * <FormattedNumber value={1234.56} />
 * <FormattedNumber value={0.75} options={{ style: 'percent' }} />
 * <FormattedNumber value={42} useLocalizedNumerals locale="ar-SA" />
 * ```
 */
export async function FormattedNumber({
  value,
  options = {},
  useLocalizedNumerals = false,
  locale: customLocale,
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: FormattedNumberProps): Promise<ReactElement> {
  try {
    // Get locale information
    const localeInfo = customLocale
      ? { locale: customLocale } // Simplified for custom locale
      : await getServerLocaleInfo();

    // Format the number with locale-specific options
    const formattedNumber = formatNumber(value, localeInfo.locale, {
      useLocalizedNumerals,
      ...options,
    });

    // Render formatted number
    return (
      <Component
        className={className}
        data-value={value}
        data-locale={localeInfo.locale}
        data-formatted="number"
        {...props}
      >
        {formattedNumber}
      </Component>
    );
  } catch (error) {
    console.warn('Number formatting failed:', error);

    // Fallback rendering
    return (
      <Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || String(value)}
      </Component>
    );
  }
}

/**
 * Synchronous version for client components
 */
export function FormattedNumberSync({
  value,
  options = {},
  useLocalizedNumerals = false,
  locale = 'en-US',
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: FormattedNumberProps & { locale: string }): ReactElement {
  try {
    // Format the number with locale-specific options
    const formattedNumber = formatNumber(value, locale, {
      useLocalizedNumerals,
      ...options,
    });

    // Render formatted number
    return (
      <Component
        className={className}
        data-value={value}
        data-locale={locale}
        data-formatted="number"
        {...props}
      >
        {formattedNumber}
      </Component>
    );
  } catch (error) {
    console.warn('Number formatting failed:', error);

    // Fallback rendering
    return (
      <Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || String(value)}
      </Component>
    );
  }
}
