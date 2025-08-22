import { formatNumber } from '@/i18n/formatters';
import { getServerLocaleInfo } from '@/i18n/server-locale';
export async function FormattedNumber({ value, options = {}, useLocalizedNumerals = false, locale: customLocale, as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const localeInfo = customLocale
            ? { locale: customLocale }
            : await getServerLocaleInfo();
        const formattedNumber = formatNumber(value, localeInfo.locale, {
            useLocalizedNumerals,
            ...options,
        });
        return (<Component className={className} data-value={value} data-locale={localeInfo.locale} data-formatted="number" {...props}>
        {formattedNumber}
      </Component>);
    }
    catch (error) {
        console.warn('Number formatting failed:', error);
        return (<Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || String(value)}
      </Component>);
    }
}
export function FormattedNumberSync({ value, options = {}, useLocalizedNumerals = false, locale = 'en-US', as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const formattedNumber = formatNumber(value, locale, {
            useLocalizedNumerals,
            ...options,
        });
        return (<Component className={className} data-value={value} data-locale={locale} data-formatted="number" {...props}>
        {formattedNumber}
      </Component>);
    }
    catch (error) {
        console.warn('Number formatting failed:', error);
        return (<Component className={className} data-formatting-error="true" {...props}>
        {fallbackChildren || String(value)}
      </Component>);
    }
}
