import { type ElementType, type ReactNode } from 'react';
import { type CurrencyFormatOptions, type DateFormatOptions, type NumberFormatOptions } from '@/i18n/formatters';
import { type LocaleInfo } from '@/i18n/server-locale';
import { type TranslationKey, type TranslationParams } from '@/i18n/translations';
export interface BaseTranslationProps {
    locale?: string;
    fallbackLocale?: string;
    as?: ElementType;
    className?: string;
    fallbackChildren?: ReactNode;
}
export interface TextProps extends BaseTranslationProps {
    children: TranslationKey;
    params?: TranslationParams;
    defaultText?: string;
    scope?: string;
}
export interface FormattedTextProps extends BaseTranslationProps {
    id: TranslationKey;
    values?: TranslationParams;
    defaultMessage?: string;
    description?: string;
}
export interface FormattedNumberProps extends BaseTranslationProps {
    value: number;
    options?: NumberFormatOptions;
    useLocalizedNumerals?: boolean;
}
export interface FormattedCurrencyProps extends BaseTranslationProps {
    value: number;
    currency?: string;
    options?: Partial<CurrencyFormatOptions>;
}
export interface FormattedDateProps extends BaseTranslationProps {
    value: Date | string | number;
    options?: DateFormatOptions;
    style?: 'short' | 'medium' | 'long' | 'full';
    relative?: boolean;
    relativeThreshold?: number;
}
export interface FormattedRelativeTimeProps extends BaseTranslationProps {
    value: Date | string | number;
    baseDate?: Date;
    style?: 'long' | 'short' | 'narrow';
    numeric?: 'always' | 'auto';
}
export interface TranslationProviderProps {
    children: ReactNode;
    locale?: string | LocaleInfo;
    fallbackLocale?: string;
    namespace?: string;
    params?: TranslationParams;
}
export interface TranslationContextValue {
    locale: LocaleInfo;
    t: (key: TranslationKey, params?: TranslationParams) => string;
    tf: (key: TranslationKey, fallback: string, params?: TranslationParams) => string;
    scope: (namespace: string) => (key: TranslationKey, params?: TranslationParams) => string;
    format: {
        number: (value: number, options?: NumberFormatOptions) => string;
        currency: (value: number, options?: Partial<CurrencyFormatOptions>) => string;
        date: (date: Date | string | number, options?: DateFormatOptions) => string;
        relativeTime: (date: Date | string | number, baseDate?: Date) => string;
    };
}
export interface TranslationError {
    type: 'missing_translation' | 'formatting_error' | 'locale_error';
    key?: TranslationKey;
    message: string;
    locale?: string;
    context?: Record<string, unknown>;
}
export interface TranslationLoadingState {
    isLoading: boolean;
    isLoaded: boolean;
    error?: TranslationError;
    progress?: number;
}
export interface PluralOptions {
    count: number;
    one?: string;
    other?: string;
    zero?: string;
    two?: string;
    few?: string;
    many?: string;
}
export interface RichTextOptions {
    allowedTags?: string[];
    tagRenderers?: Record<string, (props: any) => ReactNode>;
    sanitize?: boolean;
}
export interface MessageFormatOptions {
    enableICU?: boolean;
    formatters?: Record<string, (value: any, options?: any) => string>;
    escapeValues?: boolean;
}
