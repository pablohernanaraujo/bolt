// /src/storybook/overlays/modal.stories.tsx
// Storybook stories for Modal components
// Interactive examples and documentation for different modal use cases
// RELEVANT FILES: ../../ui/modal/modal.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Info, Save, Trash } from 'lucide-react';
import { ReactElement, useState } from 'react';

import { Icon } from '../../icons';
import {
  Body2,
  Button,
  FormField,
  H3,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  VStack,
} from '../../ui';

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente Modal proporciona diálogos superpuestos accesibles construidos con React Aria Components.

## Características

- **Accesibilidad completa**: Manejo automático de foco y navegación por teclado
- **Múltiples tamaños**: Pequeño, mediano, grande y pantalla completa
- **Personalizable**: Opciones para descarte y botones de cierre
- **Animaciones suaves**: Transiciones de entrada y salida
- **Gestión de scroll**: Bloqueo automático del scroll de fondo

## Uso

\`\`\`tsx
import { Modal, ModalTrigger, ModalContent, Button } from '@repo/ui';

<ModalTrigger>
  <Button>Abrir Modal</Button>
  <Modal size="medium" isDismissable>
    <ModalContent title="Mi Modal" showCloseButton>
      <p>Contenido del modal aquí</p>
    </ModalContent>
  </Modal>
</ModalTrigger>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
      description: 'Tamaño del modal',
    },
    isDismissable: {
      control: 'boolean',
      description: 'Si el modal puede cerrarse haciendo clic fuera',
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
 * Modal básico con contenido simple y opciones por defecto
 */
export const Default: Story = {
  render: (args) => (
    <ModalTrigger>
      <Button variant="primary">Abrir Modal</Button>
      <Modal {...args}>
        <ModalContent title="Modal Básico" showCloseButton>
          <Body2>
            Este es un modal básico con un título, contenido y botón de cierre.
            Puedes cerrarlo haciendo clic fuera del modal, presionando Escape o
            usando el botón X.
          </Body2>
        </ModalContent>
      </Modal>
    </ModalTrigger>
  ),
  args: {
    size: 'medium',
    isDismissable: true,
    isKeyboardDismissDisabled: false,
  },
};

/**
 * Comparación de diferentes tamaños de modal
 */
export const Sizes: Story = {
  render: () => (
    <VStack space="4">
      <ModalTrigger>
        <Button variant="secondary" size="small">
          Modal Pequeño
        </Button>
        <Modal size="small" isDismissable>
          <ModalContent title="Modal Pequeño" showCloseButton>
            <Body2>
              Este es un modal pequeño, ideal para confirmaciones rápidas o
              mensajes cortos.
            </Body2>
          </ModalContent>
        </Modal>
      </ModalTrigger>

      <ModalTrigger>
        <Button variant="secondary" size="small">
          Modal Mediano
        </Button>
        <Modal size="medium" isDismissable>
          <ModalContent title="Modal Mediano" showCloseButton>
            <Body2>
              Este es un modal de tamaño mediano, perfecto para la mayoría de
              casos de uso con contenido moderado.
            </Body2>
          </ModalContent>
        </Modal>
      </ModalTrigger>

      <ModalTrigger>
        <Button variant="secondary" size="small">
          Modal Grande
        </Button>
        <Modal size="large" isDismissable>
          <ModalContent title="Modal Grande" showCloseButton>
            <Body2>
              Este es un modal grande que puede acomodar más contenido, ideal
              para formularios extensos o contenido detallado.
            </Body2>
          </ModalContent>
        </Modal>
      </ModalTrigger>

      <ModalTrigger>
        <Button variant="secondary" size="small">
          Pantalla Completa
        </Button>
        <Modal size="full" isDismissable>
          <ModalContent title="Modal Pantalla Completa" showCloseButton>
            <VStack space="4">
              <Body2>
                Modal de pantalla completa que cubre todo el viewport. Ideal
                para experiencias inmersivas como editores, galerías o
                dashboards complejos.
              </Body2>
              <Body2>
                Este modal aprovecha todo el espacio disponible de la pantalla
                para proporcionar la máxima área de trabajo posible.
              </Body2>
            </VStack>
          </ModalContent>
        </Modal>
      </ModalTrigger>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Los modales están disponibles en diferentes tamaños para adaptarse a distintos tipos de contenido.',
      },
    },
  },
};

/**
 * Modal con formulario completo usando componentes separados
 */
export const WithForm: Story = {
  render: () => {
    const FormModal = (): ReactElement => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
      });

      return (
        <ModalTrigger>
          <Button variant="primary">Editar Perfil</Button>
          <Modal size="medium" isDismissable>
            <ModalHeader title="Editar Perfil" showCloseButton />
            <ModalBody>
              <VStack space="4">
                <FormField label="Nombre completo" isRequired>
                  <Input
                    placeholder="Ingresa tu nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
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
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" slot="close">
                Cancelar
              </Button>
              <Button variant="primary" slot="close">
                <Icon icon={Save} size="sm" />
                Guardar Cambios
              </Button>
            </ModalFooter>
          </Modal>
        </ModalTrigger>
      );
    };

    return <FormModal />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo de modal con formulario usando los componentes ModalHeader, ModalBody y ModalFooter por separado.',
      },
    },
  },
};

/**
 * Modal de confirmación para acciones destructivas
 */
export const Confirmation: Story = {
  render: () => (
    <ModalTrigger>
      <Button variant="danger">
        <Icon icon={Trash} size="sm" />
        Eliminar Usuario
      </Button>
      <Modal size="small" isDismissable>
        <ModalContent title="Confirmar eliminación" showCloseButton>
          <VStack space="4">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ef4444',
              }}
            >
              <Icon icon={Info} size="sm" />
              <H3
                style={{
                  margin: 0,
                  color: '#ef4444',
                }}
              >
                Acción irreversible
              </H3>
            </div>
            <Body2>
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no
              se puede deshacer.
            </Body2>
          </VStack>
        </ModalContent>
        <ModalFooter>
          <Button variant="ghost" slot="close">
            Cancelar
          </Button>
          <Button variant="danger" slot="close">
            <Icon icon={Trash} size="sm" />
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
    </ModalTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Modal de confirmación para acciones destructivas que requieren confirmación explícita del usuario.',
      },
    },
  },
};

/**
 * Modal que no puede cerrarse con acciones estándar
 */
export const NonDismissible: Story = {
  render: () => (
    <ModalTrigger>
      <Button variant="secondary">Proceso Importante</Button>
      <Modal size="medium" isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent title="Proceso en curso" showCloseButton={false}>
          <VStack space="4">
            <Body2>
              Se está procesando tu solicitud. Por favor, no cierres esta
              ventana hasta que el proceso haya terminado.
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
        </ModalContent>
        <ModalFooter>
          <Button variant="primary" fullWidth slot="close">
            Completar Proceso
          </Button>
        </ModalFooter>
      </Modal>
    </ModalTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Modal que no puede cerrarse haciendo clic fuera o presionando Escape, requiere acción explícita del usuario.',
      },
    },
  },
  args: {
    isDismissable: false,
    isKeyboardDismissDisabled: true,
  },
};

/**
 * Modal sin botón de cierre en el header
 */
export const NoCloseButton: Story = {
  render: () => (
    <ModalTrigger>
      <Button variant="secondary">Sin Botón X</Button>
      <Modal size="medium" isDismissable>
        <ModalContent title="Modal sin botón X" showCloseButton={false}>
          <Body2>
            Este modal no tiene botón de cierre en el header, pero aún puede
            cerrarse haciendo clic fuera o presionando Escape.
          </Body2>
        </ModalContent>
        <ModalFooter>
          <Button variant="primary" fullWidth slot="close">
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </ModalTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Modal sin botón de cierre en el header, útil cuando quieres forzar el uso de botones de acción específicos.',
      },
    },
  },
};

/**
 * Modal de pantalla completa que cubre todo el viewport
 */
export const FullScreen: Story = {
  render: () => (
    <ModalTrigger>
      <Button variant="primary">Abrir Modal Pantalla Completa</Button>
      <Modal size="full" isDismissable>
        <ModalContent title="Editor de Documentos" showCloseButton>
          <VStack space="6">
            <Body2>
              Este es un ejemplo de modal de pantalla completa que simula una
              aplicación como un editor de documentos, visor de imágenes, o
              dashboard complejo.
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
                <H3>Panel Izquierdo</H3>
                <Body2>
                  El modal de pantalla completa permite crear interfaces
                  complejas con múltiples paneles y secciones.
                </Body2>
                <ul
                  style={{
                    paddingLeft: '1.5rem',
                    marginTop: '1rem',
                  }}
                >
                  <li>Navegación por archivos</li>
                  <li>Panel de herramientas</li>
                  <li>Configuraciones rápidas</li>
                  <li>Vista previa en tiempo real</li>
                </ul>
              </div>

              <div>
                <H3>Panel Derecho</H3>
                <Body2>
                  Aprovecha todo el espacio disponible para proporcionar una
                  experiencia inmersiva y productiva.
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
                    Área de contenido principal donde se puede mostrar texto,
                    imágenes, gráficos o cualquier tipo de contenido que
                    requiera espacio extenso.
                  </Body2>
                </div>
              </div>
            </div>

            <Body2>
              Perfecto para aplicaciones que necesitan maximizar el espacio de
              trabajo disponible, como editores de código, herramientas de
              diseño, dashboards de analytics, o galerías de medios.
            </Body2>
          </VStack>
        </ModalContent>
        <ModalFooter>
          <Button variant="ghost" slot="close">
            Cancelar
          </Button>
          <Button variant="primary" slot="close">
            Guardar y Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </ModalTrigger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Modal de pantalla completa que cubre todo el viewport. Ideal para experiencias inmersivas, editores, galerías y dashboards complejos que requieren maximizar el espacio disponible.',
      },
    },
  },
};
