// /src/ui/translation/text.tsx
// Server-compatible text translation component
// Renders translated text with parameter interpolation and fallback support
// RELEVANT FILES: types.ts, formatted-text.tsx, server-hooks.ts, translations.ts

import { type ReactElement } from 'react';

import { getServerLocaleInfo } from '@/i18n/server-locale';
import { translate } from '@/i18n/translations';

import { type TextProps } from './types';

/**
 * Server-compatible Text component for internationalization
 *
 * Renders translated text using server-side translation resolution.
 * Works without JavaScript and provides consistent SSR/CSR behavior.
 *
 * Features:
 * - Zero JavaScript required
 * - Server-side translation resolution
 * - Parameter interpolation
 * - Fallback text support
 * - Scoped translations
 * - Custom element rendering
 * - Locale override support
 *
 * Usage:
 * ```tsx
 * <Text>common.welcome</Text>
 * <Text params={{ name: 'John' }}>user.greeting</Text>
 * <Text defaultText="Hello" fallbackLocale="en">greeting</Text>
 * <Text scope="forms" as="label">validation.required</Text>
 * ```
 */
export async function Text({
  children: translationKey,
  params,
  defaultText,
  scope,
  locale: customLocale,
  fallbackLocale = 'en-US',
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: TextProps): Promise<ReactElement> {
  try {
    // Get locale information
    const localeInfo = customLocale
      ? { locale: customLocale } // Simplified for custom locale
      : await getServerLocaleInfo();

    // Build translation key with scope if provided
    const finalKey = scope ? `${scope}.${translationKey}` : translationKey;

    // Translate the text
    const translatedText = translate(
      finalKey,
      localeInfo.locale,
      params,
      fallbackLocale,
    );

    // Use default text if translation failed and key was returned
    const finalText =
      translatedText === finalKey
        ? defaultText || translationKey
        : translatedText;

    // Render as specified element
    return (
      <Component
        className={className}
        data-translation-key={finalKey}
        data-locale={localeInfo.locale}
        {...props}
      >
        {finalText}
      </Component>
    );
  } catch (error) {
    console.warn('Translation failed:', error);

    // Fallback rendering
    return (
      <Component className={className} data-translation-error="true" {...props}>
        {fallbackChildren || defaultText || translationKey}
      </Component>
    );
  }
}

/**
 * Synchronous version of Text component for use in client components
 * Uses pre-loaded translations and current locale context
 */
export function TextSync({
  children: translationKey,
  params,
  defaultText,
  scope,
  locale = 'en-US',
  fallbackLocale = 'en-US',
  as: Component = 'span',
  className,
  fallbackChildren,
  ...props
}: TextProps & { locale: string }): ReactElement {
  try {
    // Build translation key with scope if provided
    const finalKey = scope ? `${scope}.${translationKey}` : translationKey;

    // Translate the text synchronously
    const translatedText = translate(finalKey, locale, params, fallbackLocale);

    // Use default text if translation failed and key was returned
    const finalText =
      translatedText === finalKey
        ? defaultText || translationKey
        : translatedText;

    // Render as specified element
    return (
      <Component
        className={className}
        data-translation-key={finalKey}
        data-locale={locale}
        {...props}
      >
        {finalText}
      </Component>
    );
  } catch (error) {
    console.warn('Translation failed:', error);

    // Fallback rendering
    return (
      <Component className={className} data-translation-error="true" {...props}>
        {fallbackChildren || defaultText || translationKey}
      </Component>
    );
  }
}
