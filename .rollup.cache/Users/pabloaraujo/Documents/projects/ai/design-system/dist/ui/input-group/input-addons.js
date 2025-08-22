import { jsx as _jsx } from "react/jsx-runtime";
import { buildAddonClassName } from './helpers';
import { useInputGroup } from './input-group-context';
export const InputLeftAddon = ({ children, isDisabled: ownDisabled, className, ...props }) => {
    const context = useInputGroup();
    const size = context?.size ?? 'medium';
    const variant = context?.variant ?? 'outline';
    const isDisabled = ownDisabled ?? context?.isDisabled ?? false;
    const addonClassName = buildAddonClassName('left', size, variant, isDisabled, className);
    return (_jsx("div", { className: addonClassName, "data-disabled": isDisabled || undefined, ...props, children: children }));
};
InputLeftAddon.displayName = 'InputLeftAddon';
export const InputRightAddon = ({ children, isDisabled: ownDisabled, className, ...props }) => {
    const context = useInputGroup();
    const size = context?.size ?? 'medium';
    const variant = context?.variant ?? 'outline';
    const isDisabled = ownDisabled ?? context?.isDisabled ?? false;
    const addonClassName = buildAddonClassName('right', size, variant, isDisabled, className);
    return (_jsx("div", { className: addonClassName, "data-disabled": isDisabled || undefined, ...props, children: children }));
};
InputRightAddon.displayName = 'InputRightAddon';
