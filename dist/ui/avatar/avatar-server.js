import { jsxs, jsx } from 'react/jsx-runtime';
import { User } from 'lucide-react';
import { forwardRef } from 'react';
import { Icon } from '../../icons/index.js';
import { generateInitials, buildAvatarClassName, buildAvatarInitialsClassName, buildAvatarIconClassName, getIconSize, buildStatusIndicatorClassName } from './helpers.js';

const AvatarServer = forwardRef(({ alt, name, size = 'md', variant = 'circle', status, showStatus = false, icon: CustomIcon = User, className, ...props }, ref) => {
    const shouldShowInitials = name && name.trim();
    const shouldShowIcon = !shouldShowInitials;
    const initials = name ? generateInitials(name) : '';
    const avatarClassName = buildAvatarClassName(size, variant, className);
    return (jsxs("div", { ref: ref, className: avatarClassName, role: "img", "aria-label": alt || (name ? `Avatar for ${name}` : 'User avatar'), ...props, children: [shouldShowInitials && (jsx("span", { className: buildAvatarInitialsClassName(size), "aria-hidden": "true", children: initials })), shouldShowIcon && (jsx(Icon, { icon: CustomIcon, size: getIconSize(size), className: buildAvatarIconClassName(size), "aria-hidden": "true" })), showStatus && status && (jsx("div", { className: buildStatusIndicatorClassName(size, status), "aria-label": `Status: ${status}`, role: "status" }))] }));
});
AvatarServer.displayName = 'AvatarServer';

export { AvatarServer };
//# sourceMappingURL=avatar-server.js.map
