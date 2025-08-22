// /src/storybook/overlays/menu.stories.tsx
// Storybook stories for Menu components
// Interactive examples and documentation for different menu use cases
// RELEVANT FILES: ../../ui/menu/menu.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Save,
  Scissors,
  Settings,
  Share,
  Trash,
  User,
  Zap,
} from 'lucide-react';

import { Icon } from '../../icons';
import {
  Body2,
  Button,
  H3,
  HStack,
  IconButton,
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
  VStack,
} from '../../ui';

const meta: Meta<typeof Menu> = {
  title: 'Overlays/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente Menu proporciona menús contextuales accesibles construidos con React Aria Components.

## Características

- **Accesibilidad completa**: Navegación por teclado y soporte para lectores de pantalla
- **Posicionamiento flexible**: 14+ opciones de posicionamiento alrededor del elemento trigger
- **Múltiples tamaños**: Pequeño, mediano y grande para diferentes contextos
- **Secciones organizadas**: Agrupa elementos relacionados con encabezados opcionales
- **Atajos de teclado**: Muestra atajos opcionales para acciones rápidas
- **Iconos integrados**: Soporte para iconos de inicio y fin en elementos del menú
- **Variantes de elementos**: Diferentes estilos para acciones normales, éxito, advertencia y peligro

## Uso

\`\`\`tsx
import { MenuTrigger, Menu, MenuItem, Button } from '@repo/ui';

<MenuTrigger>
  <Button>Abrir menú</Button>
  <Menu onAction={(key) => console.log(key)}>
    <MenuItem id="edit">Editar</MenuItem>
    <MenuItem id="delete" variant="danger">Eliminar</MenuItem>
  </Menu>
</MenuTrigger>
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
      description: 'Posición del menú relativa al elemento trigger',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del menú',
    },
    variant: {
      control: 'select',
      options: ['default', 'accent', 'inverse'],
      description: 'Variante visual del menú',
    },
    offset: {
      control: 'number',
      description: 'Distancia en pixels entre menú y trigger',
    },
    maxWidth: {
      control: 'number',
      description: 'Ancho máximo del menú en pixels',
    },
    minWidth: {
      control: 'number',
      description: 'Ancho mínimo del menú en pixels',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Menú básico con elementos simples
 */
export const Default: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button variant="primary">Acciones</Button>
      <Menu
        {...args}
        onAction={(key) => console.log('Acción seleccionada:', key)}
      >
        <MenuItem id="edit">
          <Icon icon={Edit} size="sm" />
          Editar
        </MenuItem>
        <MenuItem id="copy">
          <Icon icon={Copy} size="sm" />
          Copiar
        </MenuItem>
        <MenuItem id="delete" variant="danger">
          <Icon icon={Trash} size="sm" />
          Eliminar
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {
    placement: 'bottom start',
    size: 'medium',
    variant: 'default',
    offset: 4,
    maxWidth: 320,
    minWidth: 200,
  },
};

/**
 * Diferentes tamaños de menú para distintos contextos
 */
export const Sizes: Story = {
  render: () => (
    <HStack space="6">
      <MenuTrigger>
        <Button size="small" variant="secondary">
          Small
        </Button>
        <Menu size="small">
          <MenuItem id="option1">Opción 1</MenuItem>
          <MenuItem id="option2">Opción 2</MenuItem>
          <MenuItem id="option3">Opción 3</MenuItem>
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button variant="secondary">Medium</Button>
        <Menu size="medium">
          <MenuItem id="option1">Opción con más texto</MenuItem>
          <MenuItem id="option2">Segunda opción</MenuItem>
          <MenuItem id="option3">Tercera opción</MenuItem>
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button size="large" variant="secondary">
          Large
        </Button>
        <Menu size="large">
          <MenuItem id="option1">
            <Icon icon={User} size="sm" />
            Perfil de usuario
          </MenuItem>
          <MenuItem id="option2">
            <Icon icon={Settings} size="sm" />
            Configuración avanzada
          </MenuItem>
          <MenuItem id="option3">
            <Icon icon={Zap} size="sm" />
            Herramientas de desarrollo
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tres tamaños diferentes para adaptar el menú al contexto: small, medium y large.',
      },
    },
  },
};

/**
 * Diferentes posiciones del menú alrededor del trigger
 */
export const Placements: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <VStack space="8">
        <HStack space="4" style={{ justifyContent: 'center' }}>
          <MenuTrigger>
            <Button variant="ghost" size="small">
              Top Start
            </Button>
            <Menu placement="top start">
              <MenuItem id="ts1">Top Start 1</MenuItem>
              <MenuItem id="ts2">Top Start 2</MenuItem>
            </Menu>
          </MenuTrigger>
          <MenuTrigger>
            <Button variant="ghost" size="small">
              Top
            </Button>
            <Menu placement="top">
              <MenuItem id="t1">Top 1</MenuItem>
              <MenuItem id="t2">Top 2</MenuItem>
            </Menu>
          </MenuTrigger>
          <MenuTrigger>
            <Button variant="ghost" size="small">
              Top End
            </Button>
            <Menu placement="top end">
              <MenuItem id="te1">Top End 1</MenuItem>
              <MenuItem id="te2">Top End 2</MenuItem>
            </Menu>
          </MenuTrigger>
        </HStack>

        <HStack space="8" justify="center" align="center">
          <VStack space="4">
            <MenuTrigger>
              <Button variant="ghost" size="small">
                Left Top
              </Button>
              <Menu placement="left top">
                <MenuItem id="lt1">Left Top 1</MenuItem>
                <MenuItem id="lt2">Left Top 2</MenuItem>
              </Menu>
            </MenuTrigger>
            <MenuTrigger>
              <Button variant="ghost" size="small">
                Left
              </Button>
              <Menu placement="left">
                <MenuItem id="l1">Left 1</MenuItem>
                <MenuItem id="l2">Left 2</MenuItem>
              </Menu>
            </MenuTrigger>
            <MenuTrigger>
              <Button variant="ghost" size="small">
                Left Bottom
              </Button>
              <Menu placement="left bottom">
                <MenuItem id="lb1">Left Bottom 1</MenuItem>
                <MenuItem id="lb2">Left Bottom 2</MenuItem>
              </Menu>
            </MenuTrigger>
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
            <MenuTrigger>
              <Button variant="ghost" size="small">
                Right Top
              </Button>
              <Menu placement="right top">
                <MenuItem id="rt1">Right Top 1</MenuItem>
                <MenuItem id="rt2">Right Top 2</MenuItem>
              </Menu>
            </MenuTrigger>
            <MenuTrigger>
              <Button variant="ghost" size="small">
                Right
              </Button>
              <Menu placement="right">
                <MenuItem id="r1">Right 1</MenuItem>
                <MenuItem id="r2">Right 2</MenuItem>
              </Menu>
            </MenuTrigger>
            <MenuTrigger>
              <Button variant="ghost" size="small">
                Right Bottom
              </Button>
              <Menu placement="right bottom">
                <MenuItem id="rb1">Right Bottom 1</MenuItem>
                <MenuItem id="rb2">Right Bottom 2</MenuItem>
              </Menu>
            </MenuTrigger>
          </VStack>
        </HStack>

        <HStack space="4" style={{ justifyContent: 'center' }}>
          <MenuTrigger>
            <Button variant="ghost" size="small">
              Bottom Start
            </Button>
            <Menu placement="bottom start">
              <MenuItem id="bs1">Bottom Start 1</MenuItem>
              <MenuItem id="bs2">Bottom Start 2</MenuItem>
            </Menu>
          </MenuTrigger>
          <MenuTrigger>
            <Button variant="ghost" size="small">
              Bottom
            </Button>
            <Menu placement="bottom">
              <MenuItem id="b1">Bottom 1</MenuItem>
              <MenuItem id="b2">Bottom 2</MenuItem>
            </Menu>
          </MenuTrigger>
          <MenuTrigger>
            <Button variant="ghost" size="small">
              Bottom End
            </Button>
            <Menu placement="bottom end">
              <MenuItem id="be1">Bottom End 1</MenuItem>
              <MenuItem id="be2">Bottom End 2</MenuItem>
            </Menu>
          </MenuTrigger>
        </HStack>
      </VStack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'El menú puede posicionarse en 14 ubicaciones diferentes alrededor del elemento trigger.',
      },
    },
  },
};

/**
 * Menú organizado en secciones con encabezados
 */
export const WithSections: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="primary">Editar</Button>
      <Menu
        size="large"
        onAction={(key) => console.log('Sección seleccionada:', key)}
      >
        <MenuSection title="Portapapeles">
          <MenuItem id="cut" shortcut="⌘X">
            <Icon icon={Scissors} size="sm" />
            Cortar
          </MenuItem>
          <MenuItem id="copy" shortcut="⌘C">
            <Icon icon={Copy} size="sm" />
            Copiar
          </MenuItem>
          <MenuItem id="paste" shortcut="⌘V">
            <Icon icon={Copy} size="sm" />
            Pegar
          </MenuItem>
        </MenuSection>

        <MenuSeparator />

        <MenuSection title="Archivo">
          <MenuItem id="save" shortcut="⌘S">
            <Icon icon={Save} size="sm" />
            Guardar
          </MenuItem>
          <MenuItem id="download">
            <Icon icon={Download} size="sm" />
            Descargar
          </MenuItem>
        </MenuSection>

        <MenuSeparator />

        <MenuSection title="Acciones">
          <MenuItem id="share">
            <Icon icon={Share} size="sm" />
            Compartir
          </MenuItem>
          <MenuItem id="settings">
            <Icon icon={Settings} size="sm" />
            Configuración
          </MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los menús pueden organizarse en secciones semánticas con encabezados y separadores.',
      },
    },
  },
};

/**
 * Diferentes variantes visuales de elementos del menú
 */
export const ItemVariants: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Estados</Button>
      <Menu onAction={(key) => console.log('Variante seleccionada:', key)}>
        <MenuItem id="normal">Elemento normal</MenuItem>
        <MenuItem id="success" variant="success">
          <Icon icon={Check} size="sm" />
          Acción exitosa
        </MenuItem>
        <MenuItem id="warning" variant="warning">
          <Icon icon={AlertTriangle} size="sm" />
          Acción con precaución
        </MenuItem>
        <MenuItem id="danger" variant="danger">
          <Icon icon={Trash} size="sm" />
          Acción destructiva
        </MenuItem>
        <MenuSeparator />
        <MenuItem id="disabled" isDisabled>
          Elemento deshabilitado
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los elementos pueden tener diferentes variantes visuales para indicar tipos de acciones.',
      },
    },
  },
};

/**
 * Menús con IconButtons para interfaces más compactas
 */
export const WithIconButtons: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <H3>Menús de Acción</H3>
        <HStack space="3" style={{ marginTop: '1rem' }}>
          <MenuTrigger>
            <IconButton
              icon={MoreHorizontal}
              aria-label="Más opciones"
              variant="ghost"
            />
            <Menu onAction={(key) => console.log('Más opciones:', key)}>
              <MenuItem id="view">
                <Icon icon={Eye} size="sm" />
                Ver detalles
              </MenuItem>
              <MenuItem id="edit">
                <Icon icon={Edit} size="sm" />
                Editar elemento
              </MenuItem>
              <MenuSeparator />
              <MenuItem id="delete" variant="danger">
                <Icon icon={Trash} size="sm" />
                Eliminar
              </MenuItem>
            </Menu>
          </MenuTrigger>

          <MenuTrigger>
            <IconButton icon={Settings} aria-label="Configuración" />
            <Menu
              variant="accent"
              onAction={(key) => console.log('Configuración:', key)}
            >
              <MenuItem id="general">Configuración general</MenuItem>
              <MenuItem id="privacy">Privacidad</MenuItem>
              <MenuItem id="notifications">Notificaciones</MenuItem>
              <MenuSeparator />
              <MenuItem id="logout" variant="danger">
                Cerrar sesión
              </MenuItem>
            </Menu>
          </MenuTrigger>

          <MenuTrigger>
            <IconButton icon={FileText} aria-label="Archivo" />
            <Menu onAction={(key) => console.log('Archivo:', key)}>
              <MenuItem id="new" shortcut="⌘N">
                Nuevo archivo
              </MenuItem>
              <MenuItem id="open" shortcut="⌘O">
                Abrir archivo
              </MenuItem>
              <MenuItem id="save" shortcut="⌘S">
                Guardar
              </MenuItem>
              <MenuSeparator />
              <MenuItem id="export">Exportar como...</MenuItem>
            </Menu>
          </MenuTrigger>
        </HStack>
      </div>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los menús funcionan perfectamente con IconButtons para crear interfaces más compactas.',
      },
    },
  },
};

/**
 * Elementos con atajos de teclado y iconos
 */
export const WithShortcuts: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="primary">Archivo</Button>
      <Menu onAction={(key) => console.log('Atajo usado:', key)}>
        <MenuItem id="new" shortcut="⌘N">
          <Icon icon={FileText} size="sm" />
          Nuevo
        </MenuItem>
        <MenuItem id="save" shortcut="⌘S">
          <Icon icon={Save} size="sm" />
          Guardar
        </MenuItem>
        <MenuItem id="download" shortcut="⌘D">
          <Icon icon={Download} size="sm" />
          Descargar
        </MenuItem>
        <MenuSeparator />
        <MenuItem id="cut" shortcut="⌘X">
          <Icon icon={Scissors} size="sm" />
          Cortar
        </MenuItem>
        <MenuItem id="copy" shortcut="⌘C">
          <Icon icon={Copy} size="sm" />
          Copiar
        </MenuItem>
        <MenuItem id="paste" shortcut="⌘V">
          <Icon icon={Copy} size="sm" />
          Pegar
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los elementos pueden mostrar atajos de teclado para acceso rápido a funciones.',
      },
    },
  },
};

/**
 * Diferentes variantes visuales del menú
 */
export const MenuVariants: Story = {
  render: () => (
    <HStack space="6">
      <MenuTrigger>
        <Button variant="ghost">Default</Button>
        <Menu variant="default">
          <MenuItem id="option1">Opción por defecto</MenuItem>
          <MenuItem id="option2">Segunda opción</MenuItem>
          <MenuItem id="option3">Tercera opción</MenuItem>
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button variant="primary">Accent</Button>
        <Menu variant="accent">
          <MenuItem id="option1">Opción con acento</MenuItem>
          <MenuItem id="option2">Segunda opción</MenuItem>
          <MenuItem id="option3">Tercera opción</MenuItem>
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button variant="secondary">Inverse</Button>
        <Menu variant="inverse">
          <MenuItem id="option1">Opción inversa</MenuItem>
          <MenuItem id="option2">Segunda opción</MenuItem>
          <MenuItem id="option3">Tercera opción</MenuItem>
        </Menu>
      </MenuTrigger>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tres variantes visuales del menú: default, accent e inverse.',
      },
    },
  },
};

/**
 * Ejemplo complejo con múltiples características
 */
export const ComplexMenu: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="primary">Menú Completo</Button>
      <Menu size="large" onAction={(key) => console.log('Complejo:', key)}>
        <MenuSection title="Acciones Principales">
          <MenuItem id="create" shortcut="⌘N">
            <Icon icon={FileText} size="sm" />
            Crear nuevo
          </MenuItem>
          <MenuItem id="edit" shortcut="⌘E">
            <Icon icon={Edit} size="sm" />
            Editar selección
          </MenuItem>
          <MenuItem id="duplicate" shortcut="⌘D">
            <Icon icon={Copy} size="sm" />
            Duplicar
          </MenuItem>
        </MenuSection>

        <MenuSeparator />

        <MenuSection title="Compartir">
          <MenuItem id="share">
            <Icon icon={Share} size="sm" />
            Compartir enlace
          </MenuItem>
          <MenuItem id="export">
            <Icon icon={Download} size="sm" />
            Exportar archivo
          </MenuItem>
        </MenuSection>

        <MenuSeparator />

        <MenuSection title="Configuración">
          <MenuItem id="settings">
            <Icon icon={Settings} size="sm" />
            Preferencias
          </MenuItem>
          <MenuItem id="help">
            <Icon icon={Eye} size="sm" />
            Ver ayuda
          </MenuItem>
        </MenuSection>

        <MenuSeparator />

        <MenuItem id="warning" variant="warning">
          <Icon icon={AlertTriangle} size="sm" />
          Acción con precaución
        </MenuItem>
        <MenuItem id="delete" variant="danger" shortcut="⌫">
          <Icon icon={Trash} size="sm" />
          Eliminar definitivamente
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo complejo que combina secciones, iconos, atajos, variantes y separadores.',
      },
    },
  },
};
