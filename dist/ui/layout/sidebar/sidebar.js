import { jsx } from 'react/jsx-runtime';
import { Flex } from '../flex/flex.js';
import './../../../assets/src/tokens/tokens.css.ts.vanilla-B-MfocZu.css';
import './../../../assets/src/ui/layout/flex/flex.css.ts.vanilla-BX9D9AeQ.css';
import { sidebar, sidebarCollapsed } from './sidebar.css.js';

const Sidebar = ({ children, isCollapsed = false, className, }) => (jsx(Flex, { direction: "column", className: `${sidebar} ${isCollapsed ? sidebarCollapsed : ''} ${className || ''}`, children: children }));

export { Sidebar };
//# sourceMappingURL=sidebar.js.map
