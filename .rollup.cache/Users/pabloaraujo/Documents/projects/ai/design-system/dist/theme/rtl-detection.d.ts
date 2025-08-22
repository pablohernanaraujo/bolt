export type TextDirection = 'ltr' | 'rtl';
export interface LanguageConfig {
    code: string;
    name: string;
    direction: TextDirection;
    isComplexScript?: boolean;
    preferredFonts?: string[];
}
export declare function getServerTextDirection(): Promise<TextDirection>;
export declare function detectServerLanguage(): Promise<string>;
export declare function getLanguageConfig(languageCode: string): LanguageConfig;
export declare function isRTLLanguage(languageCode: string): boolean;
export declare function getSupportedRTLLanguages(): LanguageConfig[];
export declare function getSupportedLanguages(): LanguageConfig[];
export declare function getTextDirectionAttributes(languageCode: string, direction?: TextDirection): Record<string, string>;
export declare function getServerLocaleInfo(): Promise<{
    language: string;
    direction: TextDirection;
    config: LanguageConfig;
    attributes: Record<string, string>;
}>;
export declare function getDirectionClassName(direction: TextDirection): string;
export declare function getDirectionDataAttributes(direction: TextDirection): Record<string, string>;
export declare function detectRTLSupport(): boolean;
export declare function createDirectionalStyles(ltrStyles: Record<string, string>, rtlStyles: Record<string, string>): string;
