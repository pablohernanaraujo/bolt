import { type SwitchProps as AriaSwitchProps } from 'react-aria-components';
export interface ToggleProps extends AriaSwitchProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'small' | 'medium' | 'large';
    labelPosition?: 'left' | 'right';
}
