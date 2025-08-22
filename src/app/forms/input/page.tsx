// /src/app/forms/input/page.tsx
// Input component showcase page
// Displays input variants, sizes, types and states
// RELEVANT FILES: ../../../ui/input, ../../../icons

'use client';

import { type FC, type ReactElement } from 'react';

import { Body2, H1, H2, VStack } from '@/ui';
import { InputField } from '@/ui/input';

import * as styles from '../../page.css';

/**
 * Input page component
 * Accessible input component with multiple variants, sizes and types
 */
const InputPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>InputField</H1>
    <Body2>
      Componente de entrada de texto accesible construido con React Aria
      Components. Proporciona múltiples variantes, tamaños y tipos de entrada
      con soporte completo para validación y estados de error.
    </Body2>

    <div className={styles.showcase}>
      <H2>Variants</H2>
      <VStack space="3">
        <InputField
          variant="outline"
          placeholder="Outline variant"
          aria-label="Outline variant example"
        />
        <InputField
          variant="filled"
          placeholder="Filled variant"
          aria-label="Filled variant example"
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Sizes</H2>
      <VStack space="3">
        <InputField
          variant="outline"
          size="small"
          placeholder="Small size"
          aria-label="Small size input"
        />
        <InputField
          variant="outline"
          size="medium"
          placeholder="Medium size"
          aria-label="Medium size input"
        />
        <InputField
          variant="outline"
          size="large"
          placeholder="Large size"
          aria-label="Large size input"
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Input Types</H2>
      <VStack space="3">
        <InputField
          variant="outline"
          type="text"
          placeholder="Text input"
          aria-label="Text input example"
        />
        <InputField
          variant="outline"
          type="email"
          placeholder="Email input"
          aria-label="Email input example"
        />
        <InputField
          variant="outline"
          type="password"
          placeholder="Password input"
          aria-label="Password input example"
        />
        <InputField
          variant="outline"
          type="number"
          placeholder="Number input"
          aria-label="Number input example"
        />
        <InputField
          variant="outline"
          type="tel"
          placeholder="Telephone input"
          aria-label="Telephone input example"
        />
        <InputField
          variant="outline"
          type="url"
          placeholder="URL input"
          aria-label="URL input example"
        />
        <InputField
          variant="outline"
          type="search"
          placeholder="Search input"
          aria-label="Search input example"
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>States</H2>
      <VStack space="3">
        <InputField
          variant="outline"
          placeholder="Normal state"
          aria-label="Normal state example"
        />
        <InputField
          variant="outline"
          placeholder="Disabled state"
          aria-label="Disabled state example"
          disabled
        />
        <InputField
          variant="outline"
          placeholder="Error state"
          aria-label="Error state example"
          hasError
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Combination Examples</H2>
      <VStack space="3">
        <InputField
          variant="filled"
          size="large"
          type="email"
          placeholder="Large filled email input"
          aria-label="Large filled email input example"
        />
        <InputField
          variant="outline"
          size="small"
          type="search"
          placeholder="Small outline search input"
          aria-label="Small outline search input example"
        />
        <InputField
          variant="filled"
          type="password"
          placeholder="Filled password input"
          aria-label="Filled password input with error example"
          hasError
        />
      </VStack>
    </div>
  </div>
);

export default InputPage;
