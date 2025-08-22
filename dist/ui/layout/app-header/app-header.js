import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Divider } from '../../divider/divider.js';
import 'clsx';
import './../../../assets/src/tokens/tokens.css.ts.vanilla-B-MfocZu.css';
import './../../../assets/src/ui/divider/divider.css.ts.vanilla-CrwjEW4B.css';
import { H1 } from '../../typography/h1/h1.js';
import '../../typography/h2/h2.js';
import '../../typography/h3/h3.js';
import '../../typography/h4/h4.js';
import '../../typography/h5/h5.js';
import '../../typography/body1/body1.js';
import '../../typography/body2/body2.js';
import '../../typography/body3/body3.js';
import '../../typography/caption/caption.js';
import '../../typography/giant/giant.js';
import '../../typography/overline/overline.js';
import '../../typography/subtitle/subtitle.js';
import { ContentWrapper } from '../content-wrapper/content-wrapper.js';
import './../../../assets/src/ui/layout/content-wrapper/content-wrapper.css.ts.vanilla-BXWLjEW3.css';
import { HStack } from '../hstack/hstack.js';
import './../../../assets/src/ui/layout/hstack/hstack.css.ts.vanilla-_CNsnCOG.css';

const AppHeader = ({ title, actions, showDivider = true, }) => (jsxs(Fragment, { children: [jsx("header", { children: jsx(ContentWrapper, { variant: "header", children: jsxs(HStack, { justify: "between", align: "center", children: [jsx(H1, { children: title }), actions && jsx("div", { children: actions })] }) }) }), showDivider && jsx(Divider, { spacing: "none" })] }));

export { AppHeader };
//# sourceMappingURL=app-header.js.map
