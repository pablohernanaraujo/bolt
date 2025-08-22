let globalTranslations = {};
let defaultLocale = 'en-US';
export function setDefaultLocale(locale) {
    defaultLocale = locale;
}
export function addTranslations(locale, translations) {
    if (!globalTranslations[locale]) {
        globalTranslations[locale] = {};
    }
    const flattened = flattenTranslations(translations);
    Object.assign(globalTranslations[locale], flattened);
}
export function getTranslations(locale) {
    return globalTranslations[locale] || {};
}
export function hasTranslations(locale) {
    return Boolean(globalTranslations[locale]);
}
export function clearTranslations() {
    globalTranslations = {};
}
export function translate(key, locale, params, fallbackLocale) {
    const primaryTranslation = getTranslation(key, locale, params);
    if (primaryTranslation !== key) {
        return primaryTranslation;
    }
    if (fallbackLocale && fallbackLocale !== locale) {
        const fallbackTranslation = getTranslation(key, fallbackLocale, params);
        if (fallbackTranslation !== key) {
            return fallbackTranslation;
        }
    }
    if (defaultLocale !== locale && defaultLocale !== fallbackLocale) {
        const defaultTranslation = getTranslation(key, defaultLocale, params);
        if (defaultTranslation !== key) {
            return defaultTranslation;
        }
    }
    return key;
}
export function translateWithFallback(key, locale, fallbackValue, params) {
    const translation = translate(key, locale, params);
    return translation === key ? fallbackValue : translation;
}
export function getTranslation(key, locale, params) {
    const translations = globalTranslations[locale];
    if (!translations) {
        return key;
    }
    const translationValue = translations[key];
    if (!translationValue) {
        return key;
    }
    if (typeof translationValue === 'function') {
        try {
            return translationValue(params);
        }
        catch (error) {
            console.warn(`Translation function failed for key "${key}":`, error);
            return key;
        }
    }
    return interpolate(translationValue, params);
}
export function interpolate(template, params) {
    if (!params) {
        return template;
    }
    return template.replace(/\{\{(\w+)(?:\|([^}]+))?\}\}/g, (match, key, modifier) => {
        const value = params[key];
        if (value === undefined || value === null) {
            return match;
        }
        if (modifier && typeof value === 'number') {
            const options = modifier.split('|');
            if (value === 0 && options[0])
                return options[0];
            if (value === 1 && options[1])
                return options[1];
            if (options[2])
                return options[2];
            return String(value);
        }
        return String(value);
    });
}
function flattenTranslations(obj, prefix = '') {
    const flattened = {};
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'string' || typeof value === 'function') {
            flattened[newKey] = value;
        }
        else if (typeof value === 'object' && value !== null) {
            Object.assign(flattened, flattenTranslations(value, newKey));
        }
    }
    return flattened;
}
export function getTranslationKeys(locale) {
    const translations = globalTranslations[locale];
    return translations ? Object.keys(translations) : [];
}
export function hasTranslationKey(key, locale) {
    const translations = globalTranslations[locale];
    return Boolean(translations && translations[key]);
}
export function getMissingTranslationKeys(fromLocale, toLocale) {
    const fromKeys = getTranslationKeys(fromLocale);
    const toKeys = getTranslationKeys(toLocale);
    return fromKeys.filter((key) => !toKeys.includes(key));
}
export function validateTranslations(locale) {
    const defaultKeys = getTranslationKeys(defaultLocale);
    const localeKeys = getTranslationKeys(locale);
    const missingKeys = getMissingTranslationKeys(defaultLocale, locale);
    return {
        isComplete: missingKeys.length === 0,
        missingKeys,
        totalKeys: defaultKeys.length,
        translatedKeys: localeKeys.length,
    };
}
export function getTranslationStats() {
    const locales = Object.keys(globalTranslations);
    const totalTranslations = {};
    const completeness = {};
    const defaultKeyCount = getTranslationKeys(defaultLocale).length;
    for (const locale of locales) {
        const keyCount = getTranslationKeys(locale).length;
        totalTranslations[locale] = keyCount;
        completeness[locale] =
            defaultKeyCount > 0 ? (keyCount / defaultKeyCount) * 100 : 100;
    }
    return {
        locales,
        totalTranslations,
        completeness,
    };
}
export function createScopedTranslator(componentName, locale) {
    return (key, params) => {
        const scopedKey = `${componentName}.${key}`;
        return translate(scopedKey, locale, params);
    };
}
export function translateNamespaced(namespace, key, locale, params) {
    const namespacedKey = `${namespace}.${key}`;
    return translate(namespacedKey, locale, params);
}
export function translateMultiple(keys, locale, params) {
    const result = {};
    for (const key of keys) {
        result[key] = translate(key, locale, params);
    }
    return result;
}
export class TranslationKeyBuilder {
    parts = [];
    add(part) {
        this.parts.push(part);
        return this;
    }
    build() {
        return this.parts.join('.');
    }
    reset() {
        this.parts = [];
        return this;
    }
}
export function createKeyBuilder() {
    return new TranslationKeyBuilder();
}
