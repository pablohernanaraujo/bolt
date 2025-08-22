import { type ReactElement } from 'react';
import { type LocaleInfo } from '@/i18n/server-locale';
import { TranslationContextValue, type TranslationProviderProps } from './types';
export declare function TranslationProvider({ children, locale: providedLocale, fallbackLocale, namespace, params, }: TranslationProviderProps): Promise<ReactElement>;
export declare function TranslationProviderSync({ children, locale: providedLocale, fallbackLocale, namespace, params, }: TranslationProviderProps & {
    locale: string | LocaleInfo;
}): ReactElement;
export declare function withTranslationProvider<P extends object>(Component: React.ComponentType<P>, providerProps?: Partial<TranslationProviderProps>): (props: P) => Promise<ReactElement>;
export declare function getTranslationContext(locale?: string, fallbackLocale?: string): Promise<TranslationContextValue>;
export declare function createScopedTranslationProvider(defaultNamespace: string, defaultParams?: Record<string, any>): (props: TranslationProviderProps) => Promise<ReactElement>;
export declare function TranslationBoundary({ children, fallback, locale, fallbackLocale, }: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    locale?: string;
    fallbackLocale?: string;
}): Promise<ReactElement>;
