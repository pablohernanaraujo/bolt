interface IdGeneratorConfig {
    prefix?: string;
    includeComponent?: boolean;
    useCache?: boolean;
    separator?: string;
    resetPerInstance?: boolean;
}
export declare function resetIdGeneration(): void;
export declare function generateDeterministicId(componentName: string, purpose: string, key?: string, config?: Partial<IdGeneratorConfig>): string;
export declare function generateFormFieldIds(componentName: string, fieldName?: string): {
    input: string;
    label: string;
    error: string;
    helpText: string;
    field: string;
};
export declare function generateAriaIds(componentName: string, elementName: string, key?: string): {
    element: string;
    labelledBy: string;
    describedBy: string;
    controls: string;
};
export declare function generateComplexComponentIds(componentName: string, elements: string[], key?: string): Record<string, string>;
export declare function createDeterministicIdHook(componentName: string): (purpose: string, key?: string) => string;
export declare function validateDeterministicId(id: string): boolean;
export declare function getIdGenerationStats(): {
    globalCounter: number;
    componentCounters: Record<string, number>;
    cacheSize: number;
};
export declare class ComponentIdGenerator {
    private componentName;
    private instanceKey;
    private localCounter;
    constructor(componentName: string, instanceKey?: string);
    generateId(purpose: string): string;
    generateFormFieldIds(): ReturnType<typeof generateFormFieldIds>;
    generateAriaIds(elementName: string): ReturnType<typeof generateAriaIds>;
}
export declare function createPrefixedIdGenerator(prefix: string): {
    generate: (componentName: string, purpose: string, key?: string) => string;
    generateFormFields: (componentName: string, fieldName?: string) => ReturnType<typeof generateFormFieldIds>;
};
export {};
