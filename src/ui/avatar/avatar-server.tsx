// /src/ui/avatar/avatar-server.tsx
// Server-compatible avatar component for user profile representation
// Provides structure and presentation without client-side state management
// RELEVANT FILES: avatar-client.tsx, avatar.css.ts, types.ts, helpers.ts

import { User, type LucideIcon } from 'lucide-react';
import { forwardRef, type ReactElement } from 'react';

import { Icon } from '@/icons';

import {
  buildAvatarClassName,
  buildAvatarIconClassName,
  buildAvatarInitialsClassName,
  buildStatusIndicatorClassName,
  generateInitials,
  getIconSize,
} from './helpers';
import { type AvatarProps } from './types';

/**
 * Server-compatible Avatar component for user profile representation
 * Displays initials or fallback icons without client-side image loading state
 *
 * For image avatars that need loading state management, use AvatarWithImage from avatar-client.tsx
 *
 * Features:
 * - Multiple sizes (xs, sm, md, lg, xl)
 * - Three shape variants (circle, rounded, square)
 * - Status indicators (online, offline, away, busy)
 * - Server-compatible fallback chain: initials → icon
 * - Accessible with proper alt text and ARIA labels
 */
export const AvatarServer = forwardRef<
  HTMLDivElement,
  Omit<AvatarProps, 'src'>
>(
  (
    {
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
    // Determine what content to show based on available props
    // Priority: initials (if name provided) → icon
    const shouldShowInitials = name && name.trim();
    const shouldShowIcon = !shouldShowInitials;

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
        {/* Initials avatar - shows when name is provided */}
        {shouldShowInitials && (
          <span
            className={buildAvatarInitialsClassName(size)}
            aria-hidden="true"
          >
            {initials}
          </span>
        )}

        {/* Icon avatar - fallback when no name */}
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

AvatarServer.displayName = 'AvatarServer';
