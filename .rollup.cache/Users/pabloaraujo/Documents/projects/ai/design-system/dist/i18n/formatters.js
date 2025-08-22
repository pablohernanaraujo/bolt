export function formatNumber(value, locale, options = {}) {
    const { useLocalizedNumerals = false, thousandsSeparator, decimalSeparator, ...intlOptions } = options;
    try {
        const formatter = new Intl.NumberFormat(locale, intlOptions);
        let formatted = formatter.format(value);
        if (thousandsSeparator || decimalSeparator) {
            formatted = applyCustomSeparators(formatted, locale, {
                thousandsSeparator,
                decimalSeparator,
            });
        }
        if (useLocalizedNumerals) {
            formatted = convertToLocalizedNumerals(formatted, locale);
        }
        return formatted;
    }
    catch (error) {
        console.warn('Number formatting failed:', error);
        return String(value);
    }
}
export function formatCurrency(value, locale, options) {
    const { currency, currencyDisplay = 'symbol', currencyPosition = 'auto', ...intlOptions } = options;
    try {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            currencyDisplay,
            ...intlOptions,
        });
        let formatted = formatter.format(value);
        if (currencyPosition !== 'auto') {
            formatted = adjustCurrencyPosition(formatted, currency, currencyPosition, locale);
        }
        return formatted;
    }
    catch (error) {
        console.warn('Currency formatting failed:', error);
        return `${currency} ${value}`;
    }
}
export function formatDate(date, locale, options = {}) {
    const { useLocalizedCalendar = false, template, preferRelative = false, relativeThreshold = 24, ...intlOptions } = options;
    try {
        const dateObj = typeof date === 'string' || typeof date === 'number'
            ? new Date(date)
            : date;
        if (isNaN(dateObj.getTime())) {
            return 'Invalid Date';
        }
        if (preferRelative) {
            const relativeFormat = tryFormatRelativeTime(dateObj, locale, relativeThreshold);
            if (relativeFormat) {
                return relativeFormat;
            }
        }
        if (template) {
            return formatDateWithTemplate(dateObj, locale, template);
        }
        const formatOptions = useLocalizedCalendar
            ? {
                ...intlOptions,
                calendar: getLocalizedCalendar(locale),
            }
            : intlOptions;
        const formatter = new Intl.DateTimeFormat(locale, formatOptions);
        return formatter.format(dateObj);
    }
    catch (error) {
        console.warn('Date formatting failed:', error);
        return String(date);
    }
}
export function formatRelativeTime(date, locale, baseDate = new Date()) {
    try {
        const dateObj = typeof date === 'string' || typeof date === 'number'
            ? new Date(date)
            : date;
        if (isNaN(dateObj.getTime())) {
            return 'Invalid Date';
        }
        const diffMs = dateObj.getTime() - baseDate.getTime();
        const diffSeconds = Math.round(diffMs / 1000);
        const diffMinutes = Math.round(diffSeconds / 60);
        const diffHours = Math.round(diffMinutes / 60);
        const diffDays = Math.round(diffHours / 24);
        const diffWeeks = Math.round(diffDays / 7);
        const diffMonths = Math.round(diffDays / 30);
        const diffYears = Math.round(diffDays / 365);
        let value;
        let unit;
        if (Math.abs(diffYears) >= 1) {
            value = diffYears;
            unit = 'year';
        }
        else if (Math.abs(diffMonths) >= 1) {
            value = diffMonths;
            unit = 'month';
        }
        else if (Math.abs(diffWeeks) >= 1) {
            value = diffWeeks;
            unit = 'week';
        }
        else if (Math.abs(diffDays) >= 1) {
            value = diffDays;
            unit = 'day';
        }
        else if (Math.abs(diffHours) >= 1) {
            value = diffHours;
            unit = 'hour';
        }
        else if (Math.abs(diffMinutes) >= 1) {
            value = diffMinutes;
            unit = 'minute';
        }
        else {
            value = diffSeconds;
            unit = 'second';
        }
        const formatter = new Intl.RelativeTimeFormat(locale, {
            numeric: 'auto',
            style: 'long',
        });
        return formatter.format(value, unit);
    }
    catch (error) {
        console.warn('Relative time formatting failed:', error);
        return String(date);
    }
}
function applyCustomSeparators(formatted, locale, separators) {
    const { thousandsSeparator, decimalSeparator } = separators;
    const currentSeparators = getLocaleSeparators(locale);
    let result = formatted;
    if (decimalSeparator && currentSeparators.decimal !== decimalSeparator) {
        result = result.replace(currentSeparators.decimal, decimalSeparator);
    }
    if (thousandsSeparator &&
        currentSeparators.thousands !== thousandsSeparator) {
        const regex = new RegExp(`\\${currentSeparators.thousands}`, 'g');
        result = result.replace(regex, thousandsSeparator);
    }
    return result;
}
function getLocaleSeparators(locale) {
    try {
        const formatter = new Intl.NumberFormat(locale);
        const parts = formatter.formatToParts(1234.5);
        const thousands = parts.find((part) => part.type === 'group')?.value || ',';
        const decimal = parts.find((part) => part.type === 'decimal')?.value || '.';
        return {
            thousands,
            decimal,
        };
    }
    catch {
        return {
            thousands: ',',
            decimal: '.',
        };
    }
}
function convertToLocalizedNumerals(text, locale) {
    const arabicNumerals = {
        '0': '٠',
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
    };
    const persianNumerals = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
    };
    const language = locale.split('-')[0];
    let numeralMap = null;
    if (language === 'ar') {
        numeralMap = arabicNumerals;
    }
    else if (language === 'fa') {
        numeralMap = persianNumerals;
    }
    if (!numeralMap) {
        return text;
    }
    return text.replace(/[0-9]/g, (digit) => numeralMap[digit] || digit);
}
function adjustCurrencyPosition(formatted, currency, position, locale) {
    const currencySymbols = ['$', '€', '£', '¥', '₹', '₪', 'ر.س', 'د.إ'];
    const foundSymbol = currencySymbols.find((symbol) => formatted.includes(symbol));
    if (!foundSymbol) {
        return formatted;
    }
    const number = formatted.replace(foundSymbol, '').trim();
    return position === 'start'
        ? `${foundSymbol} ${number}`
        : `${number} ${foundSymbol}`;
}
function tryFormatRelativeTime(date, locale, thresholdHours) {
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffHours <= thresholdHours) {
        return formatRelativeTime(date, locale, now);
    }
    return null;
}
function formatDateWithTemplate(date, locale, template) {
    const replacements = {
        YYYY: date.getFullYear().toString(),
        MM: (date.getMonth() + 1).toString().padStart(2, '0'),
        DD: date.getDate().toString().padStart(2, '0'),
        HH: date.getHours().toString().padStart(2, '0'),
        mm: date.getMinutes().toString().padStart(2, '0'),
        ss: date.getSeconds().toString().padStart(2, '0'),
    };
    let result = template;
    for (const [token, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(token, 'g'), value);
    }
    return result;
}
function getLocalizedCalendar(locale) {
    const language = locale.split('-')[0];
    const calendarMap = {
        ar: 'islamic',
        fa: 'persian',
        he: 'hebrew',
        ja: 'japanese',
        th: 'buddhist',
    };
    return calendarMap[language] || 'gregory';
}
export function createLocaleFormatters(localeInfo) {
    const { locale, currency, numberFormat, dateFormat } = localeInfo;
    return {
        formatNumber: (value, options) => formatNumber(value, locale, {
            ...numberFormat,
            ...options,
        }),
        formatCurrency: (value, options) => formatCurrency(value, locale, {
            currency: currency || 'USD',
            ...options,
        }),
        formatDate: (date, options) => formatDate(date, locale, {
            ...dateFormat,
            ...options,
        }),
        formatRelativeTime: (date, baseDate) => formatRelativeTime(date, locale, baseDate),
        formatPrice: (value) => formatCurrency(value, locale, {
            currency: currency || 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }),
        formatPercent: (value) => formatNumber(value, locale, {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        }),
        formatShortDate: (date) => formatDate(date, locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }),
        formatLongDate: (date) => formatDate(date, locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }),
        formatTime: (date) => formatDate(date, locale, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: locale.startsWith('en-US'),
        }),
    };
}
