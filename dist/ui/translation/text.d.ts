import { type ReactElement } from 'react';
import { type TextProps } from './types';
export declare function Text({ children: translationKey, params, defaultText, scope, locale: customLocale, fallbackLocale, as: Component, className, fallbackChildren, ...props }: TextProps): Promise<ReactElement>;
export declare function TextSync({ children: translationKey, params, defaultText, scope, locale, fallbackLocale, as: Component, className, fallbackChildren, ...props }: TextProps & {
    locale: string;
}): ReactElement;
//# sourceMappingURL=text.d.ts.map