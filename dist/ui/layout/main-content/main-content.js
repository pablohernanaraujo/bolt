import { jsx } from 'react/jsx-runtime';
import { Flex } from '../flex/flex.js';
import './../../../assets/src/tokens/tokens.css.ts.vanilla-B-MfocZu.css';
import './../../../assets/src/ui/layout/flex/flex.css.ts.vanilla-BX9D9AeQ.css';
import { mainContent } from './main-content.css.js';

const MainContent = ({ children, className, }) => (jsx(Flex, { direction: "column", className: `${mainContent} ${className || ''}`, children: children }));

export { MainContent };
//# sourceMappingURL=main-content.js.map
