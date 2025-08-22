import { forwardRef } from 'react';
import { buildSpinnerClassName, getAriaValueText } from './helpers';
import * as styles from './spinner.css';
export const Spinner = forwardRef(({ size = 'medium', colorScheme = 'brand', showTrack = true, label = 'Loading', className, style, ...props }, ref) => {
    const sizeMap = {
        small: 16,
        medium: 24,
        large: 32,
    };
    const svgSize = sizeMap[size];
    const strokeWidth = size === 'small' ? 2 : size === 'medium' ? 2.5 : 3;
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference * 0.75} ${circumference * 0.25}`;
    return (<div ref={ref} className={buildSpinnerClassName(size, colorScheme, showTrack, className)} style={style} role="status" aria-label={label} aria-valuetext={getAriaValueText(label)} aria-busy="true" aria-live="polite" {...props}>
        
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          
          {showTrack && (<circle cx={svgSize / 2} cy={svgSize / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} className={styles.track}/>)}

          
          <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} strokeDashoffset="0" className={styles.spinnerElement}/>
        </svg>

        
        <span className={styles.visuallyHidden}>{label}</span>
      </div>);
});
Spinner.displayName = 'Spinner';
