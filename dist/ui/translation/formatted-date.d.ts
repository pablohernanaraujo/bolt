import { type ReactElement } from 'react';
import { type FormattedDateProps } from './types';
export declare function FormattedDate({ value, options, style, relative, relativeThreshold, locale: customLocale, as: Component, className, fallbackChildren, ...props }: FormattedDateProps): Promise<ReactElement>;
export declare function FormattedDateSync({ value, options, style, relative, relativeThreshold, locale, as: Component, className, fallbackChildren, ...props }: FormattedDateProps & {
    locale: string;
}): ReactElement;
//# sourceMappingURL=formatted-date.d.ts.map