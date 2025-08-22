'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Icon } from '@/icons';
import { buildAvatarClassName, buildAvatarIconClassName, buildAvatarImageClassName, buildAvatarInitialsClassName, buildStatusIndicatorClassName, generateInitials, getIconSize, } from './helpers';
export const AvatarWithImage = forwardRef(({ src, alt, name, size = 'md', variant = 'circle', status, showStatus = false, icon: CustomIcon = User, className, ...props }, ref) => {
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
    return (_jsxs("div", { ref: ref, className: avatarClassName, role: "img", "aria-label": alt || (name ? `Avatar for ${name}` : 'User avatar'), ...props, children: [src && (_jsx("img", { src: src, alt: alt || (name ? `Avatar for ${name}` : 'User avatar'), className: buildAvatarImageClassName(variant), onError: handleImageError, onLoad: handleImageLoad, style: {
                    display: shouldShowImage ? 'block' : 'none',
                } })), shouldShowInitials && (_jsx("span", { className: buildAvatarInitialsClassName(size), "aria-hidden": "true", children: initials })), shouldShowIcon && (_jsx(Icon, { icon: CustomIcon, size: getIconSize(size), className: buildAvatarIconClassName(size), "aria-hidden": "true" })), showStatus && status && (_jsx("div", { className: buildStatusIndicatorClassName(size, status), "aria-label": `Status: ${status}`, role: "status" }))] }));
});
AvatarWithImage.displayName = 'AvatarWithImage';
