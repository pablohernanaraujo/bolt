export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerColorScheme = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';
export interface SpinnerProps {
    size?: SpinnerSize;
    colorScheme?: SpinnerColorScheme;
    showTrack?: boolean;
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}
//# sourceMappingURL=types.d.ts.map