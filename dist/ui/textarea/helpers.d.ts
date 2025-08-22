import { type InputRenderProps } from 'react-aria-components';
import { type TextAreaProps } from './types';
export declare function buildTextAreaClassName(variant: TextAreaProps['variant'], size: TextAreaProps['size'], resize: TextAreaProps['resize'], className?: string): string;
export declare function buildTextAreaClassName(variant: TextAreaProps['variant'], size: TextAreaProps['size'], resize: TextAreaProps['resize'], className: (values: InputRenderProps & {
    defaultClassName: string | undefined;
}) => string, renderProps: InputRenderProps & {
    defaultClassName: string | undefined;
}): string;
export declare const isTextAreaInvalid: (hasError?: boolean, isInvalid?: boolean) => boolean;
export declare const getTextAreaRows: (size: TextAreaProps["size"], rows?: number) => number;
//# sourceMappingURL=helpers.d.ts.map