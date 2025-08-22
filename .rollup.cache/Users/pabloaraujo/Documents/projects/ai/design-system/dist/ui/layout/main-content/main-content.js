import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from '../flex';
import * as styles from './main-content.css';
export const MainContent = ({ children, className, }) => (_jsx(Flex, { direction: "column", className: `${styles.mainContent} ${className || ''}`, children: children }));
