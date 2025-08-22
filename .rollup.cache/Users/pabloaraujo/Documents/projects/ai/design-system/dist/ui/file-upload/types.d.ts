import { type ReactNode } from 'react';
import React from 'react';
export type FileUploadSize = 'small' | 'medium' | 'large';
export type FileUploadVariant = 'outline' | 'filled';
export interface FileUploadBaseProps {
    size?: FileUploadSize;
    variant?: FileUploadVariant;
    isDisabled?: boolean;
    hasError?: boolean;
    className?: string;
}
export interface FileUploadFile extends File {
    id: string;
    preview?: string;
}
export interface FileUploadRootProps extends FileUploadBaseProps {
    children: ReactNode;
    multiple?: boolean;
    maxFileSize?: number;
    maxFiles?: number;
    accept?: string[];
    onFilesChange?: (files: FileUploadFile[]) => void;
    onError?: (error: string) => void;
    files?: FileUploadFile[];
}
export interface FileUploadHiddenInputProps {
    multiple?: boolean;
    accept?: string;
    className?: string;
}
export interface FileUploadTriggerProps extends FileUploadBaseProps {
    children: ReactNode;
    asChild?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface FileUploadListProps extends FileUploadBaseProps {
    files: FileUploadFile[];
    renderItem?: (file: FileUploadFile, index: number) => ReactNode;
    showPreviews?: boolean;
    className?: string;
}
export interface FileUploadItemProps extends FileUploadBaseProps {
    file: FileUploadFile;
    index: number;
    showPreview?: boolean;
    onRemove?: (file: FileUploadFile) => void;
    className?: string;
}
export interface FileUploadDeleteTriggerProps extends FileUploadBaseProps {
    file: FileUploadFile;
    onDelete?: (file: FileUploadFile) => void;
    children?: ReactNode;
    'aria-label'?: string;
}
export type FileUploadError = 'file-too-large' | 'file-invalid-type' | 'too-many-files' | 'upload-failed' | 'generic-error';
export interface FileUploadValidation {
    isValid: boolean;
    error?: FileUploadError;
    message?: string;
}
//# sourceMappingURL=types.d.ts.map