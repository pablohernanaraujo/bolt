import { jsx as _jsx } from "react/jsx-runtime";
import { getServerLocaleInfo } from '@/i18n/server-locale';
import { translate } from '@/i18n/translations';
export async function Text({ children: translationKey, params, defaultText, scope, locale: customLocale, fallbackLocale = 'en-US', as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const localeInfo = customLocale
            ? { locale: customLocale }
            : await getServerLocaleInfo();
        const finalKey = scope ? `${scope}.${translationKey}` : translationKey;
        const translatedText = translate(finalKey, localeInfo.locale, params, fallbackLocale);
        const finalText = translatedText === finalKey
            ? defaultText || translationKey
            : translatedText;
        return (_jsx(Component, { className: className, "data-translation-key": finalKey, "data-locale": localeInfo.locale, ...props, children: finalText }));
    }
    catch (error) {
        console.warn('Translation failed:', error);
        return (_jsx(Component, { className: className, "data-translation-error": "true", ...props, children: fallbackChildren || defaultText || translationKey }));
    }
}
export function TextSync({ children: translationKey, params, defaultText, scope, locale = 'en-US', fallbackLocale = 'en-US', as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const finalKey = scope ? `${scope}.${translationKey}` : translationKey;
        const translatedText = translate(finalKey, locale, params, fallbackLocale);
        const finalText = translatedText === finalKey
            ? defaultText || translationKey
            : translatedText;
        return (_jsx(Component, { className: className, "data-translation-key": finalKey, "data-locale": locale, ...props, children: finalText }));
    }
    catch (error) {
        console.warn('Translation failed:', error);
        return (_jsx(Component, { className: className, "data-translation-error": "true", ...props, children: fallbackChildren || defaultText || translationKey }));
    }
}
