import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider } from '@/ui/divider';
import { H1 } from '@/ui/typography';
import { ContentWrapper } from '../content-wrapper';
import { HStack } from '../hstack';
export const AppHeader = ({ title, actions, showDivider = true, }) => (_jsxs(_Fragment, { children: [_jsx("header", { children: _jsx(ContentWrapper, { variant: "header", children: _jsxs(HStack, { justify: "between", align: "center", children: [_jsx(H1, { children: title }), actions && _jsx("div", { children: actions })] }) }) }), showDivider && _jsx(Divider, { spacing: "none" })] }));
