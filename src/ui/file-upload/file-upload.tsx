/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
// /src/ui/file-upload/file-upload.tsx
// Compound FileUpload component built with React Aria Components
// Provides accessible drag-and-drop file upload with comprehensive file management
// RELEVANT FILES: types.ts, helpers.ts, file-upload.css.ts

'use client';

import React, {
  type ChangeEvent,
  createContext,
  type DragEvent,
  forwardRef,
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { File, FileText, Icon, Image, X } from '@/icons';

import { Button } from '../button';
import * as styles from './file-upload.css';
import {
  buildAcceptString,
  buildFileUploadItemClassName,
  buildFileUploadListClassName,
  buildFileUploadRootClassName,
  buildFileUploadTriggerClassName,
  cleanupFilePreviews,
  fileListToArray,
  formatFileSize,
  getFileExtension,
  getFileTypeIcon,
  isImageFile,
  validateFiles,
} from './helpers';
import {
  type FileUploadDeleteTriggerProps,
  type FileUploadFile,
  type FileUploadHiddenInputProps,
  type FileUploadItemProps,
  type FileUploadListProps,
  type FileUploadRootProps,
  type FileUploadTriggerProps,
} from './types';

/**
 * Context for sharing FileUpload state between components
 */
interface FileUploadContext {
  files: FileUploadFile[];
  multiple?: boolean;
  maxFileSize?: number;
  maxFiles?: number;
  accept?: string[];
  isDisabled?: boolean;
  hasError?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outline' | 'filled';
  onFilesChange?: (files: FileUploadFile[]) => void;
  onError?: (error: string) => void;
  onFileRemove: (file: FileUploadFile) => void;
}

const FileUploadContext = createContext<FileUploadContext | null>(null);

/**
 * Hook to access FileUpload context
 */
const useFileUpload = (): FileUploadContext => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error(
      'FileUpload components must be used within FileUpload.Root',
    );
  }
  return context;
};

/**
 * FileUpload.Root - Main container component with drag-and-drop support
 * Manages file state and provides context to child components
 */
const FileUploadRoot = forwardRef<HTMLDivElement, FileUploadRootProps>(
  (
    {
      children,
      multiple = false,
      maxFileSize,
      maxFiles,
      accept,
      files: controlledFiles,
      onFilesChange,
      onError,
      size = 'medium',
      variant = 'outline',
      isDisabled = false,
      hasError = false,
      className,
      ...props
    },
    ref,
  ): ReactElement => {
    // Internal state for uncontrolled usage
    const [internalFiles, setInternalFiles] = useState<FileUploadFile[]>([]);

    // Use controlled or uncontrolled files
    const files = controlledFiles ?? internalFiles;
    const setFiles = onFilesChange ?? setInternalFiles;

    // Drag state
    const [isDragOver, setIsDragOver] = useState(false);

    /**
     * Handle file selection and validation
     */
    const handleFiles = useCallback(
      (newFiles: File[]) => {
        if (isDisabled) return;

        // Validate files
        const validation = validateFiles(
          newFiles,
          maxFiles,
          maxFileSize,
          accept,
        );
        if (!validation.isValid) {
          onError?.(validation.message || 'Error de validación');
          return;
        }

        // Convert to FileUploadFile and add to current files
        const fileUploadFiles = fileListToArray(newFiles as any);

        if (multiple) {
          const combinedFiles = [...files, ...fileUploadFiles];

          // Check total file count after combining
          if (maxFiles && combinedFiles.length > maxFiles) {
            onError?.(`Máximo ${maxFiles} archivos permitidos`);
            return;
          }

          setFiles(combinedFiles);
        } else {
          // Clean up previous file preview if not multiple
          cleanupFilePreviews(files);
          setFiles(fileUploadFiles);
        }
      },
      [
        files,
        multiple,
        maxFiles,
        maxFileSize,
        accept,
        isDisabled,
        onError,
        setFiles,
      ],
    );

    /**
     * Handle file removal
     */
    const handleFileRemove = useCallback(
      (fileToRemove: FileUploadFile) => {
        // Clean up preview URL only on client side
        if (typeof window !== 'undefined' && fileToRemove.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }

        const updatedFiles = files.filter(
          (file) => file.id !== fileToRemove.id,
        );
        setFiles(updatedFiles);
      },
      [files, setFiles],
    );

    /**
     * Handle drag events
     */
    const handleDragOver = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        e.preventDefault();
        setIsDragOver(true);
      },
      [isDisabled],
    );

    const handleDragLeave = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        e.preventDefault();
        setIsDragOver(false);
      },
      [isDisabled],
    );

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        e.preventDefault();
        setIsDragOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
          handleFiles(droppedFiles);
        }
      },
      [isDisabled, handleFiles],
    );

    // Clean up preview URLs on unmount
    useEffect(
      () => () => {
        cleanupFilePreviews(files);
      },
      [files],
    );

    const contextValue: FileUploadContext = {
      files,
      multiple,
      maxFileSize,
      maxFiles,
      accept,
      isDisabled,
      hasError,
      size,
      variant,
      onFilesChange: setFiles,
      onError,
      onFileRemove: handleFileRemove,
    };

    return (
      <FileUploadContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={buildFileUploadRootClassName(
            variant,
            size,
            isDisabled,
            hasError,
            className,
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          data-drag-over={isDragOver}
          data-disabled={isDisabled}
          {...props}
        >
          {children}
        </div>
      </FileUploadContext.Provider>
    );
  },
);

