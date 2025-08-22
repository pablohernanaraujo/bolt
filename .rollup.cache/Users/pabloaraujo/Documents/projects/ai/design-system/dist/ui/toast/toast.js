'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from '@/icons';
import { buildToastClassName, buildToastContainerClassName, generateToastId, getAriaRole, getDefaultDuration, } from './helpers';
import * as styles from './toast.css';
const ToastContext = createContext(null);
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
const VARIANT_ICONS = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};
const ToastComponent = ({ id, variant = 'info', title, description, isClosable = true, duration = null, onClose, status = 'polite', icon, className, isVisible, position, }) => {
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(undefined);
    const startTimeRef = useRef(0);
    const remainingTimeRef = useRef(0);
    const IconComponent = VARIANT_ICONS[variant];
    const finalDuration = duration ?? getDefaultDuration(variant);
    const ariaRole = getAriaRole(variant);
    useEffect(() => {
        if (finalDuration === null || finalDuration <= 0)
            return;
        const startTimer = (timeLeft) => {
            startTimeRef.current = Date.now();
            remainingTimeRef.current = timeLeft;
            timeoutRef.current = setTimeout(() => {
                if (onClose) {
                    onClose(id);
                }
            }, timeLeft);
            const updateProgress = () => {
                if (!isPaused) {
                    const elapsed = Date.now() - startTimeRef.current;
                    const newProgress = Math.max(0, ((remainingTimeRef.current - elapsed) / finalDuration) * 100);
                    setProgress(newProgress);
                    if (newProgress > 0) {
                        requestAnimationFrame(updateProgress);
                    }
                }
            };
            updateProgress();
        };
        if (isVisible && !isPaused) {
            startTimer(remainingTimeRef.current || finalDuration);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [id, finalDuration, onClose, isVisible, isPaused]);
    const handleMouseEnter = () => {
        if (finalDuration !== null && finalDuration > 0) {
            setIsPaused(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                const elapsed = Date.now() - startTimeRef.current;
                remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
            }
        }
    };
    const handleMouseLeave = () => {
        if (finalDuration !== null && finalDuration > 0) {
            setIsPaused(false);
        }
    };
    const handleClose = () => {
        if (onClose) {
            onClose(id);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isClosable && onClose) {
            event.preventDefault();
            onClose(id);
        }
    };
    return (_jsxs("div", { role: ariaRole, "aria-live": status, "aria-atomic": "true", className: buildToastClassName(variant, isVisible, className), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onKeyDown: handleKeyDown, tabIndex: isClosable ? 0 : -1, "data-testid": `toast-${id}`, children: [_jsx("div", { className: `${styles.toastIcon} ${styles.toastIconVariants[variant]}`, children: icon || _jsx(IconComponent, { size: 20 }) }), _jsxs("div", { className: styles.toastContent, children: [title && (_jsx("div", { className: styles.toastTitle, "data-testid": "toast-title", children: title })), description && (_jsx("div", { className: styles.toastDescription, "data-testid": "toast-description", children: description }))] }), isClosable && (_jsx("button", { type: "button", className: styles.toastCloseButton, onClick: handleClose, "aria-label": "Close notification", "data-testid": "toast-close", children: _jsx(X, { size: 16 }) })), finalDuration !== null && finalDuration > 0 && (_jsx("div", { className: `${styles.toastProgressBar} ${styles.toastProgressBarVariants[variant]}`, style: {
                    transform: `scaleX(${progress / 100})`,
                    transitionDuration: isPaused ? '0s' : '100ms',
                }, "data-testid": "toast-progress" }))] }));
};
export const ToastProvider = ({ children, position = 'bottom', max = 5, duration = 5000, }) => {
    const [toasts, setToasts] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const addToast = (options) => {
        const id = generateToastId();
        const newToast = {
            ...options,
            id,
            duration: options.duration ?? duration,
            createdAt: Date.now(),
            isVisible: true,
        };
        setToasts((prev) => {
            const updated = [newToast, ...prev];
            if (updated.length > max) {
                return updated.slice(0, max);
            }
            return updated;
        });
        return id;
    };
    const closeToast = (id) => {
        setToasts((prev) => prev.map((toast) => toast.id === id
            ? {
                ...toast,
                isVisible: false,
            }
            : toast));
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 300);
    };
    const closeAllToasts = () => {
        setToasts((prev) => prev.map((toast) => ({
            ...toast,
            isVisible: false,
        })));
        setTimeout(() => {
            setToasts([]);
        }, 300);
    };
    const updateToast = (id, options) => {
        setToasts((prev) => prev.map((toast) => toast.id === id
            ? {
                ...toast,
                ...options,
            }
            : toast));
    };
    const contextValue = {
        toast: addToast,
        close: closeToast,
        closeAll: closeAllToasts,
        update: updateToast,
    };
    const toastPortal = isMounted &&
        createPortal(_jsx("div", { className: buildToastContainerClassName(position), "data-position": position, "data-testid": "toast-container", children: toasts.map((toast) => (_jsx(ToastComponent, { ...toast, position: position, onClose: closeToast }, toast.id))) }), document.body);
    return (_jsxs(ToastContext.Provider, { value: contextValue, children: [children, toastPortal] }));
};
export const Toast = (props) => (_jsx(ToastComponent, { ...props, isVisible: true, position: "bottom" }));
