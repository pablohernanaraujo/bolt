// /src/app/layout/container/page.tsx
// Container component showcase page
// Demonstrates page layout container with vertical padding control
// RELEVANT FILES: ../../../ui/layout/container

'use client';

import { type FC, type ReactElement } from 'react';

import { tokens } from '@/tokens/tokens.css';
import { Body2, Body3, Container, H1, H2, H3, Overline, VStack } from '@/ui';

import * as styles from '../../page.css';

/**
 * Container page component
 * Layout container for consistent page padding and full-width structure
 */
const ContainerPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Container</H1>
    <Body2>
      Componente de layout fundamental para estructura de página que proporciona
      padding vertical consistente mientras mantiene el ancho completo. Es la
      base de todos los layouts de página en el sistema de diseño.
    </Body2>

    <div className={styles.showcase}>
      <H2>Características Principales</H2>
      <VStack space="4">
        <div>
          <H3>Ancho Completo (100%)</H3>
          <Body2>
            El Container siempre mantiene el ancho completo disponible, sin
            restricciones horizontales.
          </Body2>
        </div>
        <div>
          <H3>Padding Vertical Configurable</H3>
          <Body2>
            Control preciso del espaciado vertical usando design tokens, desde 0
            hasta 20 unidades de la escala.
          </Body2>
        </div>
        <div>
          <H3>Componente Polimórfico</H3>
          <Body2>
            Puede renderizar como cualquier elemento HTML manteniendo su
            funcionalidad de layout.
          </Body2>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Valores de Padding</H2>
      <Body2>
        Ejemplos de diferentes valores de paddingY usando la escala de design
        tokens:
      </Body2>

      <VStack space="4" style={{ marginTop: tokens.space[4] }}>
        <div className={styles.componentItem}>
          <Overline>paddingY="0" (Sin padding)</Overline>
          <Container
            paddingY="0"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px dashed var(--colors-border-primary)',
            }}
          >
            <Body3>Contenido sin padding vertical</Body3>
          </Container>
        </div>

        <div className={styles.componentItem}>
          <Overline>paddingY="4" (16px arriba y abajo)</Overline>
          <Container
            paddingY="4"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px dashed var(--colors-border-primary)',
            }}
          >
            <Body3>Contenido con padding vertical pequeño</Body3>
          </Container>
        </div>

        <div className={styles.componentItem}>
          <Overline>paddingY="6" (24px arriba y abajo) - Default</Overline>
          <Container
            paddingY="6"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px dashed var(--colors-border-primary)',
            }}
          >
            <Body3>Contenido con padding vertical por defecto</Body3>
          </Container>
        </div>

        <div className={styles.componentItem}>
          <Overline>paddingY="8" (32px arriba y abajo)</Overline>
          <Container
            paddingY="8"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px dashed var(--colors-border-primary)',
            }}
          >
            <Body3>Contenido con padding vertical mediano</Body3>
          </Container>
        </div>

        <div className={styles.componentItem}>
          <Overline>paddingY="12" (48px arriba y abajo)</Overline>
          <Container
            paddingY="12"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px dashed var(--colors-border-primary)',
            }}
          >
            <Body3>Contenido con padding vertical grande</Body3>
          </Container>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Elementos HTML Semánticos</H2>
      <Body2>
        El Container puede renderizar como diferentes elementos HTML para
        mejorar la semántica y accesibilidad:
      </Body2>

      <VStack space="4" style={{ marginTop: tokens.space[4] }}>
        <div className={styles.componentItem}>
          <Overline>Container as="main" (elemento principal)</Overline>
          <Container
            as="main"
            paddingY="6"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px solid var(--colors-border-primary)',
            }}
          >
            <Body3>
              &lt;main&gt; Contenido principal de la página &lt;/main&gt;
            </Body3>
          </Container>
        </div>

        <div className={styles.componentItem}>
          <Overline>Container as="section" (sección de contenido)</Overline>
          <Container
            as="section"
            paddingY="6"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px solid var(--colors-border-primary)',
            }}
          >
            <Body3>
              &lt;section&gt; Sección de contenido específico &lt;/section&gt;
            </Body3>
          </Container>
        </div>

        <div className={styles.componentItem}>
          <Overline>Container as="article" (artículo independiente)</Overline>
          <Container
            as="article"
            paddingY="6"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '2px solid var(--colors-border-primary)',
            }}
          >
            <Body3>
              &lt;article&gt; Contenido independiente como un artículo
              &lt;/article&gt;
            </Body3>
          </Container>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Casos de Uso Comunes</H2>
      <Body2>
        Ejemplos de cómo usar Container en diferentes contextos de página:
      </Body2>

      <VStack space="6" style={{ marginTop: tokens.space[4] }}>
        <div>
          <H3>Layout de Página Completa</H3>
          <Body3 style={{ marginBottom: tokens.space[3] }}>
            Estructura típica de una página con header, main y footer:
          </Body3>
          <div
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <Container
              as="section"
              paddingY="4"
              style={{
                backgroundColor: 'var(--colors-background-tertiary)',
                borderBottom: '1px solid var(--colors-border-primary)',
              }}
            >
              <Body3>Header - Navegación (padding pequeño)</Body3>
            </Container>
            <Container
              as="main"
              paddingY="8"
              style={{
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Body3>Main - Contenido principal (padding mediano)</Body3>
            </Container>
            <Container
              as="section"
              paddingY="4"
              style={{
                backgroundColor: 'var(--colors-background-tertiary)',
                borderTop: '1px solid var(--colors-border-primary)',
              }}
            >
              <Body3>Footer - Enlaces y información (padding pequeño)</Body3>
            </Container>
          </div>
        </div>

        <div>
          <H3>Combinación con ContentWrapper</H3>
          <Body3 style={{ marginBottom: tokens.space[3] }}>
            Container maneja padding vertical, ContentWrapper maneja padding
            horizontal:
          </Body3>
          <Container
            paddingY="6"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--colors-background-tertiary)',
                border: '1px dashed var(--colors-border-secondary)',
                borderRadius: tokens.radius.sm,
                padding: tokens.space[4],
              }}
            >
              <Body3>
                Container (padding vertical) + ContentWrapper (padding
                horizontal) = Control completo del espaciado
              </Body3>
            </div>
          </Container>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Código de Ejemplo</H2>
      <Body2>Ejemplos de implementación básica:</Body2>

      <div
        style={{
          backgroundColor: 'var(--colors-background-secondary)',
          padding: tokens.space[4],
          borderRadius: tokens.radius.md,
          marginTop: tokens.space[4],
          fontFamily: 'monospace',
          fontSize: tokens.fontSize.sm,
        }}
      >
        <div style={{ marginBottom: tokens.space[3] }}>
          <Body3 style={{ fontWeight: tokens.fontWeight.semibold }}>
            Uso básico:
          </Body3>
          <Body3
            style={{
              fontFamily: 'monospace',
              color: 'var(--colors-foreground-secondary)',
            }}
          >
            {`<Container paddingY="8">`}
            <br />
            {`  <h1>Título de página</h1>`}
            <br />
            {`  <p>Contenido principal</p>`}
            <br />
            {`</Container>`}
          </Body3>
        </div>

        <div>
          <Body3 style={{ fontWeight: tokens.fontWeight.semibold }}>
            Con elemento semántico:
          </Body3>
          <Body3
            style={{
              fontFamily: 'monospace',
              color: 'var(--colors-foreground-secondary)',
            }}
          >
            {`<Container as="main" paddingY="12">`}
            <br />
            {`  <article>Contenido del artículo</article>`}
            <br />
            {`</Container>`}
          </Body3>
        </div>
      </div>
    </div>
  </div>
);

export default ContainerPage;
