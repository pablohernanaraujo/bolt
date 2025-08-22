import { type LanguageConfig, type TextDirection } from '../theme/rtl-detection';
export interface LocaleInfo {
    locale: string;
    language: string;
    region?: string;
    direction: TextDirection;
    languageConfig: LanguageConfig;
    currency?: string;
    timezone?: string;
    numberFormat?: Intl.NumberFormatOptions;
    dateFormat?: Intl.DateTimeFormatOptions;
}
export declare function detectServerLocale(): Promise<LocaleInfo>;
export declare function getServerLocaleInfo(): Promise<LocaleInfo>;
