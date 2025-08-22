/* eslint-disable max-statements */
/* eslint-disable max-params */
// /src/ui/file-upload/helpers.ts
// Utility functions for FileUpload component: validation, formatting, and className builders
// Handles file validation, size formatting, and CSS class composition
// RELEVANT FILES: types.ts, file-upload.css.ts, file-upload.tsx

import * as styles from './file-upload.css';
import {
  type FileUploadFile,
  type FileUploadSize,
  type FileUploadValidation,
  type FileUploadVariant,
} from './types';

/**
 * Counter for generating unique file IDs
 * Uses a global counter to ensure uniqueness without Math.random()
 */
let fileIdCounter = 0;

/**
 * Convert a regular File object to FileUploadFile with unique ID
 * @param file - The original File object
 * @returns FileUploadFile with generated ID
 */
export const createFileUploadFile = (file: File): FileUploadFile => {
  const fileUploadFile = file as FileUploadFile;
  // Use a deterministic ID based on file properties and a counter
  // This avoids hydration issues with Math.random()
  fileIdCounter += 1;
  fileUploadFile.id = `${file.name}-${file.size}-${file.lastModified}-${fileIdCounter}`;

  // Generate preview URL for images only on client side
  if (typeof window !== 'undefined' && file.type.startsWith('image/')) {
    fileUploadFile.preview = URL.createObjectURL(file);
  }

  return fileUploadFile;
};

/**
 * Convert FileList to array of FileUploadFile objects
 * @param fileList - FileList from input element
 * @returns Array of FileUploadFile objects
 */
export const fileListToArray = (
  fileList: FileList | null,
): FileUploadFile[] => {
  if (!fileList) return [];

  return Array.from(fileList).map(createFileUploadFile);
};

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  );
};

/**
 * Get file extension from filename
 * @param filename - Name of the file
 * @returns File extension with dot (e.g., '.pdf')
 */
export const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.slice(lastDot) : '';
};

/**
 * Check if file type matches accepted types
 * @param file - File to validate
 * @param acceptedTypes - Array of accepted MIME types or extensions
 * @returns Whether file type is accepted
 */
export const isFileTypeAccepted = (
  file: File,
  acceptedTypes?: string[],
): boolean => {
  if (!acceptedTypes || acceptedTypes.length === 0) return true;

  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  return acceptedTypes.some((type) => {
    // Handle MIME type patterns (e.g., 'image/*')
    if (type.includes('*')) {
      const pattern = type.replace('*', '.*');
      return new RegExp(pattern).test(fileType);
    }

    // Handle specific MIME types (e.g., 'image/jpeg')
    if (type.includes('/')) {
      return fileType === type;
    }

    // Handle file extensions (e.g., '.pdf', 'pdf')
    const extension = type.startsWith('.') ? type : `.${type}`;
    return fileName.endsWith(extension.toLowerCase());
  });
};

/**
 * Validate a single file against constraints
 * @param file - File to validate
 * @param maxFileSize - Maximum file size in bytes
 * @param acceptedTypes - Array of accepted file types
 * @returns Validation result
 */
export const validateFile = (
  file: File,
  maxFileSize?: number,
  acceptedTypes?: string[],
): FileUploadValidation => {
  // Check file size
  if (maxFileSize && file.size > maxFileSize) {
    return {
      isValid: false,
      error: 'file-too-large',
      message: `El archivo es demasiado grande. Máximo ${formatFileSize(maxFileSize)}.`,
    };
  }

  // Check file type
  if (!isFileTypeAccepted(file, acceptedTypes)) {
    const acceptedTypesStr = acceptedTypes?.join(', ') || '';
    return {
      isValid: false,
      error: 'file-invalid-type',
      message: `Tipo de archivo no permitido. Tipos aceptados: ${acceptedTypesStr}`,
    };
  }

  return { isValid: true };
};

/**
 * Validate multiple files against constraints
 * @param files - Array of files to validate
 * @param maxFiles - Maximum number of files
 * @param maxFileSize - Maximum file size in bytes
 * @param acceptedTypes - Array of accepted file types
 * @returns Validation result for all files
 */
