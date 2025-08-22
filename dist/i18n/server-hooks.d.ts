import { type CurrencyFormatOptions, type DateFormatOptions, type NumberFormatOptions } from './formatters';
import { type LocaleInfo } from './server-locale';
import { type TranslationFunction, type TranslationKey, type TranslationParams } from './translations';
export interface ServerTranslationHelper {
    locale: LocaleInfo;
    t: TranslationFunction;
    tf: (key: TranslationKey, fallback: string, params?: TranslationParams) => string;
    scope: (namespace: string) => TranslationFunction;
    format: {
        number: (value: number, options?: NumberFormatOptions) => string;
        currency: (value: number, options?: Partial<CurrencyFormatOptions>) => string;
        date: (date: Date | string | number, options?: DateFormatOptions) => string;
        relativeTime: (date: Date | string | number, baseDate?: Date) => string;
        price: (value: number) => string;
        percent: (value: number) => string;
        shortDate: (date: Date | string | number) => string;
        longDate: (date: Date | string | number) => string;
        time: (date: Date | string | number) => string;
    };
}
export declare function getServerTranslation(requestedLocale?: string, fallbackLocale?: string): Promise<ServerTranslationHelper>;
export declare function createTranslationHelper(localeCode: string, fallbackLocale?: string): Promise<ServerTranslationHelper>;
export declare function createComponentTranslationHelper(componentName: string, locale?: string, fallbackLocale?: string): Promise<{
    t: TranslationFunction;
    tf: (key: TranslationKey, fallback: string, params?: TranslationParams) => string;
    format: ServerTranslationHelper['format'];
}>;
export declare class ServerTranslationProvider {
    private helper;
    initialize(locale?: string, fallbackLocale?: string): Promise<void>;
    getHelper(): ServerTranslationHelper;
    t(key: TranslationKey, params?: TranslationParams): string;
    tf(key: TranslationKey, fallback: string, params?: TranslationParams): string;
    scope(namespace: string): TranslationFunction;
    get format(): ServerTranslationHelper['format'];
    get locale(): LocaleInfo;
}
export declare function createServerTranslationProvider(): ServerTranslationProvider;
export declare function translateConditional(condition: boolean, trueKey: TranslationKey, falseKey: TranslationKey, helper: ServerTranslationHelper, params?: TranslationParams): string;
export declare function translateDirectional(ltrKey: TranslationKey, rtlKey: TranslationKey, helper: ServerTranslationHelper, params?: TranslationParams): string;
export declare function translatePlural(key: TranslationKey, count: number, helper: ServerTranslationHelper, params?: TranslationParams): string;
