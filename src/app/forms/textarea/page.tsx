// /src/app/forms/textarea/page.tsx
// TextArea component showcase page
// Displays textarea variants, sizes, resize options and states
// RELEVANT FILES: ../../../ui/textarea, ../../../ui/typography

'use client';

import { type FC, type ReactElement } from 'react';

import { Body2, H1, H2, VStack } from '@/ui';
import { TextArea } from '@/ui/textarea';

import * as styles from '../../page.css';

/**
 * TextArea page component
 * Accessible textarea component with multiple variants, sizes and resize options
 */
const TextAreaPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>TextArea</H1>
    <Body2>
      Componente de área de texto accesible construido con React Aria
      Components. Proporciona múltiples variantes, tamaños y opciones de
      redimensionamiento con soporte completo para validación y estados de
      error.
    </Body2>

    <div className={styles.showcase}>
      <H2>Variants</H2>
      <VStack space="3">
        <TextArea
          variant="outline"
          placeholder="Outline variant - Enter your text here..."
          aria-label="Outline variant example"
        />
        <TextArea
          variant="filled"
          placeholder="Filled variant - Enter your text here..."
          aria-label="Filled variant example"
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Sizes</H2>
      <VStack space="3">
        <TextArea
          variant="outline"
          size="small"
          placeholder="Small size textarea"
          aria-label="Small size textarea"
        />
        <TextArea
          variant="outline"
          size="medium"
          placeholder="Medium size textarea"
          aria-label="Medium size textarea"
        />
        <TextArea
          variant="outline"
          size="large"
          placeholder="Large size textarea"
          aria-label="Large size textarea"
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Resize Options</H2>
      <VStack space="3">
        <TextArea
          variant="outline"
          resize="none"
          placeholder="No resize - fixed size"
          aria-label="Non-resizable textarea"
        />
        <TextArea
          variant="outline"
          resize="vertical"
          placeholder="Vertical resize only"
          aria-label="Vertical resizable textarea"
        />
        <TextArea
          variant="outline"
          resize="horizontal"
          placeholder="Horizontal resize only"
          aria-label="Horizontal resizable textarea"
        />
        <TextArea
          variant="outline"
          resize="both"
          placeholder="Both directions resize"
          aria-label="Both directions resizable textarea"
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Rows Configuration</H2>
      <VStack space="3">
        <TextArea
          variant="outline"
          rows={2}
          placeholder="2 rows textarea"
          aria-label="2 rows textarea example"
        />
        <TextArea
          variant="outline"
          rows={4}
          placeholder="4 rows textarea"
          aria-label="4 rows textarea example"
        />
        <TextArea
          variant="outline"
          rows={6}
          placeholder="6 rows textarea"
          aria-label="6 rows textarea example"
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>States</H2>
      <VStack space="3">
        <TextArea
          variant="outline"
          placeholder="Normal state"
          aria-label="Normal state example"
        />
        <TextArea
          variant="outline"
          placeholder="Disabled state"
          aria-label="Disabled state example"
          disabled
        />
        <TextArea
          variant="outline"
          placeholder="Error state"
          aria-label="Error state example"
          hasError
        />
        <TextArea
          variant="outline"
          placeholder="Disabled with error"
          aria-label="Disabled with error example"
          disabled
          hasError
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Filled Variant States</H2>
      <VStack space="3">
        <TextArea
          variant="filled"
          placeholder="Normal filled state"
          aria-label="Normal filled state example"
        />
        <TextArea
          variant="filled"
          placeholder="Disabled filled state"
          aria-label="Disabled filled state example"
          disabled
        />
        <TextArea
          variant="filled"
          placeholder="Error filled state"
          aria-label="Error filled state example"
          hasError
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Combination Examples</H2>
      <VStack space="3">
        <TextArea
          variant="filled"
          size="large"
          resize="vertical"
          rows={3}
          placeholder="Large filled textarea with vertical resize"
          aria-label="Large filled textarea example"
        />
        <TextArea
          variant="outline"
          size="small"
          resize="none"
          rows={2}
          placeholder="Small outline textarea, non-resizable"
          aria-label="Small outline textarea example"
        />
        <TextArea
          variant="filled"
          size="medium"
          resize="both"
          placeholder="Medium filled textarea with error state"
          aria-label="Medium filled textarea with error example"
          hasError
        />
      </VStack>
    </div>
  </div>
);

export default TextAreaPage;
