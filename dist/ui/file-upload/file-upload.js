import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { createContext, forwardRef, useState, useCallback, useEffect, useRef, useContext } from 'react';
import { Icon } from '../../icons/index.js';
import { ButtonServer } from '../button/button-server.js';
import './../../assets/src/tokens/tokens.css.ts.vanilla-BxQdvkAx.css';
import './../../assets/src/ui/button/button.css.ts.vanilla-DKj1N9w3.css';
import { hiddenInput, emptyState, preview, fileIcon, fileInfo, fileName, fileDetails, fileSize, fileType, deleteButton } from './file-upload.css.js';
import { validateFiles, fileListToArray, cleanupFilePreviews, buildFileUploadRootClassName, buildAcceptString, buildFileUploadTriggerClassName, buildFileUploadListClassName, getFileTypeIcon, buildFileUploadItemClassName, isImageFile, formatFileSize, getFileExtension } from './helpers.js';
import { Image, FileText, File, X } from 'lucide-react';

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
    return (jsx(FileUploadContext.Provider, { value: contextValue, children: jsx("div", { ref: ref, className: buildFileUploadRootClassName(variant, size, isDisabled, hasError, className), onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, "data-drag-over": isDragOver, "data-disabled": isDisabled, ...props, children: children }) }));
});
FileUploadRoot.displayName = 'FileUpload.Root';
const FileUploadHiddenInput = forwardRef(({ multiple, accept, className, ...props }, ref) => {
    const { multiple: contextMultiple, accept: contextAccept } = useFileUpload();
    return (jsx("input", { ref: ref, type: "file", multiple: multiple ?? contextMultiple, accept: accept ?? buildAcceptString(contextAccept), className: `${hiddenInput} ${className || ''}`, ...props }));
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
        return (jsxs(Fragment, { children: [jsx("input", { ref: inputRef, type: "file", multiple: multiple, accept: buildAcceptString(accept), onChange: handleFileChange, className: hiddenInput, disabled: finalDisabled }), React.cloneElement(childElement, {
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
                })] }));
    }
    return (jsxs(Fragment, { children: [jsx("input", { ref: inputRef, type: "file", multiple: multiple, accept: buildAcceptString(accept), onChange: handleFileChange, className: hiddenInput, disabled: finalDisabled }), jsx(ButtonServer, { ref: ref, size: finalSize, variant: "secondary", isDisabled: finalDisabled, className: className, onClick: handleButtonClick, ...props, children: children })] }));
});
FileUploadTrigger.displayName = 'FileUpload.Trigger';
const FileUploadList = forwardRef(({ files: propFiles, renderItem, showPreviews = true, className, ...props }, ref) => {
    const { files: contextFiles } = useFileUpload();
    const files = propFiles ?? contextFiles;
    if (files.length === 0) {
        return (jsx("div", { ref: ref, className: emptyState, children: "No files selected" }));
    }
    return (jsx("div", { ref: ref, className: buildFileUploadListClassName(className), ...props, children: files.map((file, index) => (jsx("div", { children: renderItem ? (renderItem(file, index)) : (jsx(FileUploadItem, { file: file, index: index, showPreview: showPreviews })) }, file.id))) }));
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
    return (jsxs("div", { ref: ref, className: buildFileUploadItemClassName(hasError, className), ...props, children: [showPreview && file.preview && isImageFile(file) ? (jsx("img", { src: file.preview, alt: file.name, className: preview })) : (jsx("div", { className: fileIcon, children: jsx(Icon, { icon: IconComponent, size: "sm" }) })), jsxs("div", { className: fileInfo, children: [jsx("div", { className: fileName, children: file.name }), jsxs("div", { className: fileDetails, children: [jsx("span", { className: fileSize, children: formatFileSize(file.size) }), jsx("span", { className: fileType, children: getFileExtension(file.name) || 'file' })] })] }), jsx(FileUploadDeleteTrigger, { file: file, onDelete: handleRemove, "aria-label": `Remove ${file.name}`, children: jsx(Icon, { icon: X, size: "sm" }) })] }));
});
FileUploadItem.displayName = 'FileUpload.Item';
const FileUploadDeleteTrigger = forwardRef(({ file, onDelete, children, 'aria-label': ariaLabel, className, ...props }, ref) => {
    const handleClick = useCallback(() => {
        onDelete?.(file);
    }, [file, onDelete]);
    return (jsx("button", { ref: ref, type: "button", className: `${deleteButton} ${className || ''}`, onClick: handleClick, "aria-label": ariaLabel || `Remove ${file.name}`, ...props, children: children || jsx(Icon, { icon: X, size: "sm" }) }));
});
FileUploadDeleteTrigger.displayName = 'FileUpload.DeleteTrigger';
const FileUpload = {
    Root: FileUploadRoot,
    HiddenInput: FileUploadHiddenInput,
    Trigger: FileUploadTrigger,
    List: FileUploadList,
    Item: FileUploadItem,
    DeleteTrigger: FileUploadDeleteTrigger,
};

export { FileUpload };
//# sourceMappingURL=file-upload.js.map
