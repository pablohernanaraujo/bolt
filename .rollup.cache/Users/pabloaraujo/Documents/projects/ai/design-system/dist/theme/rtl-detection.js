import { cookies, headers } from 'next/headers';
const RTL_LANGUAGES = {
    ar: {
        code: 'ar',
        name: 'العربية',
        direction: 'rtl',
        isComplexScript: true,
    },
    'ar-SA': {
        code: 'ar-SA',
        name: 'العربية (السعودية)',
        direction: 'rtl',
        isComplexScript: true,
    },
    'ar-EG': {
        code: 'ar-EG',
        name: 'العربية (مصر)',
        direction: 'rtl',
        isComplexScript: true,
    },
    'ar-AE': {
        code: 'ar-AE',
        name: 'العربية (الإمارات)',
        direction: 'rtl',
        isComplexScript: true,
    },
    'ar-MA': {
        code: 'ar-MA',
        name: 'العربية (المغرب)',
        direction: 'rtl',
        isComplexScript: true,
    },
    he: {
        code: 'he',
        name: 'עברית',
        direction: 'rtl',
        isComplexScript: true,
    },
    'he-IL': {
        code: 'he-IL',
        name: 'עברית (ישראל)',
        direction: 'rtl',
        isComplexScript: true,
    },
    fa: {
        code: 'fa',
        name: 'فارسی',
        direction: 'rtl',
        isComplexScript: true,
    },
    'fa-IR': {
        code: 'fa-IR',
        name: 'فارسی (ایران)',
        direction: 'rtl',
        isComplexScript: true,
    },
    ur: {
        code: 'ur',
        name: 'اردو',
        direction: 'rtl',
        isComplexScript: true,
    },
    'ur-PK': {
        code: 'ur-PK',
        name: 'اردو (پاکستان)',
        direction: 'rtl',
        isComplexScript: true,
    },
    ckb: {
        code: 'ckb',
        name: 'کوردی',
        direction: 'rtl',
        isComplexScript: true,
    },
    sd: {
        code: 'sd',
        name: 'سنڌي',
        direction: 'rtl',
        isComplexScript: true,
    },
    ps: {
        code: 'ps',
        name: 'پښتو',
        direction: 'rtl',
        isComplexScript: true,
    },
    yi: {
        code: 'yi',
        name: 'ייִדיש',
        direction: 'rtl',
        isComplexScript: true,
    },
    dv: {
        code: 'dv',
        name: 'ދިވެހި',
        direction: 'rtl',
        isComplexScript: true,
    },
};
const DEFAULT_LTR_CONFIG = {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    isComplexScript: false,
};
export async function getServerTextDirection() {
    try {
        const cookieStore = await cookies();
        const directionCookie = cookieStore.get('text-direction')?.value;
        if (directionCookie === 'rtl' || directionCookie === 'ltr') {
            return directionCookie;
        }
        const detectedLanguage = await detectServerLanguage();
        const languageConfig = getLanguageConfig(detectedLanguage);
        return languageConfig.direction;
    }
    catch (error) {
        console.warn('RTL detection failed, defaulting to LTR:', error);
        return 'ltr';
    }
}
export async function detectServerLanguage() {
    try {
        const headersList = await headers();
        const acceptLanguage = headersList.get('accept-language');
        if (!acceptLanguage) {
            return DEFAULT_LTR_CONFIG.code;
        }
        const languages = parseAcceptLanguage(acceptLanguage);
        for (const lang of languages) {
            if (RTL_LANGUAGES[lang.code] || lang.code === 'en') {
                return lang.code;
            }
            const languageFamily = lang.code.split('-')[0];
            if (RTL_LANGUAGES[languageFamily]) {
                return languageFamily;
            }
        }
        return DEFAULT_LTR_CONFIG.code;
    }
    catch (error) {
        console.warn('Language detection failed, defaulting to English:', error);
        return DEFAULT_LTR_CONFIG.code;
    }
}
function parseAcceptLanguage(acceptLanguage) {
    return acceptLanguage
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
}
export function getLanguageConfig(languageCode) {
    const exactMatch = RTL_LANGUAGES[languageCode];
    if (exactMatch) {
        return exactMatch;
    }
    const languageFamily = languageCode.split('-')[0];
    const familyMatch = RTL_LANGUAGES[languageFamily];
    if (familyMatch) {
        return {
            ...familyMatch,
            code: languageCode,
        };
    }
    return {
        ...DEFAULT_LTR_CONFIG,
        code: languageCode,
    };
}
export function isRTLLanguage(languageCode) {
    const config = getLanguageConfig(languageCode);
    return config.direction === 'rtl';
}
export function getSupportedRTLLanguages() {
    return Object.values(RTL_LANGUAGES);
}
export function getSupportedLanguages() {
    return [DEFAULT_LTR_CONFIG, ...Object.values(RTL_LANGUAGES)];
}
export function getTextDirectionAttributes(languageCode, direction) {
    const config = getLanguageConfig(languageCode);
    const finalDirection = direction || config.direction;
    return {
        lang: languageCode,
        dir: finalDirection,
    };
}
export async function getServerLocaleInfo() {
    const language = await detectServerLanguage();
    const direction = await getServerTextDirection();
    const config = getLanguageConfig(language);
    const attributes = getTextDirectionAttributes(language, direction);
    return {
        language,
        direction,
        config,
        attributes,
    };
}
export function getDirectionClassName(direction) {
    return `direction-${direction}`;
}
export function getDirectionDataAttributes(direction) {
    return {
        'data-direction': direction,
        'data-rtl': direction === 'rtl' ? 'true' : 'false',
    };
}
export function detectRTLSupport() {
    if (typeof window === 'undefined') {
        return true;
    }
    const testElement = document.createElement('div');
    testElement.style.marginInlineStart = '1px';
    return testElement.style.marginInlineStart === '1px';
}
export function createDirectionalStyles(ltrStyles, rtlStyles) {
    const ltrCss = Object.entries(ltrStyles)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join(' ');
    const rtlCss = Object.entries(rtlStyles)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join(' ');
    return `
    [dir="ltr"] & { ${ltrCss} }
    [dir="rtl"] & { ${rtlCss} }
  `;
}
