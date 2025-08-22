import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useId } from 'react';
import { ModalOverlay, Modal, Dialog, Heading, DialogTrigger } from 'react-aria-components';
import { buildModalDialogClassName, buildModalBodyClassName, buildModalFooterClassName } from './helpers.js';
import { ModalCloseButton } from './modal-client.js';
import { modalOverlay, modalHeader, modalTitle } from './modal.css.js';

const ModalServer = ({ size = 'medium', isDismissable = true, isKeyboardDismissDisabled = false, children, className, ...props }) => (jsx(ModalOverlay, { className: modalOverlay, isDismissable: isDismissable, isKeyboardDismissDisabled: isKeyboardDismissDisabled, ...props, children: jsx(Modal, { children: jsx(Dialog, { className: buildModalDialogClassName(size, typeof className === 'string' ? className : undefined), children: typeof children === 'function'
                ? children(() => {
                })
                : children }) }) }));
const ModalTriggerServer = ({ children, ...props }) => jsx(DialogTrigger, { ...props, children: children });
const ModalContentServer = ({ title, showCloseButton = true, children, ...props }) => (jsxs(Fragment, { children: [title && (jsx(ModalHeaderServer, { title: title, showCloseButton: showCloseButton })), jsx(ModalBodyServer, { className: buildModalBodyClassName(!!title), children: children })] }));
const ModalHeaderServer = ({ title, showCloseButton = true, children, }) => {
    const titleId = useId();
    return (jsxs("header", { className: modalHeader, children: [jsxs("div", { children: [title && (jsx(Heading, { id: titleId, className: modalTitle, slot: "title", children: title })), children] }), showCloseButton && jsx(ModalCloseButton, {})] }));
};
const ModalBodyServer = ({ children, className, }) => (jsx("div", { className: buildModalBodyClassName(true, true, className), children: children }));
const ModalFooterServer = ({ children, className, }) => (jsx("footer", { className: buildModalFooterClassName(className), children: children }));
ModalServer.displayName = 'ModalServer';
ModalTriggerServer.displayName = 'ModalTriggerServer';
ModalContentServer.displayName = 'ModalContentServer';
ModalHeaderServer.displayName = 'ModalHeaderServer';
ModalBodyServer.displayName = 'ModalBodyServer';
ModalFooterServer.displayName = 'ModalFooterServer';

export { ModalBodyServer, ModalContentServer, ModalFooterServer, ModalHeaderServer, ModalServer, ModalTriggerServer };
//# sourceMappingURL=modal-server.js.map
