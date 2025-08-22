// /src/app/layout/content-wrapper/page.tsx
// ContentWrapper component showcase page
// Demonstrates horizontal padding and semantic layout variants
// RELEVANT FILES: ../../../ui/layout/content-wrapper

'use client';

import { type FC, type ReactElement } from 'react';

import { tokens } from '@/tokens/tokens.css';
import {
  Body2,
  Body3,
  Container,
  ContentWrapper,
  H1,
  H2,
  H3,
  Overline,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * ContentWrapper page component
 * Horizontal layout structure with semantic variants and configurable padding
 */
const ContentWrapperPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>ContentWrapper</H1>
    <Body2>
      Componente de layout para estructura horizontal que proporciona padding
      lateral consistente y variantes semánticas. Diseñado para trabajar en
      conjunto con Container para crear layouts completos y bien estructurados.
    </Body2>

    <div className={styles.showcase}>
      <H2>Características Principales</H2>
      <VStack space="4">
        <div>
          <H3>Padding Horizontal Configurable</H3>
          <Body2>
            Control del espaciado lateral usando design tokens para mantener la
            consistencia visual en toda la aplicación.
          </Body2>
        </div>
        <div>
          <H3>Variantes Semánticas</H3>
          <Body2>
            Diferentes variantes (screen, header, body, footer) con valores de
            padding optimizados para cada contexto de uso.
          </Body2>
        </div>
        <div>
          <H3>Modo Borderless</H3>
          <Body2>
            Opción para anidamiento sin conflictos de padding, ideal para
            composición de layouts complejos.
          </Body2>
        </div>
        <div>
          <H3>Componente Polimórfico</H3>
          <Body2>
            Puede renderizar como cualquier elemento HTML manteniendo su
            funcionalidad de layout horizontal.
          </Body2>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Variantes Semánticas</H2>
      <Body2>
        Cada variante tiene valores de padding optimizados para su contexto de
        uso:
      </Body2>

      <Container paddingY="0" style={{ marginTop: tokens.space[4] }}>
        <VStack space="4">
          <div className={styles.componentItem}>
            <Overline>
              variant="screen" (32px lateral) - Para contenido principal
            </Overline>
            <div
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                border: '2px dashed var(--colors-border-primary)',
              }}
            >
              <ContentWrapper variant="screen">
                <Body3>
                  Contenido principal de pantalla con padding amplio
                </Body3>
              </ContentWrapper>
            </div>
          </div>

          <div className={styles.componentItem}>
            <Overline>
              variant="header" (16px lateral) - Para navegación y headers
            </Overline>
            <div
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                border: '2px dashed var(--colors-border-primary)',
              }}
            >
              <ContentWrapper variant="header">
                <Body3>Header o navegación con padding compacto</Body3>
              </ContentWrapper>
            </div>
          </div>

          <div className={styles.componentItem}>
            <Overline>
              variant="body" (24px lateral) - Para contenido de artículos
              (default)
            </Overline>
            <div
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                border: '2px dashed var(--colors-border-primary)',
              }}
            >
              <ContentWrapper variant="body">
                <Body3>Contenido de artículo con padding equilibrado</Body3>
              </ContentWrapper>
            </div>
          </div>

          <div className={styles.componentItem}>
            <Overline>
              variant="footer" (16px lateral) - Para footer y acciones
            </Overline>
            <div
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                border: '2px dashed var(--colors-border-primary)',
              }}
            >
              <ContentWrapper variant="footer">
                <Body3>Footer con padding compacto</Body3>
              </ContentWrapper>
            </div>
          </div>
        </VStack>
      </Container>
    </div>

    <div className={styles.showcase}>
      <H2>Padding Personalizado</H2>
      <Body2>
        También puedes especificar valores de padding personalizados:
      </Body2>

      <Container paddingY="0" style={{ marginTop: tokens.space[4] }}>
        <VStack space="4">
          <div className={styles.componentItem}>
            <Overline>paddingX="2" (8px lateral)</Overline>
            <div
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                border: '2px dashed var(--colors-border-primary)',
              }}
            >
              <ContentWrapper paddingX="2">
                <Body3>Padding muy pequeño para elementos compactos</Body3>
              </ContentWrapper>
            </div>
          </div>

          <div className={styles.componentItem}>
            <Overline>paddingX="8" (32px lateral)</Overline>
            <div
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                border: '2px dashed var(--colors-border-primary)',
              }}
            >
              <ContentWrapper paddingX="8">
                <Body3>Padding grande para contenido destacado</Body3>
              </ContentWrapper>
            </div>
          </div>

          <div className={styles.componentItem}>
            <Overline>paddingX="12" (48px lateral)</Overline>
            <div
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                border: '2px dashed var(--colors-border-primary)',
              }}
            >
              <ContentWrapper paddingX="12">
                <Body3>Padding extra grande para layouts especiales</Body3>
              </ContentWrapper>
            </div>
          </div>
        </VStack>
      </Container>
    </div>

    <div className={styles.showcase}>
      <H2>Modo Borderless</H2>
      <Body2>
        El modo borderless permite anidamiento sin conflictos de padding:
      </Body2>

      <Container
        paddingY="6"
        style={{
          backgroundColor: 'var(--colors-background-secondary)',
          border: '1px solid var(--colors-border-primary)',
          borderRadius: tokens.radius.md,
          marginTop: tokens.space[4],
        }}
      >
        <ContentWrapper variant="body">
          <VStack space="3">
            <Body3 style={{ fontWeight: tokens.fontWeight.semibold }}>
              ContentWrapper principal (con padding)
            </Body3>

            <div
              style={{
                backgroundColor: 'var(--colors-background-tertiary)',
                border: '1px dashed var(--colors-border-secondary)',
                borderRadius: tokens.radius.sm,
              }}
            >
              <ContentWrapper borderless>
                <Body3>ContentWrapper anidado (borderless - sin padding)</Body3>

                <div
                  style={{
                    backgroundColor: 'var(--colors-background-primary)',
                    border: '1px solid var(--colors-border-primary)',
                    borderRadius: tokens.radius.sm,
                    margin: `${tokens.space[2]} 0`,
                    padding: tokens.space[3],
                  }}
                >
                  <Body3>Contenido interno que se extiende completamente</Body3>
                </div>
              </ContentWrapper>
            </div>
          </VStack>
        </ContentWrapper>
      </Container>
    </div>

    <div className={styles.showcase}>
      <H2>Combinación con Container</H2>
      <Body2>
        El patrón recomendado es Container (padding vertical) + ContentWrapper
        (padding horizontal):
      </Body2>

      <VStack space="6" style={{ marginTop: tokens.space[4] }}>
        <div>
          <H3>Layout de Página Completa</H3>
          <Body3 style={{ marginBottom: tokens.space[3] }}>
            Estructura semántica completa con Container + ContentWrapper:
          </Body3>
          <div
            style={{
              border: '2px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
            }}
          >
            <Container
              as="section"
              paddingY="0"
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                borderBottom: '1px solid var(--colors-border-primary)',
              }}
            >
              <ContentWrapper variant="header" as="header">
                <Body3>
                  &lt;header&gt; + &lt;nav&gt; - Navegación principal
                </Body3>
              </ContentWrapper>
            </Container>

            <Container
              as="main"
              paddingY="8"
              style={{
                backgroundColor: 'var(--colors-background-primary)',
              }}
            >
              <ContentWrapper variant="body">
                <Body3>
                  &lt;main&gt; + ContentWrapper - Contenido principal
                </Body3>
              </ContentWrapper>
            </Container>

            <Container
              as="section"
              paddingY="0"
              style={{
                backgroundColor: 'var(--colors-background-secondary)',
                borderTop: '1px solid var(--colors-border-primary)',
              }}
            >
              <ContentWrapper variant="footer">
                <Body3>&lt;footer&gt; - Enlaces y información</Body3>
              </ContentWrapper>
            </Container>
          </div>
        </div>

        <div>
          <H3>Contenido con Diferentes Anchos</H3>
          <Body3 style={{ marginBottom: tokens.space[3] }}>
            Diferentes variantes para controlar el ancho del contenido:
          </Body3>
          <Container
            paddingY="6"
            style={{
              backgroundColor: 'var(--colors-background-secondary)',
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <VStack space="4">
              <ContentWrapper variant="header">
                <div
                  style={{
                    backgroundColor: 'var(--colors-background-tertiary)',
                    padding: tokens.space[2],
                    borderRadius: tokens.radius.sm,
                  }}
                >
                  <Body3>Header - Ancho compacto</Body3>
                </div>
              </ContentWrapper>

              <ContentWrapper variant="screen">
                <div
                  style={{
                    backgroundColor: 'var(--colors-background-tertiary)',
                    padding: tokens.space[2],
                    borderRadius: tokens.radius.sm,
                  }}
                >
                  <Body3>Screen - Ancho completo</Body3>
                </div>
              </ContentWrapper>
            </VStack>
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
        <VStack space="4">
          <div>
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
              {`  <ContentWrapper variant="body">`}
              <br />
              {`    <h1>Título</h1>`}
              <br />
              {`    <p>Contenido</p>`}
              <br />
              {`  </ContentWrapper>`}
              <br />
              {`</Container>`}
            </Body3>
          </div>

          <div>
            <Body3 style={{ fontWeight: tokens.fontWeight.semibold }}>
              Layout semántico completo:
            </Body3>
            <Body3
              style={{
                fontFamily: 'monospace',
                color: 'var(--colors-foreground-secondary)',
              }}
            >
              {`<Container as="main" paddingY="12">`}
              <br />
              {`  <ContentWrapper variant="screen" as="article">`}
              <br />
              {`    <h1>Artículo principal</h1>`}
              <br />
              {`    <ContentWrapper borderless>`}
              <br />
              {`      <section>Sección anidada</section>`}
              <br />
              {`    </ContentWrapper>`}
              <br />
              {`  </ContentWrapper>`}
              <br />
              {`</Container>`}
            </Body3>
          </div>
        </VStack>
      </div>
    </div>
  </div>
);

export default ContentWrapperPage;
