import { formatCurrency } from '@/i18n/formatters';
import { getServerLocaleInfo } from '@/i18n/server-locale';
export async function FormattedCurrency({ value, currency: customCurrency, options = {}, locale: customLocale, as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const localeInfo = customLocale
            ? {
                locale: customLocale,
                currency: customCurrency,
            }
            : await getServerLocaleInfo();
        const finalCurrency = customCurrency || localeInfo.currency || 'USD';
        const formattedCurrency = formatCurrency(value, localeInfo.locale, {
            currency: finalCurrency,
            ...options,
        });
        const accessibilityProps = {
            'data-value': value,
            'data-currency': finalCurrency,
            'data-locale': localeInfo.locale,
            'data-formatted': 'currency',
            'aria-label': `${value} ${finalCurrency}`,
        };
        return (<Component className={className} {...accessibilityProps} {...props}>
        {formattedCurrency}
      </Component>);
    }
    catch (error) {
        console.warn('Currency formatting failed:', error);
        const fallbackCurrency = customCurrency || 'USD';
        const fallbackText = `${fallbackCurrency} ${value}`;
        return (<Component className={className} data-formatting-error="true" aria-label={`${value} ${fallbackCurrency}`} {...props}>
        {fallbackChildren || fallbackText}
      </Component>);
    }
}
export function FormattedCurrencySync({ value, currency = 'USD', options = {}, locale = 'en-US', as: Component = 'span', className, fallbackChildren, ...props }) {
    try {
        const formattedCurrency = formatCurrency(value, locale, {
            currency,
            ...options,
        });
        const accessibilityProps = {
            'data-value': value,
            'data-currency': currency,
            'data-locale': locale,
            'data-formatted': 'currency',
            'aria-label': `${value} ${currency}`,
        };
        return (<Component className={className} {...accessibilityProps} {...props}>
        {formattedCurrency}
      </Component>);
    }
    catch (error) {
        console.warn('Currency formatting failed:', error);
        const fallbackText = `${currency} ${value}`;
        return (<Component className={className} data-formatting-error="true" aria-label={`${value} ${currency}`} {...props}>
        {fallbackChildren || fallbackText}
      </Component>);
    }
}
