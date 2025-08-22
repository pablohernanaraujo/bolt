// /src/app/controls/radio-group/page.tsx
// RadioGroup component showcase page
// Displays radio group variants, sizes, orientations and states
// RELEVANT FILES: ../../../ui/radio-group, ../../../ui/radio, ../../page.css

'use client';

import { type FC, type ReactElement, useState } from 'react';

import { Body2, H1, H2, Radio, RadioGroup } from '@/ui';

import * as styles from '../../page.css';

/**
 * RadioGroup page component
 * Showcases the accessible radio group component with all its features
 */
const RadioGroupPage: FC = (): ReactElement => {
  // State for controlled examples
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedTheme, setSelectedTheme] = useState('light');

  return (
    <div className={styles.section}>
      <H1>RadioGroup</H1>
      <Body2>
        Componente de grupo de radio accesible con múltiples variantes, tamaños
        y orientaciones para selecciones exclusivas.
      </Body2>

      <div className={styles.showcase}>
        <H2>Variants</H2>
        <div className={styles.componentGroup}>
          <RadioGroup variant="primary" aria-label="Primary Options">
            <Radio value="option1">Primera opción</Radio>
            <Radio value="option2">Segunda opción</Radio>
            <Radio value="option3">Tercera opción</Radio>
          </RadioGroup>

          <RadioGroup variant="secondary" aria-label="Secondary Options">
            <Radio value="option1">Primera opción</Radio>
            <Radio value="option2">Segunda opción</Radio>
            <Radio value="option3">Tercera opción</Radio>
          </RadioGroup>

          <RadioGroup variant="success" aria-label="Success Options">
            <Radio value="option1">Primera opción</Radio>
            <Radio value="option2">Segunda opción</Radio>
            <Radio value="option3">Tercera opción</Radio>
          </RadioGroup>

          <RadioGroup variant="danger" aria-label="Danger Options">
            <Radio value="option1">Primera opción</Radio>
            <Radio value="option2">Segunda opción</Radio>
            <Radio value="option3">Tercera opción</Radio>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.showcase}>
        <H2>Sizes</H2>
        <div className={styles.componentGroup}>
          <RadioGroup variant="primary" size="small" aria-label="Small Size">
            <Radio value="small1">Opción pequeña 1</Radio>
            <Radio value="small2">Opción pequeña 2</Radio>
          </RadioGroup>

          <RadioGroup variant="primary" size="medium" aria-label="Medium Size">
            <Radio value="medium1">Opción mediana 1</Radio>
            <Radio value="medium2">Opción mediana 2</Radio>
          </RadioGroup>

          <RadioGroup variant="primary" size="large" aria-label="Large Size">
            <Radio value="large1">Opción grande 1</Radio>
            <Radio value="large2">Opción grande 2</Radio>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.showcase}>
        <H2>Orientations</H2>
        <div className={styles.componentGroup}>
          <RadioGroup
            variant="primary"
            orientation="vertical"
            aria-label="Vertical Layout"
            defaultValue="vertical2"
          >
            <Radio value="vertical1">Opción vertical 1</Radio>
            <Radio value="vertical2">Opción vertical 2</Radio>
            <Radio value="vertical3">Opción vertical 3</Radio>
          </RadioGroup>

          <RadioGroup
            variant="primary"
            orientation="horizontal"
            aria-label="Horizontal Layout"
            defaultValue="horizontal1"
          >
            <Radio value="horizontal1">Horizontal 1</Radio>
            <Radio value="horizontal2">Horizontal 2</Radio>
            <Radio value="horizontal3">Horizontal 3</Radio>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.showcase}>
        <H2>States</H2>
        <div className={styles.componentGroup}>
          <RadioGroup
            variant="primary"
            aria-label="Normal State"
            defaultValue="normal2"
          >
            <Radio value="normal1">Opción normal 1</Radio>
            <Radio value="normal2">Opción normal 2</Radio>
            <Radio value="normal3">Opción normal 3</Radio>
          </RadioGroup>

          <RadioGroup
            variant="primary"
            aria-label="Disabled State"
            isDisabled
            defaultValue="disabled1"
          >
            <Radio value="disabled1">Opción deshabilitada 1</Radio>
            <Radio value="disabled2">Opción deshabilitada 2</Radio>
            <Radio value="disabled3">Opción deshabilitada 3</Radio>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.showcase}>
        <H2>Controlled Example</H2>
        <div className={styles.componentGroup}>
          <RadioGroup
            variant="primary"
            aria-label="Selecciona una opción"
            value={selectedOption}
            onChange={setSelectedOption}
          >
            <Radio value="option1">Primera opción</Radio>
            <Radio value="option2">Segunda opción</Radio>
            <Radio value="option3">Tercera opción</Radio>
          </RadioGroup>
          <Body2>Opción seleccionada: {selectedOption}</Body2>
        </div>
      </div>

      <div className={styles.showcase}>
        <H2>Form Example</H2>
        <div className={styles.componentGroup}>
          <RadioGroup
            variant="primary"
            aria-label="Tema de la aplicación"
            value={selectedTheme}
            onChange={setSelectedTheme}
          >
            <Radio value="light">Tema claro</Radio>
            <Radio value="dark">Tema oscuro</Radio>
            <Radio value="system">Usar tema del sistema</Radio>
          </RadioGroup>

          <RadioGroup
            variant="success"
            aria-label="Nivel de notificaciones"
            defaultValue="all"
          >
            <Radio value="all">Todas las notificaciones</Radio>
            <Radio value="important">Solo importantes</Radio>
            <Radio value="none">Sin notificaciones</Radio>
          </RadioGroup>

          <RadioGroup
            variant="secondary"
            orientation="horizontal"
            aria-label="Formato de fecha"
            defaultValue="dd/mm/yyyy"
          >
            <Radio value="dd/mm/yyyy">DD/MM/YYYY</Radio>
            <Radio value="mm/dd/yyyy">MM/DD/YYYY</Radio>
            <Radio value="yyyy-mm-dd">YYYY-MM-DD</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default RadioGroupPage;
