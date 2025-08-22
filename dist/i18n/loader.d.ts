import { type TranslationObject } from './translations';
export interface Translations extends TranslationObject {
}
export interface LocaleData {
    locale: string;
    translations: Translations;
    meta?: {
        name: string;
        nativeName: string;
        completion?: number;
        lastUpdated?: string;
        contributors?: string[];
    };
}
export declare function loadTranslations(locale: string): Promise<LocaleData>;
export declare function loadMultipleTranslations(locales: string[]): Promise<LocaleData[]>;
export declare function preloadTranslations(locales: string[]): Promise<void>;
export declare function getAvailableLocales(): string[];
export declare function setAvailableLocales(locales: string[]): void;
export declare function getSupportedLocales(): string[];
export declare function setSupportedLocales(locales: string[]): void;
export declare function isLocaleSupported(locale: string): boolean;
export declare function isLocaleAvailable(locale: string): boolean;
export declare function addSupportedLocale(locale: string): void;
export declare function removeSupportedLocale(locale: string): void;
export declare function getBestMatchingLocale(requestedLocales: string[], availableLocales?: string[]): string | null;
export declare function loadTranslationsOnDemand(locale: string): Promise<boolean>;
export declare function getLoadingStatus(): {
    loaded: string[];
    loading: string[];
    available: string[];
    supported: string[];
};
export declare function clearTranslationCache(): void;
export declare function createLocaleLoader(locale: string): {
    load: () => Promise<LocaleData>;
    preload: () => Promise<void>;
    isLoaded: () => boolean;
    isAvailable: () => boolean;
    isSupported: () => boolean;
};
export declare class BatchTranslationLoader {
    private locales;
    private loadingPromise;
    add(locale: string): this;
    remove(locale: string): this;
    clear(): this;
    load(): Promise<LocaleData[]>;
    getLocales(): string[];
}
export declare function createBatchLoader(): BatchTranslationLoader;
