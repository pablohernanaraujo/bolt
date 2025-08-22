import { jsx as _jsx } from "react/jsx-runtime";
import { getServerTranslation } from '@/i18n/server-hooks';
export async function TranslationProvider({ children, locale: providedLocale, fallbackLocale = 'en-US', namespace, params = {}, }) {
    try {
        const translationHelper = await getServerTranslation(typeof providedLocale === 'string'
            ? providedLocale
            : providedLocale?.locale, fallbackLocale);
        const localeInfo = typeof providedLocale === 'object'
            ? providedLocale
            : translationHelper.locale;
        const contextAttributes = {
            'data-translation-provider': 'true',
            'data-locale': localeInfo.locale,
            'data-language': localeInfo.language,
            'data-direction': localeInfo.direction,
            'data-namespace': namespace,
            'data-fallback-locale': fallbackLocale,
        };
        return (_jsx("div", { ...contextAttributes, style: { display: 'contents' }, children: children }));
    }
    catch (error) {
        console.warn('TranslationProvider failed to initialize:', error);
        return (_jsx("div", { "data-translation-provider": "error", "data-fallback-locale": fallbackLocale, style: { display: 'contents' }, children: children }));
    }
}
export function TranslationProviderSync({ children, locale: providedLocale, fallbackLocale = 'en-US', namespace, params = {}, }) {
    const localeInfo = typeof providedLocale === 'object'
        ? providedLocale
        : {
            locale: providedLocale,
            language: providedLocale.split('-')[0],
            direction: 'ltr',
            languageConfig: {
                code: providedLocale.split('-')[0],
                name: providedLocale,
                direction: 'ltr',
            },
        };
    const contextAttributes = {
        'data-translation-provider': 'sync',
        'data-locale': localeInfo.locale,
        'data-language': localeInfo.language,
        'data-direction': localeInfo.direction,
        'data-namespace': namespace,
        'data-fallback-locale': fallbackLocale,
    };
    return (_jsx("div", { ...contextAttributes, style: { display: 'contents' }, children: children }));
}
export function withTranslationProvider(Component, providerProps = {}) {
    return async function WrappedWithTranslationProvider(props) {
        return (_jsx(TranslationProvider, { ...providerProps, children: _jsx(Component, { ...props }) }));
    };
}
export async function getTranslationContext(locale, fallbackLocale = 'en-US') {
    const translationHelper = await getServerTranslation(locale, fallbackLocale);
    return {
        locale: translationHelper.locale,
        t: translationHelper.t,
        tf: translationHelper.tf,
        scope: translationHelper.scope,
        format: translationHelper.format,
    };
}
export function createScopedTranslationProvider(defaultNamespace, defaultParams = {}) {
    return async function ScopedTranslationProvider({ children, namespace = defaultNamespace, params = {}, ...providerProps }) {
        const mergedParams = {
            ...defaultParams,
            ...params,
        };
        return (_jsx(TranslationProvider, { namespace: namespace, params: mergedParams, ...providerProps, children: children }));
    };
}
export async function TranslationBoundary({ children, fallback = _jsx("div", { children: "Translation Error" }), locale, fallbackLocale = 'en-US', }) {
    try {
        return (_jsx(TranslationProvider, { locale: locale, fallbackLocale: fallbackLocale, children: children }));
    }
    catch (error) {
        console.error('Translation boundary caught error:', error);
        return (_jsx("div", { "data-translation-boundary": "error", "data-error-type": "translation-provider", children: fallback }));
    }
}
