// /src/app/controls/page.tsx
// Controls library overview page
// Introduction to control components with links to all available controls
// RELEVANT FILES: checkbox/page.tsx, toggle/page.tsx

'use client';

import { type FC, type ReactElement } from 'react';
import Link from 'next/link';

import {
  CheckSquare,
  CircleDot,
  Icon,
  Package,
  Settings,
  ToggleLeft,
} from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import {
  Body2,
  Button,
  Checkbox,
  Container,
  ContentWrapper,
  H1,
  H3,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  Toggle,
  VStack,
} from '@/ui';

import * as styles from '../page.css';

/**
 * Controls overview page component
 * Provides introduction to control components and navigation to control pages
 */
const ControlsPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Controls</H1>
      <Body2>
        Nuestra biblioteca de controles proporciona elementos de entrada
        interactivos para formularios y configuraciones. Cada control está
        construido con React Aria para garantizar la máxima accesibilidad y
        sigue nuestros design tokens para mantener la coherencia visual.
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
            <Icon icon={Package} size="xl" />
          </div>
          <H3>Button</H3>
          <Body2>
            Componente de botón accesible con múltiples variantes, tamaños y
            estados. Fundamental para acciones e interacciones del usuario con
            soporte completo para iconos y estados de carga.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <HStack space="2" style={{ marginBottom: tokens.space[3] }}>
              <Button variant="primary" size="small">
                Primary
              </Button>
              <Button variant="secondary" size="small">
                Secondary
              </Button>
              <Button variant="ghost" size="small">
                Ghost
              </Button>
            </HStack>
            <Link href="/controls/button">
              <Button variant="primary" size="small">
                Ver Button
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Settings} size="xl" />
          </div>
          <H3>IconButton</H3>
          <Body2>
            Botón de icono accesible optimizado para uso con solo iconos.
            Perfecto para barras de herramientas y acciones secundarias con
            accesibilidad completa y etiquetas descriptivas.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <HStack space="2" style={{ marginBottom: tokens.space[3] }}>
              <IconButton
                icon={Package}
                variant="primary"
                size="small"
                aria-label="Package"
              />
              <IconButton
                icon={Settings}
                variant="secondary"
                size="small"
                aria-label="Settings"
              />
              <IconButton
                icon={CheckSquare}
                variant="ghost"
                size="small"
                aria-label="Check"
              />
            </HStack>
            <Link href="/controls/icon-button">
              <Button variant="primary" size="small">
                Ver IconButton
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={CheckSquare} size="xl" />
          </div>
          <H3>Checkbox</H3>
          <Body2>
            Control de casilla de verificación accesible para selecciones
            múltiples y opciones booleanas. Disponible en múltiples variantes,
            tamaños y posicionamiento de etiquetas.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <HStack space="2" style={{ marginBottom: tokens.space[3] }}>
              <Checkbox variant="primary" size="small">
                Primary
              </Checkbox>
              <Checkbox variant="success" size="small" defaultChecked>
                Success
              </Checkbox>
              <Checkbox variant="secondary" size="small">
                Secondary
              </Checkbox>
            </HStack>
            <Link href="/controls/checkbox">
              <Button variant="primary" size="small">
                Ver Checkbox
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={ToggleLeft} size="xl" />
          </div>
          <H3>Toggle</H3>
          <Body2>
            Componente de interruptor/switch accesible para configuraciones de
            encendido/apagado. Perfecto para preferencias y configuraciones con
            transiciones suaves y feedback visual claro.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <HStack space="2" style={{ marginBottom: tokens.space[3] }}>
              <Toggle variant="primary" size="small">
                Primary
              </Toggle>
              <Toggle variant="success" size="small" defaultSelected>
                Success
              </Toggle>
              <Toggle variant="secondary" size="small">
                Secondary
              </Toggle>
            </HStack>
            <Link href="/controls/toggle">
              <Button variant="primary" size="small">
                Ver Toggle
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={CircleDot} size="xl" />
          </div>
          <H3>RadioGroup</H3>
          <Body2>
            Componente de grupo de radio accesible para selecciones exclusivas.
            Permite elegir una sola opción de un conjunto, perfecto para
            configuraciones y formularios con opciones mutuamente excluyentes.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <div style={{ marginBottom: tokens.space[3] }}>
              <RadioGroup
                variant="primary"
                size="small"
                defaultValue="option1"
                aria-label="Opciones de ejemplo"
              >
                <Radio value="option1">Opción 1</Radio>
                <Radio value="option2">Opción 2</Radio>
                <Radio value="option3">Opción 3</Radio>
              </RadioGroup>
            </div>
            <Link href="/controls/radio-group">
              <Button variant="primary" size="small">
                Ver RadioGroup
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[8] }}>
        <H3>Características de los Controles</H3>
        <Body2>
          Todos nuestros controles están diseñados con los siguientes principios
          en mente:
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
                ⌨️ Navegación por Teclado
              </H3>
              <Body2>
                Soporte completo para navegación por teclado con Tab, Space,
                Enter y teclas de flecha para una experiencia de usuario fluida.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🎨 Design Tokens
              </H3>
              <Body2>
                Utilizan nuestros design tokens para colores, espaciado y
                tipografía, garantizando consistencia visual en todo el sistema.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                📱 Touch Friendly
              </H3>
              <Body2>
                Optimizados para interacciones táctiles en dispositivos móviles
                con áreas de toque suficientemente grandes y feedback visual.
              </Body2>
            </div>
          </VStack>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[6] }}>
        <H3>Casos de Uso</H3>
        <Body2>Los controles son perfectos para diferentes escenarios:</Body2>

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
            <H3 style={{ marginBottom: tokens.space[2] }}>✅ Formularios</H3>
            <Body2>
              Ideales para términos y condiciones, suscripciones y preferencias
              de usuario.
            </Body2>
          </div>

          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>
              ⚙️ Configuraciones
            </H3>
            <Body2>
              Perfectos para paneles de configuración, ajustes de privacidad y
              preferencias de la aplicación.
            </Body2>
          </div>

          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>🔔 Notificaciones</H3>
            <Body2>
              Excelentes para controlar tipos de notificaciones y alertas del
              sistema.
            </Body2>
          </div>
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default ControlsPage;
