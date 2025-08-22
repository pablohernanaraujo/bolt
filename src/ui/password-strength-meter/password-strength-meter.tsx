// /src/ui/password-strength-meter/password-strength-meter.tsx
// Password strength meter component with visual progress bar and feedback
// Analyzes password strength and provides real-time feedback to users
// RELEVANT FILES: types.ts, helpers.ts, password-strength-meter.css.ts

import { type FC, type ReactElement, useMemo } from 'react';

import {
  buildStrengthMeterClassName,
  calculatePasswordStrength,
  DEFAULT_STRENGTH_LABELS,
} from './helpers';
import {
  feedbackContainer,
  feedbackItem,
  feedbackList,
  labelRecipe,
  progressBarRecipe,
  progressFillRecipe,
  strengthLabelText,
  strengthMeterContainer,
} from './password-strength-meter.css';
import { type PasswordStrengthMeterProps } from './types';

/**
 * PasswordStrengthMeter component
 * Provides visual feedback on password strength with progress bar and suggestions
 *
 * Features:
 * - Real-time password strength analysis
 * - Animated progress bar with color coding
 * - Strength level labels (Weak, Fair, Good, Strong)
 * - Optional feedback messages for improvement
 * - Multiple sizes (small, medium, large)
 * - Customizable strength calculation algorithm
 * - Custom labels for strength levels
 *
 * Example:
 * ```tsx
 * <PasswordStrengthMeter
 *   value={password}
 *   showLabel={true}
 *   showFeedback={true}
 *   size="medium"
 * />
 * ```
 */
export const PasswordStrengthMeter: FC<PasswordStrengthMeterProps> = ({
  value,
  calculateStrength,
  showLabel = true,
  showFeedback = false,
  size = 'medium',
  className,
  labels = DEFAULT_STRENGTH_LABELS,
}): ReactElement => {
  // Calculate password strength using custom or default algorithm
  const strengthInfo = useMemo(() => {
    if (calculateStrength) {
      return calculateStrength(value);
    }
    return calculatePasswordStrength(value);
  }, [value, calculateStrength]);

  // Build component classNames
  const containerClassName = buildStrengthMeterClassName(
    strengthInfo.strength,
    size,
    className,
  );

  const progressBarClassName = progressBarRecipe({ size });
  const progressFillClassName = progressFillRecipe({
    strength: strengthInfo.strength,
  });
  const labelClassName = labelRecipe({
    strength: strengthInfo.strength,
  });

  // Get custom label or use default
  const strengthLabel = labels[strengthInfo.strength] || strengthInfo.label;

  // Don't render if no password
  if (!value || value.length === 0) {
    return <div />;
  }

  return (
    <div className={`${strengthMeterContainer} ${containerClassName}`}>
      {/* Progress Bar */}
      <div className={progressBarClassName}>
        <div
          className={progressFillClassName}
          style={
            {
              // Use CSS custom property for dynamic width animation
              '--progress-width': `${strengthInfo.percentage}%`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        />
      </div>

      {/* Strength Label */}
      {showLabel && (
        <div className={labelClassName}>
          <span className={strengthLabelText}>
            Password strength: {strengthLabel}
          </span>
          <span>{strengthInfo.score}/100</span>
        </div>
      )}

      {/* Feedback Messages */}
      {showFeedback &&
        strengthInfo.feedback &&
        strengthInfo.feedback.length > 0 && (
          <div className={feedbackContainer}>
            <ul className={feedbackList} role="list">
              {strengthInfo.feedback.map((message, index) => (
                <li key={index} className={feedbackItem}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Password strength: {strengthLabel}
        {strengthInfo.feedback && strengthInfo.feedback.length > 0 && (
          <span>. Suggestions: {strengthInfo.feedback.join(', ')}</span>
        )}
      </div>
    </div>
  );
};

PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';
