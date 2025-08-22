'use client';
import { createContext, useContext } from 'react';
export const InputGroupContext = createContext(undefined);
export const useInputGroup = () => useContext(InputGroupContext);
export const useInputGroupRequired = () => {
    const context = useContext(InputGroupContext);
    if (!context) {
        throw new Error('Component must be used within an InputGroup');
    }
    return context;
};
