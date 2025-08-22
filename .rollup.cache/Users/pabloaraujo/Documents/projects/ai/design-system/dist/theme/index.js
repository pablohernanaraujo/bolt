export function getCurrentTheme(element = document.documentElement) {
    const dataTheme = element.getAttribute('data-theme');
    if (dataTheme) {
        return dataTheme;
    }
    if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    return 'light';
}
export function setTheme(theme, element = document.documentElement) {
    element.setAttribute('data-theme', theme);
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            window.localStorage.setItem('theme-preference', theme);
        }
        catch (e) {
            console.warn('Failed to save theme preference:', e);
        }
    }
}
export function toggleTheme(element = document.documentElement) {
    const current = getCurrentTheme(element);
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next, element);
    return next;
}
export function initTheme(element = document.documentElement) {
    if (typeof window === 'undefined') {
        return 'light';
    }
    try {
        const stored = window.localStorage.getItem('theme-preference');
        if (stored === 'light' || stored === 'dark') {
            setTheme(stored, element);
            return stored;
        }
    }
    catch {
    }
    const systemTheme = getCurrentTheme(element);
    setTheme(systemTheme, element);
    return systemTheme;
}
export function watchSystemTheme(callback) {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return () => { };
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
        callback(e.matches ? 'dark' : 'light');
    };
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
}
export function getThemeScript() {
    return `(function(){try{var t=localStorage.getItem('theme-preference');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})();`;
}
export function setBrand(brand, element = document.documentElement) {
    element.setAttribute('data-brand', brand);
}
export function getBrand(element = document.documentElement) {
    return element.getAttribute('data-brand');
}
