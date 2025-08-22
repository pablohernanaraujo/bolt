import { createContext, useContext } from 'react';

const InputGroupContext = createContext(undefined);
const useInputGroup = () => useContext(InputGroupContext);
const useInputGroupRequired = () => {
    const context = useContext(InputGroupContext);
    if (!context) {
        throw new Error('Component must be used within an InputGroup');
    }
    return context;
};

export { InputGroupContext, useInputGroup, useInputGroupRequired };
//# sourceMappingURL=input-group-context.js.map
