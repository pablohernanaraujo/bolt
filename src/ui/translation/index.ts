// /src/ui/translation/index.ts
// Translation components for server-side internationalization
// Provides React components that work with SSR and server components
// RELEVANT FILES: text.tsx, formatted-text.tsx, types.ts, server-hooks.ts

export { FormattedCurrency } from './formatted-currency';
export { FormattedDate } from './formatted-date';
export { FormattedNumber } from './formatted-number';
export { FormattedRelativeTime } from './formatted-relative-time';
export { FormattedText } from './formatted-text';
export { Text } from './text';
export { TranslationProvider } from './translation-provider';

export type {
  FormattedCurrencyProps,
  FormattedDateProps,
  FormattedNumberProps,
  FormattedRelativeTimeProps,
  FormattedTextProps,
  TextProps,
  TranslationProviderProps,
} from './types';
