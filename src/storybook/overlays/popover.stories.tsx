// /src/storybook/overlays/popover.stories.tsx
// Storybook stories for Popover components
// Interactive examples and documentation for different popover use cases
// RELEVANT FILES: ../../ui/popover/popover.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import {
  Download,
  HelpCircle,
  Info,
  Settings,
  Star,
  Trash,
  User,
} from 'lucide-react';

import {
  Badge,
  Body2,
  Button,
  H3,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  VStack,
} from '../../ui';

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente Popover proporciona contenido contextual accesible construido con React Aria Components.

## Características

- **Accesibilidad completa**: Navegación por teclado y soporte para lectores de pantalla
- **Posicionamiento flexible**: 14+ opciones de posicionamiento alrededor del elemento trigger
- **Múltiples tamaños**: Pequeño, mediano y grande para diferentes tipos de contenido
- **Variantes visuales**: Estilos por defecto, inverso y con acento
- **Flecha opcional**: Indicador visual que apunta al elemento trigger
- **Contenido estructurado**: Header, body y footer para layouts complejos
- **Contenido interactivo**: Soporte para botones, formularios y otros controles
- **Responsive**: Se adapta automáticamente al espacio disponible

## Diferencias con Tooltip

- **Popover**: Para contenido interactivo y complejo (botones, formularios, listas)
- **Tooltip**: Para información simple y no interactiva

## Uso

