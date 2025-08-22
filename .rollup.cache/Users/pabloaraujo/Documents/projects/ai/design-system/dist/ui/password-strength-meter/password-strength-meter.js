import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        return _jsx("div", {});
    }
    return (_jsxs("div", { className: `${strengthMeterContainer} ${containerClassName}`, children: [_jsx("div", { className: progressBarClassName, children: _jsx("div", { className: progressFillClassName, style: {
                        '--progress-width': `${strengthInfo.percentage}%`,
                    }, "aria-hidden": "true" }) }), showLabel && (_jsxs("div", { className: labelClassName, children: [_jsxs("span", { className: strengthLabelText, children: ["Password strength: ", strengthLabel] }), _jsxs("span", { children: [strengthInfo.score, "/100"] })] })), showFeedback &&
                strengthInfo.feedback &&
                strengthInfo.feedback.length > 0 && (_jsx("div", { className: feedbackContainer, children: _jsx("ul", { className: feedbackList, role: "list", children: strengthInfo.feedback.map((message, index) => (_jsx("li", { className: feedbackItem, children: message }, index))) }) })), _jsxs("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: ["Password strength: ", strengthLabel, strengthInfo.feedback && strengthInfo.feedback.length > 0 && (_jsxs("span", { children: [". Suggestions: ", strengthInfo.feedback.join(', ')] }))] })] }));
};
PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';
