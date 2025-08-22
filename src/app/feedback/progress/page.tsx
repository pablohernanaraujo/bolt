// /src/app/feedback/progress/page.tsx
// Progress component demo page with examples and documentation
// Shows all variants, sizes, and usage patterns for the Progress component
// RELEVANT FILES: /src/ui/progress/index.ts, ../page.tsx, ../../components/sidebar.tsx

'use client';

import { type FC, type ReactElement, useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Download, XCircle } from 'lucide-react';

import { Icon } from '@/icons';
import {
  Body2,
  Button,
  Container,
  ContentWrapper,
  formatDataProgressValue,
  formatFileProgressValue,
  formatTimeProgressValue,
  H1,
  H2,
  H3,
  HStack,
  Progress,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Progress component demonstration page
 * Showcases all variants, sizes, features, and usage patterns
 */
const ProgressPage: FC = (): ReactElement => {
  // State for dynamic progress examples
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);

  // Simulate progress updates
  useEffect(() => {
    const downloadInterval = setInterval(() => {
      setDownloadProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
    }, 150);

    const timeInterval = setInterval(() => {
      setTimeProgress((prev) => (prev >= 120 ? 0 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(downloadInterval);
      clearInterval(uploadInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <Container as="section" paddingY="8">
      <ContentWrapper variant="screen">
        <VStack space="8">
          {/* Header */}
          <VStack space="4">
            <H1>Progress</H1>
            <Body2>
              El componente Progress muestra el estado de progreso de una tarea
              o proceso. Proporciona feedback visual claro sobre operaciones en
              curso, cargas de archivos, formularios de varios pasos, y
              cualquier proceso que requiera tiempo para completarse.
            </Body2>
          </VStack>

          {/* Basic Examples */}
          <VStack space="6">
            <H2>Ejemplos Básicos</H2>

            <div className={styles.overviewCard}>
              <H3>Variantes de Color</H3>
              <Body2>
                Diferentes colores semánticos para distintos tipos de progreso.
              </Body2>

              <VStack space="4" style={{ marginTop: '1rem' }}>
                <VStack space="2">
                  <Body2>
                    <strong>Primary</strong> - Para progreso general
                  </Body2>
                  <Progress value={65} maxValue={100} variant="primary" />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Success</strong> - Para operaciones exitosas
                  </Body2>
                  <Progress value={85} maxValue={100} variant="success" />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Warning</strong> - Para procesos que requieren
                    atención
                  </Body2>
                  <Progress value={45} maxValue={100} variant="warning" />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Error</strong> - Para procesos con problemas
                  </Body2>
                  <Progress value={25} maxValue={100} variant="error" />
                </VStack>
              </VStack>
            </div>

            <div className={styles.overviewCard}>
              <H3>Tamaños</H3>
              <Body2>Diferentes tamaños para distintos contextos de uso.</Body2>

              <VStack space="4" style={{ marginTop: '1rem' }}>
                <VStack space="2">
                  <Body2>
                    <strong>Small</strong> - Para espacios reducidos
                  </Body2>
                  <Progress value={50} maxValue={100} size="small" />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Medium</strong> - Tamaño estándar
                  </Body2>
                  <Progress value={50} maxValue={100} size="medium" />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Large</strong> - Para mayor prominencia visual
                  </Body2>
                  <Progress value={50} maxValue={100} size="large" />
                </VStack>
              </VStack>
            </div>
          </VStack>

          {/* Progress with Labels */}
          <VStack space="6">
            <H2>Progress con Etiquetas</H2>

            <div className={styles.overviewCard}>
              <H3>Con Etiquetas y Valores</H3>
              <Body2>
                Muestra descripción del proceso y progreso numérico.
              </Body2>

              <VStack space="4" style={{ marginTop: '1rem' }}>
                <Progress
                  value={downloadProgress}
                  maxValue={100}
                  label="Descargando archivo..."
                  showValue
                  variant="primary"
                />

                <Progress
                  value={uploadProgress * 2.5} // Convert to MB
                  maxValue={250}
                  label="Subiendo documentos"
                  showValue
                  formatValue={formatDataProgressValue}
                  variant="success"
                />

                <Progress
                  value={timeProgress}
                  maxValue={120}
                  label="Tiempo restante de sesión"
                  showValue
                  formatValue={formatTimeProgressValue}
                  variant="warning"
                />
              </VStack>
            </div>
          </VStack>

          {/* Striped and Animated */}
          <VStack space="6">
            <H2>Efectos Visuales</H2>

            <div className={styles.overviewCard}>
              <H3>Rayas y Animaciones</H3>
              <Body2>
                Agrega textura visual y movimiento para destacar el progreso
                activo.
              </Body2>

              <VStack space="4" style={{ marginTop: '1rem' }}>
                <VStack space="2">
                  <Body2>
                    <strong>Con Rayas</strong>
                  </Body2>
                  <Progress
                    value={60}
                    maxValue={100}
                    isStriped
                    variant="primary"
                  />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Rayas Animadas</strong>
                  </Body2>
                  <Progress
                    value={60}
                    maxValue={100}
                    isStriped
                    isAnimated
                    variant="success"
                  />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Indeterminado</strong> - Para procesos sin progreso
                    específico
                  </Body2>
                  <Progress variant="primary" />
                </VStack>
              </VStack>
            </div>
          </VStack>

          {/* Real-world Examples */}
          <VStack space="6">
            <H2>Ejemplos del Mundo Real</H2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
              }}
            >
              <div>
                <div className={styles.overviewCard}>
                  <H3>
                    <Icon
                      icon={Download}
                      size="sm"
                      style={{ marginRight: '0.5rem' }}
                    />
                    Descarga de Archivo
                  </H3>
                  <Body2>Progreso de descarga con información detallada.</Body2>

                  <VStack space="3" style={{ marginTop: '1rem' }}>
                    <HStack space="4" style={{ alignItems: 'center' }}>
                      <Icon icon={CheckCircle} size="sm" />
                      <Body2>documento.pdf</Body2>
                    </HStack>

                    <Progress
                      value={downloadProgress}
                      maxValue={100}
                      label={`Descargando... ${Math.round(downloadProgress)}%`}
                      showValue
                      formatValue={(value, max) =>
                        `${(value * 2.5).toFixed(1)} MB / ${(max * 2.5).toFixed(1)} MB`
                      }
                      variant={downloadProgress === 100 ? 'success' : 'primary'}
                      isStriped={downloadProgress < 100}
                      isAnimated={downloadProgress < 100}
                    />
                  </VStack>
                </div>
              </div>

              <div>
                <div className={styles.overviewCard}>
                  <H3>
                    <Icon
                      icon={AlertTriangle}
                      size="sm"
                      style={{ marginRight: '0.5rem' }}
                    />
                    Formulario Multi-paso
                  </H3>
                  <Body2>
                    Progreso a través de un formulario de varios pasos.
                  </Body2>

                  <VStack space="3" style={{ marginTop: '1rem' }}>
                    <Body2>Paso 2 de 4: Información Personal</Body2>

                    <Progress
                      value={2}
                      maxValue={4}
                      formatValue={(value, max) => `Paso ${value} de ${max}`}
                      variant="primary"
                      size="large"
                    />

                    <HStack space="2">
                      <Button size="small" variant="secondary">
                        Anterior
                      </Button>
                      <Button size="small" variant="primary">
                        Siguiente
                      </Button>
                    </HStack>
                  </VStack>
                </div>
              </div>
            </div>
          </VStack>

          {/* Usage Guidelines */}
          <VStack space="6">
            <H2>Guías de Uso</H2>

            <div className={styles.overviewCard}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <H3>✅ Cuándo Usar</H3>
                  <VStack space="2" style={{ alignItems: 'flex-start' }}>
                    <Body2>• Operaciones que toman más de 2 segundos</Body2>
                    <Body2>• Cargas y descargas de archivos</Body2>
                    <Body2>• Formularios de múltiples pasos</Body2>
                    <Body2>• Procesamiento de datos</Body2>
                    <Body2>• Instalación de software</Body2>
                    <Body2>• Sincronización de datos</Body2>
                  </VStack>
                </div>

                <div>
                  <H3>❌ Cuándo NO Usar</H3>
                  <VStack space="2" style={{ alignItems: 'flex-start' }}>
                    <Body2>• Operaciones muy rápidas (&lt;2s)</Body2>
                    <Body2>• Como indicador de estado general</Body2>
                    <Body2>• Para mostrar niveles o puntuaciones</Body2>
                    <Body2>• Cuando el progreso no es lineal</Body2>
                    <Body2>• Para navegación o paginación</Body2>
                  </VStack>
                </div>
              </div>
            </div>
          </VStack>

          {/* States and Accessibility */}
          <VStack space="6">
            <H2>Estados y Accesibilidad</H2>

            <div className={styles.overviewCard}>
              <H3>Estados del Componente</H3>
              <Body2>
                Diferentes estados para cubrir todos los escenarios de uso.
              </Body2>

              <VStack space="4" style={{ marginTop: '1rem' }}>
                <VStack space="2">
                  <Body2>
                    <strong>Progreso Normal</strong>
                  </Body2>
                  <Progress value={45} maxValue={100} label="Procesando..." />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Progreso Completo</strong>
                  </Body2>
                  <Progress
                    value={100}
                    maxValue={100}
                    label="¡Completado!"
                    variant="success"
                  />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Progreso con Error</strong>
                  </Body2>
                  <Progress
                    value={30}
                    maxValue={100}
                    label="Error en la operación"
                    variant="error"
                  />
                </VStack>

                <VStack space="2">
                  <Body2>
                    <strong>Progreso Indeterminado</strong>
                  </Body2>
                  <Progress label="Conectando..." variant="primary" />
                </VStack>
              </VStack>
            </div>

            <div className={styles.overviewCard}>
              <H3>Características de Accesibilidad</H3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
              >
                <div>
                  <VStack space="2" style={{ alignItems: 'flex-start' }}>
                    <Body2>
                      <strong>ARIA Support</strong>
                    </Body2>
                    <Body2>• role="progressbar"</Body2>
                    <Body2>• aria-valuenow</Body2>
                    <Body2>• aria-valuemin</Body2>
                    <Body2>• aria-valuemax</Body2>
                    <Body2>• aria-valuetext</Body2>
                  </VStack>
                </div>

                <div>
                  <VStack space="2" style={{ alignItems: 'flex-start' }}>
                    <Body2>
                      <strong>Usabilidad</strong>
                    </Body2>
                    <Body2>• Etiquetas descriptivas</Body2>
                    <Body2>• Valores numéricos opcionales</Body2>
                    <Body2>• Contraste adecuado</Body2>
                    <Body2>• Actualización automática</Body2>
                    <Body2>• Indicadores visuales claros</Body2>
                  </VStack>
                </div>
              </div>
            </div>
          </VStack>
        </VStack>
      </ContentWrapper>
    </Container>
  );
};

export default ProgressPage;
