/* eslint-disable max-statements */
// Storybook stories for Tooltip components
// Interactive examples and documentation for different tooltip use cases
// RELEVANT FILES: ../../ui/tooltip/tooltip.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import {
  Download,
  HelpCircle,
  Info,
  Settings,
  Star,
  Trash,
} from 'lucide-react';

import {
  Badge,
  Body2,
  Button,
  H3,
  HStack,
  IconButton,
  Tooltip,
  TooltipTrigger,
  VStack,
} from '../../ui';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente Tooltip proporciona información contextual accesible construido con React Aria Components.

## Características

- **Accesibilidad completa**: Navegación por teclado y soporte para lectores de pantalla
- **Posicionamiento flexible**: 14+ opciones de posicionamiento alrededor del elemento trigger
- **Múltiples tamaños**: Pequeño, mediano y grande para diferentes tipos de contenido
- **Variantes visuales**: Estilos por defecto, inverso y con acento
- **Flecha opcional**: Indicador visual que apunta al elemento trigger
- **Delays configurables**: Control sobre los tiempos de aparición y desaparición
- **Responsive**: Se adapta automáticamente al espacio disponible

## Uso

\`\`\`tsx
import { Tooltip, TooltipTrigger, Button } from '@repo/ui';

<TooltipTrigger>
  <Button>Hover me</Button>
  <Tooltip placement="top" size="medium">
    Información útil aquí
  </Tooltip>
</TooltipTrigger>
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
      description: 'Posición del tooltip relativa al elemento trigger',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del tooltip',
    },
    variant: {
      control: 'select',
      options: ['default', 'inverse', 'accent'],
      description: 'Variante visual del tooltip',
    },
    showArrow: {
      control: 'boolean',
      description: 'Mostrar flecha apuntando al trigger',
    },
    offset: {
      control: 'number',
      description: 'Distancia en pixels entre tooltip y trigger',
    },
    maxWidth: {
      control: 'number',
      description: 'Ancho máximo del tooltip en pixels',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Tooltip básico con configuración por defecto
 */
export const Default: Story = {
  render: (args) => (
    <TooltipTrigger>
      <Button variant="primary">Hover para ver tooltip</Button>
      <Tooltip {...args}>
        Este es un tooltip básico que proporciona información adicional.
      </Tooltip>
    </TooltipTrigger>
  ),
  args: {
    placement: 'top',
    size: 'medium',
    variant: 'default',
    showArrow: false,
    offset: 8,
    maxWidth: 300,
  },
};

/**
 * Diferentes posiciones del tooltip alrededor del elemento trigger
 */
export const Placements: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <VStack space="8">
        <HStack space="4" justify="center">
          <TooltipTrigger>
            <Button variant="ghost" size="small">
              Top Start
            </Button>
            <Tooltip placement="top start">Tooltip arriba inicio</Tooltip>
          </TooltipTrigger>
          <TooltipTrigger>
            <Button variant="ghost" size="small">
              Top
            </Button>
            <Tooltip placement="top">Tooltip arriba centro</Tooltip>
          </TooltipTrigger>
          <TooltipTrigger>
            <Button variant="ghost" size="small">
              Top End
            </Button>
            <Tooltip placement="top end">Tooltip arriba final</Tooltip>
          </TooltipTrigger>
        </HStack>

        <HStack space="8" justify="center" align="center">
          <VStack space="4">
            <TooltipTrigger>
              <Button variant="ghost" size="small">
                Left Top
              </Button>
              <Tooltip placement="left top">Izquierda arriba</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button variant="ghost" size="small">
                Left
              </Button>
              <Tooltip placement="left">Izquierda centro</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button variant="ghost" size="small">
                Left Bottom
              </Button>
              <Tooltip placement="left bottom">Izquierda abajo</Tooltip>
            </TooltipTrigger>
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
            <TooltipTrigger>
              <Button variant="ghost" size="small">
                Right Top
              </Button>
              <Tooltip placement="right top">Derecha arriba</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button variant="ghost" size="small">
                Right
              </Button>
              <Tooltip placement="right">Derecha centro</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button variant="ghost" size="small">
                Right Bottom
              </Button>
              <Tooltip placement="right bottom">Derecha abajo</Tooltip>
            </TooltipTrigger>
          </VStack>
        </HStack>

        <HStack space="4" justify="center">
          <TooltipTrigger>
            <Button variant="ghost" size="small">
              Bottom Start
            </Button>
            <Tooltip placement="bottom start">Tooltip abajo inicio</Tooltip>
          </TooltipTrigger>
          <TooltipTrigger>
            <Button variant="ghost" size="small">
              Bottom
            </Button>
            <Tooltip placement="bottom">Tooltip abajo centro</Tooltip>
          </TooltipTrigger>
          <TooltipTrigger>
            <Button variant="ghost" size="small">
              Bottom End
            </Button>
            <Tooltip placement="bottom end">Tooltip abajo final</Tooltip>
          </TooltipTrigger>
        </HStack>
      </VStack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'El tooltip puede posicionarse en 14 ubicaciones diferentes alrededor del elemento trigger.',
      },
    },
  },
};

/**
 * Diferentes tamaños de tooltip para distintos tipos de contenido
 */
export const Sizes: Story = {
  render: () => (
    <HStack space="6">
      <TooltipTrigger>
        <Button variant="secondary" size="small">
          Small
        </Button>
        <Tooltip size="small">Breve</Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button variant="secondary">Medium</Button>
        <Tooltip size="medium">
          Información de tamaño mediano para la mayoría de casos.
        </Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button variant="secondary" size="large">
          Large
        </Button>
        <Tooltip size="large">
          Tooltip grande que puede contener información más detallada y
          explicaciones extensas sobre la funcionalidad.
        </Tooltip>
      </TooltipTrigger>
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
 * Diferentes variantes visuales del tooltip
 */
export const Variants: Story = {
  render: () => (
    <HStack space="6">
      <TooltipTrigger>
        <Button variant="ghost">Default</Button>
        <Tooltip variant="default">
          Estilo por defecto con fondo oscuro y texto claro.
        </Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button variant="secondary">Inverse</Button>
        <Tooltip variant="inverse">
          Estilo inverso con fondo claro y texto oscuro.
        </Tooltip>
      </TooltipTrigger>

      <TooltipTrigger>
        <Button variant="primary">Accent</Button>
        <Tooltip variant="accent">
          Estilo con color de acento para información destacada.
        </Tooltip>
      </TooltipTrigger>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tres variantes visuales: default (oscuro), inverse (claro) y accent (color de marca).',
      },
    },
  },
};

/**
 * Tooltips con flecha apuntando al elemento trigger
 */
export const WithArrow: Story = {
  render: () => (
    <VStack space="6">
      <HStack space="6">
        <TooltipTrigger>
          <Button variant="primary">Con Flecha</Button>
          <Tooltip showArrow placement="top">
            Tooltip con flecha apuntando hacia abajo
          </Tooltip>
        </TooltipTrigger>

        <TooltipTrigger>
          <Button variant="secondary">Sin Flecha</Button>
          <Tooltip showArrow={false} placement="top">
            Tooltip sin flecha
          </Tooltip>
        </TooltipTrigger>
      </HStack>

      <HStack space="6">
        <TooltipTrigger>
          <Button variant="ghost">Izquierda</Button>
          <Tooltip showArrow placement="left" variant="inverse">
            Flecha apunta a la derecha
          </Tooltip>
        </TooltipTrigger>

        <TooltipTrigger>
          <Button variant="danger">Abajo</Button>
          <Tooltip showArrow placement="bottom" variant="accent">
            Flecha apunta hacia arriba
          </Tooltip>
        </TooltipTrigger>
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Las flechas ayudan a conectar visualmente el tooltip con su elemento trigger.',
      },
    },
  },
};

/**
 * Ejemplos con IconButtons y diferentes tipos de iconos
 */
export const WithIconButtons: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3>Iconos de Acción</H3>
        <HStack space="3" style={{ marginTop: '1rem' }}>
          <TooltipTrigger>
            <IconButton icon={Settings} aria-label="Configuración" />
            <Tooltip placement="top" showArrow>
              Abrir configuración del sistema
            </Tooltip>
          </TooltipTrigger>

          <TooltipTrigger>
            <IconButton icon={HelpCircle} aria-label="Ayuda" />
            <Tooltip placement="top" showArrow>
              Ver documentación y ayuda
            </Tooltip>
          </TooltipTrigger>

          <TooltipTrigger>
            <IconButton icon={Info} aria-label="Información" />
            <Tooltip placement="top" showArrow variant="inverse">
              Más información sobre esta función
            </Tooltip>
          </TooltipTrigger>

          <TooltipTrigger>
            <IconButton icon={Star} aria-label="Favorito" />
            <Tooltip placement="top" showArrow variant="accent">
              Marcar como favorito
            </Tooltip>
          </TooltipTrigger>
        </HStack>
      </div>

      <div>
        <H3>Acciones Destructivas</H3>
        <HStack space="3" style={{ marginTop: '1rem' }}>
          <TooltipTrigger>
            <IconButton icon={Trash} aria-label="Eliminar" variant="danger" />
            <Tooltip placement="top" showArrow size="large">
              Eliminar elemento permanentemente. Esta acción no se puede
              deshacer.
            </Tooltip>
          </TooltipTrigger>

          <TooltipTrigger>
            <IconButton icon={Download} aria-label="Descargar" />
            <Tooltip placement="top" showArrow>
              Descargar archivo (2.3 MB)
            </Tooltip>
          </TooltipTrigger>
        </HStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los tooltips son especialmente útiles con IconButtons para explicar la función de cada icono.',
      },
    },
  },
};

/**
 * Tooltips con diferentes elementos como badges y contenido complejo
 */
export const WithOtherElements: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3>Estados con Badges</H3>
        <HStack space="4" style={{ marginTop: '1rem' }}>
          <TooltipTrigger>
            <Badge variant="solid">Activo</Badge>
            <Tooltip placement="top" variant="default">
              El servicio está funcionando correctamente. Última verificación:
              hace 2 minutos.
            </Tooltip>
          </TooltipTrigger>

          <TooltipTrigger>
            <Badge variant="subtle">Pendiente</Badge>
            <Tooltip placement="top" variant="inverse">
              Esperando aprobación del administrador. Tiempo estimado: 24 horas.
            </Tooltip>
          </TooltipTrigger>

          <TooltipTrigger>
            <Badge variant="outline">Error</Badge>
            <Tooltip placement="top" variant="accent" showArrow>
              Error en la conexión. Reintentando automáticamente en 30 segundos.
            </Tooltip>
          </TooltipTrigger>
        </HStack>
      </div>

      <div>
        <H3>Texto Truncado</H3>
        <div style={{ marginTop: '1rem' }}>
          <TooltipTrigger>
            <div
              style={{
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: 'help',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              Este es un texto muy largo que ha sido truncado...
            </div>
            <Tooltip placement="top" maxWidth={400}>
              Este es un texto muy largo que ha sido truncado para ahorrar
              espacio en la interfaz, pero puedes ver el contenido completo aquí
              en el tooltip al hacer hover sobre el elemento.
            </Tooltip>
          </TooltipTrigger>
        </div>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los tooltips pueden usarse con cualquier elemento para proporcionar información contextual adicional.',
      },
    },
  },
};

/**
 * Tooltips con delays personalizados para diferentes experiencias de usuario
 */
export const CustomDelays: Story = {
  render: () => (
    <VStack space="4">
      <Body2>
        Prueba hacer hover sobre estos botones para experimentar diferentes
        delays:
      </Body2>

      <HStack space="6">
        <TooltipTrigger delay={0} closeDelay={0}>
          <Button variant="ghost">Inmediato</Button>
          <Tooltip>Sin delay - aparece inmediatamente</Tooltip>
        </TooltipTrigger>

        <TooltipTrigger delay={700} closeDelay={0}>
          <Button variant="secondary">Normal</Button>
          <Tooltip>Delay normal de 700ms</Tooltip>
        </TooltipTrigger>

        <TooltipTrigger delay={1500} closeDelay={300}>
          <Button variant="primary">Lento</Button>
          <Tooltip>Delay largo de 1.5s, cierre lento 300ms</Tooltip>
        </TooltipTrigger>
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los delays pueden ajustarse para crear diferentes experiencias de usuario según el contexto.',
      },
    },
  },
};

/**
 * Ejemplo con offset personalizado y ancho máximo
 */
export const CustomSizing: Story = {
  render: () => (
    <VStack space="6">
      <HStack space="6">
        <TooltipTrigger>
          <Button variant="secondary">Offset Pequeño</Button>
          <Tooltip offset={4} showArrow>
            Tooltip muy cerca del botón (4px)
          </Tooltip>
        </TooltipTrigger>

        <TooltipTrigger>
          <Button variant="secondary">Offset Grande</Button>
          <Tooltip offset={20} showArrow>
            Tooltip alejado del botón (20px)
          </Tooltip>
        </TooltipTrigger>
      </HStack>

      <HStack space="6">
        <TooltipTrigger>
          <Button variant="primary">Ancho Estrecho</Button>
          <Tooltip maxWidth={150} placement="top">
            Tooltip con ancho máximo de 150px que fuerza el wrapping del texto
            en líneas múltiples.
          </Tooltip>
        </TooltipTrigger>

        <TooltipTrigger>
          <Button variant="primary">Ancho Amplio</Button>
          <Tooltip maxWidth={500} placement="bottom">
            Tooltip con ancho máximo de 500px que permite líneas de texto más
            largas antes de hacer wrap, ideal para explicaciones detalladas.
          </Tooltip>
        </TooltipTrigger>
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'El offset y ancho máximo pueden personalizarse para diferentes necesidades de diseño.',
      },
    },
  },
};
