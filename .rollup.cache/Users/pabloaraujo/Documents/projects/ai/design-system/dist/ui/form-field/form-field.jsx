'use client';
import { useId } from 'react';
import { FieldError, Label, Text, TextField } from 'react-aria-components';
import { Input } from '../input';
import * as styles from './form-field.css';
import { buildAriaDescribedBy, buildFormFieldClassName, generateFormFieldIds, hasFormFieldError, } from './helpers';
export const FormField = ({ label, inputProps = {}, hint, error, required = false, children, className, id, isDisabled, isInvalid, ...props }) => {
    const generatedId = useId();
    const ids = generateFormFieldIds(id || generatedId);
    const fieldHasError = hasFormFieldError(error, isInvalid);
    const ariaDescribedBy = buildAriaDescribedBy(ids, Boolean(hint), Boolean(error));
    return (<TextField id={ids.input} isRequired={required} isDisabled={isDisabled} isInvalid={fieldHasError} className={buildFormFieldClassName(className)} {...props}>
      
      <Label id={ids.label} className={styles.label}>
        {label}
        {required && (<span className={styles.requiredIndicator} aria-label="required">
            *
          </span>)}
      </Label>

      
      {children ? (children) : (<Input {...(() => {
            const { className: inputClassName, style: inputStyle, ...restProps } = inputProps;
            return restProps;
        })()} className={typeof inputProps.className === 'string'
                ? inputProps.className
                : undefined} style={typeof inputProps.style === 'object' &&
                inputProps.style !== null &&
                !('defaultStyle' in inputProps.style)
                ? inputProps.style
                : undefined} hasError={fieldHasError} isDisabled={isDisabled} isInvalid={fieldHasError}/>)}

      
      {hint && !error && (<Text id={ids.hint} slot="description" className={styles.hint}>
          {hint}
        </Text>)}

      
      {error && (<FieldError id={ids.error} className={styles.error}>
          {error}
        </FieldError>)}
    </TextField>);
};
FormField.displayName = 'FormField';
