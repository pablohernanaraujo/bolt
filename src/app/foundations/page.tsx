// /src/app/foundations/page.tsx
// Design foundations overview page
// Introduction to design system foundations with links to tokens, colors, typography, and spacing
// RELEVANT FILES: design-tokens/page.tsx, colors/page.tsx, typography/page.tsx, spacing/page.tsx

'use client';

import { type FC, type ReactElement } from 'react';
import Link from 'next/link';

import { Icon, Palette, Square, Type, Zap } from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import { Body2, Button, Container, ContentWrapper, H1, H3 } from '@/ui';

import * as styles from '../page.css';

/**
 * Foundations overview page component
 * Provides introduction to design foundations and navigation to foundation pages
 */
const FoundationsPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Design Foundations</H1>
      <Body2>
        Las bases de nuestro sistema de diseño establecen los principios
        fundamentales que garantizan consistencia y coherencia visual en todas
        las interfaces. Estos elementos forman la base sobre la cual se
        construyen todos los componentes.
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
            <Icon icon={Zap} size="xl" />
          </div>
          <H3>Design Tokens</H3>
          <Body2>
            Valores de diseño fundamentales como tamaños de fuente, pesos
            tipográficos y espaciado. Los tokens aseguran consistencia y
            facilitan el mantenimiento del sistema.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/foundations/design-tokens">
              <Button variant="primary" size="small">
                Ver Design Tokens
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Palette} size="xl" />
          </div>
          <H3>Colors</H3>
          <Body2>
            Paleta de colores completa que se adapta automáticamente entre temas
            claro y oscuro. Incluye colores de marca, semánticos y de
            superficie.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/foundations/colors">
              <Button variant="primary" size="small">
                Ver Colors
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Type} size="xl" />
          </div>
          <H3>Typography</H3>
          <Body2>
            Sistema tipográfico completo con componentes semánticos para crear
            jerarquías consistentes. Incluye escalas, pesos y espaciado
            optimizado.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/foundations/typography">
              <Button variant="primary" size="small">
                Ver Typography
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Square} size="xl" />
          </div>
          <H3>Spacing</H3>
          <Body2>
            Sistema de espaciado basado en una escala modular de 4px.
            Proporciona consistencia en márgenes, padding y separación entre
            elementos.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <Link href="/foundations/spacing">
              <Button variant="primary" size="small">
                Ver Spacing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[8] }}>
        <H3>Principios de Diseño</H3>
        <Body2>
          Nuestras foundations se basan en principios clave que guían todas las
          decisiones de diseño:
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: tokens.space[4],
            }}
          >
            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>Consistencia</H3>
              <Body2>
                Elementos similares se comportan de manera similar en toda la
                aplicación.
              </Body2>
            </div>
            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>Escalabilidad</H3>
              <Body2>
                El sistema crece y se adapta a nuevas necesidades sin perder
                coherencia.
              </Body2>
            </div>
            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>Accesibilidad</H3>
              <Body2>
                Diseñado para ser usable por todos, siguiendo estándares WCAG.
              </Body2>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default FoundationsPage;
