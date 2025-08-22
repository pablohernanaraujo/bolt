// /src/app/forms/pin-input/page.tsx
// PinInput component showcase page
// Displays PIN input lengths, types, variants, states and integration examples
// RELEVANT FILES: ../../../ui/pin-input, ../../../ui/form-field

'use client';

import { type FC, type ReactElement, useState } from 'react';

import {
  Body2,
  H1,
  H2,
  PinInput,
  PinInputField,
  PinInputGroup,
  PinInputSeparator,
  VStack,
} from '@/ui';
import { FormField } from '@/ui/form-field';

import * as styles from '../../page.css';

/**
 * PinInput page component
 * PIN input component for OTP, verification codes, and PIN entry
 */
const PinInputPage: FC = (): ReactElement => {
  // State for interactive examples
  const [otpCode, setOtpCode] = useState('');
  const [maskedPin, setMaskedPin] = useState('');
  const [formPin, setFormPin] = useState('');

  const handlePinComplete = (value: string): void => {
    // Handle PIN completion - could send to verification endpoint
    void value;
  };

  return (
    <div className={styles.section}>
      <H1>PinInput</H1>
      <Body2>
        Componente de entrada PIN para códigos de verificación, OTP y códigos de
        seguridad. Proporciona navegación automática entre campos, manejo de
        pegado inteligente y soporte completo de accesibilidad con validación de
        tipos numéricos y alfanuméricos.
      </Body2>

      <div className={styles.showcase}>
        <H2>Basic PIN Input</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>4-digit PIN (default)</Body2>
            <PinInput
              length={4}
              onComplete={handlePinComplete}
              aria-label="4-digit PIN input"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>6-digit verification code</Body2>
            <PinInput
              length={6}
              onComplete={handlePinComplete}
              aria-label="6-digit verification code"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
                <PinInputField index={4} />
                <PinInputField index={5} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>With Separators</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Grouped with dashes</Body2>
            <PinInput length={6} aria-label="PIN with separators">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
              </PinInputGroup>
              <PinInputSeparator>-</PinInputSeparator>
              <PinInputGroup>
                <PinInputField index={3} />
                <PinInputField index={4} />
                <PinInputField index={5} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Phone number style</Body2>
            <PinInput length={8} type="numeric" aria-label="Phone number style">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
              </PinInputGroup>
              <PinInputSeparator>•</PinInputSeparator>
              <PinInputGroup>
                <PinInputField index={3} />
                <PinInputField index={4} />
                <PinInputField index={5} />
              </PinInputGroup>
              <PinInputSeparator>•</PinInputSeparator>
              <PinInputGroup>
                <PinInputField index={6} />
                <PinInputField index={7} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Input Types</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Numeric only (0-9)</Body2>
            <PinInput length={4} type="numeric" aria-label="Numeric PIN input">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Alphanumeric (A-Z, 0-9)</Body2>
            <PinInput
              length={4}
              type="alphanumeric"
              aria-label="Alphanumeric PIN input"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Variants</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Outline variant (default)</Body2>
            <PinInput
              length={4}
              variant="outline"
              aria-label="Outline variant PIN"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Filled variant</Body2>
            <PinInput
              length={4}
              variant="filled"
              aria-label="Filled variant PIN"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Sizes</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Small size</Body2>
            <PinInput length={4} size="small" aria-label="Small PIN input">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Medium size (default)</Body2>
            <PinInput length={4} size="medium" aria-label="Medium PIN input">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Large size</Body2>
            <PinInput length={4} size="large" aria-label="Large PIN input">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>States</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Normal state</Body2>
            <PinInput length={4} aria-label="Normal state PIN">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Disabled state</Body2>
            <PinInput
              length={4}
              disabled
              defaultValue="1234"
              aria-label="Disabled state PIN"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Error state</Body2>
            <PinInput length={4} hasError aria-label="Error state PIN">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Masked PIN (Security)</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Hidden values with default mask (•)</Body2>
            <PinInput
              length={4}
              masked
              value={maskedPin}
              onChange={setMaskedPin}
              onComplete={handlePinComplete}
              aria-label="Masked PIN input"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Custom mask character (*)</Body2>
            <PinInput
              length={4}
              masked
              maskChar="*"
              aria-label="Custom masked PIN input"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Auto-focus</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Automatically focus first field</Body2>
            <PinInput length={4} autoFocus aria-label="Auto-focus PIN input">
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>With FormField</H2>
        <VStack space="4">
          <FormField
            label="Verification Code"
            hint="Enter the 6-digit code sent to your phone"
          >
            <PinInput
              length={6}
              value={otpCode}
              onChange={setOtpCode}
              onComplete={(value) => {
                // Handle OTP verification
                void value;
              }}
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
                <PinInputField index={4} />
                <PinInputField index={5} />
              </PinInputGroup>
            </PinInput>
          </FormField>
          <FormField label="Security PIN" error="PIN must be 4 digits">
            <PinInput
              length={4}
              hasError
              value={formPin}
              onChange={setFormPin}
              masked
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </FormField>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Real-world Examples</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Two-factor authentication</Body2>
            <PinInput
              length={6}
              type="numeric"
              autoFocus
              onComplete={(code) => {
                // Handle 2FA verification
                void code;
              }}
              aria-label="Two-factor authentication code"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
                <PinInputField index={4} />
                <PinInputField index={5} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Credit card security code</Body2>
            <PinInput
              length={3}
              type="numeric"
              masked
              aria-label="Credit card security code"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>

      <div className={styles.showcase}>
        <H2>Combination Examples</H2>
        <VStack space="4">
          <VStack space="2">
            <Body2>Large filled alphanumeric with separators</Body2>
            <PinInput
              length={6}
              type="alphanumeric"
              variant="filled"
              size="large"
              aria-label="Large filled alphanumeric PIN"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
              </PinInputGroup>
              <PinInputSeparator>-</PinInputSeparator>
              <PinInputGroup>
                <PinInputField index={3} />
                <PinInputField index={4} />
                <PinInputField index={5} />
              </PinInputGroup>
            </PinInput>
          </VStack>
          <VStack space="2">
            <Body2>Small outline masked numeric</Body2>
            <PinInput
              length={4}
              type="numeric"
              variant="outline"
              size="small"
              masked
              aria-label="Small masked numeric PIN"
            >
              <PinInputGroup>
                <PinInputField index={0} />
                <PinInputField index={1} />
                <PinInputField index={2} />
                <PinInputField index={3} />
              </PinInputGroup>
            </PinInput>
          </VStack>
        </VStack>
      </div>
    </div>
  );
};

export default PinInputPage;
