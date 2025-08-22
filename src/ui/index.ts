// /src/ui/index.ts
// Main export file for UI components
// Re-exports all component modules for consumption
// RELEVANT FILES: button/index.tsx, text-field/index.tsx

// Button component (server-first with client alternative)
export type { ButtonProps, ButtonServerProps } from './button';
export { Button, ButtonClient } from './button';

// IconButton component
export type { IconButtonProps } from './icon-button';
export { IconButton } from './icon-button';

// Badge component
export type { BadgeProps } from './badge';
export { Badge } from './badge';

// Toggle component
export type { ToggleProps } from './toggle';
export { Toggle } from './toggle';

// ThemeToggle component
export type { ThemeToggleProps } from './theme-toggle';
export { ThemeToggle } from './theme-toggle';

// Checkbox component (server-first with client alternative)
export type { CheckboxProps, CheckboxServerProps } from './checkbox';
export { Checkbox, CheckboxClient } from './checkbox';

// RadioGroup component
export type { RadioGroupProps } from './radio-group';
export { RadioGroup } from './radio-group';

// Radio component
export type { RadioProps } from './radio';
export { Radio } from './radio';

// Link component
export type { LinkProps, LinkSize, LinkUnderline, LinkVariant } from './link';
export { Link } from './link';

// Avatar component
export type {
  AvatarProps,
  AvatarSize,
  AvatarStatus,
  AvatarVariant,
} from './avatar';
export { Avatar, AvatarWithImage } from './avatar';

// Layout components
export type {
  AspectRatioPreset,
  AspectRatioProps,
  CustomAspectRatio,
  ObjectFit,
} from './layout/aspect-ratio';
export { AspectRatio } from './layout/aspect-ratio';
export type { CenterComponentProps, CenterProps } from './layout/center';
export { Center } from './layout/center';
export type { ContainerProps } from './layout/container';
export { Container } from './layout/container';
export type {
  ContentWrapperProps,
  ContentWrapperVariant,
} from './layout/content-wrapper';
export { ContentWrapper } from './layout/content-wrapper';
export type { FlexDirection, FlexProps, FlexWrap } from './layout/flex';
export { Flex } from './layout/flex';
export type {
  GridArea,
  GridAuto,
  GridGap,
  GridItemProps,
  GridLine,
  GridProps,
  GridTemplate,
} from './layout/grid';
export { Grid, GridItem } from './layout/grid';
export type {
  AlignValue,
  HStackProps,
  JustifyValue,
  SpaceValue,
} from './layout/hstack';
export { HStack } from './layout/hstack';
export type { VStackProps } from './layout/vstack';
export { VStack } from './layout/vstack';

// App Layout components
export type { AppHeaderProps } from './layout/app-header';
export { AppHeader } from './layout/app-header';
export type { AppLayoutProps } from './layout/app-layout';
export { AppLayout } from './layout/app-layout';
export type { MainContentProps } from './layout/main-content';
export { MainContent } from './layout/main-content';
export type { SidebarProps as LayoutSidebarProps } from './layout/sidebar';
export { Sidebar as LayoutSidebar } from './layout/sidebar';

// Divider component
export type {
  DividerOrientation,
  DividerProps,
  DividerSize,
  DividerSpacing,
  DividerVariant,
} from './divider';
export { Divider } from './divider';

// List component
export type { ListItemProps, ListProps, ListRootProps } from './list';
export { List, ListItem, ListRoot } from './list';

// Code component
export type { CodeProps } from './code';
export { Code } from './code';

// Input component (server-first with client alternative)
export type {
  InputFieldProps,
  InputProps,
  InputServerProps,
  InputWithClearProps,
} from './input';
export { Input, InputClient, InputField, InputWithClear } from './input';

// PasswordInput component
export type { PasswordInputProps } from './password-input';
export { PasswordInput } from './password-input';

// PasswordStrengthMeter component
export type {
  PasswordStrength,
  PasswordStrengthInfo,
  PasswordStrengthMeterProps,
} from './password-strength-meter';
export { PasswordStrengthMeter } from './password-strength-meter';

// PinInput component
export type {
  PinInputFieldProps,
  PinInputGroupProps,
  PinInputProps,
  PinInputSeparatorProps,
  PinInputSize,
  PinInputType,
  PinInputVariant,
} from './pin-input';
export {
  PinInput,
  PinInputField,
  PinInputGroup,
  PinInputSeparator,
} from './pin-input';

// TextArea component
export type { TextAreaProps } from './textarea';
export { TextArea } from './textarea';

// InputGroup components
export type {
  InputAddonProps,
  InputElementProps,
  InputGroupContextValue,
  InputGroupProps,
} from './input-group';
export {
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  useInputGroup,
} from './input-group';

// FormField component
export type { FormFieldProps } from './form-field';
export { FormField } from './form-field';

// FileUpload component
export type {
  FileUploadDeleteTriggerProps,
  FileUploadError,
  FileUploadFile,
  FileUploadHiddenInputProps,
  FileUploadItemProps,
  FileUploadListProps,
  FileUploadRootProps,
  FileUploadSize,
  FileUploadTriggerProps,
  FileUploadValidation,
  FileUploadVariant,
} from './file-upload';
export { FileUpload } from './file-upload';

