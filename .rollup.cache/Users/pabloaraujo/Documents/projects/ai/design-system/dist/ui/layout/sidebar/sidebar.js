import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from '../flex';
import * as styles from './sidebar.css';
export const Sidebar = ({ children, isCollapsed = false, className, }) => (_jsx(Flex, { direction: "column", className: `${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''} ${className || ''}`, children: children }));
