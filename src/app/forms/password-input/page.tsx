// /src/app/forms/password-input/page.tsx
// PasswordInput component showcase page
// Displays password input variants, sizes, visibility states and integration
// RELEVANT FILES: ../../../ui/password-input, ../../../ui/form-field

'use client';

import { type FC, type ReactElement, useState } from 'react';

import {
  Body2,
  Button,
  H1,
  H2,
  PasswordInput,
  PasswordStrengthMeter,
  VStack,
} from '@/ui';
import { FormField } from '@/ui/form-field';

import * as styles from '../../page.css';

/**
 * PasswordInput page component
 * Password input component with visibility toggle functionality
 */
const PasswordInputPage: FC = (): ReactElement => {
  // State for controlled example
  const [isVisible, setIsVisible] = useState(false);

  // State for password strength examples
  const [strengthPassword, setStrengthPassword] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  return (
    <div className={styles.section}>
      <H1>PasswordInput</H1>
      <Body2>
        Componente de entrada de contraseña con funcionalidad de alternar
        visibilidad. Construido sobre React Aria Components con iconos de
        ojo/ojo cerrado para mostrar u ocultar el texto de la contraseña.
        Proporciona múltiples variantes, tamaños y soporte completo para
        accesibilidad.
      </Body2>

      <div className={styles.showcase}>
        <H2>Variants</H2>
        <VStack space="3">
          <PasswordInput
            variant="outline"
            placeholder="Outline password input"
            aria-label="Outline variant password input"
          />
          <PasswordInput
            variant="filled"
            placeholder="Filled password input"
            aria-label="Filled variant password input"
          />
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Sizes</H2>
        <VStack space="3">
          <PasswordInput
            variant="outline"
            size="small"
            placeholder="Small password input"
            aria-label="Small size password input"
          />
          <PasswordInput
            variant="outline"
            size="medium"
            placeholder="Medium password input"
            aria-label="Medium size password input"
          />
          <PasswordInput
            variant="outline"
            size="large"
            placeholder="Large password input"
            aria-label="Large size password input"
          />
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>States</H2>
        <VStack space="3">
          <PasswordInput
            variant="outline"
            placeholder="Normal state"
            aria-label="Normal state password input"
          />
          <PasswordInput
            variant="outline"
            placeholder="Disabled state"
            aria-label="Disabled state password input"
            disabled
          />
          <PasswordInput
            variant="outline"
            placeholder="Error state"
            aria-label="Error state password input"
            hasError
          />
          <PasswordInput
            variant="outline"
            placeholder="Disabled with error"
            aria-label="Disabled with error password input"
            disabled
            hasError
          />
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Visibility Control</H2>
        <VStack space="3">
          <PasswordInput
            variant="outline"
            placeholder="Default hidden password"
            aria-label="Default hidden password input"
          />
          <PasswordInput
            variant="outline"
            placeholder="Initially visible password"
            aria-label="Initially visible password input"
            defaultVisible={true}
          />
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Controlled Visibility</H2>
        <VStack space="3">
          <PasswordInput
            variant="outline"
            placeholder="Controlled visibility password"
            aria-label="Controlled visibility password input"
            isVisible={isVisible}
            onVisibilityChange={setIsVisible}
          />
          <Button variant="secondary" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Hide' : 'Show'} Password Externally
          </Button>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>With FormField</H2>
        <VStack space="3">
          <FormField label="Current Password">
            <PasswordInput
              variant="outline"
              placeholder="Enter your current password"
            />
          </FormField>
          <FormField
            label="New Password"
            hint="Password must be at least 8 characters long"
          >
            <PasswordInput
              variant="filled"
              placeholder="Enter your new password"
            />
          </FormField>
          <FormField label="Confirm Password" error="Passwords do not match">
            <PasswordInput
              variant="outline"
              placeholder="Confirm your new password"
              hasError
            />
          </FormField>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>With Password Strength Meter</H2>
        <VStack space="4">
          <VStack space="2">
            <PasswordInput
              variant="outline"
              placeholder="Type password to see strength"
              aria-label="Password with strength meter"
              value={strengthPassword}
              onChange={(e) => setStrengthPassword(e.target.value)}
            />
            <PasswordStrengthMeter
              value={strengthPassword}
              showLabel={true}
              showFeedback={true}
            />
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Signup Form Example</H2>
        <VStack space="4">
          <FormField
            label="Create Password"
            hint="Password must be at least 8 characters with mixed case, numbers, and symbols"
          >
            <VStack space="3">
              <PasswordInput
                variant="outline"
                placeholder="Enter a strong password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <PasswordStrengthMeter
                value={signupPassword}
                showLabel={true}
                showFeedback={true}
                size="medium"
              />
            </VStack>
          </FormField>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Strength Meter Sizes</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Small size</Body2>
            <PasswordStrengthMeter
              value="ExamplePass123!"
              showLabel={true}
              size="small"
            />
          </VStack>
          <VStack space="2">
            <Body2>Medium size (default)</Body2>
            <PasswordStrengthMeter
              value="ExamplePass123!"
              showLabel={true}
              size="medium"
            />
          </VStack>
          <VStack space="2">
            <Body2>Large size</Body2>
            <PasswordStrengthMeter
              value="ExamplePass123!"
              showLabel={true}
              size="large"
            />
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Combination Examples</H2>
        <VStack space="3">
          <PasswordInput
            variant="filled"
            size="large"
            placeholder="Large filled password input"
            aria-label="Large filled password input example"
          />
          <PasswordInput
            variant="outline"
            size="small"
            placeholder="Small outline password input"
            aria-label="Small outline password input example"
            defaultVisible={true}
          />
          <PasswordInput
            variant="filled"
            size="medium"
            placeholder="Medium filled password with error"
            aria-label="Medium filled password input with error example"
            hasError
          />
        </VStack>
      </div>
    </div>
  );
};

export default PasswordInputPage;
