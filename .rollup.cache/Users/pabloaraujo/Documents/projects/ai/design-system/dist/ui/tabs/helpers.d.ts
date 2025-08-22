import { type TabListRenderProps, type TabPanelRenderProps, type TabRenderProps } from 'react-aria-components';
import { type TabsRootProps } from './types';
export declare function buildTabsListClassName(orientation: 'horizontal' | 'vertical', align: TabsRootProps['align'], isFitted: boolean, className?: string): string;
export declare function buildTabsListClassName(orientation: 'horizontal' | 'vertical', align: TabsRootProps['align'], isFitted: boolean, className: (values: TabListRenderProps & {
    defaultClassName: string | undefined;
}) => string, renderProps: TabListRenderProps & {
    defaultClassName: string | undefined;
}): string;
export declare function buildTabTriggerClassName(size: TabsRootProps['size'], variant: TabsRootProps['variant'], orientation: 'horizontal' | 'vertical', isFitted: boolean, className?: string): string;
export declare function buildTabTriggerClassName(size: TabsRootProps['size'], variant: TabsRootProps['variant'], orientation: 'horizontal' | 'vertical', isFitted: boolean, className: (values: TabRenderProps & {
    defaultClassName: string | undefined;
}) => string, renderProps: TabRenderProps & {
    defaultClassName: string | undefined;
}): string;
export declare function buildTabContentClassName(orientation: 'horizontal' | 'vertical', className?: string): string;
export declare function buildTabContentClassName(orientation: 'horizontal' | 'vertical', className: (values: TabPanelRenderProps & {
    defaultClassName: string | undefined;
}) => string, renderProps: TabPanelRenderProps & {
    defaultClassName: string | undefined;
}): string;
export declare const getOrientation: (orientation?: "horizontal" | "vertical") => "horizontal" | "vertical";
export declare const shouldBeFitted: (isFitted?: boolean) => boolean;
//# sourceMappingURL=helpers.d.ts.map