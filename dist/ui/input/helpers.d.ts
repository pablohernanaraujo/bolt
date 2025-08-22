import { type InputRenderProps } from 'react-aria-components';
import { type InputGroupContextValue } from '../input-group/types';
import { type InputProps } from './types';
export declare function buildInputClassName(variant: InputProps['variant'], size: InputProps['size'], className?: string): string;
export declare function buildInputClassName(variant: InputProps['variant'], size: InputProps['size'], className: InputProps['className'], renderProps: InputRenderProps & {
    defaultClassName: string;
}): string;
export declare const isInputInvalid: (hasError?: boolean, isInvalid?: boolean) => boolean;
export declare function buildInputWithGroupClassName(variant: InputProps['variant'], size: InputProps['size'], groupContext: InputGroupContextValue, className?: string): string;
export declare function buildInputWithGroupClassName(variant: InputProps['variant'], size: InputProps['size'], groupContext: InputGroupContextValue, className: InputProps['className'], renderProps: InputRenderProps & {
    defaultClassName: string;
}): string;
//# sourceMappingURL=helpers.d.ts.map