import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { calculatePasswordStrength, buildStrengthMeterClassName, DEFAULT_STRENGTH_LABELS } from './helpers.js';
import { progressBarRecipe, progressFillRecipe, labelRecipe, strengthMeterContainer, strengthLabelText, feedbackContainer, feedbackList, feedbackItem } from './password-strength-meter.css.js';

const PasswordStrengthMeter = ({ value, calculateStrength, showLabel = true, showFeedback = false, size = 'medium', className, labels = DEFAULT_STRENGTH_LABELS, }) => {
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
        return jsx("div", {});
    }
    return (jsxs("div", { className: `${strengthMeterContainer} ${containerClassName}`, children: [jsx("div", { className: progressBarClassName, children: jsx("div", { className: progressFillClassName, style: {
                        '--progress-width': `${strengthInfo.percentage}%`,
                    }, "aria-hidden": "true" }) }), showLabel && (jsxs("div", { className: labelClassName, children: [jsxs("span", { className: strengthLabelText, children: ["Password strength: ", strengthLabel] }), jsxs("span", { children: [strengthInfo.score, "/100"] })] })), showFeedback &&
                strengthInfo.feedback &&
                strengthInfo.feedback.length > 0 && (jsx("div", { className: feedbackContainer, children: jsx("ul", { className: feedbackList, role: "list", children: strengthInfo.feedback.map((message, index) => (jsx("li", { className: feedbackItem, children: message }, index))) }) })), jsxs("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: ["Password strength: ", strengthLabel, strengthInfo.feedback && strengthInfo.feedback.length > 0 && (jsxs("span", { children: [". Suggestions: ", strengthInfo.feedback.join(', ')] }))] })] }));
};
PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';

export { PasswordStrengthMeter };
//# sourceMappingURL=password-strength-meter.js.map
