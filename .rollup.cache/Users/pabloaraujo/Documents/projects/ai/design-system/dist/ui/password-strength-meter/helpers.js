export const DEFAULT_STRENGTH_LABELS = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
};
export const calculatePasswordStrength = (password) => {
    if (!password || password.length === 0) {
        return {
            strength: 'weak',
            score: 0,
            percentage: 0,
            label: DEFAULT_STRENGTH_LABELS.weak,
            feedback: ['Enter a password to see strength'],
        };
    }
    let score = 0;
    const feedback = [];
    if (password.length >= 8) {
        score += 25;
    }
    else {
        feedback.push('Use at least 8 characters');
    }
    if (password.length >= 12) {
        score += 10;
    }
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);
    if (hasLowercase)
        score += 10;
    else
        feedback.push('Add lowercase letters');
    if (hasUppercase)
        score += 10;
    else
        feedback.push('Add uppercase letters');
    if (hasNumbers)
        score += 15;
    else
        feedback.push('Add numbers');
    if (hasSymbols)
        score += 25;
    else
        feedback.push('Add symbols (!@#$%^&*)');
    if (!/(.)\1{2,}/.test(password)) {
        score += 5;
    }
    else {
        feedback.push('Avoid repeated characters');
    }
    if (!/123|abc|qwe/i.test(password)) {
        score += 5;
    }
    else {
        feedback.push('Avoid sequential characters');
    }
    if (!/password|123456|qwerty|admin/i.test(password)) {
        score += 5;
    }
    else {
        feedback.push('Avoid common words');
    }
    score = Math.min(score, 100);
    let strength;
    let percentage;
    if (score < 30) {
        strength = 'weak';
        percentage = Math.max(score, 10);
    }
    else if (score < 60) {
        strength = 'fair';
        percentage = score;
    }
    else if (score < 80) {
        strength = 'good';
        percentage = score;
    }
    else {
        strength = 'strong';
        percentage = score;
    }
    return {
        strength,
        score,
        percentage,
        label: DEFAULT_STRENGTH_LABELS[strength],
        feedback: feedback.length > 0 ? feedback : undefined,
    };
};
export const getStrengthColors = (strength) => {
    const colorMap = {
        weak: {
            bg: 'var(--colors-semantic-error)',
            text: 'var(--colors-semantic-error)',
        },
        fair: {
            bg: 'var(--colors-semantic-warning)',
            text: 'var(--colors-semantic-warning)',
        },
        good: {
            bg: 'var(--colors-semantic-info)',
            text: 'var(--colors-semantic-info)',
        },
        strong: {
            bg: 'var(--colors-semantic-success)',
            text: 'var(--colors-semantic-success)',
        },
    };
    return colorMap[strength];
};
export const buildStrengthMeterClassName = (strength, size, className) => {
    const classes = [
        'password-strength-meter',
        `password-strength-meter--${strength}`,
        `password-strength-meter--${size}`,
    ];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
