'use client';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { Button } from 'react-aria-components';
import { X } from 'lucide-react';
import { Icon } from '../../icons/index.js';
import 'clsx';
import { modalCloseButton } from './modal.css.js';

const ModalCloseButton = () => (jsx(Button, { className: modalCloseButton, "aria-label": "Close modal", slot: "close", children: jsx(Icon, { icon: X, size: "sm" }) }));
ModalCloseButton.displayName = 'ModalCloseButton';

export { ModalCloseButton };
//# sourceMappingURL=modal-client.js.map
