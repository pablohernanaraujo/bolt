// /src/app/forms/page.tsx
// Forms library overview page
// Introduction to form components with links to all available form elements
// RELEVANT FILES: input/page.tsx, form-field/page.tsx

'use client';

import Link from 'next/link';
import { type FC, type ReactElement } from 'react';

import { FileText, Icon, Layers, Type, Upload } from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import { Body2, Button, Container, ContentWrapper, H1, H3, VStack } from '@/ui';
import { FileUpload } from '@/ui/file-upload';
import { FormField } from '@/ui/form-field';
import { Input, InputField } from '@/ui/input';
import { InputGroup, InputLeftAddon, InputRightAddon } from '@/ui/input-group';

import * as styles from '../page.css';

/**
 * Forms overview page component
 * Provides introduction to form components and navigation to form pages
 */
const FormsPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Forms</H1>
      <Body2>
        Nuestra biblioteca de formularios proporciona componentes accesibles
        para la entrada de datos del usuario. Cada elemento está construido con
        React Aria para garantizar la máxima accesibilidad y sigue nuestros
        design tokens para mantener la coherencia visual.
      </Body2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: tokens.space[6],
          marginTop: tokens.space[6],
        }}
      >
        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Type} size="xl" />
          </div>
          <H3>Input</H3>
          <Body2>
            Componente de entrada de texto accesible con múltiples variantes,
            tamaños y tipos. Fundamental para la captura de datos del usuario
            con soporte completo para validación y estados.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <VStack space="3" style={{ marginBottom: tokens.space[3] }}>
              <InputField
                variant="outline"
                placeholder="Outline variant"
                aria-label="Example outline input"
              />
              <InputField
                variant="filled"
                placeholder="Filled variant"
                aria-label="Example filled input"
              />
            </VStack>
            <Link href="/forms/input">
              <Button variant="primary" size="small">
                Ver Input
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={FileText} size="xl" />
          </div>
          <H3>FormField</H3>
          <Body2>
            Componente completo de campo de formulario que combina etiqueta,
            entrada, texto de ayuda y mensajes de error. Perfecto para
            formularios complejos con validación y feedback visual.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <div style={{ marginBottom: tokens.space[3] }}>
              <FormField
                label="Email"
                hint="Ingresa tu dirección de email"
                inputProps={{
                  placeholder: 'ejemplo@email.com',
                  type: 'email',
                  size: 'small',
                }}
              />
            </div>
            <Link href="/forms/form-field">
              <Button variant="primary" size="small">
                Ver FormField
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Layers} size="xl" />
          </div>
          <H3>InputGroup</H3>
          <Body2>
            Componente para agrupar inputs con addons y elementos. Permite
            agregar prefijos, sufijos, iconos y botones de acción como clear
            button. Perfecto para URLs, monedas y campos con contexto adicional.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <VStack space="3" style={{ marginBottom: tokens.space[3] }}>
              <InputGroup size="small">
                <InputLeftAddon>https://</InputLeftAddon>
                <Input placeholder="mywebsite" />
                <InputRightAddon>.com</InputRightAddon>
              </InputGroup>
              <InputGroup size="small">
                <InputLeftAddon>$</InputLeftAddon>
                <Input placeholder="0.00" type="number" />
                <InputRightAddon>USD</InputRightAddon>
              </InputGroup>
            </VStack>
            <Link href="/forms/input-group">
              <Button variant="primary" size="small">
                Ver InputGroup
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Upload} size="xl" />
          </div>
          <H3>FileUpload</H3>
          <Body2>
            Componente de carga de archivos con soporte para arrastrar y soltar.
            Incluye validación de tipos y tamaños, múltiples archivos, vista
            previa de imágenes y manejo completo de errores.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <div style={{ marginBottom: tokens.space[3] }}>
              <FileUpload.Root size="small">
                <div style={{ textAlign: 'center' }}>
                  <Icon
                    icon={Upload}
                    size="md"
                    style={{
                      marginBottom: '4px',
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      marginBottom: '8px',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    Arrastra archivos aquí
                  </div>
                  <FileUpload.Trigger size="small">
                    <Icon icon={Upload} size="sm" />
                    Seleccionar
                  </FileUpload.Trigger>
                </div>
                <FileUpload.List files={[]} />
              </FileUpload.Root>
            </div>
            <Link href="/forms/file-upload">
              <Button variant="primary" size="small">
                Ver FileUpload
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[8] }}>
        <H3>Características de los Formularios</H3>
        <Body2>
          Todos nuestros componentes de formulario están diseñados con los
          siguientes principios en mente:
        </Body2>

        <div
          style={{
            marginTop: tokens.space[4],
            padding: tokens.space[6],
            backgroundColor: 'var(--colors-background-secondary)',
            borderRadius: tokens.radius.lg,
            border: '1px solid var(--colors-border-primary)',
          }}
        >
          <VStack space="4">
            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🎯 Accesibilidad Completa
              </H3>
              <Body2>
                Construidos con React Aria Components para navegación por
                teclado, lectores de pantalla y cumplimiento de WCAG 2.1.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🏷️ Etiquetado Semántico
              </H3>
              <Body2>
                Relaciones apropiadas entre etiquetas, campos y mensajes de
                error usando ARIA para una experiencia inclusiva.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                ✅ Validación Visual
              </H3>
              <Body2>
                Estados visuales claros para validación, errores y feedback del
                usuario con colores accesibles y iconografía consistente.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                📱 Touch Optimizado
              </H3>
              <Body2>
                Optimizados para interacciones táctiles en dispositivos móviles
                con áreas de toque apropiadas y tipos de teclado inteligentes.
              </Body2>
            </div>
          </VStack>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[6] }}>
        <H3>Casos de Uso</H3>
        <Body2>
          Los componentes de formulario son perfectos para diferentes
          escenarios:
        </Body2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: tokens.space[4],
            marginTop: tokens.space[4],
          }}
        >
          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>📝 Registro</H3>
            <Body2>
              Ideales para formularios de registro de usuario, información de
              contacto y onboarding.
            </Body2>
          </div>

          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>🔐 Autenticación</H3>
            <Body2>
              Perfectos para formularios de login, cambio de contraseña y
              verificación de identidad.
            </Body2>
          </div>

          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>🔍 Búsqueda</H3>
            <Body2>
              Excelentes para campos de búsqueda, filtros y entrada de criterios
              de consulta.
            </Body2>
          </div>
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default FormsPage;
