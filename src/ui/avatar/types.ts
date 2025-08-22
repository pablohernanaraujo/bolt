/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/avatar/types.ts
// Type definitions and interfaces for the Avatar component
// Exports AvatarProps interface with size, variant, and status options
// RELEVANT FILES: avatar.tsx, index.ts, helpers.ts

import { type LucideIcon } from 'lucide-react';
import { type HTMLAttributes } from 'react';

/**
 * Status indicator for the Avatar component
 * Represents the user's online/availability status
 */
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

/**
 * Size options for the Avatar component
 * Controls the dimensions of the avatar
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Shape variant for the Avatar component
 * Controls the border radius and overall shape
 */
export type AvatarVariant = 'circle' | 'rounded' | 'square';

/**
 * Props interface for the Avatar component
 * Extends HTML div attributes with design system properties
 */
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Image source URL for the avatar
   * If provided, displays an image avatar
   */
  src?: string;

  /**
   * Alternative text for the avatar image
   * Required for accessibility when using src
   */
  alt?: string;

  /**
   * Name of the person/entity
   * Used to generate initials when no image is provided
   */
  name?: string;

  /**
   * Size of the avatar
   * Controls the dimensions and font size
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Shape variant of the avatar
   * Controls the border radius
   * @default 'circle'
   */
  variant?: AvatarVariant;

  /**
   * Status indicator for the avatar
   * Shows a colored dot to indicate user status
   */
  status?: AvatarStatus;

  /**
   * Whether to show the status indicator
   * @default false
   */
  showStatus?: boolean;

  /**
   * Custom icon to display when no image or name is provided
   * Should be a Lucide icon component
   */
  icon?: React.ComponentType<any> | LucideIcon;
}
