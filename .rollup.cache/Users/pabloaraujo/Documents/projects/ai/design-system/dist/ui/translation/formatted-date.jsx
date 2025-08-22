import { formatDate, formatRelativeTime } from '@/i18n/formatters';
import { getServerLocaleInfo } from '@/i18n/server-locale';
export async function FormattedDate({ value, options = {}, style, relative = false, relativeThreshold = 24, locale: customLocale, as: Component = 'time', className, fallbackChildren, ...props }) {
    try {
        const localeInfo = customLocale
            ? { locale: customLocale }
            : await getServerLocaleInfo();
        const dateObj = typeof value === 'string' || typeof value === 'number'
            ? new Date(value)
            : value;
        if (isNaN(dateObj.getTime())) {
            throw new Error('Invalid date value');
        }
        let finalOptions = { ...options };
        if (style && !Object.keys(options).length) {
            finalOptions = getStyleOptions(style);
        }
        let formattedDate;
        if (relative) {
            const now = new Date();
            const diffHours = Math.abs(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
            if (diffHours <= relativeThreshold) {
                formattedDate = formatRelativeTime(dateObj, localeInfo.locale, now);
            }
            else {
                formattedDate = formatDate(dateObj, localeInfo.locale, finalOptions);
            }
        }
        else {
            formattedDate = formatDate(dateObj, localeInfo.locale, finalOptions);
        }
        const isoString = dateObj.toISOString();
        const accessibilityProps = {
            dateTime: isoString,
            'data-value': isoString,
            'data-locale': localeInfo.locale,
            'data-formatted': 'date',
            'data-relative': relative,
            title: formatDate(dateObj, localeInfo.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            }),
        };
        return (<Component className={className} {...accessibilityProps} {...props}>
        {formattedDate}
      </Component>);
    }
    catch (error) {
        console.warn('Date formatting failed:', error);
        const fallbackText = value instanceof Date ? value.toLocaleDateString() : String(value);
        return (<Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || fallbackText}
      </Component>);
    }
}
function getStyleOptions(style) {
    switch (style) {
        case 'short':
            return {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            };
        case 'medium':
            return {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };
        case 'long':
            return {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
        case 'full':
            return {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            };
        default:
            return {};
    }
}
export function FormattedDateSync({ value, options = {}, style, relative = false, relativeThreshold = 24, locale = 'en-US', as: Component = 'time', className, fallbackChildren, ...props }) {
    try {
        const dateObj = typeof value === 'string' || typeof value === 'number'
            ? new Date(value)
            : value;
        if (isNaN(dateObj.getTime())) {
            throw new Error('Invalid date value');
        }
        let finalOptions = { ...options };
        if (style && !Object.keys(options).length) {
            finalOptions = getStyleOptions(style);
        }
        let formattedDate;
        if (relative) {
            const now = new Date();
            const diffHours = Math.abs(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
            if (diffHours <= relativeThreshold) {
                formattedDate = formatRelativeTime(dateObj, locale, now);
            }
            else {
                formattedDate = formatDate(dateObj, locale, finalOptions);
            }
        }
        else {
            formattedDate = formatDate(dateObj, locale, finalOptions);
        }
        const isoString = dateObj.toISOString();
        const accessibilityProps = {
            dateTime: isoString,
            'data-value': isoString,
            'data-locale': locale,
            'data-formatted': 'date',
            'data-relative': relative,
            title: formatDate(dateObj, locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            }),
        };
        return (<Component className={className} {...accessibilityProps} {...props}>
        {formattedDate}
      </Component>);
    }
    catch (error) {
        console.warn('Date formatting failed:', error);
        const fallbackText = value instanceof Date ? value.toLocaleDateString() : String(value);
        return (<Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || fallbackText}
      </Component>);
    }
}