export const validateFiles = (
  files: File[],
  maxFiles?: number,
  maxFileSize?: number,
  acceptedTypes?: string[],
): FileUploadValidation => {
  // Check number of files
  if (maxFiles && files.length > maxFiles) {
    return {
      isValid: false,
      error: 'too-many-files',
      message: `Demasiados archivos. Máximo ${maxFiles} archivos permitidos.`,
    };
  }

  // Validate each file
  for (const file of files) {
    const fileValidation = validateFile(file, maxFileSize, acceptedTypes);
    if (!fileValidation.isValid) {
      return fileValidation;
    }
  }

  return { isValid: true };
};

/**
 * Clean up preview URLs to prevent memory leaks
 * @param files - Array of FileUploadFile objects
 */
export const cleanupFilePreviews = (files: FileUploadFile[]): void => {
  // Only cleanup on client side
  if (typeof window === 'undefined') return;

  for (const file of files) {
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  }
};

/**
 * Build className for FileUpload root component
 * @param variant - Visual variant
 * @param size - Component size
 * @param isDisabled - Whether component is disabled
 * @param hasError - Whether component has error
 * @param className - Additional CSS classes
 * @returns Combined className string
 */
export const buildFileUploadRootClassName = (
  variant: FileUploadVariant = 'outline',
  size: FileUploadSize = 'medium',
  isDisabled = false,
  hasError = false,
  className?: string,
): string => {
  const classes = [
    styles.fileUploadRoot,
    styles.variants[variant],
    styles.sizes[size],
  ];

  if (isDisabled) {
    classes.push(styles.disabled);
  }

  if (hasError) {
    classes.push(styles.error);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Build className for FileUpload trigger component
 * @param size - Component size
 * @param isDisabled - Whether component is disabled
 * @param className - Additional CSS classes
 * @returns Combined className string
 */
export const buildFileUploadTriggerClassName = (
  size: FileUploadSize = 'medium',
  isDisabled = false,
  className?: string,
): string => {
  const classes = [styles.trigger];

  if (isDisabled) {
    classes.push(styles.triggerDisabled);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Build className for FileUpload list component
 * @param className - Additional CSS classes
 * @returns Combined className string
 */
export const buildFileUploadListClassName = (className?: string): string => {
  const classes = [styles.list];

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Build className for FileUpload item component
 * @param hasError - Whether item has error
 * @param className - Additional CSS classes
 * @returns Combined className string
 */
export const buildFileUploadItemClassName = (
  hasError = false,
  className?: string,
): string => {
  const classes = [styles.item];

  if (hasError) {
    classes.push(styles.itemError);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Check if a file is an image
 * @param file - File to check
 * @returns Whether the file is an image
 */
export const isImageFile = (file: File): boolean =>
  file.type.startsWith('image/');

/**
 * Get appropriate icon name for file type
 * @param file - File object
 * @returns Icon name for the file type
 */
export const getFileTypeIcon = (file: File): string => {
  const type = file.type;
  const extension = getFileExtension(file.name).toLowerCase();

  // Image files
  if (type.startsWith('image/')) {
    return 'image';
  }

  // Document files
  if (type === 'application/pdf' || extension === '.pdf') {
    return 'file-text';
  }

  // Video files
  if (type.startsWith('video/')) {
    return 'video';
  }

  // Audio files
  if (type.startsWith('audio/')) {
    return 'music';
  }

  // Archive files
  if (
    ['zip', 'rar', '7z', 'tar', 'gz'].some((ext) => extension.includes(ext))
  ) {
    return 'archive';
  }

  // Default file icon
  return 'file';
};

/**
 * Convert accepted types array to accept attribute string
 * @param acceptedTypes - Array of accepted MIME types or extensions
 * @returns String for input accept attribute
 */
export const buildAcceptString = (
  acceptedTypes?: string[],
): string | undefined => {
  if (!acceptedTypes || acceptedTypes.length === 0) return undefined;
  return acceptedTypes.join(',');
};
