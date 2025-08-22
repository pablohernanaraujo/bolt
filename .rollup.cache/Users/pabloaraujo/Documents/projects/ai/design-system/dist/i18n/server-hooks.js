import { createLocaleFormatters, } from './formatters';
import { isLocaleSupported, loadTranslations } from './loader';
import { detectServerLocale } from './server-locale';
import { createScopedTranslator, translate, translateWithFallback, } from './translations';
export async function getServerTranslation(requestedLocale, fallbackLocale = 'en-US') {
    const locale = requestedLocale
        ? await getLocaleInfo(requestedLocale)
        : await detectServerLocale();
    await ensureTranslationsLoaded(locale.locale, fallbackLocale);
    const formatters = createLocaleFormatters(locale);
    const t = (key, params) => translate(key, locale.locale, params, fallbackLocale);
    const tf = (key, fallback, params) => translateWithFallback(key, locale.locale, fallback, params);
    const scope = (namespace) => createScopedTranslator(namespace, locale.locale);
    return {
        locale,
        t,
        tf,
        scope,
        format: {
            number: formatters.formatNumber,
            currency: formatters.formatCurrency,
            date: formatters.formatDate,
            relativeTime: formatters.formatRelativeTime,
            price: formatters.formatPrice,
            percent: formatters.formatPercent,
            shortDate: formatters.formatShortDate,
            longDate: formatters.formatLongDate,
            time: formatters.formatTime,
        },
    };
}
export async function createTranslationHelper(localeCode, fallbackLocale = 'en-US') {
    return await getServerTranslation(localeCode, fallbackLocale);
}
async function getLocaleInfo(localeCode) {
    try {
        const [language, region] = localeCode.split('-');
        const { getLanguageConfig, getServerTextDirection } = await import('../theme/rtl-detection');
        const languageConfig = getLanguageConfig(language);
        const direction = await getServerTextDirection();
        return {
            locale: localeCode,
            language,
            region,
            direction,
            languageConfig,
            currency: getDefaultCurrency(localeCode),
            timezone: getDefaultTimezone(localeCode),
        };
    }
    catch (error) {
        console.warn('Failed to get locale info, using defaults:', error);
        return {
            locale: localeCode,
            language: localeCode.split('-')[0],
            region: localeCode.split('-')[1],
            direction: 'ltr',
            languageConfig: {
                code: localeCode.split('-')[0],
                name: localeCode,
                direction: 'ltr',
            },
        };
    }
}
async function ensureTranslationsLoaded(primaryLocale, fallbackLocale) {
    const loadingPromises = [];
    if (isLocaleSupported(primaryLocale)) {
        loadingPromises.push(loadTranslations(primaryLocale).catch((error) => {
            console.warn(`Failed to load translations for ${primaryLocale}:`, error);
        }));
    }
    if (fallbackLocale !== primaryLocale && isLocaleSupported(fallbackLocale)) {
        loadingPromises.push(loadTranslations(fallbackLocale).catch((error) => {
            console.warn(`Failed to load fallback translations for ${fallbackLocale}:`, error);
        }));
    }
    await Promise.all(loadingPromises);
}
function getDefaultCurrency(locale) {
    const currencyMap = {
        'en-US': 'USD',
        'en-GB': 'GBP',
        'en-CA': 'CAD',
        'en-AU': 'AUD',
        'ar-SA': 'SAR',
        'ar-AE': 'AED',
        'ar-EG': 'EGP',
        'ar-MA': 'MAD',
        'he-IL': 'ILS',
        'fa-IR': 'IRR',
        'fr-FR': 'EUR',
        'de-DE': 'EUR',
        'es-ES': 'EUR',
        'it-IT': 'EUR',
        'ja-JP': 'JPY',
        'ko-KR': 'KRW',
        'zh-CN': 'CNY',
        'zh-TW': 'TWD',
    };
    return currencyMap[locale] || 'USD';
}
function getDefaultTimezone(locale) {
    const timezoneMap = {
        'en-US': 'America/New_York',
        'en-GB': 'Europe/London',
        'en-CA': 'America/Toronto',
        'en-AU': 'Australia/Sydney',
        'ar-SA': 'Asia/Riyadh',
        'ar-AE': 'Asia/Dubai',
        'ar-EG': 'Africa/Cairo',
        'ar-MA': 'Africa/Casablanca',
        'he-IL': 'Asia/Jerusalem',
        'fa-IR': 'Asia/Tehran',
        'fr-FR': 'Europe/Paris',
        'de-DE': 'Europe/Berlin',
        'es-ES': 'Europe/Madrid',
        'it-IT': 'Europe/Rome',
        'ja-JP': 'Asia/Tokyo',
        'ko-KR': 'Asia/Seoul',
        'zh-CN': 'Asia/Shanghai',
        'zh-TW': 'Asia/Taipei',
    };
    return timezoneMap[locale] || 'UTC';
}
export async function createComponentTranslationHelper(componentName, locale, fallbackLocale = 'en-US') {
    const helper = await getServerTranslation(locale, fallbackLocale);
    const componentT = (key, params) => {
        const scopedKey = `${componentName}.${key}`;
        return helper.t(scopedKey, params);
    };
    const componentTf = (key, fallback, params) => {
        const scopedKey = `${componentName}.${key}`;
        return helper.tf(scopedKey, fallback, params);
    };
    return {
        t: componentT,
        tf: componentTf,
        format: helper.format,
    };
}
export class ServerTranslationProvider {
    helper = null;
    async initialize(locale, fallbackLocale = 'en-US') {
        this.helper = await getServerTranslation(locale, fallbackLocale);
    }
    getHelper() {
        if (!this.helper) {
            throw new Error('ServerTranslationProvider not initialized. Call initialize() first.');
        }
        return this.helper;
    }
    t(key, params) {
        return this.getHelper().t(key, params);
    }
    tf(key, fallback, params) {
        return this.getHelper().tf(key, fallback, params);
    }
    scope(namespace) {
        return this.getHelper().scope(namespace);
    }
    get format() {
        return this.getHelper().format;
    }
    get locale() {
        return this.getHelper().locale;
    }
}
export function createServerTranslationProvider() {
    return new ServerTranslationProvider();
}
export function translateConditional(condition, trueKey, falseKey, helper, params) {
    const key = condition ? trueKey : falseKey;
    return helper.t(key, params);
}
export function translateDirectional(ltrKey, rtlKey, helper, params) {
    const isRTL = helper.locale.direction === 'rtl';
    return translateConditional(isRTL, rtlKey, ltrKey, helper, params);
}
export function translatePlural(key, count, helper, params) {
    const language = helper.locale.language;
    const pluralRule = getPluralRule(count, language);
    const pluralKey = `${key}.${pluralRule}`;
    const finalParams = {
        ...params,
        count,
    };
    const translation = helper.t(pluralKey, finalParams);
    return translation === pluralKey ? helper.t(key, finalParams) : translation;
}
function getPluralRule(count, language) {
    if (count === 0)
        return 'zero';
    if (count === 1)
        return 'one';
    if (count === 2 && (language === 'ar' || language === 'he'))
        return 'two';
    return 'other';
}