FileUploadRoot.displayName = 'FileUpload.Root';

/**
 * FileUpload.HiddenInput - Hidden file input element
 */
const FileUploadHiddenInput = forwardRef<
  HTMLInputElement,
  FileUploadHiddenInputProps
>(({ multiple, accept, className, ...props }, ref): ReactElement => {
  const { multiple: contextMultiple, accept: contextAccept } = useFileUpload();

  return (
    <input
      ref={ref}
      type="file"
      multiple={multiple ?? contextMultiple}
      accept={accept ?? buildAcceptString(contextAccept)}
      className={`${styles.hiddenInput} ${className || ''}`}
      {...props}
    />
  );
});

FileUploadHiddenInput.displayName = 'FileUpload.HiddenInput';

/**
 * FileUpload.Trigger - Button to trigger file selection
 * Uses a hidden input and click handler instead of React Aria FileTrigger to avoid button nesting
 */
const FileUploadTrigger = forwardRef<HTMLButtonElement, FileUploadTriggerProps>(
  (
    {
      children,
      asChild = false,
      size,
      isDisabled,
      className,
      onClick,
      ...props
    },
    ref,
  ): ReactElement => {
    const {
      multiple,
      accept,
      isDisabled: contextDisabled,
      size: contextSize,
      onFilesChange,
    } = useFileUpload();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => {
      if (!contextDisabled && !isDisabled) {
        inputRef.current?.click();
      }
    }, [contextDisabled, isDisabled]);

    const handleButtonClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        handleClick();
        onClick?.(e);
      },
      [handleClick, onClick],
    );

    const handleFileChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const fileArray = fileListToArray(files);
          onFilesChange?.(fileArray);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = '';
      },
      [onFilesChange],
    );

    const finalSize = size ?? contextSize ?? 'medium';
    const finalDisabled = isDisabled ?? contextDisabled;

    if (asChild) {
      // When using asChild, we expect the child to be a button-like element
      // We'll clone it and add our file upload functionality
      const childElement = React.Children.only(children) as React.ReactElement;

      return (
        <>
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={buildAcceptString(accept)}
            onChange={handleFileChange}
            className={styles.hiddenInput}
            disabled={finalDisabled}
          />
          {React.cloneElement(childElement as any, {
            ...(typeof childElement.props === 'object' &&
            childElement.props !== null
              ? childElement.props
              : {}),
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              handleClick();
              // Call the child's onClick if it exists
              const childProps =
                typeof childElement.props === 'object' &&
                childElement.props !== null
                  ? childElement.props
                  : {};
              (childProps as any).onClick?.(e);
              onClick?.(e);
            },
            disabled:
              finalDisabled ||
              (typeof childElement.props === 'object' &&
              childElement.props !== null
                ? (childElement.props as any).disabled
                : false),
            className: `${buildFileUploadTriggerClassName(
              finalSize,
              finalDisabled,
              className,
            )} ${(typeof childElement.props === 'object' && childElement.props !== null ? (childElement.props as any).className : '') || ''}`.trim(),
          })}
        </>
      );
    }

    return (
      <>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={buildAcceptString(accept)}
          onChange={handleFileChange}
          className={styles.hiddenInput}
          disabled={finalDisabled}
        />
        <Button
          ref={ref}
          size={finalSize}
          variant="secondary"
          isDisabled={finalDisabled}
          className={className}
          onClick={handleButtonClick}
          {...(props as any)}
        >
          {children}
        </Button>
      </>
    );
  },
);

