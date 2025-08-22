// /src/app/overlays/page.tsx
// Overview page for overlay components
// Landing page explaining overlay components and their usage
// RELEVANT FILES: modal/page.tsx, ../components/sidebar.tsx

'use client';

import { type FC, type ReactElement } from 'react';
import { Layers, Menu as MenuIcon, MessageSquare, Package } from 'lucide-react';

import { Icon } from '@/icons';
import { Body2, Container, ContentWrapper, Grid, GridItem, H1, H3 } from '@/ui';

import * as styles from '../page.css';

/**
 * Overlays overview page component
 * Provides introduction to overlay components and their use cases
 */
const OverlaysPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Overlays</H1>
      <Body2>
        Los componentes de overlay proporcionan interfaces superpuestas que
        aparecen sobre el contenido principal. Están construidos con React Aria
        Components para máxima accesibilidad, incluyendo manejo de foco,
        navegación por teclado y soporte para lectores de pantalla.
      </Body2>

      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="6"
        style={{ marginTop: '1.5rem' }}
      >
        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Package} size="xl" />
            </div>
            <H3>Modal</H3>
            <Body2>
              Diálogos modales para mostrar contenido importante que requiere la
              atención del usuario. Incluye gestión automática de foco y
              opciones de descarte.
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={MessageSquare} size="xl" />
            </div>
            <H3>Tooltip</H3>
            <Body2>
              Muestra información contextual cuando se hace hover o se enfoca un
              elemento. Incluye posicionamiento flexible, múltiples variantes y
              completa accesibilidad.
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={MenuIcon} size="xl" />
            </div>
            <H3>Menu</H3>
            <Body2>
              Menús contextuales accesibles con navegación por teclado completa.
              Incluye soporte para secciones, iconos, atajos de teclado y
              múltiples opciones de posicionamiento.
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Layers} size="xl" />
            </div>
            <H3>Drawer</H3>
            <Body2>
              Paneles deslizantes que se abren desde los bordes de la pantalla.
              Perfectos para navegación, configuraciones y contenido contextual
              sin interrumpir el flujo principal.
            </Body2>
          </div>
        </GridItem>

        <GridItem>
          <div className={styles.overviewCard}>
            <div className={styles.overviewIcon}>
              <Icon icon={Package} size="xl" />
            </div>
            <H3>Popover</H3>
            <Body2>
              Contenido contextual interactivo que aparece al hacer clic. Ideal
              para formularios, configuraciones, menús complejos y cualquier
              contenido que requiera interacción del usuario.
            </Body2>
          </div>
        </GridItem>
      </Grid>
    </ContentWrapper>
  </Container>
);

export default OverlaysPage;
