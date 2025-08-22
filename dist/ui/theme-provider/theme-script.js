import { jsx } from 'react/jsx-runtime';

const ThemeScript = ({ storageKey = 'theme-preference', defaultTheme = 'light', respectSystemTheme = true, }) => {
    const script = `
    (function() {
      try {
        // Try to get theme from localStorage first
        var stored = localStorage.getItem('${storageKey}');
        if (stored === 'light' || stored === 'dark') {
          document.documentElement.setAttribute('data-theme', stored);
          return;
        }
        
        // Fall back to system preference if enabled
        ${respectSystemTheme
        ? `
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        }
        `
        : `
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        `}
      } catch (e) {
        // Fallback for any errors (localStorage disabled, etc.)
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
      }
    })();
  `;
    return (jsx("script", { dangerouslySetInnerHTML: {
            __html: script.replace(/\s+/g, ' ').trim(),
        } }));
};
function generateThemeScript(props = {}) {
    const { storageKey = 'theme-preference', defaultTheme = 'light', respectSystemTheme = true, } = props;
    const script = `
    (function() {
      try {
        var stored = localStorage.getItem('${storageKey}');
        if (stored === 'light' || stored === 'dark') {
          document.documentElement.setAttribute('data-theme', stored);
          return;
        }
        ${respectSystemTheme
        ? `
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        }
        `
        : `
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        `}
      } catch (e) {
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
      }
    })();
  `;
    return script.replace(/\s+/g, ' ').trim();
}
function getThemeScriptForAppRouter(props = {}) {
    return jsx(ThemeScript, { ...props });
}

export { ThemeScript, generateThemeScript, getThemeScriptForAppRouter };
//# sourceMappingURL=theme-script.js.map
