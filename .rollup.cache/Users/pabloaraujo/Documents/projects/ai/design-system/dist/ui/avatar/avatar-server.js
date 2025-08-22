import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User } from 'lucide-react';
import { forwardRef } from 'react';
import { Icon } from '@/icons';
import { buildAvatarClassName, buildAvatarIconClassName, buildAvatarInitialsClassName, buildStatusIndicatorClassName, generateInitials, getIconSize, } from './helpers';
export const AvatarServer = forwardRef(({ alt, name, size = 'md', variant = 'circle', status, showStatus = false, icon: CustomIcon = User, className, ...props }, ref) => {
    const shouldShowInitials = name && name.trim();
    const shouldShowIcon = !shouldShowInitials;
    const initials = name ? generateInitials(name) : '';
    const avatarClassName = buildAvatarClassName(size, variant, className);
    return (_jsxs("div", { ref: ref, className: avatarClassName, role: "img", "aria-label": alt || (name ? `Avatar for ${name}` : 'User avatar'), ...props, children: [shouldShowInitials && (_jsx("span", { className: buildAvatarInitialsClassName(size), "aria-hidden": "true", children: initials })), shouldShowIcon && (_jsx(Icon, { icon: CustomIcon, size: getIconSize(size), className: buildAvatarIconClassName(size), "aria-hidden": "true" })), showStatus && status && (_jsx("div", { className: buildStatusIndicatorClassName(size, status), "aria-label": `Status: ${status}`, role: "status" }))] }));
});
AvatarServer.displayName = 'AvatarServer';
