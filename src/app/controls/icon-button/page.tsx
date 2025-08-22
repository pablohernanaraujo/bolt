// /src/app/controls/icon-button/page.tsx
// IconButton component documentation page
// Shows all IconButton variants, sizes, and usage examples
// RELEVANT FILES: ../../../ui/icon-button/index.tsx, ../../page.css.ts

'use client';

import { type FC, type ReactElement } from 'react';

import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Edit,
  Heart,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share,
  Trash2,
  X,
} from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import {
  Body1,
  Body2,
  Caption,
  Container,
  ContentWrapper,
  H1,
  H3,
  HStack,
  IconButton,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * IconButton component page
 * Comprehensive showcase of IconButton component variants and usage
 */
const IconButtonPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <VStack space="6">
        {/* Header */}
        <div>
          <H1>IconButton</H1>
          <Body1>
            Botón de icono accesible construido con React Aria Components.
            Optimizado para uso con solo iconos, con accesibilidad completa.
          </Body1>
        </div>

        {/* Variants Section */}
        <div className={styles.componentSection}>
          <H3>Variantes</H3>
          <Body2>
            IconButton soporta las mismas variantes que el botón regular:
            primary, secondary, ghost, y danger.
          </Body2>
          <div className={styles.componentExample}>
            <HStack space="4">
              <IconButton
                icon={Heart}
                variant="primary"
                aria-label="Me gusta"
              />
              <IconButton
                icon={Download}
                variant="secondary"
                aria-label="Descargar"
              />
              <IconButton
                icon={Settings}
                variant="ghost"
                aria-label="Configuración"
              />
              <IconButton
                icon={Trash2}
                variant="danger"
                aria-label="Eliminar"
              />
            </HStack>
            <Caption>Primary, Secondary, Ghost, Danger</Caption>
          </div>
        </div>

        {/* Sizes Section */}
        <div className={styles.componentSection}>
          <H3>Tamaños</H3>
          <Body2>
            Tres tamaños disponibles para diferentes contextos de uso.
          </Body2>
          <div className={styles.componentExample}>
            <HStack space="4" align="center">
              <IconButton
                icon={Heart}
                size="small"
                aria-label="Me gusta pequeño"
              />
              <IconButton
                icon={Heart}
                size="medium"
                aria-label="Me gusta mediano"
              />
              <IconButton
                icon={Heart}
                size="large"
                aria-label="Me gusta grande"
              />
            </HStack>
            <Caption>Small (32px), Medium (40px), Large (48px)</Caption>
          </div>
        </div>

        {/* Common Use Cases */}
        <div className={styles.componentSection}>
          <H3>Casos de Uso Comunes</H3>
          <Body2>
            Ejemplos de iconos comúnmente usados en diferentes contextos.
          </Body2>

          {/* Actions */}
          <div className={styles.componentExample}>
            <Body2
              style={{
                marginBottom: tokens.space[3],
                fontWeight: tokens.fontWeight.medium,
              }}
            >
              Acciones
            </Body2>
            <HStack space="3">
              <IconButton
                icon={Plus}
                variant="primary"
                aria-label="Agregar nuevo"
              />
              <IconButton icon={Edit} variant="secondary" aria-label="Editar" />
              <IconButton icon={Copy} variant="ghost" aria-label="Copiar" />
              <IconButton icon={Share} variant="ghost" aria-label="Compartir" />
              <IconButton
                icon={Trash2}
                variant="danger"
                aria-label="Eliminar"
              />
            </HStack>
          </div>

          {/* Navigation */}
          <div className={styles.componentExample}>
            <Body2
              style={{
                marginBottom: tokens.space[3],
                fontWeight: tokens.fontWeight.medium,
              }}
            >
              Navegación
            </Body2>
            <HStack space="3">
              <IconButton
                icon={ChevronLeft}
                variant="ghost"
                aria-label="Anterior"
              />
              <IconButton
                icon={ChevronRight}
                variant="ghost"
                aria-label="Siguiente"
              />
              <IconButton icon={Search} variant="ghost" aria-label="Buscar" />
              <IconButton
                icon={Bell}
                variant="ghost"
                aria-label="Notificaciones"
              />
              <IconButton
                icon={MoreHorizontal}
                variant="ghost"
                aria-label="Más opciones"
              />
            </HStack>
          </div>

          {/* Status */}
          <div className={styles.componentExample}>
            <Body2
              style={{
                marginBottom: tokens.space[3],
                fontWeight: tokens.fontWeight.medium,
              }}
            >
              Estado
            </Body2>
            <HStack space="3">
              <IconButton
                icon={Check}
                variant="primary"
                aria-label="Confirmar"
              />
              <IconButton icon={X} variant="danger" aria-label="Cancelar" />
              <IconButton
                icon={Heart}
                variant="secondary"
                aria-label="Favorito"
              />
            </HStack>
          </div>
        </div>

        {/* States Section */}
        <div className={styles.componentSection}>
          <H3>Estados</H3>
          <Body2>
            IconButton soporta todos los estados interactivos estándar.
          </Body2>
          <div className={styles.componentExample}>
            <HStack space="4">
              <div>
                <IconButton
                  icon={Heart}
                  variant="primary"
                  aria-label="Normal"
                />
                <Caption>Normal</Caption>
              </div>
              <div>
                <IconButton icon={Heart} variant="primary" aria-label="Hover" />
                <Caption>Hover</Caption>
              </div>
              <div>
                <IconButton
                  icon={Heart}
                  variant="primary"
                  isDisabled
                  aria-label="Deshabilitado"
                />
                <Caption>Deshabilitado</Caption>
              </div>
            </HStack>
          </div>
        </div>

        {/* Accessibility Section */}
        <div className={styles.componentSection}>
          <H3>Accesibilidad</H3>
          <Body2>
            Todos los IconButton requieren un atributo <code>aria-label</code>{' '}
            descriptivo para lectores de pantalla. El componente maneja
            automáticamente el enfoque del teclado y la navegación.
          </Body2>
          <div className={styles.codeExample}>
            <pre>
              <code>{`<IconButton 
  icon={Heart} 
  variant="primary" 
  aria-label="Agregar a favoritos"
/>`}</code>
            </pre>
          </div>
        </div>

        {/* Custom Icon Sizes */}
        <div className={styles.componentSection}>
          <H3>Tamaños de Icono Personalizados</H3>
          <Body2>
            Puedes sobrescribir el tamaño del icono independientemente del
            tamaño del botón.
          </Body2>
          <div className={styles.componentExample}>
            <HStack space="4" align="center">
              <IconButton
                icon={Heart}
                size="medium"
                iconSize="xs"
                aria-label="Icono extra pequeño"
              />
              <IconButton
                icon={Heart}
                size="medium"
                iconSize="sm"
                aria-label="Icono pequeño"
              />
              <IconButton
                icon={Heart}
                size="medium"
                iconSize="md"
                aria-label="Icono mediano"
              />
              <IconButton
                icon={Heart}
                size="medium"
                iconSize="lg"
                aria-label="Icono grande"
              />
              <IconButton
                icon={Heart}
                size="medium"
                iconSize={32}
                aria-label="Icono 32px"
              />
            </HStack>
            <Caption>
              Tamaños de icono: xs, sm, md, lg, o valor numérico personalizado
            </Caption>
          </div>
        </div>

        {/* Usage Example */}
        <div className={styles.componentSection}>
          <H3>Ejemplo de Uso</H3>
          <Body2>
            Importa y usa IconButton con cualquier icono de Lucide React.
          </Body2>
          <div className={styles.codeExample}>
            <pre>
              <code>{`import { IconButton } from '@/ui';
import { Heart } from '@/icons';

function MyComponent() {
  return (
    <IconButton 
      icon={Heart}
      variant="primary"
      size="medium"
      aria-label="Agregar a favoritos"
      onPress={() => console.log('Liked!')}
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </VStack>
    </ContentWrapper>
  </Container>
);

export default IconButtonPage;
