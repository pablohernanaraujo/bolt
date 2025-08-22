// /src/ui/input-group/input-group-context.tsx
// Context provider for InputGroup to share state with children
// Enables size, variant, and state inheritance
// RELEVANT FILES: input-group.tsx, types.ts

'use client';

import { createContext, useContext } from 'react';

import { type InputGroupContextValue } from './types';

/**
 * Context for sharing InputGroup state with child components
 * Provides size, variant, and state information
 */
export const InputGroupContext = createContext<
  InputGroupContextValue | undefined
>(undefined);

/**
 * Hook to access InputGroup context
 * Returns undefined if not within an InputGroup
 */
export const useInputGroup = (): InputGroupContextValue | undefined =>
  useContext(InputGroupContext);

/**
 * Hook to require InputGroup context
 * Throws error if not within an InputGroup
 */
export const useInputGroupRequired = (): InputGroupContextValue => {
  const context = useContext(InputGroupContext);

  if (!context) {
    throw new Error('Component must be used within an InputGroup');
  }

  return context;
};
