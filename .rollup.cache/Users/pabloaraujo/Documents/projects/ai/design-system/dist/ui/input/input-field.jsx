'use client';
import { forwardRef } from 'react';
import { TextField } from 'react-aria-components';
import { InputClient } from './input-client';
export const InputField = forwardRef(({ 'aria-label': ariaLabel, isDisabled, isInvalid, ...props }, ref) => (<TextField aria-label={ariaLabel} isDisabled={isDisabled} isInvalid={isInvalid}>
      <InputClient ref={ref} {...props}/>
    </TextField>));
InputField.displayName = 'InputField';
