// /src/ui/password-input/helpers.ts
// Utility functions and helpers for the PasswordInput component
// Handles visibility toggle logic and keyboard interactions
// RELEVANT FILES: password-input.tsx, types.ts

/**
 * Handles keyboard navigation for the toggle button
 * Ensures proper tab order and interaction
 *
 * @param event - The keyboard event
 * @param onToggle - Function to call when toggling
 */
export const handleToggleKeyDown = (
  event: React.KeyboardEvent,
  onToggle: () => void,
): void => {
  // Activate on Enter or Space
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onToggle();
  }
};

/**
 * Gets the appropriate ARIA label for the toggle button
 * Based on current visibility state
 *
 * @param isVisible - Current password visibility state
 * @param customLabel - Custom label provided by user
 * @returns Appropriate ARIA label text
 */
export const getToggleAriaLabel = (
  isVisible: boolean,
  customLabel?: string,
): string => {
  if (customLabel) return customLabel;
  return isVisible ? 'Hide password' : 'Show password';
};
