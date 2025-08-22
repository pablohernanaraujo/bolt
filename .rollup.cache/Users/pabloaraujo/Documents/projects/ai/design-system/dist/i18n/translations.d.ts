export type TranslationParams = Record<string, string | number | boolean>;
export type TranslationKey = string;
export type TranslationFunction = (key: TranslationKey, params?: TranslationParams) => string;
export type TranslationValue = string | ((params?: TranslationParams) => string);
export type TranslationObject = {
    [key: string]: TranslationValue | TranslationObject;
};
export type FlatTranslations = Record<string, TranslationValue>;
export declare function setDefaultLocale(locale: string): void;
export declare function addTranslations(locale: string, translations: TranslationObject): void;
export declare function getTranslations(locale: string): FlatTranslations;
export declare function hasTranslations(locale: string): boolean;
export declare function clearTranslations(): void;
export declare function translate(key: TranslationKey, locale: string, params?: TranslationParams, fallbackLocale?: string): string;
export declare function translateWithFallback(key: TranslationKey, locale: string, fallbackValue: string, params?: TranslationParams): string;
export declare function getTranslation(key: TranslationKey, locale: string, params?: TranslationParams): string;
export declare function interpolate(template: string, params?: TranslationParams): string;
export declare function getTranslationKeys(locale: string): string[];
export declare function hasTranslationKey(key: TranslationKey, locale: string): boolean;
export declare function getMissingTranslationKeys(fromLocale: string, toLocale: string): string[];
export declare function validateTranslations(locale: string): {
    isComplete: boolean;
    missingKeys: string[];
    totalKeys: number;
    translatedKeys: number;
};
export declare function getTranslationStats(): {
    locales: string[];
    totalTranslations: Record<string, number>;
    completeness: Record<string, number>;
};
export declare function createScopedTranslator(componentName: string, locale: string): TranslationFunction;
export declare function translateNamespaced(namespace: string, key: TranslationKey, locale: string, params?: TranslationParams): string;
export declare function translateMultiple(keys: TranslationKey[], locale: string, params?: TranslationParams): Record<string, string>;
export declare class TranslationKeyBuilder {
    private parts;
    add(part: string): this;
    build(): string;
    reset(): this;
}
export declare function createKeyBuilder(): TranslationKeyBuilder;
