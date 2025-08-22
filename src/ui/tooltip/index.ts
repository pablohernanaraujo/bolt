// /src/ui/tooltip/index.ts
// Export all from tooltip folder
// Barrel export file that exports the component and its types
// RELEVANT FILES: tooltip.tsx, types.ts, helpers.ts

export {
  buildTooltipArrowClassName,
  buildTooltipClassName,
  getAriaPlacement,
  getOffsetForSize,
  shouldWrapContent,
} from './helpers';
export { Tooltip, TooltipTrigger } from './tooltip';
export type {
  TooltipPlacement,
  TooltipProps,
  TooltipSize,
  TooltipTriggerProps,
  TooltipVariant,
} from './types';
