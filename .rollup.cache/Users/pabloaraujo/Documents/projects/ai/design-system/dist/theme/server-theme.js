import { cookies, headers } from 'next/headers';
export async function getServerTheme() {
    try {
        const cookieStore = await cookies();
        const themeCookie = cookieStore.get('theme')?.value;
        if (themeCookie === 'dark' || themeCookie === 'light') {
            return themeCookie;
        }
        const headersList = await headers();
        const colorSchemeHint = headersList.get('sec-ch-prefers-color-scheme');
        if (colorSchemeHint === 'dark') {
            return 'dark';
        }
        const userAgent = headersList.get('user-agent') || '';
        const acceptHeader = headersList.get('accept') || '';
        if (acceptHeader.includes('prefers-color-scheme: dark') ||
            userAgent.toLowerCase().includes('dark')) {
            return 'dark';
        }
        const timeOfDay = getTimeOfDay(headersList);
        if (timeOfDay === 'night') {
            return 'dark';
        }
        return 'light';
    }
    catch (error) {
        console.warn('Server theme detection failed, defaulting to light theme:', error);
        return 'light';
    }
}
export function getStaticTheme() {
    return 'light';
}
function getTimeOfDay(headersList) {
    try {
        const timezoneHint = headersList.get('x-timezone') ||
            headersList.get('cf-timezone') ||
            'UTC';
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            timeZone: timezoneHint,
            hour12: false,
        });
        const hour = Number.parseInt(timeString.split(':')[0], 10);
        return hour >= 18 || hour < 6 ? 'night' : 'day';
    }
    catch {
        return 'day';
    }
}
export function getThemeClassName(theme) {
    const { lightTheme, darkTheme } = require('@/tokens/themes');
    return theme === 'dark' ? darkTheme : lightTheme;
}
export function getThemeDataAttributes(theme) {
    return {
        'data-theme': theme,
    };
}
