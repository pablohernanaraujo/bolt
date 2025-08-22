// /src/ui/file-upload/index.ts
// Barrel export file for FileUpload component
// Exports all FileUpload components and types for easy importing
// RELEVANT FILES: file-upload.tsx, types.ts, helpers.ts

export { FileUpload } from './file-upload';
export {
  cleanupFilePreviews,
  createFileUploadFile,
  fileListToArray,
  formatFileSize,
  getFileExtension,
  getFileTypeIcon,
  isImageFile,
  validateFile,
  validateFiles,
} from './helpers';
export type {
  FileUploadDeleteTriggerProps,
  FileUploadError,
  FileUploadFile,
  FileUploadHiddenInputProps,
  FileUploadItemProps,
  FileUploadListProps,
  FileUploadRootProps,
  FileUploadSize,
  FileUploadTriggerProps,
  FileUploadValidation,
  FileUploadVariant,
} from './types';
