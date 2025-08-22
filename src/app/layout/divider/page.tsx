// /src/app/layout/divider/page.tsx
// Divider component documentation and examples page
// Showcases all Divider variants, orientations, and usage patterns
// RELEVANT FILES: ../../../ui/divider/index.tsx, ../page.tsx

'use client';

import { type FC, type ReactElement } from 'react';

import { tokens } from '@/tokens/tokens.css';
import {
  Body2,
  Container,
  ContentWrapper,
  Divider,
  H1,
  H2,
  H3,
  HStack,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Divider documentation page component
 * Provides comprehensive examples and usage patterns for the Divider component
 */
const DividerPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Divider</H1>
      <Body2>
        El componente Divider proporciona separación visual entre secciones de
        contenido. Soporta orientaciones horizontal y vertical con múltiples
        estilos visuales y opciones de espaciado para crear layouts bien
        estructurados.
      </Body2>

      {/* Horizontal Dividers Section */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Separadores Horizontales</H2>
        <Body2>
          Los separadores horizontales se utilizan para dividir contenido
          verticalmente, creando secciones claras en la página.
        </Body2>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Variantes de Estilo</H3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: tokens.space[4],
              marginTop: tokens.space[4],
            }}
          >
            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Sólido
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider variant="solid" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Punteado
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider variant="dashed" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Puntos
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider variant="dotted" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Tamaños de Grosor</H3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: tokens.space[4],
              marginTop: tokens.space[4],
            }}
          >
            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Delgado (1px)
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider size="thin" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Medio (2px)
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider size="medium" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Grueso (4px)
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider size="thick" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Opciones de Espaciado</H3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: tokens.space[4],
              marginTop: tokens.space[4],
            }}
          >
            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Sin espaciado
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider spacing="none" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Espaciado pequeño
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider spacing="small" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Espaciado medio
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider spacing="medium" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Espaciado grande
              </H3>
              <div>
                <Body2>Contenido superior</Body2>
                <Divider spacing="large" />
                <Body2>Contenido inferior</Body2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Dividers Section */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Separadores Verticales</H2>
        <Body2>
          Los separadores verticales se utilizan para dividir contenido
          horizontalmente, especialmente útiles en barras de navegación y
          layouts de múltiples columnas.
        </Body2>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Variantes de Estilo</H3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: tokens.space[4],
              marginTop: tokens.space[4],
            }}
          >
            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Sólido
              </H3>
              <div>
                <HStack align="center" style={{ minHeight: '60px' }}>
                  <Body2>Izquierda</Body2>
                  <Divider orientation="vertical" variant="solid" />
                  <Body2>Derecha</Body2>
                </HStack>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Punteado
              </H3>
              <div>
                <HStack align="center" style={{ minHeight: '60px' }}>
                  <Body2>Izquierda</Body2>
                  <Divider orientation="vertical" variant="dashed" />
                  <Body2>Derecha</Body2>
                </HStack>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Puntos
              </H3>
              <div>
                <HStack align="center" style={{ minHeight: '60px' }}>
                  <Body2>Izquierda</Body2>
                  <Divider orientation="vertical" variant="dotted" />
                  <Body2>Derecha</Body2>
                </HStack>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Tamaños de Grosor</H3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: tokens.space[4],
              marginTop: tokens.space[4],
            }}
          >
            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Delgado (1px)
              </H3>
              <div>
                <HStack align="center" style={{ minHeight: '60px' }}>
                  <Body2>Izquierda</Body2>
                  <Divider orientation="vertical" size="thin" />
                  <Body2>Derecha</Body2>
                </HStack>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Medio (2px)
              </H3>
              <div>
                <HStack align="center" style={{ minHeight: '60px' }}>
                  <Body2>Izquierda</Body2>
                  <Divider orientation="vertical" size="medium" />
                  <Body2>Derecha</Body2>
                </HStack>
              </div>
            </div>

            <div className={styles.componentExample}>
              <H3
                style={{
                  fontSize: tokens.fontSize.lg,
                  marginBottom: tokens.space[3],
                }}
              >
                Grueso (4px)
              </H3>
              <div>
                <HStack align="center" style={{ minHeight: '60px' }}>
                  <Body2>Izquierda</Body2>
                  <Divider orientation="vertical" size="thick" />
                  <Body2>Derecha</Body2>
                </HStack>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples Section */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Ejemplos de Uso</H2>
        <Body2>
          Patrones comunes de uso del componente Divider en interfaces de
          usuario reales.
        </Body2>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Barra de Navegación</H3>
          <div className={styles.componentExample}>
            <div>
              <HStack align="center" space="0">
                <Body2>Inicio</Body2>
                <Divider orientation="vertical" spacing="medium" />
                <Body2>Productos</Body2>
                <Divider orientation="vertical" spacing="medium" />
                <Body2>Servicios</Body2>
                <Divider orientation="vertical" spacing="medium" />
                <Body2>Contacto</Body2>
              </HStack>
            </div>
          </div>
        </div>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Secciones de Contenido</H3>
          <div className={styles.componentExample}>
            <div>
              <VStack space="0">
                <Body2>
                  Esta es la primera sección de contenido. Contiene información
                  importante que debe estar separada de la siguiente sección
                  para mejor legibilidad.
                </Body2>
                <Divider spacing="large" />
                <Body2>
                  Esta es la segunda sección. El separador superior divide
                  claramente este contenido del anterior, mejorando la
                  estructura visual de la página.
                </Body2>
                <Divider spacing="large" />
                <Body2>
                  Y esta es la tercera sección, también claramente separada por
                  los componentes Divider para una mejor organización del
                  contenido.
                </Body2>
              </VStack>
            </div>
          </div>
        </div>

        <div style={{ marginTop: tokens.space[6] }}>
          <H3>Layout Complejo</H3>
          <div className={styles.componentExample}>
            <div>
              <VStack space="4">
                <H3 style={{ margin: 0 }}>Panel de Control</H3>
                <Divider />

                <HStack align="start" space="0">
                  <VStack space="3" style={{ flex: 1 }}>
                    <Body2>
                      <strong>Estadísticas</strong>
                    </Body2>
                    <Body2>Usuarios activos: 1,234</Body2>
                    <Body2>Ventas del día: $5,678</Body2>
                  </VStack>

                  <Divider orientation="vertical" spacing="medium" />

                  <VStack space="3" style={{ flex: 1 }}>
                    <Body2>
                      <strong>Acciones Rápidas</strong>
                    </Body2>
                    <Body2>• Crear nuevo producto</Body2>
                    <Body2>• Ver reportes</Body2>
                  </VStack>

                  <Divider orientation="vertical" spacing="medium" />

                  <VStack space="3" style={{ flex: 1 }}>
                    <Body2>
                      <strong>Notificaciones</strong>
                    </Body2>
                    <Body2>5 mensajes nuevos</Body2>
                    <Body2>2 pedidos pendientes</Body2>
                  </VStack>
                </HStack>
              </VStack>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices Section */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Mejores Prácticas</H2>
        <Body2>
          Recomendaciones para el uso efectivo de separadores en tu interfaz.
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
            <Body2>
              <strong>✓ Usa separadores horizontales</strong> para dividir
              secciones de contenido verticalmente
            </Body2>
            <Body2>
              <strong>✓ Usa separadores verticales</strong> en barras de
              navegación y layouts horizontales
            </Body2>
            <Body2>
              <strong>✓ Ajusta el espaciado</strong> según el contexto - más
              espaciado para secciones importantes
            </Body2>
            <Body2>
              <strong>✓ Mantén consistencia</strong> en el estilo de separadores
              a lo largo de la aplicación
            </Body2>
            <Body2>
              <strong>✓ Usa variantes sutiles</strong> (dotted, dashed) para
              separaciones menos prominentes
            </Body2>
          </VStack>
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default DividerPage;
