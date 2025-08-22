// /src/app/feedback/spinner/page.tsx
// Documentation page for Spinner component
// Showcases all spinner variants with interactive examples and usage guidelines
// RELEVANT FILES: ../../../ui/spinner/index.tsx, ../../components/sidebar.tsx

'use client';

import { Download, RefreshCw, Save } from 'lucide-react';
import { type FC, type ReactElement, useState } from 'react';

import { Icon } from '@/icons';
import {
  Body2,
  Button,
  Center,
  Container,
  ContentWrapper,
  Grid,
  GridItem,
  H1,
  H2,
  H3,
  HStack,
  VStack,
} from '@/ui';
import { Spinner } from '@/ui/spinner';

import * as styles from '../../page.css';

/**
 * Spinner documentation page component
 * Provides comprehensive examples and usage patterns for loading spinners
 */
const SpinnerPage: FC = (): ReactElement => {
  // State for interactive demo
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading action
  const handleLoadingDemo = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Container as="section" paddingY="8">
      <ContentWrapper variant="screen">
        <H1>Spinner</H1>
        <Body2>
          El componente Spinner proporciona feedback visual durante operaciones
          asíncronas como carga de datos, procesamiento o espera. Es esencial
          para mantener informado al usuario sobre procesos en curso.
        </Body2>

        {/* Basic Example */}
        <div style={{ marginTop: '2rem' }}>
          <H2>Ejemplo Básico</H2>
          <div className={styles.exampleContainer}>
            <Center style={{ minHeight: '100px' }}>
              <Spinner />
            </Center>
          </div>
          <pre className={styles.codeBlock}>
            {`import { Spinner } from '@/ui/spinner';

// Uso básico
<Spinner />

// Con etiqueta personalizada
<Spinner label="Cargando datos" />

// Con color personalizado
<Spinner colorScheme="brand" />`}
          </pre>
        </div>

        {/* Sizes */}
        <div style={{ marginTop: '3rem' }}>
          <H2>Tamaños</H2>
          <Body2>
            Tres tamaños disponibles para diferentes contextos de uso.
          </Body2>
          <div className={styles.exampleContainer}>
            <HStack space="8" align="center">
              <VStack align="center" space="2">
                <Spinner size="small" />
                <Body2>Small (16px)</Body2>
              </VStack>
              <VStack align="center" space="2">
                <Spinner size="medium" />
                <Body2>Medium (24px)</Body2>
              </VStack>
              <VStack align="center" space="2">
                <Spinner size="large" />
                <Body2>Large (32px)</Body2>
              </VStack>
            </HStack>
          </div>
          <pre className={styles.codeBlock}>
            {`<Spinner size="small" />
<Spinner size="medium" />
<Spinner size="large" />`}
          </pre>
        </div>

        {/* Color Schemes */}
        <div style={{ marginTop: '3rem' }}>
          <H2>Esquemas de Color</H2>
          <Body2>
            Diferentes colores para representar estados o contextos específicos.
          </Body2>
          <div className={styles.exampleContainer}>
            <Grid
              templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
              gap="4"
            >
              <GridItem>
                <VStack align="center" space="2">
                  <Spinner colorScheme="default" />
                  <Body2>Default</Body2>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="center" space="2">
                  <Spinner colorScheme="brand" />
                  <Body2>Brand</Body2>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="center" space="2">
                  <Spinner colorScheme="success" />
                  <Body2>Success</Body2>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="center" space="2">
                  <Spinner colorScheme="warning" />
                  <Body2>Warning</Body2>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="center" space="2">
                  <Spinner colorScheme="error" />
                  <Body2>Error</Body2>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="center" space="2">
                  <Spinner colorScheme="info" />
                  <Body2>Info</Body2>
                </VStack>
              </GridItem>
            </Grid>
          </div>
          <pre className={styles.codeBlock}>
            {`<Spinner colorScheme="default" />
<Spinner colorScheme="brand" />
<Spinner colorScheme="success" />
<Spinner colorScheme="warning" />
<Spinner colorScheme="error" />
<Spinner colorScheme="info" />`}
          </pre>
        </div>

        {/* With and Without Track */}
        <div style={{ marginTop: '3rem' }}>
          <H2>Track de Fondo</H2>
          <Body2>
            El track de fondo mejora la visibilidad del spinner sobre diferentes
            fondos.
          </Body2>
          <div className={styles.exampleContainer}>
            <HStack space="8" align="center">
              <VStack align="center" space="2">
                <Spinner showTrack={true} size="large" />
                <Body2>Con Track</Body2>
              </VStack>
              <VStack align="center" space="2">
                <Spinner showTrack={false} size="large" />
                <Body2>Sin Track</Body2>
              </VStack>
            </HStack>
          </div>
          <pre className={styles.codeBlock}>
            {`// Con track (por defecto)
<Spinner showTrack={true} />

// Sin track
<Spinner showTrack={false} />`}
          </pre>
        </div>

        {/* Common Use Cases */}
        <div style={{ marginTop: '3rem' }}>
          <H2>Casos de Uso Comunes</H2>
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="4">
            {/* Loading Button */}
            <GridItem>
              <div className={styles.overviewCard}>
                <H3>Botón con Carga</H3>
                <Body2>Spinner integrado en botones durante acciones.</Body2>
                <div style={{ marginTop: '1rem' }}>
                  <Button
                    variant="primary"
                    disabled={isLoading}
                    onClick={handleLoadingDemo}
                  >
                    <HStack space="2" align="center">
                      {isLoading ? (
                        <Spinner size="small" colorScheme="default" />
                      ) : (
                        <Icon icon={Save} size="sm" />
                      )}
                      <span>{isLoading ? 'Guardando...' : 'Guardar'}</span>
                    </HStack>
                  </Button>
                </div>
              </div>
            </GridItem>

            {/* Inline Loading */}
            <GridItem>
              <div className={styles.overviewCard}>
                <H3>Carga en Línea</H3>
                <Body2>Spinner junto a texto para estados de espera.</Body2>
                <div style={{ marginTop: '1rem' }}>
                  <HStack space="2" align="center">
                    <Spinner size="small" />
                    <Body2>Actualizando datos...</Body2>
                  </HStack>
                </div>
              </div>
            </GridItem>

            {/* Full Page Loading */}
            <GridItem>
              <div className={styles.overviewCard}>
                <H3>Carga de Página</H3>
                <Body2>
                  Spinner centrado para carga de contenido completo.
                </Body2>
                <div
                  style={{
                    marginTop: '1rem',
                    height: '100px',
                    position: 'relative',
                  }}
                >
                  <Center style={{ height: '100%' }}>
                    <VStack align="center" space="3">
                      <Spinner size="large" colorScheme="brand" />
                      <Body2>Cargando contenido</Body2>
                    </VStack>
                  </Center>
                </div>
              </div>
            </GridItem>

            {/* Data Fetching */}
            <GridItem>
              <div className={styles.overviewCard}>
                <H3>Obtención de Datos</H3>
                <Body2>Indicador durante solicitudes a la API.</Body2>
                <div style={{ marginTop: '1rem' }}>
                  <VStack space="3">
                    <HStack space="2" align="center">
                      <Icon icon={Download} size="sm" />
                      <Body2>Descargando archivo...</Body2>
                    </HStack>
                    <Spinner size="medium" colorScheme="info" />
                  </VStack>
                </div>
              </div>
            </GridItem>

            {/* Processing State */}
            <GridItem>
              <div className={styles.overviewCard}>
                <H3>Procesamiento</H3>
                <Body2>Feedback durante operaciones complejas.</Body2>
                <div style={{ marginTop: '1rem' }}>
                  <VStack space="3">
                    <HStack space="2" align="center">
                      <Spinner size="small" colorScheme="warning" />
                      <Body2>Procesando imagen...</Body2>
                    </HStack>
                    <div
                      style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: 'var(--gray-200)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '60%',
                          height: '100%',
                          backgroundColor: 'var(--warning-500)',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </VStack>
                </div>
              </div>
            </GridItem>

            {/* Auto-refresh */}
            <GridItem>
              <div className={styles.overviewCard}>
                <H3>Auto-actualización</H3>
                <Body2>Indicador de actualización automática.</Body2>
                <div style={{ marginTop: '1rem' }}>
                  <HStack space="2" align="center">
                    <Icon icon={RefreshCw} size="sm" />
                    <Body2>Actualizando en 5s</Body2>
                    <Spinner size="small" colorScheme="success" />
                  </HStack>
                </div>
              </div>
            </GridItem>
          </Grid>
        </div>

        {/* Accessibility */}
        <div style={{ marginTop: '3rem' }}>
          <H2>Accesibilidad</H2>
          <div className={styles.overviewCard}>
            <VStack space="3">
              <div>
                <H3>Atributos ARIA</H3>
                <Body2>
                  El componente Spinner incluye atributos ARIA esenciales para
                  lectores de pantalla:
                </Body2>
                <ul
                  style={{
                    marginTop: '0.5rem',
                    paddingLeft: '1.5rem',
                  }}
                >
                  <li>
                    <code>role="status"</code> - Indica un estado de carga
                  </li>
                  <li>
                    <code>aria-label</code> - Proporciona descripción accesible
                  </li>
                  <li>
                    <code>aria-busy="true"</code> - Señala actividad en curso
                  </li>
                  <li>
                    <code>aria-live="polite"</code> - Anuncia cambios sin
                    interrumpir
                  </li>
                </ul>
              </div>
              <pre className={styles.codeBlock}>
                {`<Spinner 
  label="Cargando resultados de búsqueda"
  colorScheme="brand"
/>`}
              </pre>
            </VStack>
          </div>
        </div>

        {/* Best Practices */}
        <div style={{ marginTop: '3rem' }}>
          <H2>Mejores Prácticas</H2>
          <Grid templateColumns="1fr 1fr" gap="4">
            <GridItem>
              <div className={styles.overviewCard}>
                <H3>✅ Recomendado</H3>
                <ul
                  style={{
                    paddingLeft: '1.5rem',
                    margin: 0,
                  }}
                >
                  <li>Usar labels descriptivos para accesibilidad</li>
                  <li>Elegir el tamaño apropiado para el contexto</li>
                  <li>Mostrar spinner inmediatamente al iniciar carga</li>
                  <li>Combinar con mensajes de estado cuando sea útil</li>
                  <li>Usar colores consistentes con el propósito</li>
                  <li>Considerar skeleton screens para cargas largas</li>
                </ul>
              </div>
            </GridItem>

            <GridItem>
              <div className={styles.overviewCard}>
                <H3>❌ Evitar</H3>
                <ul
                  style={{
                    paddingLeft: '1.5rem',
                    margin: 0,
                  }}
                >
                  <li>Mostrar múltiples spinners simultáneamente</li>
                  <li>Usar spinners para demoras menores a 300ms</li>
                  <li>Ocultar el spinner sin completar la acción</li>
                  <li>Usar spinners sin contexto o explicación</li>
                  <li>Bloquear toda la interfaz innecesariamente</li>
                  <li>Olvidar estados de error tras la carga</li>
                </ul>
              </div>
            </GridItem>
          </Grid>
        </div>

        {/* API Reference */}
        <div style={{ marginTop: '3rem' }}>
          <H2>API Reference</H2>
          <div className={styles.overviewCard}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                  <th
                    style={{
                      padding: '0.5rem',
                      textAlign: 'left',
                    }}
                  >
                    Prop
                  </th>
                  <th
                    style={{
                      padding: '0.5rem',
                      textAlign: 'left',
                    }}
                  >
                    Tipo
                  </th>
                  <th
                    style={{
                      padding: '0.5rem',
                      textAlign: 'left',
                    }}
                  >
                    Por defecto
                  </th>
                  <th
                    style={{
                      padding: '0.5rem',
                      textAlign: 'left',
                    }}
                  >
                    Descripción
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <code>size</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>'small' | 'medium' | 'large'</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>'medium'</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>Tamaño del spinner</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <code>colorScheme</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>
                      'default' | 'brand' | 'success' | 'warning' | 'error' |
                      'info'
                    </code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>'brand'</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>Esquema de color</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <code>showTrack</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>boolean</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>true</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>Mostrar track de fondo</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <code>label</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>string</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>'Loading'</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>Etiqueta accesible</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <code>className</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>string</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>undefined</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>Clase CSS adicional</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem' }}>
                    <code>style</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>CSSProperties</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <code>undefined</code>
                  </td>
                  <td style={{ padding: '0.5rem' }}>Estilos en línea</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ContentWrapper>
    </Container>
  );
};

export default SpinnerPage;
