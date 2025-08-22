import '../tokens/css-variables.css.ts';
import '../tokens/reset.css.ts';
import './globals.css';

import type { Metadata } from 'next';
import { type ReactElement, type ReactNode } from 'react';

import { getStaticLocaleInfo } from '@/i18n/server-locale';
import { getTextDirectionAttributes } from '@/theme/rtl-detection';
import { getStaticTheme, getThemeClassName } from '@/theme/server-theme';
import { ThemeScript } from '@/ui/theme-provider';

import { roboto } from './fonts';
import { LayoutServer } from './layout-server';

export const metadata: Metadata = {
  title: 'Design System',
  description:
    'A comprehensive design system built with Next.js, React Aria, and vanilla-extract',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  // Static theme and locale (for documentation/demo site) - allows static generation
  // Theme and locale will be corrected on client-side via theme toggle and locale detection
  const serverTheme = getStaticTheme();
  const localeInfo = getStaticLocaleInfo();

  // Get theme class name for vanilla-extract theme contract
  const themeClassName = getThemeClassName(serverTheme);
  const textDirectionAttributes = getTextDirectionAttributes(
    localeInfo.locale,
    localeInfo.direction,
  );

  return (
    <html
      className={roboto.variable}
      data-theme={serverTheme}
      {...textDirectionAttributes}
    >
      <head>
        <ThemeScript
          defaultTheme={serverTheme}
          respectSystemTheme={true}
          storageKey="theme-preference"
        />
      </head>
      <body className={`${roboto.className} ${themeClassName}`}>
        <LayoutServer serverTheme={serverTheme} localeInfo={localeInfo}>
          {children}
        </LayoutServer>
      </body>
    </html>
  );
}
