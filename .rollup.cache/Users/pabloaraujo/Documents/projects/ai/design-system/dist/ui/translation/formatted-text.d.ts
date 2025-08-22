import { type ReactElement } from 'react';
import { type FormattedTextProps } from './types';
export declare function FormattedText({ id: translationKey, values, defaultMessage, description, locale: customLocale, fallbackLocale, as: Component, className, fallbackChildren, ...props }: FormattedTextProps): Promise<ReactElement>;
export declare function FormattedTextSync({ id: translationKey, values, defaultMessage, description, locale, fallbackLocale, as: Component, className, fallbackChildren, ...props }: FormattedTextProps & {
    locale: string;
}): ReactElement;
//# sourceMappingURL=formatted-text.d.ts.map