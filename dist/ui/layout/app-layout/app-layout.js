import { jsxs, jsx } from 'react/jsx-runtime';
import { Flex } from '../flex/flex.js';
import './../../../assets/src/tokens/tokens.css.ts.vanilla-B-MfocZu.css';
import './../../../assets/src/ui/layout/flex/flex.css.ts.vanilla-BX9D9AeQ.css';
import { appLayout, appContent } from './app-layout.css.js';

const AppLayout = ({ sidebar, children, className, }) => (jsxs(Flex, { direction: "row", className: `${appLayout} ${className || ''}`, style: { minHeight: '100vh' }, children: [sidebar, jsx(Flex, { direction: "column", className: appContent, style: {
                flex: 1,
                minHeight: '100vh',
                overflowX: 'hidden',
            }, children: children })] }));

export { AppLayout };
//# sourceMappingURL=app-layout.js.map
