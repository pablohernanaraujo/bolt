/* eslint-disable complexity */
// /src/ui/avatar/avatar-client.tsx
// Client-side avatar component with image loading state management
// Provides image avatars with fallback handling using client-side state
// RELEVANT FILES: avatar-server.tsx, avatar.css.ts, types.ts, helpers.ts

'use client';

import { User, type LucideIcon } from 'lucide-react';
import { forwardRef, useState, type ReactElement } from 'react';

import { Icon } from '@/icons';

import {
  buildAvatarClassName,
  buildAvatarIconClassName,
  buildAvatarImageClassName,
  buildAvatarInitialsClassName,
  buildStatusIndicatorClassName,
  generateInitials,
  getIconSize,
} from './helpers';
import { type AvatarProps } from './types';

/**
 * Client-side Avatar component with image loading capabilities
 * Manages image loading state and fallback handling with client-side JavaScript
 *
 * Features:
 * - Multiple sizes (xs, sm, md, lg, xl)
 * - Three shape variants (circle, rounded, square)
 * - Status indicators (online, offline, away, busy)
 * - Image loading with error handling and fallbacks
 * - Fallback chain: image → initials → icon
 * - Accessible with proper alt text and ARIA labels
 */
export const AvatarWithImage = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      variant = 'circle',
      status,
      showStatus = false,
      icon: CustomIcon = User,
      className,
      ...props
    },
    ref,
  ): ReactElement => {
    // State to track image loading errors for fallback handling
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    /**
     * Handle image load error
     * Triggers fallback to initials or icon
     */
    const handleImageError = (): void => {
      setImageError(true);
    };

    /**
     * Handle successful image load
     * Ensures image is displayed when loaded
     */
    const handleImageLoad = (): void => {
      setImageLoaded(true);
      setImageError(false);
    };

    /**
     * Determine what content to show based on available props and image state
     * Priority: image (if loaded) → initials (if name provided) → icon
     */
    const shouldShowImage = src && !imageError && imageLoaded;
    const shouldShowInitials = !shouldShowImage && name && name.trim();
    const shouldShowIcon = !shouldShowImage && !shouldShowInitials;

    // Generate initials from name if needed
    const initials = name ? generateInitials(name) : '';

    // Build className for the avatar container
    const avatarClassName = buildAvatarClassName(size, variant, className);

    return (
      <div
        ref={ref}
        className={avatarClassName}
        role="img"
        aria-label={alt || (name ? `Avatar for ${name}` : 'User avatar')}
        {...props}
      >
        {/* Image avatar - shows when src is provided and loaded successfully */}
        {src && (
          <img
            src={src}
            alt={alt || (name ? `Avatar for ${name}` : 'User avatar')}
            className={buildAvatarImageClassName(variant)}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{
              display: shouldShowImage ? 'block' : 'none',
            }}
          />
        )}

        {/* Initials avatar - shows when name is provided but no image */}
        {shouldShowInitials && (
          <span
            className={buildAvatarInitialsClassName(size)}
            aria-hidden="true"
          >
            {initials}
          </span>
        )}

        {/* Icon avatar - fallback when no image or name */}
        {shouldShowIcon && (
          <Icon
            icon={CustomIcon as LucideIcon}
            size={getIconSize(size)}
            className={buildAvatarIconClassName(size)}
            aria-hidden="true"
          />
        )}

        {/* Status indicator - optional colored dot showing user status */}
        {showStatus && status && (
          <div
            className={buildStatusIndicatorClassName(size, status)}
            aria-label={`Status: ${status}`}
            role="status"
          />
        )}
      </div>
    );
  },
);

AvatarWithImage.displayName = 'AvatarWithImage';
