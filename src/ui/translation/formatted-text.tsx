/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/translation/formatted-text.tsx
// Server-compatible formatted text component with rich interpolation
// Provides ICU message format style translations with parameter substitution
// RELEVANT FILES: types.ts, text.tsx, translations.ts, server-hooks.ts

import { type ReactElement } from 'react';

import { getServerLocaleInfo } from '@/i18n/server-locale';
import { interpolate, translate } from '@/i18n/translations';

import { type FormattedTextProps } from './types';

/**
 * Server-compatible FormattedText component
 *
 * Provides advanced text formatting with:
 * - ICU message format style syntax
 * - Rich parameter interpolation
 * - Pluralization support
 * - HTML escape safety
 * - Accessibility attributes
 * - Custom tag rendering
 *
 * Features:
 * - Zero JavaScript required
 * - Server-side text processing
 * - Safe HTML interpolation
 * - Parameter validation
 * - Fallback message support
 * - Accessibility descriptions
 *
 * Usage:
 * ```tsx
 * <FormattedText
 *   id="user.welcome"
 *   values={{ name: 'John', count: 5 }}
 *   defaultMessage="Welcome, {name}! You have {count} messages."
 * />
 *
 * <FormattedText
 *   id="items.count"
 *   values={{ count: 0 }}
 *   defaultMessage="You have {count} {count|zero:items|one:item|other:items}"
 * />
 * ```
 */
export async function FormattedText({
  id: translationKey,
  values = {},
  defaultMessage,
  description,
  locale: customLocale,
  fallbackLocale = 'en-US',
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: FormattedTextProps): Promise<ReactElement> {
  try {
    // Get locale information
    const localeInfo = customLocale
      ? { locale: customLocale } // Simplified for custom locale
      : await getServerLocaleInfo();

    // Translate the text
    const translatedText = translate(
      translationKey,
      localeInfo.locale,
      values,
      fallbackLocale,
    );

    // Use default message if translation failed and key was returned
    let finalText =
      translatedText === translationKey
        ? defaultMessage || translationKey
        : translatedText;

    // Apply additional interpolation if we have a default message and values
    if (finalText === defaultMessage && Object.keys(values).length > 0) {
      finalText = interpolate(finalText, values);
    }

    // Process the text for safe rendering
    const processedText = processFormattedText(finalText, values);

    // Build accessibility attributes
    const accessibilityProps = {
      'aria-describedby': description ? `${translationKey}-desc` : undefined,
      'data-translation-key': translationKey,
      'data-locale': localeInfo.locale,
      'data-formatted': 'text',
    };

    return (
      <>
        <Component className={className} {...accessibilityProps} {...props}>
          {processedText}
        </Component>
        {description && (
          <span
            id={`${translationKey}-desc`}
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            {description}
          </span>
        )}
      </>
    );
  } catch (error) {
    console.warn('Formatted text processing failed:', error);

    // Fallback rendering
    return (
      <Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || defaultMessage || translationKey}
      </Component>
    );
  }
}

/**
 * Process formatted text for safe rendering
 * Handles parameter substitution and basic formatting
 */
function processFormattedText(
  text: string,
  values: Record<string, any>,
): string {
  let processedText = text;

  // Handle basic parameter substitution that wasn't caught by interpolate
  Object.entries(values).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    if (processedText.includes(placeholder)) {
      processedText = processedText.replace(
        new RegExp(`\\{${key}\\}`, 'g'),
        String(value),
      );
    }
  });

  // Handle basic pluralization patterns
  processedText = processPluralization(processedText, values);

  // Escape any remaining HTML-like content for safety
  processedText = escapeHtmlContent(processedText);

  return processedText;
}

/**
 * Process basic pluralization patterns
 */
function processPluralization(
  text: string,
  values: Record<string, any>,
): string {
  const pluralPattern = /\{(\w+)\|([^}]+)\}/g;

  return text.replace(pluralPattern, (match, key, options) => {
    const count = Number(values[key]);
    if (isNaN(count)) return match;

    const optionPairs = options.split('|');
    const optionMap: Record<string, string> = {};

    optionPairs.forEach((pair: string) => {
      const [condition, value] = pair.split(':');
      if (condition && value) {
        optionMap[condition.trim()] = value.trim();
      }
    });

    // Simple pluralization logic
    if (count === 0 && optionMap.zero) return optionMap.zero;
    if (count === 1 && optionMap.one) return optionMap.one;
    if (count === 2 && optionMap.two) return optionMap.two;
    if (optionMap.other) return optionMap.other;

    return match;
  });
}

/**
 * Escape HTML content for safety
 */
function escapeHtmlContent(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Synchronous version for client components
 */
export function FormattedTextSync({
  id: translationKey,
  values = {},
  defaultMessage,
  description,
  locale = 'en-US',
  fallbackLocale = 'en-US',
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: FormattedTextProps & { locale: string }): ReactElement {
  try {
    // Translate the text
    const translatedText = translate(
      translationKey,
      locale,
      values,
      fallbackLocale,
    );

    // Use default message if translation failed and key was returned
    let finalText =
      translatedText === translationKey
        ? defaultMessage || translationKey
        : translatedText;

    // Apply additional interpolation if we have a default message and values
    if (finalText === defaultMessage && Object.keys(values).length > 0) {
      finalText = interpolate(finalText, values);
    }

    // Process the text for safe rendering
    const processedText = processFormattedText(finalText, values);

    // Build accessibility attributes
    const accessibilityProps = {
      'aria-describedby': description ? `${translationKey}-desc` : undefined,
      'data-translation-key': translationKey,
      'data-locale': locale,
      'data-formatted': 'text',
    };

    return (
      <>
        <Component className={className} {...accessibilityProps} {...props}>
          {processedText}
        </Component>
        {description && (
          <span
            id={`${translationKey}-desc`}
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            {description}
          </span>
        )}
      </>
    );
  } catch (error) {
    console.warn('Formatted text processing failed:', error);

    // Fallback rendering
    return (
      <Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || defaultMessage || translationKey}
      </Component>
    );
  }
}
