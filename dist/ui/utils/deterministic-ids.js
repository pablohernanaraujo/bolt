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
function resetIdGeneration() {
    globalIdCounter = 0;
    componentCounters.clear();
    idCache.clear();
}
function generateDeterministicId(componentName, purpose, key, config = {}) {
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
function generateFormFieldIds(componentName, fieldName) {
    const key = fieldName || '';
    return {
        field: generateDeterministicId(componentName, 'field', key),
        input: generateDeterministicId(componentName, 'input', key),
        label: generateDeterministicId(componentName, 'label', key),
        error: generateDeterministicId(componentName, 'error', key),
        helpText: generateDeterministicId(componentName, 'help', key),
    };
}
if (typeof window === 'undefined') {
    resetIdGeneration();
}

export { generateDeterministicId, generateFormFieldIds, resetIdGeneration };
//# sourceMappingURL=deterministic-ids.js.map
