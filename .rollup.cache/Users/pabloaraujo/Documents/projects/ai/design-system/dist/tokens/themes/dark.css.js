import { createTheme } from '@vanilla-extract/css';
import { colors, shadows } from '../contracts.css';
export const darkTheme = createTheme({
    colors,
    shadows,
}, {
    colors: {
        background: {
            primary: '#1a1b1e',
            secondary: '#25262b',
            tertiary: '#2c2e33',
            inverse: '#f8f9fa',
        },
        foreground: {
            primary: '#ffffff',
            secondary: '#c1c2c5',
            tertiary: '#909296',
            inverse: '#1a1b1e',
        },
        brand: {
            primary: '#FF6B4F',
            primaryHover: '#FF4628',
            primaryActive: '#E63E22',
            secondary: '#9775fa',
            secondaryHover: '#845ef7',
            secondaryActive: '#7048e8',
        },
        semantic: {
            error: '#fa5252',
            errorBackground: '#2e1a1a',
            warning: '#fab005',
            warningBackground: '#2e2a1a',
            success: '#51cf66',
            successBackground: '#1a2e1e',
            info: '#22b8cf',
            infoBackground: '#1a2a2e',
        },
        border: {
            primary: '#373a40',
            secondary: '#2c2e33',
            focus: '#FF6B4F',
        },
        toast: {
            background: '#25262b',
            border: '#373a40',
            shadow: 'rgb(0 0 0 / 0.5)',
            successBackground: '#1a2e1e',
            successBorder: '#1e3a22',
            successIcon: '#51cf66',
            errorBackground: '#2e1a1a',
            errorBorder: '#3a1e1e',
            errorIcon: '#fa5252',
            warningBackground: '#2e2a1a',
            warningBorder: '#3a331e',
            warningIcon: '#fab005',
            infoBackground: '#1a2a2e',
            infoBorder: '#1e333a',
            infoIcon: '#22b8cf',
        },
    },
    shadows: {
        small: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        medium: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        large: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
        focus: '0 0 0 3px rgb(255 107 79 / 0.25)',
        toast: '0 10px 25px -5px rgb(0 0 0 / 0.5), 0 10px 10px -5px rgb(0 0 0 / 0.2)',
    },
});
