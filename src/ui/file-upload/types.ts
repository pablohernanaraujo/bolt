// /src/ui/file-upload/types.ts
// TypeScript types and interfaces for FileUpload compound component
// Defines props for all sub-components and file handling utilities
// RELEVANT FILES: file-upload.tsx, helpers.ts, ../input/types.ts

import { type ReactNode } from 'react';
import React from 'react';

/**
 * Size variants for file upload component
 */
export type FileUploadSize = 'small' | 'medium' | 'large';

/**
 * Visual variants for file upload component
 */
export type FileUploadVariant = 'outline' | 'filled';

/**
 * Base props shared across FileUpload components
 */
export interface FileUploadBaseProps {
  /**
   * Size of the file upload component
   * @default 'medium'
   */
  size?: FileUploadSize;

  /**
   * Visual variant of the file upload
   * @default 'outline'
   */
  variant?: FileUploadVariant;

  /**
   * Whether the component is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the component has an error state
   * @default false
   */
  hasError?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Extended file information interface
 */
export interface FileUploadFile extends File {
  /**
   * Unique identifier for the file
   */
  id: string;

  /**
   * Preview URL for images (optional)
   */
  preview?: string;
}

/**
 * Props for FileUpload.Root component
 */
export interface FileUploadRootProps extends FileUploadBaseProps {
  /**
   * Child components
   */
  children: ReactNode;

  /**
   * Whether to accept multiple files
   * @default false
   */
  multiple?: boolean;

  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;

  /**
   * Maximum number of files
   */
  maxFiles?: number;

  /**
   * Accepted file types (MIME types or extensions)
   * @example ['image/*', '.pdf', 'text/csv']
   */
  accept?: string[];

  /**
   * Callback when files are selected or dropped
   */
  onFilesChange?: (files: FileUploadFile[]) => void;

  /**
   * Callback when file validation fails
   */
  onError?: (error: string) => void;

  /**
   * Current selected files
   */
  files?: FileUploadFile[];
}

/**
 * Props for FileUpload.HiddenInput component
 */
export interface FileUploadHiddenInputProps {
  /**
   * Whether to accept multiple files
   */
  multiple?: boolean;

  /**
   * Accepted file types
   */
  accept?: string;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props for FileUpload.Trigger component
 */
export interface FileUploadTriggerProps extends FileUploadBaseProps {
  /**
   * Child component (usually a Button)
   */
  children: ReactNode;

  /**
   * Whether to use asChild pattern
   * @default false
   */
  asChild?: boolean;

  /**
   * Click handler for the trigger button
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Props for FileUpload.List component
 */
export interface FileUploadListProps extends FileUploadBaseProps {
  /**
   * Array of files to display
   */
  files: FileUploadFile[];

  /**
   * Custom render function for each file item
   */
  renderItem?: (file: FileUploadFile, index: number) => ReactNode;

  /**
   * Whether to show file previews for images
   * @default true
   */
  showPreviews?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props for FileUpload.Item component
 */
export interface FileUploadItemProps extends FileUploadBaseProps {
  /**
   * File information to display
   */
  file: FileUploadFile;

  /**
   * Index of the file in the list
   */
  index: number;

  /**
   * Whether to show file preview for images
   * @default true
   */
  showPreview?: boolean;

  /**
   * Callback when file is removed
   */
  onRemove?: (file: FileUploadFile) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props for FileUpload.DeleteTrigger component
 */
export interface FileUploadDeleteTriggerProps extends FileUploadBaseProps {
  /**
   * File to be removed
   */
  file: FileUploadFile;

  /**
   * Callback when delete is triggered
   */
  onDelete?: (file: FileUploadFile) => void;

  /**
   * Custom children (usually an icon)
   */
  children?: ReactNode;

  /**
   * ARIA label for the delete button
   */
  'aria-label'?: string;
}

/**
 * File validation error types
 */
export type FileUploadError =
  | 'file-too-large'
  | 'file-invalid-type'
  | 'too-many-files'
  | 'upload-failed'
  | 'generic-error';

/**
 * File upload validation result
 */
export interface FileUploadValidation {
  /**
   * Whether the validation passed
   */
  isValid: boolean;

  /**
   * Error type if validation failed
   */
  error?: FileUploadError;

  /**
   * Human-readable error message
   */
  message?: string;
}
