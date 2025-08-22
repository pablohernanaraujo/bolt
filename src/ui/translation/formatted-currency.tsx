// /src/ui/translation/formatted-currency.tsx
// Server-compatible currency formatting component with RTL support
// Renders currency values with locale-aware formatting and positioning
// RELEVANT FILES: types.ts, formatted-number.tsx, formatters.ts, rtl-detection.ts

import { type ReactElement } from 'react';

import { formatCurrency } from '@/i18n/formatters';
import { getServerLocaleInfo } from '@/i18n/server-locale';

import { type FormattedCurrencyProps } from './types';

/**
 * Server-compatible FormattedCurrency component
 *
 * Renders currency values with locale-specific formatting, including:
 * - Currency symbols and codes
 * - Decimal and thousands separators
 * - RTL-aware currency positioning
 * - Localized numerals
 * - Custom currency display modes
 *
 * Features:
 * - Zero JavaScript required
 * - Server-side currency formatting
 * - Full locale support
 * - RTL/LTR currency positioning
 * - Multiple display modes (symbol, code, name)
 * - Accessibility attributes
 *
 * Usage:
 * ```tsx
 * <FormattedCurrency value={1234.56} currency="USD" />
 * <FormattedCurrency value={999.99} currency="EUR" locale="de-DE" />
 * <FormattedCurrency
 *   value={500}
 *   currency="SAR"
 *   options={{ currencyDisplay: 'code' }}
 *   locale="ar-SA"
 * />
 * ```
 */
export async function FormattedCurrency({
  value,
  currency: customCurrency,
  options = {},
  locale: customLocale,
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: FormattedCurrencyProps): Promise<ReactElement> {
  try {
    // Get locale information
    const localeInfo = customLocale
      ? {
          locale: customLocale,
          currency: customCurrency,
        } // Simplified for custom locale
      : await getServerLocaleInfo();

    // Use provided currency or default from locale
    const finalCurrency = customCurrency || localeInfo.currency || 'USD';

    // Format the currency with locale-specific options
    const formattedCurrency = formatCurrency(value, localeInfo.locale, {
      currency: finalCurrency,
      ...options,
    });

    // Build accessibility attributes
    const accessibilityProps = {
      'data-value': value,
      'data-currency': finalCurrency,
      'data-locale': localeInfo.locale,
      'data-formatted': 'currency',
      'aria-label': `${value} ${finalCurrency}`,
    };

    // Render formatted currency
    return (
      <Component className={className} {...accessibilityProps} {...props}>
        {formattedCurrency}
      </Component>
    );
  } catch (error) {
    console.warn('Currency formatting failed:', error);

    // Fallback rendering with basic currency display
    const fallbackCurrency = customCurrency || 'USD';
    const fallbackText = `${fallbackCurrency} ${value}`;

    return (
      <Component
        className={className}
        data-formatting-error="true"
        aria-label={`${value} ${fallbackCurrency}`}
        {...props}
      >
        {fallbackChildren || fallbackText}
      </Component>
    );
  }
}

/**
 * Synchronous version for client components
 */
export function FormattedCurrencySync({
  value,
  currency = 'USD',
  options = {},
  locale = 'en-US',
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: FormattedCurrencyProps & {
  locale: string;
  currency: string;
}): ReactElement {
  try {
    // Format the currency with locale-specific options
    const formattedCurrency = formatCurrency(value, locale, {
      currency,
      ...options,
    });

    // Build accessibility attributes
    const accessibilityProps = {
      'data-value': value,
      'data-currency': currency,
      'data-locale': locale,
      'data-formatted': 'currency',
      'aria-label': `${value} ${currency}`,
    };

    // Render formatted currency
    return (
      <Component className={className} {...accessibilityProps} {...props}>
        {formattedCurrency}
      </Component>
    );
  } catch (error) {
    console.warn('Currency formatting failed:', error);

    // Fallback rendering with basic currency display
    const fallbackText = `${currency} ${value}`;

    return (
      <Component
        className={className}
        data-formatting-error="true"
        aria-label={`${value} ${currency}`}
        {...props}
      >
        {fallbackChildren || fallbackText}
      </Component>
    );
  }
}
