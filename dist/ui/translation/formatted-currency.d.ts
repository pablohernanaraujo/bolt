import { type ReactElement } from 'react';
import { type FormattedCurrencyProps } from './types';
export declare function FormattedCurrency({ value, currency: customCurrency, options, locale: customLocale, as: Component, className, fallbackChildren, ...props }: FormattedCurrencyProps): Promise<ReactElement>;
export declare function FormattedCurrencySync({ value, currency, options, locale, as: Component, className, fallbackChildren, ...props }: FormattedCurrencyProps & {
    locale: string;
    currency: string;
}): ReactElement;
