import { Flex } from '../flex';
import * as styles from './app-layout.css';
export const AppLayout = ({ sidebar, children, className, }) => (<Flex direction="row" className={`${styles.appLayout} ${className || ''}`} style={{ minHeight: '100vh' }}>
    {sidebar}
    <Flex direction="column" className={styles.appContent} style={{
        flex: 1,
        minHeight: '100vh',
        overflowX: 'hidden',
    }}>
      {children}
    </Flex>
  </Flex>);
