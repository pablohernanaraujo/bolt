let globalIdCounter = 0;
const componentCounters = new Map();
const idCache = new Map();
const DEFAULT_CONFIG = {
    prefix: 'ds',
    includeComponent: true,
    useCache: true,
    separator: '-',
    resetPerInstance: false,
};
export function resetIdGeneration() {
    globalIdCounter = 0;
    componentCounters.clear();
    idCache.clear();
}
export function generateDeterministicId(componentName, purpose, key, config = {}) {
    const finalConfig = {
        ...DEFAULT_CONFIG,
        ...config,
    };
    const cacheKey = finalConfig.useCache && key ? `${componentName}-${purpose}-${key}` : '';
    if (cacheKey && idCache.has(cacheKey)) {
        return idCache.get(cacheKey);
    }
    const parts = [];
    if (finalConfig.prefix) {
        parts.push(finalConfig.prefix);
    }
    if (finalConfig.includeComponent) {
        parts.push(componentName.toLowerCase());
    }
    parts.push(purpose.toLowerCase());
    let counter;
    if (finalConfig.resetPerInstance) {
        const counterKey = `${componentName}-${purpose}`;
        counter = (componentCounters.get(counterKey) || 0) + 1;
        componentCounters.set(counterKey, counter);
    }
    else {
        counter = ++globalIdCounter;
    }
    parts.push(counter.toString());
    const id = parts.join(finalConfig.separator);
    if (cacheKey) {
        idCache.set(cacheKey, id);
    }
    return id;
}
export function generateFormFieldIds(componentName, fieldName) {
    const key = fieldName || '';
    return {
        field: generateDeterministicId(componentName, 'field', key),
        input: generateDeterministicId(componentName, 'input', key),
        label: generateDeterministicId(componentName, 'label', key),
        error: generateDeterministicId(componentName, 'error', key),
        helpText: generateDeterministicId(componentName, 'help', key),
    };
}
export function generateAriaIds(componentName, elementName, key) {
    const baseKey = key || elementName;
    return {
        element: generateDeterministicId(componentName, elementName, baseKey),
        labelledBy: generateDeterministicId(componentName, `${elementName}-labelledby`, baseKey),
        describedBy: generateDeterministicId(componentName, `${elementName}-describedby`, baseKey),
        controls: generateDeterministicId(componentName, `${elementName}-controls`, baseKey),
    };
}
export function generateComplexComponentIds(componentName, elements, key) {
    const ids = {};
    elements.forEach((element) => {
        ids[element] = generateDeterministicId(componentName, element, key);
    });
    return ids;
}
export function createDeterministicIdHook(componentName) {
    return function useDeterministicId(purpose = 'element', key) {
        if (typeof window === 'undefined') {
            return generateDeterministicId(componentName, purpose, key);
        }
        const cacheKey = `${componentName}-${purpose}-${key || ''}`;
        if (!idCache.has(cacheKey)) {
            const id = generateDeterministicId(componentName, purpose, key);
            idCache.set(cacheKey, id);
        }
        return idCache.get(cacheKey);
    };
}
export function validateDeterministicId(id) {
    if (!id || typeof id !== 'string') {
        return false;
    }
    const nonDeterministicPatterns = [
        /Math\.random/,
        /Date\.now/,
        /timestamp/i,
        /uuid/i,
        /[0-9]{13,}/,
    ];
    return !nonDeterministicPatterns.some((pattern) => pattern.test(id));
}
export function getIdGenerationStats() {
    return {
        globalCounter: globalIdCounter,
        componentCounters: Object.fromEntries(componentCounters),
        cacheSize: idCache.size,
    };
}
export class ComponentIdGenerator {
    componentName;
    instanceKey;
    localCounter = 0;
    constructor(componentName, instanceKey) {
        this.componentName = componentName;
        this.instanceKey = instanceKey || '';
    }
    generateId(purpose) {
        this.localCounter++;
        const parts = [
            DEFAULT_CONFIG.prefix,
            this.componentName.toLowerCase(),
            purpose.toLowerCase(),
        ];
        if (this.instanceKey) {
            parts.push(this.instanceKey);
        }
        parts.push(this.localCounter.toString());
        return parts.join(DEFAULT_CONFIG.separator);
    }
    generateFormFieldIds() {
        return {
            field: this.generateId('field'),
            input: this.generateId('input'),
            label: this.generateId('label'),
            error: this.generateId('error'),
            helpText: this.generateId('help'),
        };
    }
    generateAriaIds(elementName) {
        return {
            element: this.generateId(elementName),
            labelledBy: this.generateId(`${elementName}-labelledby`),
            describedBy: this.generateId(`${elementName}-describedby`),
            controls: this.generateId(`${elementName}-controls`),
        };
    }
}
export function createPrefixedIdGenerator(prefix) {
    return {
        generate: (componentName, purpose, key) => generateDeterministicId(componentName, purpose, key, { prefix }),
        generateFormFields: (componentName, fieldName) => {
            const key = fieldName || '';
            return {
                field: generateDeterministicId(componentName, 'field', key, { prefix }),
                input: generateDeterministicId(componentName, 'input', key, { prefix }),
                label: generateDeterministicId(componentName, 'label', key, { prefix }),
                error: generateDeterministicId(componentName, 'error', key, { prefix }),
                helpText: generateDeterministicId(componentName, 'help', key, {
                    prefix,
                }),
            };
        },
    };
}
if (typeof window === 'undefined') {
    resetIdGeneration();
}
