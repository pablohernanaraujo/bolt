import { useMemo } from 'react';
import { buildStrengthMeterClassName, calculatePasswordStrength, DEFAULT_STRENGTH_LABELS, } from './helpers';
import { feedbackContainer, feedbackItem, feedbackList, labelRecipe, progressBarRecipe, progressFillRecipe, strengthLabelText, strengthMeterContainer, } from './password-strength-meter.css';
export const PasswordStrengthMeter = ({ value, calculateStrength, showLabel = true, showFeedback = false, size = 'medium', className, labels = DEFAULT_STRENGTH_LABELS, }) => {
    const strengthInfo = useMemo(() => {
        if (calculateStrength) {
            return calculateStrength(value);
        }
        return calculatePasswordStrength(value);
    }, [value, calculateStrength]);
    const containerClassName = buildStrengthMeterClassName(strengthInfo.strength, size, className);
    const progressBarClassName = progressBarRecipe({ size });
    const progressFillClassName = progressFillRecipe({
        strength: strengthInfo.strength,
    });
    const labelClassName = labelRecipe({
        strength: strengthInfo.strength,
    });
    const strengthLabel = labels[strengthInfo.strength] || strengthInfo.label;
    if (!value || value.length === 0) {
        return <div />;
    }
    return (<div className={`${strengthMeterContainer} ${containerClassName}`}>
      
      <div className={progressBarClassName}>
        <div className={progressFillClassName} style={{
            '--progress-width': `${strengthInfo.percentage}%`,
        }} aria-hidden="true"/>
      </div>

      
      {showLabel && (<div className={labelClassName}>
          <span className={strengthLabelText}>
            Password strength: {strengthLabel}
          </span>
          <span>{strengthInfo.score}/100</span>
        </div>)}

      
      {showFeedback &&
            strengthInfo.feedback &&
            strengthInfo.feedback.length > 0 && (<div className={feedbackContainer}>
            <ul className={feedbackList} role="list">
              {strengthInfo.feedback.map((message, index) => (<li key={index} className={feedbackItem}>
                  {message}
                </li>))}
            </ul>
          </div>)}

      
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Password strength: {strengthLabel}
        {strengthInfo.feedback && strengthInfo.feedback.length > 0 && (<span>. Suggestions: {strengthInfo.feedback.join(', ')}</span>)}
      </div>
    </div>);
};
PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';
