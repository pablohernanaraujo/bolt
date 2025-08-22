// /src/app/layout/page.tsx
// Layout system overview page
// Introduction to layout components with links to HStack and VStack
// RELEVANT FILES: hstack/page.tsx, vstack/page.tsx

'use client';

import { type FC, type ReactElement } from 'react';
import Link from 'next/link';

import { Icon, Square } from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import {
  Body2,
  Button,
  Container,
  ContentWrapper,
  Divider,
  H1,
  H3,
  HStack,
  VStack,
} from '@/ui';

import * as styles from '../page.css';

/**
 * Layout overview page component
 * Provides introduction to layout system and navigation to layout components
 */
const LayoutPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Layout System</H1>
      <Body2>
        Nuestro sistema de layout proporciona componentes flexibles para
        organizar contenido de manera consistente. Los componentes de layout
        facilitan la creación de interfaces bien estructuradas con espaciado y
        alineación predecibles.
      </Body2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: tokens.space[6],
          marginTop: tokens.space[6],
        }}
      >
        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>Container</H3>
          <Body2>
            Componente fundamental para estructura de página que proporciona
            padding vertical consistente mientras mantiene el ancho completo.
            Base de todos los layouts.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/container">
              <Button variant="primary" size="small">
                Ver Container
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>ContentWrapper</H3>
          <Body2>
            Componente para padding horizontal y variantes semánticas. Se
            combina con Container para crear layouts completos con control total
            del espaciado.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/content-wrapper">
              <Button variant="primary" size="small">
                Ver ContentWrapper
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>HStack</H3>
          <Body2>
            Componente de layout horizontal que organiza elementos en fila con
            espaciado y alineación configurables. Perfecto para barras de
            navegación y grupos de botones.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/hstack">
              <Button variant="primary" size="small">
                Ver HStack
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>VStack</H3>
          <Body2>
            Componente de layout vertical que organiza elementos en columna con
            espaciado y alineación configurables. Ideal para formularios y
            listas verticales.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/vstack">
              <Button variant="primary" size="small">
                Ver VStack
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>Flex</H3>
          <Body2>
            Componente de layout flexible que combina HStack y VStack con
            control completo de flexbox. Soporta dirección, alineación,
            espaciado y envoltura configurables para layouts versátiles.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/flex">
              <Button variant="primary" size="small">
                Ver Flex
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>Divider</H3>
          <Body2>
            Componente para separación visual de contenido que soporta
            orientaciones horizontal y vertical. Proporciona múltiples estilos y
            opciones de espaciado para estructurar interfaces.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/divider">
              <Button variant="primary" size="small">
                Ver Divider
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>AspectRatio</H3>
          <Body2>
            Componente contenedor que mantiene proporciones específicas de
            ancho-altura en diferentes tamaños de pantalla. Incluye presets
            comunes y soporte para proporciones personalizadas.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/aspect-ratio">
              <Button variant="primary" size="small">
                Ver AspectRatio
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>Center</H3>
          <Body2>
            Componente de layout que centra contenido horizontal y verticalmente
            usando flexbox. Proporciona una solución simple y confiable para el
            centrado de elementos.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/layout/center">
              <Button variant="primary" size="small">
                Ver Center
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[8] }}>
        <H3>Jerarquía de Componentes de Layout</H3>
        <Body2>
          Los componentes siguen una jerarquía lógica para crear layouts
          completos:
        </Body2>

        <div
          style={{
            marginTop: tokens.space[4],
            padding: tokens.space[4],
            backgroundColor: 'var(--colors-background-secondary)',
            borderRadius: tokens.radius.lg,
            border: '1px solid var(--colors-border-primary)',
          }}
        >
          <VStack space="3">
            <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
              1. Container (padding vertical + ancho completo)
            </Body2>
            <div
              style={{
                marginLeft: tokens.space[4],
                paddingLeft: tokens.space[4],
                borderLeft: `2px solid var(--colors-border-primary)`,
              }}
            >
              <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
                2. ContentWrapper (padding horizontal + variantes semánticas)
              </Body2>
              <div
                style={{
                  marginLeft: tokens.space[4],
                  paddingLeft: tokens.space[4],
                  borderLeft: `2px solid var(--colors-border-primary)`,
                  marginTop: tokens.space[2],
                }}
              >
                <Body2 style={{ fontWeight: tokens.fontWeight.semibold }}>
                  3. HStack/VStack/Flex (organización de elementos específicos)
                </Body2>
              </div>
            </div>
          </VStack>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[6] }}>
        <H3>Ejemplo de Uso Combinado</H3>
        <Body2>
          Ejemplo práctico combinando todos los componentes de layout:
        </Body2>

        <Container
          paddingY="6"
          style={{
            marginTop: tokens.space[4],
            backgroundColor: 'var(--colors-background-secondary)',
            borderRadius: tokens.radius.lg,
            border: '1px solid var(--colors-border-primary)',
          }}
        >
          <ContentWrapper variant="body">
            <VStack space="4">
              <HStack justify="between" align="center">
                <H3 style={{ margin: 0 }}>Layout Completo</H3>
                <HStack space="2">
                  <Button variant="ghost" size="small">
                    Editar
                  </Button>
                  <Button variant="primary" size="small">
                    Guardar
                  </Button>
                </HStack>
              </HStack>

              <Divider />

              <Body2>
                Container proporciona padding vertical (24px arriba/abajo).
                ContentWrapper agrega padding horizontal (24px
                izquierda/derecha). VStack organiza verticalmente con espaciado
                de 16px. HStack organiza horizontalmente los botones de acción.
                Divider separa visualmente las secciones de contenido.
              </Body2>

              <Divider />

              <HStack space="3">
                <Button variant="secondary" size="small">
                  Cancelar
                </Button>
                <Button variant="primary" size="small">
                  Confirmar
                </Button>
              </HStack>
            </VStack>
          </ContentWrapper>
        </Container>
      </div>
    </ContentWrapper>
  </Container>
);

export default LayoutPage;
