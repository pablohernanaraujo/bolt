// /src/app/page.tsx
// Main design system overview page - Server-side rendered for optimal performance
// Landing page with overview content and navigation (zero JavaScript required)
// RELEVANT FILES: layout.tsx, components/sidebar.tsx

import { type FC, type ReactElement } from 'react';

import {
  FileText,
  Icon,
  Layers,
  LayoutGrid,
  MessageCircle,
  Navigation,
  Package,
  Palette,
  Smile,
  Zap,
} from '@/icons';
import { Body2, Container, ContentWrapper, Grid, GridItem, H1, H3 } from '@/ui';

import * as styles from './page.css';

/**
 * Overview page component
 * Landing page with design system introduction and feature highlights
 */
const HomePage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Design System</H1>
      <Body2>
        Un sistema de diseño completo construido con Next.js, React Aria
        Components, y vanilla-extract. Incluye tokens de diseño, componentes
        reutilizables, y herramientas para crear interfaces consistentes y
        accesibles.
      </Body2>

      <Grid
        templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap="6"
        style={{ marginTop: '1.5rem' }}
      >
        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Package} size="xl" />
            </div>
            <H3>Componentes</H3>
            <Body2>
              Componentes reutilizables construidos con React Aria para máxima
              accesibilidad
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Palette} size="xl" />
            </div>
            <H3>Design Tokens</H3>
            <Body2>
              Sistema centralizado de colores, tipografía, espaciado y más
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Zap} size="xl" />
            </div>
            <H3>Temas</H3>
            <Body2>
              Soporte completo para temas claro y oscuro con cambio dinámico
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Smile} size="xl" />
            </div>
            <H3>Iconos</H3>
            <Body2>
              Biblioteca completa de iconos de Lucide React con soporte para
              tamaños y composición
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={LayoutGrid} size="xl" />
            </div>
            <H3>Layout</H3>
            <Body2>
              Componentes de layout flexibles para estructurar interfaces
              consistentes
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Navigation} size="xl" />
            </div>
            <H3>Navegación</H3>
            <Body2>
              Componentes de navegación como tabs, breadcrumbs, acordeón y
              paginación
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={FileText} size="xl" />
            </div>
            <H3>Formularios</H3>
            <Body2>
              Componentes de formulario con validación, inputs especializados y
              controles
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Layers} size="xl" />
            </div>
            <H3>Overlays</H3>
            <Body2>
              Componentes modales, popovers, tooltips y menús contextuales
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={MessageCircle} size="xl" />
            </div>
            <H3>Feedback</H3>
            <Body2>
              Componentes de estado como spinners, toasts y notificaciones
            </Body2>
          </div>
        </GridItem>
      </Grid>
    </ContentWrapper>
  </Container>
);

export default HomePage;
