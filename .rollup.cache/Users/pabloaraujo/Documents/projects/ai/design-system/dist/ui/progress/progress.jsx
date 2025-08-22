'use client';
import { forwardRef } from 'react';
import { ProgressBar } from 'react-aria-components';
import { buildProgressClassName, formatProgressValue } from './helpers';
import * as styles from './progress.css';
export const Progress = forwardRef(({ variant = 'primary', size = 'medium', label, showValue = false, formatValue = formatProgressValue, isStriped = false, isAnimated = false, className, value, maxValue = 100, ...props }, ref) => {
    const isIndeterminate = value === undefined;
    const percentage = isIndeterminate
        ? 0
        : Math.min((value / maxValue) * 100, 100);
    const displayValue = isIndeterminate ? '' : formatValue(value, maxValue);
    return (<div className={label ? styles.progressWithLabel : undefined} ref={ref}>
        
        {label && (<div className={styles.labelRow}>
            <span className={styles.progressLabel}>{label}</span>
            {showValue && !isIndeterminate && (<span className={styles.progressValue}>{displayValue}</span>)}
          </div>)}

        
        <ProgressBar value={value} maxValue={maxValue} className={buildProgressClassName(variant, size, isStriped, isAnimated, isIndeterminate, className)} {...props}>
          {({ percentage: ariaPercentage }) => (<>
              
              <div className={`${styles.progressTrack} ${styles.trackSizes[size]} ${isIndeterminate ? styles.indeterminateTrack : ''}`}>
                
                <div className={`${styles.progressBar} ${styles.barVariants[variant]} ${isIndeterminate ? styles.indeterminate : ''}`} style={{
                width: isIndeterminate
                    ? '30%'
                    : `${ariaPercentage || percentage}%`,
            }}>
                  
                  {isStriped && (<div className={`${styles.stripedOverlay} ${isAnimated ? styles.animatedStripes : ''}`}/>)}
                </div>
              </div>
            </>)}
        </ProgressBar>
      </div>);
});
Progress.displayName = 'Progress';
