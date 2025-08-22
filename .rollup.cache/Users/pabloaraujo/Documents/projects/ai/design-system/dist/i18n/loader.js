import { addTranslations } from './translations';
const loadingCache = new Map();
const loadedLocales = new Set();
let availableLocales = [];
let supportedLocales = ['en-US'];
export async function loadTranslations(locale) {
    if (loadedLocales.has(locale)) {
        return {
            locale,
            translations: {},
            meta: {
                name: locale,
                nativeName: locale,
            },
        };
    }
    if (loadingCache.has(locale)) {
        return loadingCache.get(locale);
    }
    const loadingPromise = loadTranslationsInternal(locale);
    loadingCache.set(locale, loadingPromise);
    try {
        const result = await loadingPromise;
        loadedLocales.add(locale);
        return result;
    }
    catch (error) {
        loadingCache.delete(locale);
        throw error;
    }
}
async function loadTranslationsInternal(locale) {
    try {
        const localeModule = await import(`../translations/${locale}.json`);
        const localeData = localeModule.default || localeModule;
        if (localeData.translations) {
            addTranslations(locale, localeData.translations);
        }
        return localeData;
    }
    catch (error) {
        console.warn(`Failed to load translations for locale "${locale}":`, error);
        const language = locale.split('-')[0];
        if (language !== locale) {
            try {
                const languageModule = await import(`../translations/${language}.json`);
                const languageData = languageModule.default || languageModule;
                if (languageData.translations) {
                    addTranslations(locale, languageData.translations);
                }
                return {
                    ...languageData,
                    locale,
                };
            }
            catch (languageError) {
                console.warn(`Failed to load fallback language "${language}":`, languageError);
            }
        }
        return {
            locale,
            translations: {},
            meta: {
                name: locale,
                nativeName: locale,
                completion: 0,
            },
        };
    }
}
export async function loadMultipleTranslations(locales) {
    const loadingPromises = locales.map((locale) => loadTranslations(locale));
    return Promise.all(loadingPromises);
}
export async function preloadTranslations(locales) {
    try {
        await loadMultipleTranslations(locales);
    }
    catch (error) {
        console.warn('Failed to preload some translations:', error);
    }
}
export function getAvailableLocales() {
    return availableLocales.length > 0
        ? availableLocales
        : [
            'en-US',
            'en-GB',
            'ar-SA',
            'ar-AE',
            'he-IL',
            'fa-IR',
            'fr-FR',
            'de-DE',
            'es-ES',
            'ja-JP',
            'ko-KR',
            'zh-CN',
        ];
}
export function setAvailableLocales(locales) {
    availableLocales = locales;
}
export function getSupportedLocales() {
    return [...supportedLocales];
}
export function setSupportedLocales(locales) {
    supportedLocales = locales;
}
export function isLocaleSupported(locale) {
    return supportedLocales.includes(locale);
}
export function isLocaleAvailable(locale) {
    return getAvailableLocales().includes(locale);
}
export function addSupportedLocale(locale) {
    if (!supportedLocales.includes(locale)) {
        supportedLocales.push(locale);
    }
}
export function removeSupportedLocale(locale) {
    const index = supportedLocales.indexOf(locale);
    if (index > -1) {
        supportedLocales.splice(index, 1);
    }
}
export function getBestMatchingLocale(requestedLocales, availableLocales = getAvailableLocales()) {
    for (const requested of requestedLocales) {
        if (availableLocales.includes(requested)) {
            return requested;
        }
    }
    for (const requested of requestedLocales) {
        const language = requested.split('-')[0];
        const match = availableLocales.find((available) => available.startsWith(`${language}-`));
        if (match) {
            return match;
        }
    }
    return null;
}
export async function loadTranslationsOnDemand(locale) {
    if (loadedLocales.has(locale)) {
        return true;
    }
    if (!isLocaleAvailable(locale)) {
        return false;
    }
    try {
        await loadTranslations(locale);
        return true;
    }
    catch {
        return false;
    }
}
export function getLoadingStatus() {
    return {
        loaded: Array.from(loadedLocales),
        loading: Array.from(loadingCache.keys()),
        available: getAvailableLocales(),
        supported: getSupportedLocales(),
    };
}
export function clearTranslationCache() {
    loadingCache.clear();
    loadedLocales.clear();
}
export function createLocaleLoader(locale) {
    return {
        async load() {
            return loadTranslations(locale);
        },
        async preload() {
            try {
                await loadTranslations(locale);
            }
            catch {
            }
        },
        isLoaded() {
            return loadedLocales.has(locale);
        },
        isAvailable() {
            return isLocaleAvailable(locale);
        },
        isSupported() {
            return isLocaleSupported(locale);
        },
    };
}
export class BatchTranslationLoader {
    locales = new Set();
    loadingPromise = null;
    add(locale) {
        this.locales.add(locale);
        return this;
    }
    remove(locale) {
        this.locales.delete(locale);
        return this;
    }
    clear() {
        this.locales.clear();
        this.loadingPromise = null;
        return this;
    }
    async load() {
        if (this.loadingPromise) {
            return this.loadingPromise;
        }
        const localeList = Array.from(this.locales);
        this.loadingPromise = loadMultipleTranslations(localeList);
        try {
            return await this.loadingPromise;
        }
        finally {
            this.loadingPromise = null;
        }
    }
    getLocales() {
        return Array.from(this.locales);
    }
}
export function createBatchLoader() {
    return new BatchTranslationLoader();
}
