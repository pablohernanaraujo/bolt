import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex } from '../flex';
import * as styles from './app-layout.css';
export const AppLayout = ({ sidebar, children, className, }) => (_jsxs(Flex, { direction: "row", className: `${styles.appLayout} ${className || ''}`, style: { minHeight: '100vh' }, children: [sidebar, _jsx(Flex, { direction: "column", className: styles.appContent, style: {
                flex: 1,
                minHeight: '100vh',
                overflowX: 'hidden',
            }, children: children })] }));
