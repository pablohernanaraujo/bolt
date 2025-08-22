import { Settings } from 'lucide-react';
import { Icon } from '@/icons';
import { Button } from '@/ui/button';
import { buildThemeToggleClassName } from './helpers';
export const ThemeToggleServer = ({ currentTheme, showLabel = true, size = 'small', variant = 'secondary', className, ...props }) => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    const buttonText = showLabel
        ? currentTheme === 'light'
            ? 'Tema Oscuro'
            : 'Tema Claro'
        : '';
    const themeToggleClassName = buildThemeToggleClassName(className);
    return (<form method="POST" action="/api/theme" style={{ display: 'inline' }}>
      <input type="hidden" name="theme" value={nextTheme}/>
      <Button type="submit" variant={variant} size={size} className={themeToggleClassName} aria-label={`Switch to ${nextTheme} theme`} {...props}>
        <Icon icon={Settings} size="sm"/>
        {buttonText}
      </Button>
    </form>);
};
