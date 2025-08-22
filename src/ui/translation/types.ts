/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/translation/types.ts
// Type definitions for translation components
// Provides comprehensive types for server-side translation functionality
// RELEVANT FILES: text.tsx, formatted-text.tsx, server-hooks.ts, i18n/translations.ts

import { type ElementType, type ReactNode } from 'react';

import {
  type CurrencyFormatOptions,
  type DateFormatOptions,
  type NumberFormatOptions,
} from '@/i18n/formatters';
import { type LocaleInfo } from '@/i18n/server-locale';
import {
  type TranslationKey,
  type TranslationParams,
} from '@/i18n/translations';

/**
 * Base props for translation components
 */
export interface BaseTranslationProps {
  /** Custom locale override */
  locale?: string;
  /** Fallback locale if translation is missing */
  fallbackLocale?: string;
  /** HTML element to render as */
  as?: ElementType;
  /** Custom className */
  className?: string;
  /** Custom children to render if translation is missing */
  fallbackChildren?: ReactNode;
}

/**
 * Props for the Text component
 */
export interface TextProps extends BaseTranslationProps {
  /** Translation key to look up */
  children: TranslationKey;
  /** Parameters for interpolation */
  params?: TranslationParams;
  /** Default text if translation is missing */
  defaultText?: string;
  /** Component name for scoped translations */
  scope?: string;
}

/**
 * Props for the FormattedText component
 */
export interface FormattedTextProps extends BaseTranslationProps {
  /** Translation key */
  id: TranslationKey;
  /** Parameters for interpolation */
  values?: TranslationParams;
  /** Default message if translation is missing */
  defaultMessage?: string;
  /** HTML description for accessibility */
  description?: string;
}

/**
 * Props for the FormattedNumber component
 */
export interface FormattedNumberProps extends BaseTranslationProps {
  /** Number value to format */
  value: number;
  /** Formatting options */
  options?: NumberFormatOptions;
  /** Whether to use localized numerals */
  useLocalizedNumerals?: boolean;
}

/**
 * Props for the FormattedCurrency component
 */
export interface FormattedCurrencyProps extends BaseTranslationProps {
  /** Currency value to format */
  value: number;
  /** Currency code (e.g., 'USD', 'EUR') */
  currency?: string;
  /** Formatting options */
  options?: Partial<CurrencyFormatOptions>;
}

/**
 * Props for the FormattedDate component
 */
export interface FormattedDateProps extends BaseTranslationProps {
  /** Date value to format */
  value: Date | string | number;
  /** Formatting options */
  options?: DateFormatOptions;
  /** Format style shorthand */
  style?: 'short' | 'medium' | 'long' | 'full';
  /** Whether to prefer relative time */
  relative?: boolean;
  /** Relative time threshold in hours */
  relativeThreshold?: number;
}

/**
 * Props for the FormattedRelativeTime component
 */
export interface FormattedRelativeTimeProps extends BaseTranslationProps {
  /** Date value to format relative to now */
  value: Date | string | number;
  /** Base date to compare against */
  baseDate?: Date;
  /** Style of relative time format */
  style?: 'long' | 'short' | 'narrow';
  /** Numeric mode */
  numeric?: 'always' | 'auto';
}

/**
 * Props for the TranslationProvider component
 */
export interface TranslationProviderProps {
  /** Children to provide translation context to */
  children: ReactNode;
  /** Locale information */
  locale?: string | LocaleInfo;
  /** Fallback locale */
  fallbackLocale?: string;
  /** Translation namespace */
  namespace?: string;
  /** Additional translation parameters */
  params?: TranslationParams;
}

/**
 * Translation context value
 */
export interface TranslationContextValue {
  /** Current locale information */
  locale: LocaleInfo;
  /** Translation function */
  t: (key: TranslationKey, params?: TranslationParams) => string;
  /** Translation with fallback */
  tf: (
    key: TranslationKey,
    fallback: string,
    params?: TranslationParams,
  ) => string;
  /** Scoped translation function */
  scope: (
    namespace: string,
  ) => (key: TranslationKey, params?: TranslationParams) => string;
  /** Formatting utilities */
  format: {
    number: (value: number, options?: NumberFormatOptions) => string;
    currency: (
      value: number,
      options?: Partial<CurrencyFormatOptions>,
    ) => string;
    date: (date: Date | string | number, options?: DateFormatOptions) => string;
    relativeTime: (date: Date | string | number, baseDate?: Date) => string;
  };
}

/**
 * Translation error information
 */
export interface TranslationError {
  /** Error type */
  type: 'missing_translation' | 'formatting_error' | 'locale_error';
  /** Translation key that failed */
  key?: TranslationKey;
  /** Original error message */
  message: string;
  /** Locale that was being used */
  locale?: string;
  /** Additional error context */
  context?: Record<string, unknown>;
}

/**
 * Translation loading state
 */
export interface TranslationLoadingState {
  /** Whether translations are currently loading */
  isLoading: boolean;
  /** Whether translations have been loaded */
  isLoaded: boolean;
  /** Any error that occurred during loading */
  error?: TranslationError;
  /** Progress of translation loading (0-1) */
  progress?: number;
}

/**
 * Pluralization options
 */
export interface PluralOptions {
  /** Count for pluralization */
  count: number;
  /** Plural forms */
  one?: string;
  other?: string;
  zero?: string;
  two?: string;
  few?: string;
  many?: string;
}

/**
 * Rich text formatting options
 */
export interface RichTextOptions {
  /** HTML tags to allow */
  allowedTags?: string[];
  /** Custom tag renderers */
  tagRenderers?: Record<string, (props: any) => ReactNode>;
  /** Whether to sanitize HTML */
  sanitize?: boolean;
}

/**
 * Message format options
 */
export interface MessageFormatOptions {
  /** Whether to enable ICU message format */
  enableICU?: boolean;
  /** Custom formatter functions */
  formatters?: Record<string, (value: any, options?: any) => string>;
  /** Whether to escape HTML in interpolated values */
  escapeValues?: boolean;
}
