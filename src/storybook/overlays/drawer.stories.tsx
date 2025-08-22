// /src/storybook/overlays/drawer.stories.tsx
// Storybook stories for Drawer components
// Interactive examples and documentation for different drawer use cases
// RELEVANT FILES: ../../ui/drawer/drawer.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  Menu as MenuIcon,
  Package,
  Settings,
  Users,
} from 'lucide-react';
import { ReactElement, useState } from 'react';

import { Icon } from '../../icons';
import {
  Body2,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  FormField,
  H3,
  HStack,
  Input,
  List,
  VStack,
} from '../../ui';

const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente Drawer proporciona paneles deslizantes accesibles construidos con React Aria Components.

## Características

- **Accesibilidad completa**: Manejo automático de foco y navegación por teclado
- **Múltiples posiciones**: Izquierda, derecha, arriba y abajo
- **Múltiples tamaños**: Pequeño, mediano, grande y pantalla completa
- **Personalizable**: Opciones para descarte y botones de cierre
- **Animaciones suaves**: Transiciones de deslizamiento desde los bordes
- **Gestión de scroll**: Bloqueo automático del scroll de fondo

## Uso

\`\`\`tsx
import { Drawer, DrawerTrigger, DrawerContent, Button } from '@repo/ui';

<DrawerTrigger>
  <Button>Abrir Drawer</Button>
  <Drawer placement="right" size="medium" isDismissable>
    <DrawerContent title="Mi Drawer" showCloseButton>
      <p>Contenido del drawer aquí</p>
    </DrawerContent>
  </Drawer>
</DrawerTrigger>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Posición del drawer en la pantalla',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
      description: 'Tamaño del drawer',
    },
    isDismissable: {
      control: 'boolean',
      description: 'Si el drawer puede cerrarse haciendo clic fuera',
    },
    isKeyboardDismissDisabled: {
      control: 'boolean',
      description: 'Si el Escape está deshabilitado para cerrar',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Drawer básico con contenido simple y opciones por defecto
 */
export const Default: Story = {
  render: (args) => (
    <DrawerTrigger>
      <Button variant="primary">Abrir Drawer</Button>
      <Drawer {...args}>
        <DrawerContent title="Drawer Básico" showCloseButton>
          <Body2>
            Este es un drawer básico con un título, contenido y botón de cierre.
            Puedes cerrarlo haciendo clic fuera del drawer, presionando Escape o
            usando el botón X.
          </Body2>
        </DrawerContent>
      </Drawer>
    </DrawerTrigger>
  ),
  args: {
    placement: 'right',
    size: 'medium',
    isDismissable: true,
    isKeyboardDismissDisabled: false,
  },
};

/**
 * Comparación de diferentes posiciones de drawer
 */
export const Placements: Story = {
  render: () => (
    <VStack space="4">
      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Drawer Izquierdo
        </Button>
        <Drawer placement="left" size="medium" isDismissable>
          <DrawerContent title="Drawer Izquierdo" showCloseButton>
            <Body2>
              Este drawer se desliza desde el lado izquierdo de la pantalla.
              Ideal para navegación principal o menús de filtros.
            </Body2>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>

      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Drawer Derecho
        </Button>
        <Drawer placement="right" size="medium" isDismissable>
          <DrawerContent title="Drawer Derecho" showCloseButton>
            <Body2>
              Este drawer se desliza desde el lado derecho. Perfecto para
              paneles de configuración, detalles o acciones secundarias.
            </Body2>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>

      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Drawer Superior
        </Button>
        <Drawer placement="top" size="medium" isDismissable>
          <DrawerContent title="Drawer Superior" showCloseButton>
            <Body2>
              Este drawer se desliza desde la parte superior. Útil para
              notificaciones, alertas o información temporal.
            </Body2>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>

      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Drawer Inferior
        </Button>
        <Drawer placement="bottom" size="medium" isDismissable>
          <DrawerContent title="Drawer Inferior" showCloseButton>
            <Body2>
              Este drawer se desliza desde abajo. Ideal para formularios
              rápidos, opciones de selección o acciones contextuales.
            </Body2>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los drawers pueden aparecer desde cualquier lado de la pantalla: izquierda, derecha, arriba o abajo.',
      },
    },
  },
};

/**
 * Comparación de diferentes tamaños de drawer
 */
export const Sizes: Story = {
  render: () => (
    <HStack space="4">
      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Pequeño
        </Button>
        <Drawer placement="right" size="small" isDismissable>
          <DrawerContent title="Drawer Pequeño" showCloseButton>
            <Body2>
              Drawer pequeño (320px), ideal para contenido compacto como filtros
              rápidos o información básica.
            </Body2>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>

      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Mediano
        </Button>
        <Drawer placement="right" size="medium" isDismissable>
          <DrawerContent title="Drawer Mediano" showCloseButton>
            <Body2>
              Drawer mediano (400px), perfecto para la mayoría de casos de uso
              con contenido moderado como formularios o listas.
            </Body2>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>

      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Grande
        </Button>
        <Drawer placement="right" size="large" isDismissable>
          <DrawerContent title="Drawer Grande" showCloseButton>
            <Body2>
              Drawer grande (500px) que puede acomodar más contenido, ideal para
              formularios extensos o vistas detalladas.
            </Body2>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>

      <DrawerTrigger>
        <Button variant="secondary" size="small">
          Pantalla Completa
        </Button>
        <Drawer placement="right" size="full" isDismissable>
          <DrawerContent title="Drawer Pantalla Completa" showCloseButton>
            <VStack space="4">
              <Body2>
                Este drawer cubre toda la pantalla. Es perfecto para
                experiencias inmersivas o cuando necesitas todo el espacio
                disponible.
              </Body2>
              <Body2>
                Ideal para editores de contenido, configuraciones avanzadas o
                vistas detalladas que requieren mucho espacio.
              </Body2>
            </VStack>
          </DrawerContent>
        </Drawer>
      </DrawerTrigger>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los drawers están disponibles en diferentes tamaños para adaptarse a distintos tipos de contenido.',
      },
    },
  },
};

/**
 * Drawer de navegación con lista de elementos
 */
export const Navigation: Story = {
  render: () => {
    const NavigationDrawer = (): ReactElement => {
      const [selectedItem, setSelectedItem] = useState('dashboard');

      return (
        <DrawerTrigger>
          <Button variant="primary">
            <Icon icon={MenuIcon} size="sm" />
            Abrir Navegación
          </Button>
          <Drawer placement="left" size="medium" isDismissable>
            <DrawerContent title="Navegación" showCloseButton>
              <List.Root>
                <List.Item
                  style={{
                    backgroundColor:
                      selectedItem === 'dashboard' ? '#f0f9ff' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedItem('dashboard')}
                >
                  <Icon icon={Package} size="sm" />
                  Dashboard
                  <Icon icon={ChevronRight} size="xs" />
                </List.Item>
                <List.Item
                  style={{
                    backgroundColor:
                      selectedItem === 'users' ? '#f0f9ff' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedItem('users')}
                >
                  <Icon icon={Users} size="sm" />
                  Usuarios
                  <Icon icon={ChevronRight} size="xs" />
                </List.Item>
                <List.Item
                  style={{
                    backgroundColor:
                      selectedItem === 'settings' ? '#f0f9ff' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedItem('settings')}
                >
                  <Icon icon={Settings} size="sm" />
                  Configuración
                  <Icon icon={ChevronRight} size="xs" />
                </List.Item>
              </List.Root>
            </DrawerContent>
          </Drawer>
        </DrawerTrigger>
      );
    };

    return <NavigationDrawer />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo de drawer usado para navegación principal con lista de elementos organizados.',
      },
    },
  },
};

/**
 * Drawer con formulario completo usando componentes separados
 */
export const WithForm: Story = {
  render: () => {
    const FormDrawer = (): ReactElement => {
      const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: '',
      });

      return (
        <DrawerTrigger>
          <Button variant="primary">
            <Icon icon={Settings} size="sm" />
            Editar Perfil
          </Button>
          <Drawer placement="right" size="medium" isDismissable>
            <DrawerHeader title="Editar Perfil" showCloseButton />
            <DrawerBody>
              <VStack space="4">
                <FormField label="Nombre de usuario" isRequired>
                  <Input
                    placeholder="Ingresa tu nombre de usuario"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </FormField>

                <FormField label="Correo electrónico" isRequired>
                  <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </FormField>

                <FormField label="Biografía">
                  <Input
                    placeholder="Cuéntanos sobre ti..."
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </FormField>
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="ghost" slot="close">
                Cancelar
              </Button>
              <Button variant="primary" slot="close">
                Guardar Cambios
              </Button>
            </DrawerFooter>
          </Drawer>
        </DrawerTrigger>
      );
    };

    return <FormDrawer />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo de drawer con formulario usando los componentes DrawerHeader, DrawerBody y DrawerFooter por separado.',
      },
    },
  },
};

/**
 * Drawer que no puede cerrarse con acciones estándar
 */
export const NonDismissible: Story = {
  render: () => (
    <DrawerTrigger>
      <Button variant="secondary">Proceso Importante</Button>
      <Drawer
        placement="bottom"
        size="medium"
        isDismissable={false}
        isKeyboardDismissDisabled
      >
        <DrawerContent title="Proceso en curso" showCloseButton={false}>
          <VStack space="4">
            <Body2>
              Se está procesando tu solicitud. Por favor, no cierres este panel
              hasta que el proceso haya terminado.
            </Body2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              {/* Simple loading indicator */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid #e5e5e5',
                  borderTop: '2px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </div>
          </VStack>
        </DrawerContent>
        <DrawerFooter>
          <Button variant="primary" fullWidth slot="close">
            Completar Proceso
          </Button>
        </DrawerFooter>
      </Drawer>
    </DrawerTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Drawer que no puede cerrarse haciendo clic fuera o presionando Escape, requiere acción explícita del usuario.',
      },
    },
  },
  args: {
    isDismissable: false,
    isKeyboardDismissDisabled: true,
  },
};

/**
 * Drawer sin botón de cierre en el header
 */
export const NoCloseButton: Story = {
  render: () => (
    <DrawerTrigger>
      <Button variant="secondary">Sin Botón X</Button>
      <Drawer placement="right" size="medium" isDismissable>
        <DrawerContent title="Drawer sin botón X" showCloseButton={false}>
          <Body2>
            Este drawer no tiene botón de cierre en el header, pero aún puede
            cerrarse haciendo clic fuera o presionando Escape.
          </Body2>
        </DrawerContent>
        <DrawerFooter>
          <Button variant="primary" fullWidth slot="close">
            Cerrar
          </Button>
        </DrawerFooter>
      </Drawer>
    </DrawerTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Drawer sin botón de cierre en el header, útil cuando quieres forzar el uso de botones de acción específicos.',
      },
    },
  },
};

/**
 * Drawer de pantalla completa que cubre todo el viewport
 */
export const FullScreen: Story = {
  render: () => (
    <DrawerTrigger>
      <Button variant="primary">Abrir Drawer Pantalla Completa</Button>
      <Drawer placement="right" size="full" isDismissable>
        <DrawerContent title="Panel de Configuración Avanzada" showCloseButton>
          <VStack space="6">
            <Body2>
              Este es un ejemplo de drawer de pantalla completa que simula un
              panel de configuración avanzada, editor de contenido o dashboard
              detallado.
            </Body2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                minHeight: '400px',
              }}
            >
              <div>
                <H3>Configuraciones Generales</H3>
                <Body2>
                  El drawer de pantalla completa permite crear interfaces
                  complejas con múltiples secciones y controles detallados.
                </Body2>
                <ul
                  style={{
                    paddingLeft: '1.5rem',
                    marginTop: '1rem',
                  }}
                >
                  <li>Configuración de usuario</li>
                  <li>Preferencias de tema</li>
                  <li>Notificaciones</li>
                  <li>Privacidad y seguridad</li>
                </ul>
              </div>

              <div>
                <H3>Configuraciones Avanzadas</H3>
                <Body2>
                  Aprovecha todo el espacio disponible para proporcionar acceso
                  a configuraciones detalladas y opciones avanzadas.
                </Body2>
                <div
                  style={{
                    backgroundColor:
                      'var(--color-background-secondary, #f8f9fa)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginTop: '1rem',
                  }}
                >
                  <Body2>
                    Panel de configuración donde se pueden mostrar controles
                    avanzados, formularios complejos, o cualquier tipo de
                    interfaz que requiera espacio extenso.
                  </Body2>
                </div>
              </div>
            </div>

            <Body2>
              Perfecto para paneles de administración, configuraciones de
              aplicaciones complejas, editores de contenido, o cualquier
              interfaz que se beneficie del uso completo del espacio lateral.
            </Body2>
          </VStack>
        </DrawerContent>
        <DrawerFooter>
          <Button variant="ghost" slot="close">
            Cancelar
          </Button>
          <Button variant="primary" slot="close">
            Aplicar Configuración
          </Button>
        </DrawerFooter>
      </Drawer>
    </DrawerTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Drawer de pantalla completa que cubre todo el viewport. Ideal para configuraciones avanzadas, editores de contenido y paneles detallados que requieren maximizar el espacio disponible.',
      },
    },
  },
};