// Typography components
export type {
  Body1Props,
  Body2Props,
  Body3Props,
  CaptionProps,
  GiantProps,
  H1Props,
  H2Props,
  H3Props,
  H4Props,
  H5Props,
  OverlineProps,
  SubtitleProps,
} from './typography';
export {
  Body1,
  Body2,
  Body3,
  Caption,
  Giant,
  H1,
  H2,
  H3,
  H4,
  H5,
  Overline,
  Subtitle,
} from './typography';

// Modal components
export type {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalSize,
  ModalTriggerProps,
} from './modal';
export {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
} from './modal';

// Spinner component
export type { SpinnerColorScheme, SpinnerProps, SpinnerSize } from './spinner';
export { Spinner } from './spinner';

// Skeleton components
export type {
  SkeletonBorderRadius,
  SkeletonCircleProps,
  SkeletonCircleSize,
  SkeletonProps,
  SkeletonSpeed,
  SkeletonTextProps,
} from './skeleton';
export { Skeleton, SkeletonCircle, SkeletonText } from './skeleton';

// Toast components
export type {
  ToastContextType,
  ToastPosition,
  ToastProps,
  ToastProviderProps,
  ToastState,
  ToastStatus,
  ToastVariant,
} from './toast';
export {
  buildToastClassName,
  buildToastContainerClassName,
  generateToastId,
  getAriaRole,
  getDefaultDuration,
  Toast,
  ToastProvider,
  useToast,
} from './toast';

// Tooltip components
export type {
  TooltipPlacement,
  TooltipProps,
  TooltipSize,
  TooltipTriggerProps,
  TooltipVariant,
} from './tooltip';
export {
  buildTooltipArrowClassName,
  buildTooltipClassName,
  getAriaPlacement,
  getOffsetForSize,
  shouldWrapContent,
  Tooltip,
  TooltipTrigger,
} from './tooltip';

// Menu components
export type {
  MenuCollectionItem,
  MenuItemProps,
  MenuItemVariant,
  MenuPlacement,
  MenuProps,
  MenuSectionProps,
  MenuSeparatorProps,
  MenuSize,
  MenuTriggerProps,
  MenuVariant,
} from './menu';
export {
  buildMenuClassName,
  buildMenuItemClassName,
  buildMenuSectionClassName,
  buildMenuSeparatorClassName,
  getMenuWidthConstraints,
  getTransformOrigin,
  isValidMenuPlacement,
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
  scrollItemIntoView,
  shouldShowShortcut,
} from './menu';

// Drawer components
export type {
  DrawerBodyProps,
  DrawerContentProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPlacement,
  DrawerProps,
  DrawerSize,
  DrawerTriggerProps,
} from './drawer';
export {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from './drawer';

// Popover components
export type {
  PopoverArrowProps,
  PopoverBodyProps,
  PopoverContentProps,
  PopoverFooterProps,
  PopoverHeaderProps,
  PopoverPlacement,
  PopoverProps,
  PopoverSize,
  PopoverTriggerProps,
  PopoverVariant,
} from './popover';
export {
  buildPopoverArrowClassName,
  buildPopoverBodyClassName,
  buildPopoverClassName,
  buildPopoverFooterClassName,
  buildPopoverHeaderClassName,
  isHorizontalPlacement,
  isVerticalPlacement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from './popover';

// Accordion components
export type {
  AccordionItemProps,
  AccordionProps,
  AccordionRenderProps,
  AccordionSelectionMode,
  AccordionSize,
  AccordionVariant,
} from './accordion';
export { Accordion, AccordionItem } from './accordion';

// Breadcrumb components
export type {
  BreadcrumbCurrentLinkProps,
  BreadcrumbItemData,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbRootProps,
  BreadcrumbSeparatorProps,
  BreadcrumbSize,
  BreadcrumbVariant,
} from './breadcrumb';
export {
  Breadcrumb,
  BreadcrumbCurrentLink,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from './breadcrumb';

// Tabs components
export type {
  TabsContentProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps,
} from './tabs';
export { Tabs } from './tabs';

// Pagination component
export type {
  PaginationConfig,
  PaginationPageItem,
  PaginationProps,
} from './pagination';
export { Pagination } from './pagination';

// Progress component
export type {
  ProgressProps,
  ProgressSegmentProps,
  ProgressSize,
  ProgressState,
  ProgressVariant,
} from './progress';
export {
  buildProgressClassName,
  calculateProgressPercentage,
  formatDataProgressValue,
  formatFileProgressValue,
  formatProgressValue,
  formatTimeProgressValue,
  getProgressVariantByValue,
  isIndeterminateProgress,
  Progress,
} from './progress';

// Chart components with progressive enhancement
export type { HeavyChartProps } from './chart';
export {
  ChartSkeleton,
  ChartSkeletonSimple,
  DeferredChart,
  DynamicChart,
  SAMPLE_CHART_DATA,
} from './chart';

// Progressive enhancement utilities
export type {
  ProgressiveEnhancementOptions,
  VisibilityObserverConfig,
} from './utils/progressive-enhancement';
export {
  createVisibilityObserver,
  enhanceButton,
  enhanceForm,
  ENHANCEMENT_CONFIGS,
  isJavaScriptAvailable,
  shouldEnhanceComponent,
  useProgressiveEnhancement,
} from './utils/progressive-enhancement';

export type { DeferredHydrationProps } from './utils/deferred-hydration';
export {
  createDeferredComponent,
  DeferredHydration,
  useDeferredHydration,
  withDeferredHydration,
} from './utils/deferred-hydration';
