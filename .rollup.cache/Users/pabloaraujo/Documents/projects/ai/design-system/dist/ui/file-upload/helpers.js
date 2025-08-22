import * as styles from './file-upload.css';
let fileIdCounter = 0;
export const createFileUploadFile = (file) => {
    const fileUploadFile = file;
    fileIdCounter += 1;
    fileUploadFile.id = `${file.name}-${file.size}-${file.lastModified}-${fileIdCounter}`;
    if (typeof window !== 'undefined' && file.type.startsWith('image/')) {
        fileUploadFile.preview = URL.createObjectURL(file);
    }
    return fileUploadFile;
};
export const fileListToArray = (fileList) => {
    if (!fileList)
        return [];
    return Array.from(fileList).map(createFileUploadFile);
};
export const formatFileSize = (bytes) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]);
};
export const getFileExtension = (filename) => {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.slice(lastDot) : '';
};
export const isFileTypeAccepted = (file, acceptedTypes) => {
    if (!acceptedTypes || acceptedTypes.length === 0)
        return true;
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    return acceptedTypes.some((type) => {
        if (type.includes('*')) {
            const pattern = type.replace('*', '.*');
            return new RegExp(pattern).test(fileType);
        }
        if (type.includes('/')) {
            return fileType === type;
        }
        const extension = type.startsWith('.') ? type : `.${type}`;
        return fileName.endsWith(extension.toLowerCase());
    });
};
export const validateFile = (file, maxFileSize, acceptedTypes) => {
    if (maxFileSize && file.size > maxFileSize) {
        return {
            isValid: false,
            error: 'file-too-large',
            message: `El archivo es demasiado grande. Máximo ${formatFileSize(maxFileSize)}.`,
        };
    }
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
export const validateFiles = (files, maxFiles, maxFileSize, acceptedTypes) => {
    if (maxFiles && files.length > maxFiles) {
        return {
            isValid: false,
            error: 'too-many-files',
            message: `Demasiados archivos. Máximo ${maxFiles} archivos permitidos.`,
        };
    }
    for (const file of files) {
        const fileValidation = validateFile(file, maxFileSize, acceptedTypes);
        if (!fileValidation.isValid) {
            return fileValidation;
        }
    }
    return { isValid: true };
};
export const cleanupFilePreviews = (files) => {
    if (typeof window === 'undefined')
        return;
    for (const file of files) {
        if (file.preview) {
            URL.revokeObjectURL(file.preview);
        }
    }
};
export const buildFileUploadRootClassName = (variant = 'outline', size = 'medium', isDisabled = false, hasError = false, className) => {
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
export const buildFileUploadTriggerClassName = (size = 'medium', isDisabled = false, className) => {
    const classes = [styles.trigger];
    if (isDisabled) {
        classes.push(styles.triggerDisabled);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const buildFileUploadListClassName = (className) => {
    const classes = [styles.list];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const buildFileUploadItemClassName = (hasError = false, className) => {
    const classes = [styles.item];
    if (hasError) {
        classes.push(styles.itemError);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const isImageFile = (file) => file.type.startsWith('image/');
export const getFileTypeIcon = (file) => {
    const type = file.type;
    const extension = getFileExtension(file.name).toLowerCase();
    if (type.startsWith('image/')) {
        return 'image';
    }
    if (type === 'application/pdf' || extension === '.pdf') {
        return 'file-text';
    }
    if (type.startsWith('video/')) {
        return 'video';
    }
    if (type.startsWith('audio/')) {
        return 'music';
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].some((ext) => extension.includes(ext))) {
        return 'archive';
    }
    return 'file';
};
export const buildAcceptString = (acceptedTypes) => {
    if (!acceptedTypes || acceptedTypes.length === 0)
        return undefined;
    return acceptedTypes.join(',');
};
