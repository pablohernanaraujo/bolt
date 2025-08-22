import { type ThemeVariant } from '@/tokens/themes';
export declare function getServerTheme(): Promise<ThemeVariant>;
export declare function getStaticTheme(): ThemeVariant;
export declare function getThemeClassName(theme: ThemeVariant): string;
export declare function getThemeDataAttributes(theme: ThemeVariant): Record<string, string>;
//# sourceMappingURL=server-theme.d.ts.map