FileUploadTrigger.displayName = 'FileUpload.Trigger';

/**
 * FileUpload.List - Display selected files
 */
const FileUploadList = forwardRef<HTMLDivElement, FileUploadListProps>(
  (
    { files: propFiles, renderItem, showPreviews = true, className, ...props },
    ref,
  ): ReactElement => {
    const { files: contextFiles } = useFileUpload();
    const files = propFiles ?? contextFiles;

    if (files.length === 0) {
      return (
        <div ref={ref} className={styles.emptyState}>
          No files selected
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={buildFileUploadListClassName(className)}
        {...props}
      >
        {files.map((file, index) => (
          <div key={file.id}>
            {renderItem ? (
              renderItem(file, index)
            ) : (
              <FileUploadItem
                file={file}
                index={index}
                showPreview={showPreviews}
              />
            )}
          </div>
        ))}
      </div>
    );
  },
);

FileUploadList.displayName = 'FileUpload.List';

/**
 * FileUpload.Item - Individual file display
 */
const FileUploadItem = forwardRef<HTMLDivElement, FileUploadItemProps>(
  (
    {
      file,
      index,
      showPreview = true,
      onRemove,
      hasError = false,
      className,
      ...props
    },
    ref,
  ): ReactElement => {
    const { onFileRemove } = useFileUpload();

    const handleRemove = useCallback(() => {
      onRemove?.(file);
      onFileRemove(file);
    }, [file, onRemove, onFileRemove]);

    // Determine icon based on file type
    const fileTypeIcon = getFileTypeIcon(file);
    const IconComponent =
      fileTypeIcon === 'image'
        ? Image
        : fileTypeIcon === 'file-text'
          ? FileText
          : File;

    return (
      <div
        ref={ref}
        className={buildFileUploadItemClassName(hasError, className)}
        {...props}
      >
        {/* File preview or icon */}
        {showPreview && file.preview && isImageFile(file) ? (
          <img src={file.preview} alt={file.name} className={styles.preview} />
        ) : (
          <div className={styles.fileIcon}>
            <Icon icon={IconComponent} size="sm" />
          </div>
        )}

        {/* File information */}
        <div className={styles.fileInfo}>
          <div className={styles.fileName}>{file.name}</div>
          <div className={styles.fileDetails}>
            <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
            <span className={styles.fileType}>
              {getFileExtension(file.name) || 'file'}
            </span>
          </div>
        </div>

        {/* Delete button */}
        <FileUploadDeleteTrigger
          file={file}
          onDelete={handleRemove}
          aria-label={`Remove ${file.name}`}
        >
          <Icon icon={X} size="sm" />
        </FileUploadDeleteTrigger>
      </div>
    );
  },
);

FileUploadItem.displayName = 'FileUpload.Item';

/**
 * FileUpload.DeleteTrigger - Button to remove a file
 */
const FileUploadDeleteTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadDeleteTriggerProps
>(
  (
    { file, onDelete, children, 'aria-label': ariaLabel, className, ...props },
    ref,
  ): ReactElement => {
    const handleClick = useCallback(() => {
      onDelete?.(file);
    }, [file, onDelete]);

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.deleteButton} ${className || ''}`}
        onClick={handleClick}
        aria-label={ariaLabel || `Remove ${file.name}`}
        {...props}
      >
        {children || <Icon icon={X} size="sm" />}
      </button>
    );
  },
);

FileUploadDeleteTrigger.displayName = 'FileUpload.DeleteTrigger';

/**
 * Compound FileUpload component
 * Provides all sub-components as static properties
 */
export const FileUpload = {
  Root: FileUploadRoot,
  HiddenInput: FileUploadHiddenInput,
  Trigger: FileUploadTrigger,
  List: FileUploadList,
  Item: FileUploadItem,
  DeleteTrigger: FileUploadDeleteTrigger,
};
