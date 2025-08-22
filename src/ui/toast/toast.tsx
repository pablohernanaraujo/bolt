/* eslint-disable max-statements */
// /src/ui/toast/toast.tsx
// Toast notification component with full accessibility support
// Provides temporary messages with multiple variants and positioning
// RELEVANT FILES: types.ts, helpers.ts, toast.css.ts

'use client';

import {
  createContext,
  type FC,
  type ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from '@/icons';

import {
  buildToastClassName,
  buildToastContainerClassName,
  generateToastId,
  getAriaRole,
  getDefaultDuration,
} from './helpers';
import * as styles from './toast.css';
import {
  type ToastContextType,
  type ToastPosition,
  type ToastProps,
  type ToastProviderProps,
  type ToastState,
  type ToastVariant,
} from './types';

/**
 * Toast context for imperative API
 */
const ToastContext = createContext<ToastContextType | null>(null);

/**
 * Hook to access toast context
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Icon mapping for toast variants
 */
const VARIANT_ICONS: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

/**
 * Individual Toast component
 */
interface ToastComponentProps extends ToastProps {
  /**
   * Whether the toast is visible (for animations)
   */
  isVisible: boolean;
  /**
   * Position for animation direction
   */
  position: ToastPosition;
}

const ToastComponent: FC<ToastComponentProps> = ({
  id,
  variant = 'info',
  title,
  description,
  isClosable = true,
  duration = null,
  onClose,
  status = 'polite',
  icon,
  className,
  isVisible,
  position,
}): ReactElement => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(0);

  const IconComponent = VARIANT_ICONS[variant];
  const finalDuration = duration ?? getDefaultDuration(variant);
  const ariaRole = getAriaRole(variant);

  // Handle auto-dismiss timer
  useEffect(() => {
    if (finalDuration === null || finalDuration <= 0) return;

    const startTimer = (timeLeft: number): void => {
      startTimeRef.current = Date.now();
      remainingTimeRef.current = timeLeft;

      timeoutRef.current = setTimeout(() => {
        if (onClose) {
          onClose(id);
        }
      }, timeLeft);

      // Update progress bar
      const updateProgress = (): void => {
        if (!isPaused) {
          const elapsed = Date.now() - startTimeRef.current;
          const newProgress = Math.max(
            0,
            ((remainingTimeRef.current - elapsed) / finalDuration) * 100,
          );
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

  // Handle pause/resume on hover
  const handleMouseEnter = (): void => {
    if (finalDuration !== null && finalDuration > 0) {
      setIsPaused(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(
          0,
          remainingTimeRef.current - elapsed,
        );
      }
    }
  };

  const handleMouseLeave = (): void => {
    if (finalDuration !== null && finalDuration > 0) {
      setIsPaused(false);
    }
  };

  const handleClose = (): void => {
    if (onClose) {
      onClose(id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape' && isClosable && onClose) {
      event.preventDefault();
      onClose(id);
    }
  };

  return (
    <div
      role={ariaRole}
      aria-live={status}
      aria-atomic="true"
      className={buildToastClassName(variant, isVisible, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={isClosable ? 0 : -1}
      data-testid={`toast-${id}`}
    >
      {/* Icon */}
      <div
        className={`${styles.toastIcon} ${styles.toastIconVariants[variant]}`}
      >
        {icon || <IconComponent size={20} />}
      </div>

      {/* Content */}
      <div className={styles.toastContent}>
        {title && (
          <div className={styles.toastTitle} data-testid="toast-title">
            {title}
          </div>
        )}
        {description && (
          <div
            className={styles.toastDescription}
            data-testid="toast-description"
          >
            {description}
          </div>
        )}
      </div>

      {/* Close button */}
      {isClosable && (
        <button
          type="button"
          className={styles.toastCloseButton}
          onClick={handleClose}
          aria-label="Close notification"
          data-testid="toast-close"
        >
          <X size={16} />
        </button>
      )}

      {/* Progress bar */}
      {finalDuration !== null && finalDuration > 0 && (
        <div
          className={`${styles.toastProgressBar} ${styles.toastProgressBarVariants[variant]}`}
          style={{
            transform: `scaleX(${progress / 100})`,
            transitionDuration: isPaused ? '0s' : '100ms',
          }}
          data-testid="toast-progress"
        />
      )}
    </div>
  );
};

/**
 * Toast Provider component
 * Manages toast state and provides imperative API
 */
export const ToastProvider: FC<ToastProviderProps> = ({
  children,
  position = 'bottom',
  max = 5,
  duration = 5000,
}): ReactElement => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only render on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addToast = (options: Omit<ToastProps, 'id'>): string => {
    const id = generateToastId();
    const newToast: ToastState = {
      ...options,
      id,
      duration: options.duration ?? duration,
      createdAt: Date.now(),
      isVisible: true,
    };

    setToasts((prev) => {
      const updated = [newToast, ...prev];
      // Limit number of toasts
      if (updated.length > max) {
        return updated.slice(0, max);
      }
      return updated;
    });

    return id;
  };

  const closeToast = (id: string): void => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              isVisible: false,
            }
          : toast,
      ),
    );

    // Remove toast after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  const closeAllToasts = (): void => {
    setToasts((prev) =>
      prev.map((toast) => ({
        ...toast,
        isVisible: false,
      })),
    );

    // Remove all toasts after animation completes
    setTimeout(() => {
      setToasts([]);
    }, 300);
  };

  const updateToast = (id: string, options: Partial<ToastProps>): void => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              ...options,
            }
          : toast,
      ),
    );
  };

  const contextValue: ToastContextType = {
    toast: addToast,
    close: closeToast,
    closeAll: closeAllToasts,
    update: updateToast,
  };

  const toastPortal =
    isMounted &&
    createPortal(
      <div
        className={buildToastContainerClassName(position)}
        data-position={position}
        data-testid="toast-container"
      >
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            {...toast}
            position={position}
            onClose={closeToast}
          />
        ))}
      </div>,
      document.body,
    );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toastPortal}
    </ToastContext.Provider>
  );
};

/**
 * Individual Toast component for manual usage
 * Not typically used directly - use ToastProvider + useToast hook instead
 */
export const Toast: FC<ToastProps> = (props): ReactElement => (
  <ToastComponent {...props} isVisible={true} position="bottom" />
);
