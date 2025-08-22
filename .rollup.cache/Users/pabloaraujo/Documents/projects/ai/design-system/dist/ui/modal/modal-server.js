'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { Modal as AriaModal, Dialog, DialogTrigger, Heading, ModalOverlay, } from 'react-aria-components';
import { buildModalBodyClassName, buildModalDialogClassName, buildModalFooterClassName, } from './helpers';
import { ModalCloseButton } from './modal-client';
import * as styles from './modal.css';
export const ModalServer = ({ size = 'medium', isDismissable = true, isKeyboardDismissDisabled = false, children, className, ...props }) => (_jsx(ModalOverlay, { className: styles.modalOverlay, isDismissable: isDismissable, isKeyboardDismissDisabled: isKeyboardDismissDisabled, ...props, children: _jsx(AriaModal, { children: _jsx(Dialog, { className: buildModalDialogClassName(size, typeof className === 'string' ? className : undefined), children: typeof children === 'function'
                ? children(() => {
                })
                : children }) }) }));
export const ModalTriggerServer = ({ children, ...props }) => _jsx(DialogTrigger, { ...props, children: children });
export const ModalContentServer = ({ title, showCloseButton = true, children, ...props }) => (_jsxs(_Fragment, { children: [title && (_jsx(ModalHeaderServer, { title: title, showCloseButton: showCloseButton })), _jsx(ModalBodyServer, { className: buildModalBodyClassName(!!title), children: children })] }));
export const ModalHeaderServer = ({ title, showCloseButton = true, children, }) => {
    const titleId = useId();
    return (_jsxs("header", { className: styles.modalHeader, children: [_jsxs("div", { children: [title && (_jsx(Heading, { id: titleId, className: styles.modalTitle, slot: "title", children: title })), children] }), showCloseButton && _jsx(ModalCloseButton, {})] }));
};
export const ModalBodyServer = ({ children, className, }) => (_jsx("div", { className: buildModalBodyClassName(true, true, className), children: children }));
export const ModalFooterServer = ({ children, className, }) => (_jsx("footer", { className: buildModalFooterClassName(className), children: children }));
ModalServer.displayName = 'ModalServer';
ModalTriggerServer.displayName = 'ModalTriggerServer';
ModalContentServer.displayName = 'ModalContentServer';
ModalHeaderServer.displayName = 'ModalHeaderServer';
ModalBodyServer.displayName = 'ModalBodyServer';
ModalFooterServer.displayName = 'ModalFooterServer';
