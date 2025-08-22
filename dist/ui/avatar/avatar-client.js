'use client';
import { jsxs, jsx } from 'react/jsx-runtime';
import { User } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Icon } from '../../icons/index.js';
import { generateInitials, buildAvatarClassName, buildAvatarImageClassName, buildAvatarInitialsClassName, buildAvatarIconClassName, getIconSize, buildStatusIndicatorClassName } from './helpers.js';

const AvatarWithImage = forwardRef(({ src, alt, name, size = 'md', variant = 'circle', status, showStatus = false, icon: CustomIcon = User, className, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageError = () => {
        setImageError(true);
    };
    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageError(false);
    };
    const shouldShowImage = src && !imageError && imageLoaded;
    const shouldShowInitials = !shouldShowImage && name && name.trim();
    const shouldShowIcon = !shouldShowImage && !shouldShowInitials;
    const initials = name ? generateInitials(name) : '';
    const avatarClassName = buildAvatarClassName(size, variant, className);
    return (jsxs("div", { ref: ref, className: avatarClassName, role: "img", "aria-label": alt || (name ? `Avatar for ${name}` : 'User avatar'), ...props, children: [src && (jsx("img", { src: src, alt: alt || (name ? `Avatar for ${name}` : 'User avatar'), className: buildAvatarImageClassName(variant), onError: handleImageError, onLoad: handleImageLoad, style: {
                    display: shouldShowImage ? 'block' : 'none',
                } })), shouldShowInitials && (jsx("span", { className: buildAvatarInitialsClassName(size), "aria-hidden": "true", children: initials })), shouldShowIcon && (jsx(Icon, { icon: CustomIcon, size: getIconSize(size), className: buildAvatarIconClassName(size), "aria-hidden": "true" })), showStatus && status && (jsx("div", { className: buildStatusIndicatorClassName(size, status), "aria-label": `Status: ${status}`, role: "status" }))] }));
});
AvatarWithImage.displayName = 'AvatarWithImage';

export { AvatarWithImage };
//# sourceMappingURL=avatar-client.js.map
