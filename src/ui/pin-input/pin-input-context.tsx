// /src/ui/pin-input/pin-input-context.tsx
// React context for sharing PIN input state and behavior between components
// Provides centralized state management for all PIN input fields
// RELEVANT FILES: pin-input.tsx, pin-input-field.tsx, types.ts

'use client';

import { createContext } from 'react';

import { type PinInputContextValue } from './types';

/**
 * React context for PIN input component
 * Provides state and methods to child PinInputField components
 */
export const PinInputContext = createContext<PinInputContextValue | null>(null);
