// /src/app/overlays/popover/page.tsx
// Documentation page for Popover component
// Interactive examples and comprehensive API documentation
// RELEVANT FILES: ../../../ui/popover/popover.tsx, ../../../storybook/overlays/popover.stories.tsx

'use client';

import {
  Download,
  HelpCircle,
  Settings,
  Star,
  Trash,
  User,
} from 'lucide-react';
import { type FC, type ReactElement } from 'react';

import {
  Badge,
  Body2,
  Button,
  Code,
  Container,
  ContentWrapper,
  H1,
  H2,
  H3,
  HStack,
  IconButton,
  VStack,
} from '@/ui';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from '@/ui/popover';

import * as styles from '../../page.css';

/**
 * Popover documentation page
 * Comprehensive examples and API documentation for Popover component
 */
const PopoverPage: FC = (): ReactElement => (
  <Container as="main" paddingY="8">
    <ContentWrapper variant="screen">
      {/* Header Section */}
      <VStack space="6">
        <div>
          <H1>Popover</H1>
          <Body2>
            El componente Popover proporciona contenido contextual accesible que
            aparece sobre la interfaz principal cuando se activa. Construido con
            React Aria Components para máxima accesibilidad, incluyendo manejo
            de foco, navegación por teclado y soporte para lectores de pantalla.
          </Body2>
        </div>

        {/* Basic Usage */}
        <div>
          <H2>Uso Básico</H2>
          <Body2>
            El uso más simple del Popover incluye un trigger y el contenido
            contextual.
          </Body2>

          <div className={styles.exampleContainer}>
            <PopoverTrigger>
              <Button variant="primary">Abrir Popover</Button>
              <Popover placement="top" showArrow>
                <PopoverContent title="Información">
                  Este es un popover básico con título y contenido estructurado.
                </PopoverContent>
              </Popover>
            </PopoverTrigger>
          </div>

          <Code>
            {`<PopoverTrigger>
  <Button variant="primary">Abrir Popover</Button>
  <Popover placement="top" showArrow>
    <PopoverContent title="Información">
      Este es un popover básico con título y contenido estructurado.
    </PopoverContent>
  </Popover>
</PopoverTrigger>`}
          </Code>
        </div>

        {/* Placements */}
        <div>
          <H2>Posicionamiento</H2>
          <Body2>
            El popover puede posicionarse en múltiples ubicaciones alrededor del
            elemento trigger.
          </Body2>

          <div className={styles.exampleContainer}>
            <VStack space="6">
              <HStack space="4" style={{ justifyContent: 'center' }}>
                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Top
                  </Button>
                  <Popover placement="top" showArrow>
                    <PopoverBody>Popover arriba</PopoverBody>
                  </Popover>
                </PopoverTrigger>
                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Top Start
                  </Button>
                  <Popover placement="top start" showArrow>
                    <PopoverBody>Popover arriba inicio</PopoverBody>
                  </Popover>
                </PopoverTrigger>
                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Top End
                  </Button>
                  <Popover placement="top end" showArrow>
                    <PopoverBody>Popover arriba final</PopoverBody>
                  </Popover>
                </PopoverTrigger>
              </HStack>

              <HStack space="6" style={{ justifyContent: 'center' }}>
                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Left
                  </Button>
                  <Popover placement="left" showArrow>
                    <PopoverBody>Popover izquierda</PopoverBody>
                  </Popover>
                </PopoverTrigger>

                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Right
                  </Button>
                  <Popover placement="right" showArrow>
                    <PopoverBody>Popover derecha</PopoverBody>
                  </Popover>
                </PopoverTrigger>
              </HStack>

              <HStack space="4" style={{ justifyContent: 'center' }}>
                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Bottom
                  </Button>
                  <Popover placement="bottom" showArrow>
                    <PopoverBody>Popover abajo</PopoverBody>
                  </Popover>
                </PopoverTrigger>
                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Bottom Start
                  </Button>
                  <Popover placement="bottom start" showArrow>
                    <PopoverBody>Popover abajo inicio</PopoverBody>
                  </Popover>
                </PopoverTrigger>
                <PopoverTrigger>
                  <Button variant="ghost" size="small">
                    Bottom End
                  </Button>
                  <Popover placement="bottom end" showArrow>
                    <PopoverBody>Popover abajo final</PopoverBody>
                  </Popover>
                </PopoverTrigger>
              </HStack>
            </VStack>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <H2>Tamaños</H2>
          <Body2>
            Tres tamaños disponibles para diferentes tipos de contenido.
          </Body2>

          <div className={styles.exampleContainer}>
            <HStack space="6">
              <PopoverTrigger>
                <Button variant="secondary" size="small">
                  Small
                </Button>
                <Popover size="small" placement="top" showArrow>
                  <PopoverContent title="Pequeño">
                    Contenido breve.
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>

              <PopoverTrigger>
                <Button variant="secondary">Medium</Button>
                <Popover size="medium" placement="top" showArrow>
                  <PopoverContent title="Mediano">
                    Contenido de tamaño mediano con más información detallada.
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>

              <PopoverTrigger>
                <Button variant="secondary" size="large">
                  Large
                </Button>
                <Popover size="large" placement="top" showArrow>
                  <PopoverContent title="Grande">
                    Contenido extenso que puede incluir múltiples párrafos,
                    listas y otros elementos más complejos para explicaciones
                    detalladas.
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>
            </HStack>
          </div>
        </div>

        {/* Variants */}
        <div>
          <H2>Variantes</H2>
          <Body2>Diferentes estilos visuales para diversos contextos.</Body2>

          <div className={styles.exampleContainer}>
            <HStack space="6">
              <PopoverTrigger>
                <Button variant="ghost">Default</Button>
                <Popover variant="default" placement="top" showArrow>
                  <PopoverContent title="Default">
                    Estilo por defecto con colores estándar del tema.
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>

              <PopoverTrigger>
                <Button variant="secondary">Inverse</Button>
                <Popover variant="inverse" placement="top" showArrow>
                  <PopoverContent title="Inverse">
                    Estilo inverso con colores contrastantes.
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>

              <PopoverTrigger>
                <Button variant="primary">Accent</Button>
                <Popover variant="accent" placement="top" showArrow>
                  <PopoverContent title="Accent">
                    Estilo con color de acento para información destacada.
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>
            </HStack>
          </div>
        </div>

        {/* With Icon Buttons */}
        <div>
          <H2>Con Icon Buttons</H2>
          <Body2>
            Los popovers son especialmente útiles para explicar la función de
            iconos.
          </Body2>

          <div className={styles.exampleContainer}>
            <VStack space="4">
              <div>
                <H3>Acciones Comunes</H3>
                <HStack space="3" style={{ marginTop: '1rem' }}>
                  <PopoverTrigger>
                    <IconButton icon={Settings} aria-label="Configuración" />
                    <Popover placement="top" showArrow>
                      <PopoverBody>
                        Abrir panel de configuración del sistema
                      </PopoverBody>
                    </Popover>
                  </PopoverTrigger>

                  <PopoverTrigger>
                    <IconButton icon={HelpCircle} aria-label="Ayuda" />
                    <Popover placement="top" showArrow>
                      <PopoverContent title="Ayuda">
                        Accede a documentación y recursos de ayuda
                      </PopoverContent>
                    </Popover>
                  </PopoverTrigger>

                  <PopoverTrigger>
                    <IconButton icon={User} aria-label="Perfil" />
                    <Popover placement="top" showArrow variant="inverse">
                      <PopoverContent title="Perfil de Usuario">
                        Ver y editar información del perfil
                      </PopoverContent>
                    </Popover>
                  </PopoverTrigger>

                  <PopoverTrigger>
                    <IconButton icon={Star} aria-label="Favorito" />
                    <Popover placement="top" showArrow variant="accent">
                      <PopoverBody>Agregar a favoritos</PopoverBody>
                    </Popover>
                  </PopoverTrigger>
                </HStack>
              </div>

              <div>
                <H3>Acciones con Advertencia</H3>
                <HStack space="3" style={{ marginTop: '1rem' }}>
                  <PopoverTrigger>
                    <IconButton
                      icon={Trash}
                      aria-label="Eliminar"
                      variant="danger"
                    />
                    <Popover placement="top" showArrow size="large">
                      <PopoverContent title="Eliminar Elemento">
                        <PopoverBody>
                          Esta acción eliminará el elemento permanentemente.
                        </PopoverBody>
                        <PopoverFooter>
                          <Button variant="ghost" size="small">
                            Cancelar
                          </Button>
                          <Button variant="danger" size="small">
                            Eliminar
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </PopoverTrigger>

                  <PopoverTrigger>
                    <IconButton icon={Download} aria-label="Descargar" />
                    <Popover placement="top" showArrow>
                      <PopoverContent title="Descargar Archivo">
                        <PopoverBody>
                          Archivo: documento.pdf (2.3 MB)
                        </PopoverBody>
                        <PopoverFooter>
                          <Button variant="primary" size="small">
                            Descargar
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </PopoverTrigger>
                </HStack>
              </div>
            </VStack>
          </div>
        </div>

        {/* Interactive Content */}
        <div>
          <H2>Contenido Interactivo</H2>
          <Body2>
            Los popovers pueden contener elementos interactivos como botones,
            formularios y otros controles.
          </Body2>

          <div className={styles.exampleContainer}>
            <HStack space="6">
              <PopoverTrigger>
                <Button variant="primary">Configurar Usuario</Button>
                <Popover placement="bottom" size="large" maxWidth={400}>
                  <PopoverContent title="Configuración Rápida" showCloseButton>
                    <PopoverBody>
                      <VStack space="4">
                        <div>
                          <Body2
                            style={{
                              fontWeight: '500',
                              marginBottom: '0.5rem',
                            }}
                          >
                            Estado:
                          </Body2>
                          <HStack space="2">
                            <Badge variant="solid">En línea</Badge>
                            <Badge variant="subtle">Disponible</Badge>
                          </HStack>
                        </div>
                        <div>
                          <Body2
                            style={{
                              fontWeight: '500',
                              marginBottom: '0.5rem',
                            }}
                          >
                            Notificaciones:
                          </Body2>
                          <Body2>
                            Activar notificaciones push para mantenerte
                            actualizado.
                          </Body2>
                        </div>
                      </VStack>
                    </PopoverBody>
                    <PopoverFooter>
                      <Button variant="ghost" size="small">
                        Más opciones
                      </Button>
                      <Button variant="primary" size="small">
                        Guardar
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>

              <PopoverTrigger>
                <Button variant="secondary">Compartir</Button>
                <Popover placement="bottom" size="medium">
                  <PopoverContent title="Compartir Contenido">
                    <PopoverBody>
                      <VStack space="3">
                        <Body2>Selecciona cómo quieres compartir:</Body2>
                        <VStack space="2">
                          <Button
                            variant="ghost"
                            size="small"
                            style={{
                              justifyContent: 'flex-start',
                              width: '100%',
                            }}
                          >
                            📧 Enviar por email
                          </Button>
                          <Button
                            variant="ghost"
                            size="small"
                            style={{
                              justifyContent: 'flex-start',
                              width: '100%',
                            }}
                          >
                            🔗 Copiar enlace
                          </Button>
                          <Button
                            variant="ghost"
                            size="small"
                            style={{
                              justifyContent: 'flex-start',
                              width: '100%',
                            }}
                          >
                            📱 Compartir en redes
                          </Button>
                        </VStack>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>
            </HStack>
          </div>
        </div>

        {/* With Other Elements */}
        <div>
          <H2>Con Otros Elementos</H2>
          <Body2>
            Los popovers pueden ser activados por cualquier elemento
            interactivo.
          </Body2>

          <div className={styles.exampleContainer}>
            <HStack space="4">
              <PopoverTrigger>
                <Button
                  variant="ghost"
                  style={{
                    padding: '0.25rem 0.5rem',
                    minHeight: 'auto',
                  }}
                >
                  <Badge variant="subtle">Pendiente</Badge>
                </Button>
                <Popover placement="top" variant="default">
                  <PopoverContent title="Estado Pendiente">
                    El proceso está esperando aprobación. Tiempo estimado: 2
                    horas.
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>

              <PopoverTrigger>
                <Button
                  variant="ghost"
                  style={{
                    padding: '0.25rem 0.5rem',
                    minHeight: 'auto',
                  }}
                >
                  <Badge variant="solid">3 Errores</Badge>
                </Button>
                <Popover placement="top" variant="accent" size="large">
                  <PopoverContent title="Errores Detectados">
                    <PopoverBody>
                      <VStack space="2">
                        <Body2>• Error de conexión (línea 45)</Body2>
                        <Body2>• Timeout en API (línea 67)</Body2>
                        <Body2>• Validación fallida (línea 89)</Body2>
                      </VStack>
                    </PopoverBody>
                    <PopoverFooter>
                      <Button variant="primary" size="small">
                        Ver detalles
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </PopoverTrigger>

              <PopoverTrigger>
                <Button
                  variant="ghost"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--colors-background-secondary)',
                    borderRadius: '0.375rem',
                    border: '1px dashed var(--colors-border-primary)',
                    minHeight: 'auto',
                    fontWeight: 'normal',
                  }}
                >
                  Hover para más info
                </Button>
                <Popover placement="top" maxWidth={300}>
                  <PopoverBody>
                    Cualquier elemento puede ser un trigger para mostrar
                    información contextual adicional cuando el usuario
                    interactúa con él.
                  </PopoverBody>
                </Popover>
              </PopoverTrigger>
            </HStack>
          </div>
        </div>

        {/* API Reference */}
        <div>
          <H2>API Reference</H2>
          <Body2>
            Propiedades disponibles para personalizar el comportamiento del
            Popover.
          </Body2>

          <div className={styles.apiTable}>
            <div className={styles.apiRow}>
              <div className={styles.apiCell}>
                <Code>placement</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>'top' | 'bottom' | 'left' | 'right' | ...</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>'top'</Code>
              </div>
              <div className={styles.apiCell}>
                Posición del popover relativa al trigger
              </div>
            </div>

            <div className={styles.apiRow}>
              <div className={styles.apiCell}>
                <Code>size</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>'small' | 'medium' | 'large'</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>'medium'</Code>
              </div>
              <div className={styles.apiCell}>Tamaño del popover</div>
            </div>

            <div className={styles.apiRow}>
              <div className={styles.apiCell}>
                <Code>variant</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>'default' | 'inverse' | 'accent'</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>'default'</Code>
              </div>
              <div className={styles.apiCell}>Variante visual del popover</div>
            </div>

            <div className={styles.apiRow}>
              <div className={styles.apiCell}>
                <Code>showArrow</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>boolean</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>false</Code>
              </div>
              <div className={styles.apiCell}>
                Mostrar flecha apuntando al trigger
              </div>
            </div>

            <div className={styles.apiRow}>
              <div className={styles.apiCell}>
                <Code>offset</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>number</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>auto</Code>
              </div>
              <div className={styles.apiCell}>
                Distancia en pixels desde el trigger
              </div>
            </div>

            <div className={styles.apiRow}>
              <div className={styles.apiCell}>
                <Code>maxWidth</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>number</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>320</Code>
              </div>
              <div className={styles.apiCell}>
                Ancho máximo del popover en pixels
              </div>
            </div>

            <div className={styles.apiRow}>
              <div className={styles.apiCell}>
                <Code>isDismissable</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>boolean</Code>
              </div>
              <div className={styles.apiCell}>
                <Code>true</Code>
              </div>
              <div className={styles.apiCell}>
                Permite cerrar clickeando fuera o con ESC
              </div>
            </div>
          </div>
        </div>
      </VStack>
    </ContentWrapper>
  </Container>
);

export default PopoverPage;
