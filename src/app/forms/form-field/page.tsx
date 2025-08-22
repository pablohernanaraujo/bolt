// /src/app/forms/form-field/page.tsx
// FormField component showcase page
// Displays form field combinations with labels, hints, and errors
// RELEVANT FILES: ../../../ui/form-field, ../../../ui/input

'use client';

import { type FC, type ReactElement } from 'react';

import { Body2, H1, H2, VStack } from '@/ui';
import { FormField } from '@/ui/form-field';

import * as styles from '../../page.css';

/**
 * FormField page component
 * Complete form field component combining label, input, hint, and error
 */
const FormFieldPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>FormField</H1>
    <Body2>
      Componente completo de campo de formulario que combina etiqueta, entrada,
      texto de ayuda y mensajes de error. Construido con React Aria Components
      para proporcionar relaciones ARIA apropiadas y accesibilidad completa.
    </Body2>

    <div className={styles.showcase}>
      <H2>Basic Usage</H2>
      <VStack space="4">
        <FormField
          label="Nombre"
          inputProps={{
            placeholder: 'Ingresa tu nombre',
            variant: 'outline',
          }}
        />
        <FormField
          label="Email"
          inputProps={{
            type: 'email',
            placeholder: 'ejemplo@email.com',
            variant: 'outline',
          }}
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>With Hints</H2>
      <VStack space="4">
        <FormField
          label="Contraseña"
          hint="La contraseña debe tener al menos 8 caracteres"
          inputProps={{
            type: 'password',
            placeholder: 'Contraseña',
            variant: 'outline',
          }}
        />
        <FormField
          label="Teléfono"
          hint="Incluye el código de país (ej: +1)"
          inputProps={{
            type: 'tel',
            placeholder: '+1 (555) 123-4567',
            variant: 'filled',
          }}
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Required Fields</H2>
      <VStack space="4">
        <FormField
          label="Email"
          required
          inputProps={{
            type: 'email',
            placeholder: 'ejemplo@email.com',
            variant: 'outline',
          }}
        />
        <FormField
          label="Nombre de usuario"
          required
          hint="Solo letras, números y guiones bajos"
          inputProps={{
            placeholder: 'nombre_usuario',
            variant: 'outline',
          }}
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Error States</H2>
      <VStack space="4">
        <FormField
          label="Email"
          error="Formato de email inválido"
          inputProps={{
            type: 'email',
            placeholder: 'ejemplo@email.com',
            variant: 'outline',
          }}
        />
        <FormField
          label="Contraseña"
          required
          error="La contraseña es demasiado corta"
          inputProps={{
            type: 'password',
            placeholder: 'Contraseña',
            variant: 'outline',
          }}
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Different Sizes</H2>
      <VStack space="4">
        <FormField
          label="Small Input"
          hint="Campo pequeño para datos breves"
          inputProps={{
            placeholder: 'Texto pequeño',
            variant: 'outline',
            size: 'small',
          }}
        />
        <FormField
          label="Medium Input"
          hint="Campo mediano, tamaño por defecto"
          inputProps={{
            placeholder: 'Texto mediano',
            variant: 'outline',
            size: 'medium',
          }}
        />
        <FormField
          label="Large Input"
          hint="Campo grande para datos importantes"
          inputProps={{
            placeholder: 'Texto grande',
            variant: 'outline',
            size: 'large',
          }}
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Different Variants</H2>
      <VStack space="4">
        <FormField
          label="Outline Variant"
          hint="Estilo outline con bordes definidos"
          inputProps={{
            placeholder: 'Outline input',
            variant: 'outline',
          }}
        />
        <FormField
          label="Filled Variant"
          hint="Estilo filled con fondo relleno"
          inputProps={{
            placeholder: 'Filled input',
            variant: 'filled',
          }}
        />
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Disabled State</H2>
      <VStack space="4">
        <FormField
          label="Campo Deshabilitado"
          hint="Este campo no está disponible"
          isDisabled
          inputProps={{
            placeholder: 'No disponible',
            variant: 'outline',
          }}
        />
        <FormField
          label="Email Deshabilitado"
          required
          isDisabled
          inputProps={{
            type: 'email',
            placeholder: 'email@deshabilitado.com',
            variant: 'filled',
          }}
        />
      </VStack>
    </div>
  </div>
);

export default FormFieldPage;
