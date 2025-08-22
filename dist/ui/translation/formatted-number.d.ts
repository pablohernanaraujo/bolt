import { type ReactElement } from 'react';
import { type FormattedNumberProps } from './types';
export declare function FormattedNumber({ value, options, useLocalizedNumerals, locale: customLocale, as: Component, className, fallbackChildren, ...props }: FormattedNumberProps): Promise<ReactElement>;
export declare function FormattedNumberSync({ value, options, useLocalizedNumerals, locale, as: Component, className, fallbackChildren, ...props }: FormattedNumberProps & {
    locale: string;
}): ReactElement;
//# sourceMappingURL=formatted-number.d.ts.map