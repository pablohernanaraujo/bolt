import { Flex } from '../flex';
import * as styles from './main-content.css';
export const MainContent = ({ children, className, }) => (<Flex direction="column" className={`${styles.mainContent} ${className || ''}`}>
    {children}
  </Flex>);
