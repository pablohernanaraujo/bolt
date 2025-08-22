import { type CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
export interface CheckboxProps extends AriaCheckboxProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'small' | 'medium' | 'large';
    labelPosition?: 'left' | 'right';
}
