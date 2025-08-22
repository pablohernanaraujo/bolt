'use client';
import React, { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState, } from 'react';
import { File, FileText, Icon, Image, X } from '@/icons';
import { Button } from '../button';
import * as styles from './file-upload.css';
import { buildAcceptString, buildFileUploadItemClassName, buildFileUploadListClassName, buildFileUploadRootClassName, buildFileUploadTriggerClassName, cleanupFilePreviews, fileListToArray, formatFileSize, getFileExtension, getFileTypeIcon, isImageFile, validateFiles, } from './helpers';
const FileUploadContext = createContext(null);
const useFileUpload = () => {
    const context = useContext(FileUploadContext);
    if (!context) {
        throw new Error('FileUpload components must be used within FileUpload.Root');
    }
    return context;
};
const FileUploadRoot = forwardRef(({ children, multiple = false, maxFileSize, maxFiles, accept, files: controlledFiles, onFilesChange, onError, size = 'medium', variant = 'outline', isDisabled = false, hasError = false, className, ...props }, ref) => {
    const [internalFiles, setInternalFiles] = useState([]);
    const files = controlledFiles ?? internalFiles;
    const setFiles = onFilesChange ?? setInternalFiles;
    const [isDragOver, setIsDragOver] = useState(false);
    const handleFiles = useCallback((newFiles) => {
        if (isDisabled)
            return;
        const validation = validateFiles(newFiles, maxFiles, maxFileSize, accept);
        if (!validation.isValid) {
            onError?.(validation.message || 'Error de validación');
            return;
        }
        const fileUploadFiles = fileListToArray(newFiles);
        if (multiple) {
            const combinedFiles = [...files, ...fileUploadFiles];
            if (maxFiles && combinedFiles.length > maxFiles) {
                onError?.(`Máximo ${maxFiles} archivos permitidos`);
                return;
            }
            setFiles(combinedFiles);
        }
        else {
            cleanupFilePreviews(files);
            setFiles(fileUploadFiles);
        }
    }, [
        files,
        multiple,
        maxFiles,
        maxFileSize,
        accept,
        isDisabled,
        onError,
        setFiles,
    ]);
    const handleFileRemove = useCallback((fileToRemove) => {
        if (typeof window !== 'undefined' && fileToRemove.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }
        const updatedFiles = files.filter((file) => file.id !== fileToRemove.id);
        setFiles(updatedFiles);
    }, [files, setFiles]);
    const handleDragOver = useCallback((e) => {
        if (isDisabled)
            return;
        e.preventDefault();
        setIsDragOver(true);
    }, [isDisabled]);
    const handleDragLeave = useCallback((e) => {
        if (isDisabled)
            return;
        e.preventDefault();
        setIsDragOver(false);
    }, [isDisabled]);
    const handleDrop = useCallback((e) => {
        if (isDisabled)
            return;
        e.preventDefault();
        setIsDragOver(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles);
        }
    }, [isDisabled, handleFiles]);
    useEffect(() => () => {
        cleanupFilePreviews(files);
    }, [files]);
    const contextValue = {
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
    return (<FileUploadContext.Provider value={contextValue}>
        <div ref={ref} className={buildFileUploadRootClassName(variant, size, isDisabled, hasError, className)} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} data-drag-over={isDragOver} data-disabled={isDisabled} {...props}>
          {children}
        </div>
      </FileUploadContext.Provider>);
});
FileUploadRoot.displayName = 'FileUpload.Root';
const FileUploadHiddenInput = forwardRef(({ multiple, accept, className, ...props }, ref) => {
    const { multiple: contextMultiple, accept: contextAccept } = useFileUpload();
    return (<input ref={ref} type="file" multiple={multiple ?? contextMultiple} accept={accept ?? buildAcceptString(contextAccept)} className={`${styles.hiddenInput} ${className || ''}`} {...props}/>);
});
FileUploadHiddenInput.displayName = 'FileUpload.HiddenInput';
const FileUploadTrigger = forwardRef(({ children, asChild = false, size, isDisabled, className, onClick, ...props }, ref) => {
    const { multiple, accept, isDisabled: contextDisabled, size: contextSize, onFilesChange, } = useFileUpload();
    const inputRef = useRef(null);
    const handleClick = useCallback(() => {
        if (!contextDisabled && !isDisabled) {
            inputRef.current?.click();
        }
    }, [contextDisabled, isDisabled]);
    const handleButtonClick = useCallback((e) => {
        handleClick();
        onClick?.(e);
    }, [handleClick, onClick]);
    const handleFileChange = useCallback((e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileArray = fileListToArray(files);
            onFilesChange?.(fileArray);
        }
        e.target.value = '';
    }, [onFilesChange]);
    const finalSize = size ?? contextSize ?? 'medium';
    const finalDisabled = isDisabled ?? contextDisabled;
    if (asChild) {
        const childElement = React.Children.only(children);
        return (<>
          <input ref={inputRef} type="file" multiple={multiple} accept={buildAcceptString(accept)} onChange={handleFileChange} className={styles.hiddenInput} disabled={finalDisabled}/>
          {React.cloneElement(childElement, {
                ...(typeof childElement.props === 'object' &&
                    childElement.props !== null
                    ? childElement.props
                    : {}),
                onClick: (e) => {
                    handleClick();
                    const childProps = typeof childElement.props === 'object' &&
                        childElement.props !== null
                        ? childElement.props
                        : {};
                    childProps.onClick?.(e);
                    onClick?.(e);
                },
                disabled: finalDisabled ||
                    (typeof childElement.props === 'object' &&
                        childElement.props !== null
                        ? childElement.props.disabled
                        : false),
                className: `${buildFileUploadTriggerClassName(finalSize, finalDisabled, className)} ${(typeof childElement.props === 'object' && childElement.props !== null ? childElement.props.className : '') || ''}`.trim(),
            })}
        </>);
    }
    return (<>
        <input ref={inputRef} type="file" multiple={multiple} accept={buildAcceptString(accept)} onChange={handleFileChange} className={styles.hiddenInput} disabled={finalDisabled}/>
        <Button ref={ref} size={finalSize} variant="secondary" isDisabled={finalDisabled} className={className} onClick={handleButtonClick} {...props}>
          {children}
        </Button>
      </>);
});
FileUploadTrigger.displayName = 'FileUpload.Trigger';
const FileUploadList = forwardRef(({ files: propFiles, renderItem, showPreviews = true, className, ...props }, ref) => {
    const { files: contextFiles } = useFileUpload();
    const files = propFiles ?? contextFiles;
    if (files.length === 0) {
        return (<div ref={ref} className={styles.emptyState}>
          No files selected
        </div>);
    }
    return (<div ref={ref} className={buildFileUploadListClassName(className)} {...props}>
        {files.map((file, index) => (<div key={file.id}>
            {renderItem ? (renderItem(file, index)) : (<FileUploadItem file={file} index={index} showPreview={showPreviews}/>)}
          </div>))}
      </div>);
});
FileUploadList.displayName = 'FileUpload.List';
const FileUploadItem = forwardRef(({ file, index, showPreview = true, onRemove, hasError = false, className, ...props }, ref) => {
    const { onFileRemove } = useFileUpload();
    const handleRemove = useCallback(() => {
        onRemove?.(file);
        onFileRemove(file);
    }, [file, onRemove, onFileRemove]);
    const fileTypeIcon = getFileTypeIcon(file);
    const IconComponent = fileTypeIcon === 'image'
        ? Image
        : fileTypeIcon === 'file-text'
            ? FileText
            : File;
    return (<div ref={ref} className={buildFileUploadItemClassName(hasError, className)} {...props}>
        
        {showPreview && file.preview && isImageFile(file) ? (<img src={file.preview} alt={file.name} className={styles.preview}/>) : (<div className={styles.fileIcon}>
            <Icon icon={IconComponent} size="sm"/>
          </div>)}

        
        <div className={styles.fileInfo}>
          <div className={styles.fileName}>{file.name}</div>
          <div className={styles.fileDetails}>
            <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
            <span className={styles.fileType}>
              {getFileExtension(file.name) || 'file'}
            </span>
          </div>
        </div>

        
        <FileUploadDeleteTrigger file={file} onDelete={handleRemove} aria-label={`Remove ${file.name}`}>
          <Icon icon={X} size="sm"/>
        </FileUploadDeleteTrigger>
      </div>);
});
FileUploadItem.displayName = 'FileUpload.Item';
const FileUploadDeleteTrigger = forwardRef(({ file, onDelete, children, 'aria-label': ariaLabel, className, ...props }, ref) => {
    const handleClick = useCallback(() => {
        onDelete?.(file);
    }, [file, onDelete]);
    return (<button ref={ref} type="button" className={`${styles.deleteButton} ${className || ''}`} onClick={handleClick} aria-label={ariaLabel || `Remove ${file.name}`} {...props}>
        {children || <Icon icon={X} size="sm"/>}
      </button>);
});
FileUploadDeleteTrigger.displayName = 'FileUpload.DeleteTrigger';
export const FileUpload = {
    Root: FileUploadRoot,
    HiddenInput: FileUploadHiddenInput,
    Trigger: FileUploadTrigger,
    List: FileUploadList,
    Item: FileUploadItem,
    DeleteTrigger: FileUploadDeleteTrigger,
};
