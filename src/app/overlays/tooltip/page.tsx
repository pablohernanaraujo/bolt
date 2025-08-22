// /src/app/overlays/tooltip/page.tsx
// Documentation page for Tooltip component
// Interactive examples and usage documentation for tooltip functionality
// RELEVANT FILES: ../../../ui/tooltip/tooltip.tsx, ../../components/sidebar.tsx

'use client';

import { HelpCircle, Info, Settings, Star } from 'lucide-react';
import { type FC, type ReactElement } from 'react';

import {
  Badge,
  Body2,
  Button,
  Code,
  Container,
  ContentWrapper,
  Grid,
  GridItem,
  H1,
  H2,
  H3,
  HStack,
  IconButton,
  Tooltip,
  TooltipTrigger,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Tooltip documentation page component
 * Provides comprehensive examples and documentation for the Tooltip component
 */
const TooltipPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <VStack space="8">
        {/* Header Section */}
        <div>
          <H1>Tooltip</H1>
          <Body2>
            El componente Tooltip muestra información contextual cuando el
            usuario hace hover o enfoca un elemento. Construido con React Aria
            Components para máxima accesibilidad, incluyendo navegación por
            teclado y soporte para lectores de pantalla.
          </Body2>
        </div>

        {/* Basic Usage */}
        <div>
          <H2>Uso Básico</H2>
          <Body2>
            El tooltip se activa cuando el usuario hace hover sobre el elemento
            trigger o lo enfoca con el teclado.
          </Body2>

          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="4">
              <H3>Ejemplo Básico</H3>
              <HStack space="4" style={{ flexWrap: 'wrap' }}>
                <TooltipTrigger>
                  <Button variant="primary">Hover para ver tooltip</Button>
                  <Tooltip>Este es un tooltip básico</Tooltip>
                </TooltipTrigger>
                <TooltipTrigger>
                  <Button variant="secondary">Botón con ayuda</Button>
                  <Tooltip>Información adicional sobre esta acción</Tooltip>
                </TooltipTrigger>
                <TooltipTrigger>
                  <IconButton icon={HelpCircle} aria-label="Ayuda" />
                  <Tooltip>Obtener ayuda sobre esta función</Tooltip>
                </TooltipTrigger>
              </HStack>

              <Code>
                {`<TooltipTrigger>
  <Button variant="primary">Hover para ver tooltip</Button>
  <Tooltip>Este es un tooltip básico</Tooltip>
</TooltipTrigger>`}
              </Code>
            </VStack>
          </div>
        </div>

        {/* Positioning */}
        <div>
          <H2>Posicionamiento</H2>
          <Body2>
            Los tooltips pueden posicionarse en diferentes direcciones relativas
            al elemento trigger.
          </Body2>

          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="4">
              <H3>Diferentes Posiciones</H3>
              <Grid
                templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
                gap="4"
              >
                <GridItem>
                  <TooltipTrigger>
                    <Button variant="ghost" size="small" fullWidth>
                      Top
                    </Button>
                    <Tooltip placement="top">Tooltip arriba</Tooltip>
                  </TooltipTrigger>
                </GridItem>
                <GridItem>
                  <TooltipTrigger>
                    <Button variant="ghost" size="small" fullWidth>
                      Bottom
                    </Button>
                    <Tooltip placement="bottom">Tooltip abajo</Tooltip>
                  </TooltipTrigger>
                </GridItem>
                <GridItem>
                  <TooltipTrigger>
                    <Button variant="ghost" size="small" fullWidth>
                      Left
                    </Button>
                    <Tooltip placement="left">Tooltip a la izquierda</Tooltip>
                  </TooltipTrigger>
                </GridItem>
                <GridItem>
                  <TooltipTrigger>
                    <Button variant="ghost" size="small" fullWidth>
                      Right
                    </Button>
                    <Tooltip placement="right">Tooltip a la derecha</Tooltip>
                  </TooltipTrigger>
                </GridItem>
              </Grid>

              <Code>
                {`<TooltipTrigger>
  <Button>Top</Button>
  <Tooltip placement="top">Tooltip arriba</Tooltip>
</TooltipTrigger>

<TooltipTrigger>
  <Button>Bottom</Button>
  <Tooltip placement="bottom">Tooltip abajo</Tooltip>
</TooltipTrigger>`}
              </Code>
            </VStack>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <H2>Tamaños</H2>
          <Body2>
            Los tooltips están disponibles en tres tamaños diferentes para
            adaptarse a diferentes tipos de contenido.
          </Body2>

          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="4">
              <H3>Variantes de Tamaño</H3>
              <HStack space="4" style={{ flexWrap: 'wrap' }}>
                <TooltipTrigger>
                  <Button variant="secondary" size="small">
                    Small
                  </Button>
                  <Tooltip size="small">Pequeño</Tooltip>
                </TooltipTrigger>
                <TooltipTrigger>
                  <Button variant="secondary">Medium</Button>
                  <Tooltip size="medium">
                    Tooltip de tamaño mediano con más contenido
                  </Tooltip>
                </TooltipTrigger>
                <TooltipTrigger>
                  <Button variant="secondary" size="large">
                    Large
                  </Button>
                  <Tooltip size="large">
                    Tooltip grande que puede contener información más detallada
                    y descriptiva
                  </Tooltip>
                </TooltipTrigger>
              </HStack>

              <Code>
                {`<TooltipTrigger>
  <Button size="small">Small</Button>
  <Tooltip size="small">Pequeño</Tooltip>
</TooltipTrigger>

<TooltipTrigger>
  <Button>Medium</Button>
  <Tooltip size="medium">Tooltip mediano</Tooltip>
</TooltipTrigger>

<TooltipTrigger>
  <Button size="large">Large</Button>
  <Tooltip size="large">Tooltip grande con más información</Tooltip>
</TooltipTrigger>`}
              </Code>
            </VStack>
          </div>
        </div>

        {/* Variants */}
        <div>
          <H2>Variantes</H2>
          <Body2>
            Diferentes estilos visuales para adaptarse al contexto y la
            importancia de la información.
          </Body2>

          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="4">
              <H3>Estilos Visuales</H3>
              <HStack space="4" style={{ flexWrap: 'wrap' }}>
                <TooltipTrigger>
                  <Button variant="ghost">Default</Button>
                  <Tooltip variant="default">
                    Estilo por defecto con fondo oscuro
                  </Tooltip>
                </TooltipTrigger>
                <TooltipTrigger>
                  <Button variant="secondary">Inverse</Button>
                  <Tooltip variant="inverse">
                    Estilo inverso con fondo claro
                  </Tooltip>
                </TooltipTrigger>
                <TooltipTrigger>
                  <Button variant="primary">Accent</Button>
                  <Tooltip variant="accent">Estilo con color de acento</Tooltip>
                </TooltipTrigger>
              </HStack>

              <Code>
                {`<TooltipTrigger>
  <Button>Default</Button>
  <Tooltip variant="default">Estilo por defecto</Tooltip>
</TooltipTrigger>

<TooltipTrigger>
  <Button>Inverse</Button>
  <Tooltip variant="inverse">Estilo inverso</Tooltip>
</TooltipTrigger>

<TooltipTrigger>
  <Button>Accent</Button>
  <Tooltip variant="accent">Estilo con acento</Tooltip>
</TooltipTrigger>`}
              </Code>
            </VStack>
          </div>
        </div>

        {/* With Arrow */}
        <div>
          <H2>Con Flecha</H2>
          <Body2>
            Los tooltips pueden mostrar una flecha que apunta al elemento
            trigger para mayor claridad visual.
          </Body2>

          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="4">
              <H3>Tooltip con Flecha</H3>
              <HStack space="4" style={{ flexWrap: 'wrap' }}>
                <TooltipTrigger>
                  <Button variant="primary">Con Flecha</Button>
                  <Tooltip showArrow>
                    Tooltip con flecha apuntando al botón
                  </Tooltip>
                </TooltipTrigger>
                <TooltipTrigger>
                  <IconButton icon={Star} aria-label="Favorito" />
                  <Tooltip showArrow>Agregar a favoritos</Tooltip>
                </TooltipTrigger>
              </HStack>

              <Code>
                {`<TooltipTrigger>
  <Button>Con Flecha</Button>
  <Tooltip showArrow>Tooltip con flecha</Tooltip>
</TooltipTrigger>`}
              </Code>
            </VStack>
          </div>
        </div>

        {/* Interactive Examples */}
        <div>
          <H2>Ejemplos Interactivos</H2>
          <Body2>
            Casos de uso comunes del tooltip en interfaces de usuario.
          </Body2>

          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="6">
              <div>
                <H3>Botones de Acción</H3>
                <HStack space="3" style={{ marginTop: '1rem' }}>
                  <TooltipTrigger>
                    <IconButton icon={Settings} aria-label="Configuración" />
                    <Tooltip>Abrir configuración del sistema</Tooltip>
                  </TooltipTrigger>
                  <TooltipTrigger>
                    <IconButton icon={HelpCircle} aria-label="Ayuda" />
                    <Tooltip>Ver documentación y ayuda</Tooltip>
                  </TooltipTrigger>
                  <TooltipTrigger>
                    <IconButton icon={Info} aria-label="Información" />
                    <Tooltip>Más información sobre esta función</Tooltip>
                  </TooltipTrigger>
                  <TooltipTrigger>
                    <IconButton icon={Star} aria-label="Favorito" />
                    <Tooltip>Marcar como favorito</Tooltip>
                  </TooltipTrigger>
                </HStack>
              </div>

              <div>
                <H3>Estados y Badges</H3>
                <HStack space="3" style={{ marginTop: '1rem' }}>
                  <TooltipTrigger>
                    <Badge variant="solid">Activo</Badge>
                    <Tooltip>
                      El proceso se completó exitosamente hace 2 minutos
                    </Tooltip>
                  </TooltipTrigger>
                  <TooltipTrigger>
                    <Badge variant="subtle">Pendiente</Badge>
                    <Tooltip>
                      Pendiente de revisión por el administrador
                    </Tooltip>
                  </TooltipTrigger>
                  <TooltipTrigger>
                    <Badge variant="solid">Error</Badge>
                    <Tooltip>
                      Error en la conexión. Reintentando automáticamente...
                    </Tooltip>
                  </TooltipTrigger>
                </HStack>
              </div>

              <div>
                <H3>Texto Truncado</H3>
                <Body2 style={{ marginTop: '1rem' }}>
                  <TooltipTrigger>
                    <span
                      style={{
                        display: 'inline-block',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        cursor: 'help',
                      }}
                    >
                      Este es un texto muy largo que ha sido...
                    </span>
                    <Tooltip maxWidth={400}>
                      Este es un texto muy largo que ha sido truncado para
                      ahorrar espacio, pero puedes ver el contenido completo en
                      este tooltip al hacer hover
                    </Tooltip>
                  </TooltipTrigger>
                </Body2>
              </div>
            </VStack>
          </div>
        </div>

        {/* Accessibility */}
        <div>
          <H2>Accesibilidad</H2>
          <Body2>
            Los tooltips están construidos con React Aria Components para
            garantizar la máxima accesibilidad.
          </Body2>

          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="4">
              <H3>Características de Accesibilidad</H3>
              <ul
                style={{
                  paddingLeft: '1.5rem',
                  margin: 0,
                }}
              >
                <li>
                  <strong>Navegación por teclado:</strong> Los tooltips se
                  activan cuando se enfoca el elemento trigger con Tab
                </li>
                <li>
                  <strong>Lectores de pantalla:</strong> El contenido del
                  tooltip se anuncia automáticamente
                </li>
                <li>
                  <strong>Roles ARIA:</strong> Implementa los roles y atributos
                  ARIA apropiados
                </li>
                <li>
                  <strong>Gestión de foco:</strong> El foco se mantiene en el
                  elemento trigger
                </li>
                <li>
                  <strong>Escape:</strong> Presionar Escape cierra el tooltip
                </li>
                <li>
                  <strong>Motion preferences:</strong> Respeta las preferencias
                  de movimiento del usuario
                </li>
              </ul>
            </VStack>
          </div>
        </div>

        {/* Best Practices */}
        <div>
          <H2>Mejores Prácticas</H2>
          <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
            <VStack space="4">
              <div>
                <H3>✅ Hacer</H3>
                <ul
                  style={{
                    paddingLeft: '1.5rem',
                    margin: 0,
                  }}
                >
                  <li>Usar texto conciso y descriptivo</li>
                  <li>Proporcionar información útil adicional</li>
                  <li>Usar para explicar iconos y acciones</li>
                  <li>Mostrar texto completo cuando está truncado</li>
                  <li>Usar delays apropiados (700ms por defecto)</li>
                </ul>
              </div>

              <div>
                <H3>❌ Evitar</H3>
                <ul
                  style={{
                    paddingLeft: '1.5rem',
                    margin: 0,
                  }}
                >
                  <li>Repetir exactamente el texto visible</li>
                  <li>Usar para información crítica</li>
                  <li>Incluir elementos interactivos</li>
                  <li>Hacer tooltips muy largos</li>
                  <li>
                    Usar en dispositivos táctiles como interacción principal
                  </li>
                </ul>
              </div>
            </VStack>
          </div>
        </div>
      </VStack>
    </ContentWrapper>
  </Container>
);

export default TooltipPage;