\`\`\`tsx
import { Popover, PopoverTrigger, PopoverContent } from '@repo/ui';

<PopoverTrigger>
  <Button>Click me</Button>
  <Popover placement="top" size="medium" showArrow>
    <PopoverContent title="Information">
      Contenido interactivo aquí
    </PopoverContent>
  </Popover>
</PopoverTrigger>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'start',
        'end',
        'top start',
        'top end',
        'bottom start',
        'bottom end',
        'left top',
        'left bottom',
        'right top',
        'right bottom',
      ],
      description: 'Posición del popover relativa al elemento trigger',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del popover',
    },
    variant: {
      control: 'select',
      options: ['default', 'inverse', 'accent'],
      description: 'Variante visual del popover',
    },
    showArrow: {
      control: 'boolean',
      description: 'Mostrar flecha apuntando al trigger',
    },
    offset: {
      control: 'number',
      description: 'Distancia en pixels entre popover y trigger',
    },
    maxWidth: {
      control: 'number',
      description: 'Ancho máximo del popover en pixels',
    },
    isDismissable: {
      control: 'boolean',
      description: 'Permitir cerrar clickeando fuera o con ESC',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Popover básico con contenido estructurado
 */
export const Default: Story = {
  render: (args) => (
    <PopoverTrigger>
      <Button variant="primary">Abrir Popover</Button>
      <Popover {...args}>
        <PopoverContent title="Información del Usuario">
          Este popover contiene información contextual estructurada con título y
          contenido organizado para una mejor experiencia de usuario.
        </PopoverContent>
      </Popover>
    </PopoverTrigger>
  ),
  args: {
    placement: 'top',
    size: 'medium',
    variant: 'default',
    showArrow: true,
    offset: 8,
    maxWidth: 320,
    isDismissable: true,
  },
};

/**
 * Diferentes posiciones del popover alrededor del elemento trigger
 */
export const Placements: Story = {
  render: () => (
    <div style={{ padding: '120px' }}>
      <VStack space="8">
        <HStack space="4" style={{ justifyContent: 'center' }}>
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
              Top
            </Button>
            <Popover placement="top" showArrow>
              <PopoverBody>Popover arriba centro</PopoverBody>
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

        <HStack space="8" justify="center" align="center">
          <VStack space="4">
            <PopoverTrigger>
              <Button variant="ghost" size="small">
                Left Top
              </Button>
              <Popover placement="left top" showArrow>
                <PopoverBody>Izquierda arriba</PopoverBody>
              </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
              <Button variant="ghost" size="small">
                Left
              </Button>
              <Popover placement="left" showArrow>
                <PopoverBody>Izquierda centro</PopoverBody>
              </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
              <Button variant="ghost" size="small">
                Left Bottom
              </Button>
              <Popover placement="left bottom" showArrow>
                <PopoverBody>Izquierda abajo</PopoverBody>
              </Popover>
            </PopoverTrigger>
          </VStack>

          <div
            style={{
              padding: '2rem',
              border: '2px dashed #ccc',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Body2>Elemento central</Body2>
          </div>

          <VStack space="4">
            <PopoverTrigger>
              <Button variant="ghost" size="small">
                Right Top
              </Button>
              <Popover placement="right top" showArrow>
                <PopoverBody>Derecha arriba</PopoverBody>
              </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
              <Button variant="ghost" size="small">
                Right
              </Button>
              <Popover placement="right" showArrow>
                <PopoverBody>Derecha centro</PopoverBody>
              </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
              <Button variant="ghost" size="small">
                Right Bottom
              </Button>
              <Popover placement="right bottom" showArrow>
                <PopoverBody>Derecha abajo</PopoverBody>
              </Popover>
            </PopoverTrigger>
          </VStack>
        </HStack>

        <HStack space="4" style={{ justifyContent: 'center' }}>
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
              Bottom
            </Button>
            <Popover placement="bottom" showArrow>
              <PopoverBody>Popover abajo centro</PopoverBody>
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          'El popover puede posicionarse en 14 ubicaciones diferentes alrededor del elemento trigger.',
      },
    },
  },
};

/**
 * Diferentes tamaños de popover para distintos tipos de contenido
 */
export const Sizes: Story = {
  render: () => (
    <HStack space="6">
      <PopoverTrigger>
        <Button variant="secondary" size="small">
          Small
        </Button>
        <Popover size="small" showArrow>
          <PopoverContent title="Pequeño">
            Contenido breve y conciso.
          </PopoverContent>
        </Popover>
      </PopoverTrigger>

      <PopoverTrigger>
        <Button variant="secondary">Medium</Button>
        <Popover size="medium" showArrow>
          <PopoverContent title="Mediano">
            Contenido de tamaño mediano con más información detallada para casos
            de uso estándar.
          </PopoverContent>
        </Popover>
      </PopoverTrigger>

      <PopoverTrigger>
        <Button variant="secondary" size="large">
          Large
        </Button>
        <Popover size="large" showArrow>
          <PopoverContent title="Grande">
            Popover grande que puede contener información más extensa, múltiples
            párrafos, listas de elementos, formularios complejos y otros
            componentes que requieren más espacio para una presentación adecuada
            del contenido.
          </PopoverContent>
        </Popover>
      </PopoverTrigger>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tres tamaños diferentes para adaptarse al tipo de contenido: small, medium y large.',
      },
    },
  },
};

/**
 * Diferentes variantes visuales del popover
 */
export const Variants: Story = {
  render: () => (
    <HStack space="6">
      <PopoverTrigger>
        <Button variant="ghost">Default</Button>
        <Popover variant="default" showArrow>
          <PopoverContent title="Default">
            Estilo por defecto que se adapta al tema actual del sistema.
          </PopoverContent>
        </Popover>
      </PopoverTrigger>

      <PopoverTrigger>
        <Button variant="secondary">Inverse</Button>
        <Popover variant="inverse" showArrow>
          <PopoverContent title="Inverse">
            Estilo inverso con colores contrastantes para destacar.
          </PopoverContent>
        </Popover>
      </PopoverTrigger>

      <PopoverTrigger>
        <Button variant="primary">Accent</Button>
        <Popover variant="accent" showArrow>
          <PopoverContent title="Accent">
            Estilo con color de acento para información importante.
          </PopoverContent>
        </Popover>
      </PopoverTrigger>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tres variantes visuales: default (tema actual), inverse (contrastante) y accent (color de marca).',
      },
    },
  },
};

/**
 * Popovers con contenido interactivo usando header, body y footer
 */
export const InteractiveContent: Story = {
  render: () => (
    <VStack space="6">
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
                    <Body2>Configurar preferencias de notificación.</Body2>
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

      <HStack space="6">
        <PopoverTrigger>
          <Button variant="danger">Eliminar Proyecto</Button>
          <Popover placement="top" size="large" variant="default">
            <PopoverContent title="⚠️ Confirmar Eliminación" showCloseButton>
              <PopoverBody>
                <VStack space="3">
                  <Body2>
                    Esta acción eliminará permanentemente el proyecto
                    <strong> "Mi Proyecto"</strong> y todos sus datos asociados.
                  </Body2>
                  <Body2 style={{ color: 'var(--colors-text-danger)' }}>
                    Esta acción no se puede deshacer.
                  </Body2>
                </VStack>
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
          <Button variant="primary">Crear Nuevo</Button>
          <Popover placement="top" size="medium">
            <PopoverContent title="Crear Elemento">
              <PopoverBody>
                <VStack space="2">
                  <Button
                    variant="ghost"
                    size="small"
                    style={{
                      justifyContent: 'flex-start',
                      width: '100%',
                    }}
                  >
                    📄 Documento
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    style={{
                      justifyContent: 'flex-start',
                      width: '100%',
                    }}
                  >
                    📊 Hoja de cálculo
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    style={{
                      justifyContent: 'flex-start',
                      width: '100%',
                    }}
                  >
                    📋 Presentación
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    style={{
                      justifyContent: 'flex-start',
                      width: '100%',
                    }}
                  >
                    📁 Carpeta
                  </Button>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </PopoverTrigger>
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Popovers con contenido interactivo usando PopoverContent, PopoverBody y PopoverFooter para layouts estructurados.',
      },
    },
  },
};

/**
 * Ejemplos con IconButtons para diferentes tipos de acciones
 */
export const WithIconButtons: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3>Iconos de Información</H3>
        <HStack space="3" style={{ marginTop: '1rem' }}>
          <PopoverTrigger>
            <IconButton icon={Settings} aria-label="Configuración" />
            <Popover placement="top" showArrow>
              <PopoverContent title="Configuración">
                Abrir panel de configuración del sistema
              </PopoverContent>
            </Popover>
          </PopoverTrigger>

          <PopoverTrigger>
            <IconButton icon={HelpCircle} aria-label="Ayuda" />
            <Popover placement="top" showArrow variant="inverse">
              <PopoverContent title="Centro de Ayuda">
                Accede a documentación, tutoriales y soporte técnico
              </PopoverContent>
            </Popover>
          </PopoverTrigger>

          <PopoverTrigger>
            <IconButton icon={Info} aria-label="Información" />
            <Popover placement="top" showArrow variant="accent" size="large">
              <PopoverContent title="Información del Sistema">
                <PopoverBody>
                  <VStack space="2">
                    <Body2>
                      <strong>Versión:</strong> 2.1.0
                    </Body2>
                    <Body2>
                      <strong>Estado:</strong> Operativo
                    </Body2>
                    <Body2>
                      <strong>Última actualización:</strong> Hace 2 días
                    </Body2>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </PopoverTrigger>

          <PopoverTrigger>
            <IconButton icon={User} aria-label="Perfil" />
            <Popover placement="top" showArrow size="medium">
              <PopoverContent title="Mi Perfil">
                <PopoverBody>
                  <VStack space="3">
                    <div>
                      <Body2>
                        <strong>Usuario:</strong> Ana García
                      </Body2>
                      <Body2>
                        <strong>Rol:</strong> Administradora
                      </Body2>
                    </div>
                    <HStack space="2">
                      <Badge variant="solid">Activo</Badge>
                      <Badge variant="subtle">Premium</Badge>
                    </HStack>
                  </VStack>
                </PopoverBody>
                <PopoverFooter>
                  <Button variant="primary" size="small">
                    Ver perfil
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </PopoverTrigger>
        </HStack>
      </div>

      <div>
        <H3>Acciones Críticas</H3>
        <HStack space="3" style={{ marginTop: '1rem' }}>
          <PopoverTrigger>
            <IconButton icon={Trash} aria-label="Eliminar" variant="danger" />
            <Popover placement="top" showArrow size="large">
              <PopoverContent title="⚠️ Eliminar Elemento" showCloseButton>
                <PopoverBody>
                  Esta acción eliminará el elemento permanentemente. Los datos
                  asociados no podrán recuperarse.
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
                  <VStack space="2">
                    <Body2>
                      <strong>Archivo:</strong> documento.pdf
                    </Body2>
                    <Body2>
                      <strong>Tamaño:</strong> 2.3 MB
                    </Body2>
                    <Body2>
                      <strong>Formato:</strong> PDF
                    </Body2>
                  </VStack>
                </PopoverBody>
                <PopoverFooter>
                  <Button variant="primary" size="small">
                    Descargar
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </PopoverTrigger>

          <PopoverTrigger>
            <IconButton icon={Star} aria-label="Favorito" />
            <Popover placement="top" showArrow variant="accent">
              <PopoverBody>Agregar a favoritos para acceso rápido</PopoverBody>
            </Popover>
          </PopoverTrigger>
        </HStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los popovers son ideales con IconButtons para mostrar información detallada y acciones contextuales.',
      },
    },
  },
};

/**
 * Popovers con diferentes elementos como badges y contenido de estado
 */
export const WithOtherElements: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3>Estados con Badges</H3>
        <HStack space="4" style={{ marginTop: '1rem' }}>
          <PopoverTrigger>
            <Button
              variant="ghost"
              style={{
                padding: '0.25rem 0.5rem',
                minHeight: 'auto',
              }}
            >
              <Badge variant="solid">Activo</Badge>
            </Button>
            <Popover placement="top" variant="default">
              <PopoverContent title="Estado: Activo">
                <PopoverBody>
                  El servicio está funcionando correctamente. Última
                  verificación: hace 2 minutos.
                </PopoverBody>
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
              <Badge variant="subtle">Pendiente</Badge>
            </Button>
            <Popover placement="top" variant="inverse" size="medium">
              <PopoverContent title="Estado: Pendiente">
                <PopoverBody>
                  <VStack space="2">
                    <Body2>Esperando aprobación del administrador.</Body2>
                    <Body2>
                      <strong>Tiempo estimado:</strong> 24 horas
                    </Body2>
                    <Body2>
                      <strong>Prioridad:</strong> Media
                    </Body2>
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
                padding: '0.25rem 0.5rem',
                minHeight: 'auto',
              }}
            >
              <Badge variant="outline">3 Errores</Badge>
            </Button>
            <Popover placement="top" variant="accent" showArrow size="large">
              <PopoverContent title="Errores Detectados" showCloseButton>
                <PopoverBody>
                  <VStack space="2">
                    <Body2>• Error de conexión (línea 45)</Body2>
                    <Body2>• Timeout en API (línea 67)</Body2>
                    <Body2>• Validación fallida (línea 89)</Body2>
                  </VStack>
                </PopoverBody>
                <PopoverFooter>
                  <Button variant="ghost" size="small">
                    Ver log
                  </Button>
                  <Button variant="primary" size="small">
                    Reintentar
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </PopoverTrigger>
        </HStack>
      </div>

      <div>
        <H3>Elementos Personalizados</H3>
        <HStack space="4" style={{ marginTop: '1rem' }}>
          <PopoverTrigger>
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--colors-surface-secondary)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                border: '2px dashed var(--colors-border-default)',
                transition: 'all 0.2s ease',
              }}
            >
              <Body2>📊 Estadísticas</Body2>
            </div>
            <Popover placement="top" showArrow maxWidth={350}>
              <PopoverContent title="Estadísticas del Proyecto">
                <PopoverBody>
                  <VStack space="3">
                    <HStack
                      space="4"
                      style={{ justifyContent: 'space-between' }}
                    >
                      <Body2>Visitantes únicos:</Body2>
                      <Body2 style={{ fontWeight: '600' }}>1,234</Body2>
                    </HStack>
                    <HStack
                      space="4"
                      style={{ justifyContent: 'space-between' }}
                    >
                      <Body2>Conversiones:</Body2>
                      <Body2 style={{ fontWeight: '600' }}>89</Body2>
                    </HStack>
                    <HStack
                      space="4"
                      style={{ justifyContent: 'space-between' }}
                    >
                      <Body2>Tasa de rebote:</Body2>
                      <Body2 style={{ fontWeight: '600' }}>23.4%</Body2>
                    </HStack>
                  </VStack>
                </PopoverBody>
                <PopoverFooter>
                  <Button variant="primary" size="small">
                    Ver reporte completo
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </PopoverTrigger>

          <PopoverTrigger>
            <div
              style={{
                padding: '0.5rem',
                backgroundColor: 'var(--colors-accent-surface)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
              }}
            >
              <Body2>?</Body2>
            </div>
            <Popover placement="right" variant="accent" showArrow>
              <PopoverBody>
                Click en cualquier elemento puede activar un popover con
                información contextual útil.
              </PopoverBody>
            </Popover>
          </PopoverTrigger>
        </HStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los popovers pueden usarse con cualquier elemento interactivo para proporcionar información contextual.',
      },
    },
  },
};

/**
 * Configuraciones avanzadas con offsets y anchos personalizados
 */
export const AdvancedConfiguration: Story = {
  render: () => (
    <VStack space="6">
      <HStack space="6">
        <PopoverTrigger>
          <Button variant="secondary">Offset Pequeño</Button>
          <Popover offset={4} showArrow placement="top">
            <PopoverBody>Popover muy cerca del botón (4px)</PopoverBody>
          </Popover>
        </PopoverTrigger>

        <PopoverTrigger>
          <Button variant="secondary">Offset Grande</Button>
          <Popover offset={20} showArrow placement="top">
            <PopoverBody>Popover alejado del botón (20px)</PopoverBody>
          </Popover>
        </PopoverTrigger>
      </HStack>

      <HStack space="6">
        <PopoverTrigger>
          <Button variant="primary">Ancho Estrecho</Button>
          <Popover maxWidth={180} placement="bottom" showArrow>
            <PopoverContent title="Compacto">
              Popover con ancho limitado que fuerza el texto a múltiples líneas.
            </PopoverContent>
          </Popover>
        </PopoverTrigger>

        <PopoverTrigger>
          <Button variant="primary">Ancho Amplio</Button>
          <Popover maxWidth={500} placement="bottom" showArrow size="large">
            <PopoverContent title="Espacioso">
              Popover con ancho amplio que permite contenido extenso sin
              restricciones, ideal para explicaciones detalladas, formularios
              complejos o múltiples elementos en una sola línea.
            </PopoverContent>
          </Popover>
        </PopoverTrigger>
      </HStack>

      <HStack space="6">
        <PopoverTrigger>
          <Button variant="ghost">Sin Dismiss</Button>
          <Popover isDismissable={false} placement="top">
            <PopoverContent title="Popover Persistente" showCloseButton>
              Este popover solo se puede cerrar con el botón X.
            </PopoverContent>
          </Popover>
        </PopoverTrigger>

        <PopoverTrigger>
          <Button variant="ghost">Sin ESC</Button>
          <Popover isKeyboardDismissDisabled placement="top">
            <PopoverContent title="Sin teclado">
              No se puede cerrar con ESC, solo clickeando fuera.
            </PopoverContent>
          </Popover>
        </PopoverTrigger>
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Configuraciones avanzadas para casos de uso específicos con offsets, anchos y comportamientos personalizados.',
      },
    },
  },
};
