import type { ThemeVariant } from '@/tokens/themes';
export declare function getCurrentTheme(element?: HTMLElement): ThemeVariant;
export declare function setTheme(theme: ThemeVariant, element?: HTMLElement): void;
export declare function toggleTheme(element?: HTMLElement): ThemeVariant;
export declare function initTheme(element?: HTMLElement): ThemeVariant;
export declare function watchSystemTheme(callback: (theme: ThemeVariant) => void): () => void;
export declare function getThemeScript(): string;
export type BrandVariant = string;
export declare function setBrand(brand: BrandVariant, element?: HTMLElement): void;
export declare function getBrand(element?: HTMLElement): BrandVariant | null;
//# sourceMappingURL=index.d.ts.map