import { type LocaleInfo } from './server-locale';
export interface NumberFormatOptions extends Intl.NumberFormatOptions {
    useLocalizedNumerals?: boolean;
    thousandsSeparator?: string;
    decimalSeparator?: string;
}
export interface CurrencyFormatOptions extends Intl.NumberFormatOptions {
    currency: string;
    currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
    currencyPosition?: 'start' | 'end' | 'auto';
}
export interface DateFormatOptions extends Intl.DateTimeFormatOptions {
    useLocalizedCalendar?: boolean;
    template?: string;
    preferRelative?: boolean;
    relativeThreshold?: number;
}
export declare function formatNumber(value: number, locale: string, options?: NumberFormatOptions): string;
export declare function formatCurrency(value: number, locale: string, options: CurrencyFormatOptions): string;
export declare function formatDate(date: Date | string | number, locale: string, options?: DateFormatOptions): string;
export declare function formatRelativeTime(date: Date | string | number, locale: string, baseDate?: Date): string;
export declare function createLocaleFormatters(localeInfo: LocaleInfo): Record<string, (...args: any[]) => string>;
