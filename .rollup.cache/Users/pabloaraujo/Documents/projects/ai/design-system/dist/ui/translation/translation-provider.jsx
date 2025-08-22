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
        return (<div {...contextAttributes} style={{ display: 'contents' }}>
        {children}
      </div>);
    }
    catch (error) {
        console.warn('TranslationProvider failed to initialize:', error);
        return (<div data-translation-provider="error" data-fallback-locale={fallbackLocale} style={{ display: 'contents' }}>
        {children}
      </div>);
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
    return (<div {...contextAttributes} style={{ display: 'contents' }}>
      {children}
    </div>);
}
export function withTranslationProvider(Component, providerProps = {}) {
    return async function WrappedWithTranslationProvider(props) {
        return (<TranslationProvider {...providerProps}>
        <Component {...props}/>
      </TranslationProvider>);
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
        return (<TranslationProvider namespace={namespace} params={mergedParams} {...providerProps}>
        {children}
      </TranslationProvider>);
    };
}
export async function TranslationBoundary({ children, fallback = <div>Translation Error</div>, locale, fallbackLocale = 'en-US', }) {
    try {
        return (<TranslationProvider locale={locale} fallbackLocale={fallbackLocale}>
        {children}
      </TranslationProvider>);
    }
    catch (error) {
        console.error('Translation boundary caught error:', error);
        return (<div data-translation-boundary="error" data-error-type="translation-provider">
        {fallback}
      </div>);
    }
}
