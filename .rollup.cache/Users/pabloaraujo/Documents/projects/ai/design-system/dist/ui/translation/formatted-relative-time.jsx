import { formatRelativeTime } from '@/i18n/formatters';
import { getServerLocaleInfo } from '@/i18n/server-locale';
export async function FormattedRelativeTime({ value, baseDate = new Date(), style = 'long', numeric = 'auto', locale: customLocale, as: Component = 'time', className, fallbackChildren, ...props }) {
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
        const relativeTime = formatRelativeTime(dateObj, localeInfo.locale, baseDate);
        const diffMs = dateObj.getTime() - baseDate.getTime();
        const isPast = diffMs < 0;
        const absDiffMs = Math.abs(diffMs);
        const diffMinutes = Math.round(absDiffMs / (1000 * 60));
        const diffHours = Math.round(absDiffMs / (1000 * 60 * 60));
        const diffDays = Math.round(absDiffMs / (1000 * 60 * 60 * 24));
        const isoString = dateObj.toISOString();
        const baseIsoString = baseDate.toISOString();
        const accessibilityProps = {
            dateTime: isoString,
            'data-value': isoString,
            'data-base-date': baseIsoString,
            'data-locale': localeInfo.locale,
            'data-formatted': 'relative-time',
            'data-is-past': isPast,
            'data-diff-minutes': diffMinutes,
            'data-diff-hours': diffHours,
            'data-diff-days': diffDays,
            title: dateObj.toLocaleString(localeInfo.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short',
            }),
        };
        return (<Component className={className} {...accessibilityProps} {...props}>
        {relativeTime}
      </Component>);
    }
    catch (error) {
        console.warn('Relative time formatting failed:', error);
        const fallbackText = getFallbackRelativeTime(value, baseDate);
        return (<Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || fallbackText}
      </Component>);
    }
}
function getFallbackRelativeTime(value, baseDate) {
    try {
        const dateObj = typeof value === 'string' || typeof value === 'number'
            ? new Date(value)
            : value;
        if (isNaN(dateObj.getTime())) {
            return String(value);
        }
        const diffMs = dateObj.getTime() - baseDate.getTime();
        const isPast = diffMs < 0;
        const absDiffMs = Math.abs(diffMs);
        const minutes = Math.round(absDiffMs / (1000 * 60));
        const hours = Math.round(absDiffMs / (1000 * 60 * 60));
        const days = Math.round(absDiffMs / (1000 * 60 * 60 * 24));
        if (minutes < 1) {
            return 'now';
        }
        else if (minutes < 60) {
            return isPast ? `${minutes}m ago` : `in ${minutes}m`;
        }
        else if (hours < 24) {
            return isPast ? `${hours}h ago` : `in ${hours}h`;
        }
        else {
            return isPast ? `${days}d ago` : `in ${days}d`;
        }
    }
    catch {
        return String(value);
    }
}
export function FormattedRelativeTimeSync({ value, baseDate = new Date(), style = 'long', numeric = 'auto', locale = 'en-US', as: Component = 'time', className, fallbackChildren, ...props }) {
    try {
        const dateObj = typeof value === 'string' || typeof value === 'number'
            ? new Date(value)
            : value;
        if (isNaN(dateObj.getTime())) {
            throw new Error('Invalid date value');
        }
        const relativeTime = formatRelativeTime(dateObj, locale, baseDate);
        const diffMs = dateObj.getTime() - baseDate.getTime();
        const isPast = diffMs < 0;
        const absDiffMs = Math.abs(diffMs);
        const diffMinutes = Math.round(absDiffMs / (1000 * 60));
        const diffHours = Math.round(absDiffMs / (1000 * 60 * 60));
        const diffDays = Math.round(absDiffMs / (1000 * 60 * 60 * 24));
        const isoString = dateObj.toISOString();
        const baseIsoString = baseDate.toISOString();
        const accessibilityProps = {
            dateTime: isoString,
            'data-value': isoString,
            'data-base-date': baseIsoString,
            'data-locale': locale,
            'data-formatted': 'relative-time',
            'data-is-past': isPast,
            'data-diff-minutes': diffMinutes,
            'data-diff-hours': diffHours,
            'data-diff-days': diffDays,
            title: dateObj.toLocaleString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short',
            }),
        };
        return (<Component className={className} {...accessibilityProps} {...props}>
        {relativeTime}
      </Component>);
    }
    catch (error) {
        console.warn('Relative time formatting failed:', error);
        const fallbackText = getFallbackRelativeTime(value, baseDate);
        return (<Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || fallbackText}
      </Component>);
    }
}
