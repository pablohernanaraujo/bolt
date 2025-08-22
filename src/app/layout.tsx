import '../tokens/css-variables.css.ts';
import '../tokens/reset.css.ts';
import './globals.css';

import type { Metadata } from 'next';
import { type ReactElement, type ReactNode } from 'react';

import { getServerLocaleInfo } from '@/i18n/server-locale';
import { getTextDirectionAttributes } from '@/theme/rtl-detection';
import {
  getServerTheme,
  getThemeClassName,
  getThemeDataAttributes,
} from '@/theme/server-theme';

import { roboto } from './fonts';
import { LayoutServer } from './layout-server';

export const metadata: Metadata = {
  title: 'Design System',
  description:
    'A comprehensive design system built with Next.js, React Aria, and vanilla-extract',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): Promise<ReactElement> {
  // Server-side theme and locale detection - no client JavaScript needed
  const [serverTheme, localeInfo] = await Promise.all([
    getServerTheme(),
    getServerLocaleInfo(),
  ]);

  // Get theme class name for vanilla-extract theme contract
  const themeClassName = getThemeClassName(serverTheme);
  const themeDataAttributes = getThemeDataAttributes(serverTheme);
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
      <body className={`${roboto.className} ${themeClassName}`}>
        <LayoutServer serverTheme={serverTheme} localeInfo={localeInfo}>
          {children}
        </LayoutServer>
      </body>
    </html>
  );
}
