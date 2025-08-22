import { type ListItemProps, type ListRootProps } from './types';
export declare const buildListRootClassName: (variant?: ListRootProps["variant"], spacing?: ListRootProps["spacing"], className?: string) => string;
export declare const buildListItemClassName: (hasIcon?: boolean, emphasis?: ListItemProps["emphasis"], weight?: ListItemProps["weight"], decoration?: ListItemProps["decoration"], size?: ListItemProps["size"], colorScheme?: ListItemProps["colorScheme"], className?: string) => string;
export declare const getListElement: (variant: ListRootProps["variant"]) => "ul" | "ol" | "div";
