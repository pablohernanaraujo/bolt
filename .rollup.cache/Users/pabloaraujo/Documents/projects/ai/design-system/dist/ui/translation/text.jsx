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
        return (<Component className={className} data-translation-key={finalKey} data-locale={localeInfo.locale} {...props}>
        {finalText}
      </Component>);
    }
    catch (error) {
        console.warn('Translation failed:', error);
        return (<Component className={className} data-translation-error="true" {...props}>
        {fallbackChildren || defaultText || translationKey}
      </Component>);
    }
}
export function TextSync({ children: translationKey, params, defaultText, scope, locale = 'en-US', fallbackLocale = 'en-US', as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const finalKey = scope ? `${scope}.${translationKey}` : translationKey;
        const translatedText = translate(finalKey, locale, params, fallbackLocale);
        const finalText = translatedText === finalKey
            ? defaultText || translationKey
            : translatedText;
        return (<Component className={className} data-translation-key={finalKey} data-locale={locale} {...props}>
        {finalText}
      </Component>);
    }
    catch (error) {
        console.warn('Translation failed:', error);
        return (<Component className={className} data-translation-error="true" {...props}>
        {fallbackChildren || defaultText || translationKey}
      </Component>);
    }
}
