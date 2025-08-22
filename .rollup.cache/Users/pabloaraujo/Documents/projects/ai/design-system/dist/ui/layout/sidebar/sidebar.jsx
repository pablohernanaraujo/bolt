import { Flex } from '../flex';
import * as styles from './sidebar.css';
export const Sidebar = ({ children, isCollapsed = false, className, }) => (<Flex direction="column" className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''} ${className || ''}`}>
    {children}
  </Flex>);
