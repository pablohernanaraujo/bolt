import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerLocaleInfo } from '@/i18n/server-locale';
import { interpolate, translate } from '@/i18n/translations';
export async function FormattedText({ id: translationKey, values = {}, defaultMessage, description, locale: customLocale, fallbackLocale = 'en-US', as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const localeInfo = customLocale
            ? { locale: customLocale }
            : await getServerLocaleInfo();
        const translatedText = translate(translationKey, localeInfo.locale, values, fallbackLocale);
        let finalText = translatedText === translationKey
            ? defaultMessage || translationKey
            : translatedText;
        if (finalText === defaultMessage && Object.keys(values).length > 0) {
            finalText = interpolate(finalText, values);
        }
        const processedText = processFormattedText(finalText, values);
        const accessibilityProps = {
            'aria-describedby': description ? `${translationKey}-desc` : undefined,
            'data-translation-key': translationKey,
            'data-locale': localeInfo.locale,
            'data-formatted': 'text',
        };
        return (_jsxs(_Fragment, { children: [_jsx(Component, { className: className, ...accessibilityProps, ...props, children: processedText }), description && (_jsx("span", { id: `${translationKey}-desc`, style: {
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        margin: '-1px',
                        overflow: 'hidden',
                        clip: 'rect(0, 0, 0, 0)',
                        whiteSpace: 'nowrap',
                        border: 0,
                    }, children: description }))] }));
    }
    catch (error) {
        console.warn('Formatted text processing failed:', error);
        return (_jsx(Component, { className: className, "data-formatting-error": "true", ...props, children: fallbackChildren || defaultMessage || translationKey }));
    }
}
function processFormattedText(text, values) {
    let processedText = text;
    Object.entries(values).forEach(([key, value]) => {
        const placeholder = `{${key}}`;
        if (processedText.includes(placeholder)) {
            processedText = processedText.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
        }
    });
    processedText = processPluralization(processedText, values);
    processedText = escapeHtmlContent(processedText);
    return processedText;
}
function processPluralization(text, values) {
    const pluralPattern = /\{(\w+)\|([^}]+)\}/g;
    return text.replace(pluralPattern, (match, key, options) => {
        const count = Number(values[key]);
        if (isNaN(count))
            return match;
        const optionPairs = options.split('|');
        const optionMap = {};
        optionPairs.forEach((pair) => {
            const [condition, value] = pair.split(':');
            if (condition && value) {
                optionMap[condition.trim()] = value.trim();
            }
        });
        if (count === 0 && optionMap.zero)
            return optionMap.zero;
        if (count === 1 && optionMap.one)
            return optionMap.one;
        if (count === 2 && optionMap.two)
            return optionMap.two;
        if (optionMap.other)
            return optionMap.other;
        return match;
    });
}
function escapeHtmlContent(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
export function FormattedTextSync({ id: translationKey, values = {}, defaultMessage, description, locale = 'en-US', fallbackLocale = 'en-US', as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const translatedText = translate(translationKey, locale, values, fallbackLocale);
        let finalText = translatedText === translationKey
            ? defaultMessage || translationKey
            : translatedText;
        if (finalText === defaultMessage && Object.keys(values).length > 0) {
            finalText = interpolate(finalText, values);
        }
        const processedText = processFormattedText(finalText, values);
        const accessibilityProps = {
            'aria-describedby': description ? `${translationKey}-desc` : undefined,
            'data-translation-key': translationKey,
            'data-locale': locale,
            'data-formatted': 'text',
        };
        return (_jsxs(_Fragment, { children: [_jsx(Component, { className: className, ...accessibilityProps, ...props, children: processedText }), description && (_jsx("span", { id: `${translationKey}-desc`, style: {
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        margin: '-1px',
                        overflow: 'hidden',
                        clip: 'rect(0, 0, 0, 0)',
                        whiteSpace: 'nowrap',
                        border: 0,
                    }, children: description }))] }));
    }
    catch (error) {
        console.warn('Formatted text processing failed:', error);
        return (_jsx(Component, { className: className, "data-formatting-error": "true", ...props, children: fallbackChildren || defaultMessage || translationKey }));
    }
}
