// /src/ui/layout/aspect-ratio/types.ts
// Type definitions and interfaces for the AspectRatio component
// Defines props for aspect ratio container with predefined and custom ratio options
// RELEVANT FILES: aspect-ratio.tsx, aspect-ratio.css.ts, helpers.ts

import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Common aspect ratio presets
 * Covers most common use cases for media and layout
 */
export type AspectRatioPreset =
  | 'square' // 1:1
  | 'video' // 16:9
  | 'photo' // 4:3
  | 'classic' // 3:2
  | 'cinema' // 21:9
  | 'portrait' // 3:4
  | 'golden'; // 1.618:1

/**
 * Custom aspect ratio definition
 * Allows for precise control with width and height values
 */
export interface CustomAspectRatio {
  width: number;
  height: number;
}

/**
 * Content fitting options for child elements
 * Controls how content is displayed within the aspect ratio container
 */
export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

/**
 * Base props for AspectRatio component
 * Extends HTML div attributes with aspect ratio specific properties
 */
export interface AspectRatioProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Predefined aspect ratio preset
   * Mutually exclusive with ratio prop
   */
  preset?: AspectRatioPreset;

  /**
   * Custom aspect ratio definition
   * Mutually exclusive with preset prop
   * @example { width: 16, height: 9 }
   */
  ratio?: CustomAspectRatio;

  /**
   * How content should fit within the container
   * Applied to direct child elements
   * @default 'cover'
   */
  objectFit?: ObjectFit;

  /**
   * HTML element to render as
   * Allows polymorphic component usage
   * @default 'div'
   */
  as?: ElementType;

  /**
   * Child elements to display within aspect ratio container
   */
  children: ReactNode;
}

/**
 * Props for className builder helper function
 */
export interface AspectRatioClassNameProps {
  preset?: AspectRatioPreset;
  ratio?: CustomAspectRatio;
  objectFit?: ObjectFit;
  className?: string;
}
