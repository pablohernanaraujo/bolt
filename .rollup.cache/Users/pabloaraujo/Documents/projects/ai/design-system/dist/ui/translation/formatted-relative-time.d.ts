import { type ReactElement } from 'react';
import { type FormattedRelativeTimeProps } from './types';
export declare function FormattedRelativeTime({ value, baseDate, style, numeric, locale: customLocale, as: Component, className, fallbackChildren, ...props }: FormattedRelativeTimeProps): Promise<ReactElement>;
export declare function FormattedRelativeTimeSync({ value, baseDate, style, numeric, locale, as: Component, className, fallbackChildren, ...props }: FormattedRelativeTimeProps & {
    locale: string;
}): ReactElement;
