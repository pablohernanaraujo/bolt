// /src/app/api/theme/route.ts
// Theme switching API endpoint for progressive enhancement
// Handles form submissions for CSS-only theme toggle functionality
// RELEVANT FILES: theme-toggle-server.tsx, server-theme.ts

import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { type ThemeVariant } from '@/tokens/themes';

/**
 * Handle theme switching via form submission
 * Provides CSS-only theme toggle functionality that works without JavaScript
 *
 * POST /api/theme
 * Body: FormData with 'theme' field set to 'light' | 'dark'
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleThemeChange(request);
}

/**
 * Process theme change request
 * Separated to reduce complexity in main POST handler
 */
async function handleThemeChange(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const theme = formData.get('theme') as string;

    if (theme !== 'light' && theme !== 'dark') {
      return NextResponse.json(
        { error: 'Invalid theme value' },
        { status: 400 },
      );
    }

    const referer = request.headers.get('referer') || '/';
    const response = NextResponse.redirect(new URL(referer, request.url));

    // Set theme cookie with proper attributes
    const cookieStore = await cookies();
    cookieStore.set('theme', theme as ThemeVariant, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false, // Allow client-side access for JS enhancement
    });

    return response;
  } catch {
    // Fallback redirect on error - removed console.error for linting
    const referer = request.headers.get('referer') || '/';
    return NextResponse.redirect(new URL(referer, request.url));
  }
}
