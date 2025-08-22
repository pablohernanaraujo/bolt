import { cookies, headers } from 'next/headers';
import { getLanguageConfig, getServerTextDirection, } from '../theme/rtl-detection';
const LOCALE_CURRENCIES = {
    'en-US': {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
    },
    'en-GB': {
        code: 'GBP',
        symbol: '£',
        name: 'British Pound',
    },
    'en-CA': {
        code: 'CAD',
        symbol: 'C$',
        name: 'Canadian Dollar',
    },
    'en-AU': {
        code: 'AUD',
        symbol: 'A$',
        name: 'Australian Dollar',
    },
    'ar-SA': {
        code: 'SAR',
        symbol: 'ر.س',
        name: 'Saudi Riyal',
    },
    'ar-AE': {
        code: 'AED',
        symbol: 'د.إ',
        name: 'UAE Dirham',
    },
    'ar-EG': {
        code: 'EGP',
        symbol: 'ج.م',
        name: 'Egyptian Pound',
    },
    'ar-MA': {
        code: 'MAD',
        symbol: 'د.م.',
        name: 'Moroccan Dirham',
    },
    'he-IL': {
        code: 'ILS',
        symbol: '₪',
        name: 'Israeli Shekel',
    },
    'fa-IR': {
        code: 'IRR',
        symbol: '﷼',
        name: 'Iranian Rial',
    },
    'fr-FR': {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
    },
    'de-DE': {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
    },
    'es-ES': {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
    },
    'it-IT': {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
    },
    'ja-JP': {
        code: 'JPY',
        symbol: '¥',
        name: 'Japanese Yen',
    },
    'ko-KR': {
        code: 'KRW',
        symbol: '₩',
        name: 'Korean Won',
    },
    'zh-CN': {
        code: 'CNY',
        symbol: '¥',
        name: 'Chinese Yuan',
    },
};
const DEFAULT_LOCALE_INFO = {
    locale: 'en-US',
    language: 'en',
    region: 'US',
    direction: 'ltr',
    languageConfig: {
        code: 'en',
        name: 'English',
        direction: 'ltr',
    },
    currency: 'USD',
    timezone: 'America/New_York',
    numberFormat: {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    },
    dateFormat: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    },
};
export async function detectServerLocale() {
    try {
        const cookieStore = await cookies();
        const localeCookie = cookieStore.get('locale')?.value;
        if (localeCookie && isValidLocale(localeCookie)) {
            return await buildLocaleInfo(localeCookie);
        }
        const headersList = await headers();
        const acceptLanguage = headersList.get('accept-language');
        if (acceptLanguage) {
            const detectedLocale = parseAcceptLanguageForLocale(acceptLanguage);
            if (detectedLocale) {
                return await buildLocaleInfo(detectedLocale);
            }
        }
        const countryCode = headersList.get('cf-ipcountry') ||
            headersList.get('x-country-code') ||
            headersList.get('x-forwarded-country');
        if (countryCode) {
            const localeFromCountry = getLocaleFromCountry(countryCode);
            if (localeFromCountry) {
                return await buildLocaleInfo(localeFromCountry);
            }
        }
        return DEFAULT_LOCALE_INFO;
    }
    catch (error) {
        console.warn('Locale detection failed, using default:', error);
        return DEFAULT_LOCALE_INFO;
    }
}
export async function getServerLocaleInfo() {
    return await detectServerLocale();
}
function parseAcceptLanguageForLocale(acceptLanguage) {
    const languages = acceptLanguage
        .split(',')
        .map((lang) => {
        const parts = lang.trim().split(';q=');
        const code = parts[0].trim();
        const quality = parts[1] ? parseFloat(parts[1]) : 1.0;
        return {
            code,
            quality,
        };
    })
        .filter((lang) => lang.code && lang.quality > 0)
        .sort((a, b) => b.quality - a.quality);
    for (const lang of languages) {
        if (isValidLocale(lang.code)) {
            return lang.code;
        }
    }
    for (const lang of languages) {
        const languageCode = lang.code.split('-')[0];
        const commonLocale = getCommonLocaleForLanguage(languageCode);
        if (commonLocale) {
            return commonLocale;
        }
    }
    return null;
}
function getCommonLocaleForLanguage(languageCode) {
    const commonLocales = {
        en: 'en-US',
        ar: 'ar-SA',
        he: 'he-IL',
        fa: 'fa-IR',
        ur: 'ur-PK',
        fr: 'fr-FR',
        de: 'de-DE',
        es: 'es-ES',
        it: 'it-IT',
        ja: 'ja-JP',
        ko: 'ko-KR',
        zh: 'zh-CN',
        pt: 'pt-BR',
        ru: 'ru-RU',
        tr: 'tr-TR',
        hi: 'hi-IN',
    };
    return commonLocales[languageCode] || null;
}
function getLocaleFromCountry(countryCode) {
    const countryToLocale = {
        US: 'en-US',
        GB: 'en-GB',
        CA: 'en-CA',
        AU: 'en-AU',
        SA: 'ar-SA',
        AE: 'ar-AE',
        EG: 'ar-EG',
        MA: 'ar-MA',
        IL: 'he-IL',
        IR: 'fa-IR',
        PK: 'ur-PK',
        FR: 'fr-FR',
        DE: 'de-DE',
        ES: 'es-ES',
        IT: 'it-IT',
        JP: 'ja-JP',
        KR: 'ko-KR',
        CN: 'zh-CN',
        TW: 'zh-TW',
        BR: 'pt-BR',
        RU: 'ru-RU',
        TR: 'tr-TR',
        IN: 'hi-IN',
    };
    return countryToLocale[countryCode.toUpperCase()] || null;
}
async function buildLocaleInfo(localeCode) {
    const [language, region] = localeCode.split('-');
    const languageConfig = getLanguageConfig(language);
    const direction = await getServerTextDirection();
    const currencyInfo = LOCALE_CURRENCIES[localeCode] ||
        LOCALE_CURRENCIES[`${language}-${getDefaultRegionForLanguage(language)}`] || {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
    };
    const timezone = await detectTimezone(region);
    const numberFormat = createNumberFormatOptions(localeCode);
    const dateFormat = createDateFormatOptions(localeCode);
    return {
        locale: localeCode,
        language,
        region,
        direction,
        languageConfig,
        currency: currencyInfo.code,
        timezone,
        numberFormat,
        dateFormat,
    };
}
function getDefaultRegionForLanguage(language) {
    const defaults = {
        en: 'US',
        ar: 'SA',
        he: 'IL',
        fa: 'IR',
        ur: 'PK',
        fr: 'FR',
        de: 'DE',
        es: 'ES',
        it: 'IT',
        ja: 'JP',
        ko: 'KR',
        zh: 'CN',
        pt: 'BR',
        ru: 'RU',
        tr: 'TR',
        hi: 'IN',
    };
    return defaults[language] || 'US';
}
async function detectTimezone(region) {
    try {
        const headersList = await headers();
        const timezoneHeader = headersList.get('x-timezone') || headersList.get('cf-timezone');
        if (timezoneHeader && isValidTimezone(timezoneHeader)) {
            return timezoneHeader;
        }
        if (region) {
            const regionTimezone = getTimezoneForRegion(region);
            if (regionTimezone) {
                return regionTimezone;
            }
        }
        return 'UTC';
    }
    catch {
        return 'UTC';
    }
}
function getTimezoneForRegion(region) {
    const regionTimezones = {
        US: 'America/New_York',
        GB: 'Europe/London',
        CA: 'America/Toronto',
        AU: 'Australia/Sydney',
        SA: 'Asia/Riyadh',
        AE: 'Asia/Dubai',
        EG: 'Africa/Cairo',
        MA: 'Africa/Casablanca',
        IL: 'Asia/Jerusalem',
        IR: 'Asia/Tehran',
        PK: 'Asia/Karachi',
        FR: 'Europe/Paris',
        DE: 'Europe/Berlin',
        ES: 'Europe/Madrid',
        IT: 'Europe/Rome',
        JP: 'Asia/Tokyo',
        KR: 'Asia/Seoul',
        CN: 'Asia/Shanghai',
        TW: 'Asia/Taipei',
        BR: 'America/Sao_Paulo',
        RU: 'Europe/Moscow',
        TR: 'Europe/Istanbul',
        IN: 'Asia/Kolkata',
    };
    return regionTimezones[region.toUpperCase()] || null;
}
function createNumberFormatOptions(locale) {
    return {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    };
}
function createDateFormatOptions(locale) {
    const isUS = locale === 'en-US';
    return {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...(isUS && {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        }),
    };
}
function isValidLocale(locale) {
    const localeRegex = /^[a-z]{2,3}(-[A-Z]{2})?$/;
    return localeRegex.test(locale);
}
function isValidTimezone(timezone) {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return true;
    }
    catch {
        return false;
    }
}
