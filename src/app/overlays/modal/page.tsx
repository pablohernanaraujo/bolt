// /src/app/overlays/modal/page.tsx
// Modal component showcase and documentation page
// Displays various modal examples and usage patterns
// RELEVANT FILES: ../../../ui/modal/modal.tsx, ../../components/sidebar.tsx

'use client';

import { Info, Save, Trash } from 'lucide-react';
import { type FC, type ReactElement, useState } from 'react';

import { Icon } from '@/icons';
import {
  Body2,
  Button,
  Container,
  ContentWrapper,
  Divider,
  FormField,
  H1,
  H2,
  H3,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  VStack,
} from '@/ui';

/**
 * Modal documentation and showcase page
 * Demonstrates different modal patterns and use cases
 */
const ModalPage: FC = (): ReactElement => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  return (
    <Container as="main" paddingY="8">
      <ContentWrapper variant="screen">
        <H1>Modal</H1>
        <Body2>
          El componente Modal proporciona diálogos superpuestos accesibles para
          mostrar contenido que requiere la atención del usuario.
        </Body2>

        <Divider />

        {/* Basic Modal */}
        <section>
          <H2>Modal Básico</H2>
          <Body2>Modal simple con contenido estático y botón de cierre.</Body2>

          <div style={{ marginTop: '1rem' }}>
            <ModalTrigger>
              <Button variant="primary">Abrir Modal Básico</Button>
              <Modal size="medium" isDismissable>
                <ModalContent title="Modal Básico" showCloseButton>
                  <Body2>
                    Este es un modal básico con un título, contenido y botón de
                    cierre. Puedes cerrarlo haciendo clic fuera del modal,
                    presionando Escape o usando el botón X.
                  </Body2>
                </ModalContent>
              </Modal>
            </ModalTrigger>
          </div>
        </section>

        <Divider />

        {/* Different Sizes */}
        <section>
          <H2>Tamaños de Modal</H2>
          <Body2>
            Los modales están disponibles en diferentes tamaños para adaptarse a
            diferentes tipos de contenido.
          </Body2>

          <HStack space="4" style={{ marginTop: '1rem' }}>
            <ModalTrigger>
              <Button variant="secondary" size="small">
                Pequeño
              </Button>
              <Modal size="small" isDismissable>
                <ModalContent title="Modal Pequeño" showCloseButton>
                  <Body2>
                    Este es un modal pequeño, ideal para confirmaciones rápidas
                    o mensajes cortos.
                  </Body2>
                </ModalContent>
              </Modal>
            </ModalTrigger>

            <ModalTrigger>
              <Button variant="secondary" size="small">
                Mediano
              </Button>
              <Modal size="medium" isDismissable>
                <ModalContent title="Modal Mediano" showCloseButton>
                  <Body2>
                    Este es un modal de tamaño mediano, perfecto para la mayoría
                    de casos de uso con contenido moderado.
                  </Body2>
                </ModalContent>
              </Modal>
            </ModalTrigger>

            <ModalTrigger>
              <Button variant="secondary" size="small">
                Grande
              </Button>
              <Modal size="large" isDismissable>
                <ModalContent title="Modal Grande" showCloseButton>
                  <Body2>
                    Este es un modal grande que puede acomodar más contenido,
                    ideal para formularios extensos o contenido detallado.
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
                  <VStack space="6">
                    <Body2>
                      Este es un modal de pantalla completa que cubre todo el
                      viewport. Es ideal para experiencias inmersivas, editores,
                      galerías de imágenes o cuando necesitas maximizar el
                      espacio disponible.
                    </Body2>
                    <Body2>Características del modal pantalla completa:</Body2>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      <li>Cubre toda la pantalla (100vw x 100vh)</li>
                      <li>
                        Sin bordes redondeados para aprovechar todo el espacio
                      </li>
                      <li>
                        Ideal para contenido extenso o interfaces complejas
                      </li>
                      <li>
                        Mantiene todas las funcionalidades de accesibilidad
                      </li>
                    </ul>
                    <Body2>
                      Este tipo de modal es perfecto para casos de uso como:
                      editores de texto, visores de documentos, galerías de
                      medios, dashboards detallados, o cualquier experiencia que
                      se beneficie del uso completo del espacio de pantalla.
                    </Body2>
                  </VStack>
                </ModalContent>
              </Modal>
            </ModalTrigger>
          </HStack>
        </section>

        <Divider />

        {/* Modal with Form */}
        <section>
          <H2>Modal con Formulario</H2>
          <Body2>
            Ejemplo de modal que contiene un formulario con campos de entrada y
            botones de acción en el pie.
          </Body2>

          <div style={{ marginTop: '1rem' }}>
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
          </div>
        </section>

        <Divider />

        {/* Confirmation Modal */}
        <section>
          <H2>Modal de Confirmación</H2>
          <Body2>
            Modal para acciones destructivas que requieren confirmación del
            usuario.
          </Body2>

          <div style={{ marginTop: '1rem' }}>
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
                      ¿Estás seguro de que deseas eliminar este usuario? Esta
                      acción no se puede deshacer.
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
          </div>
        </section>

        <Divider />

        {/* Non-dismissible Modal */}
        <section>
          <H2>Modal No Descartable</H2>
          <Body2>
            Modal que no puede cerrarse haciendo clic fuera o presionando
            Escape, requiere acción explícita del usuario.
          </Body2>

          <div style={{ marginTop: '1rem' }}>
            <ModalTrigger>
              <Button variant="secondary">Proceso Importante</Button>
              <Modal
                size="medium"
                isDismissable={false}
                isKeyboardDismissDisabled
              >
                <ModalContent title="Proceso en curso" showCloseButton={false}>
                  <VStack space="4">
                    <Body2>
                      Se está procesando tu solicitud. Por favor, no cierres
                      esta ventana hasta que el proceso haya terminado.
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
          </div>
        </section>

        <Divider />

        {/* Usage Guidelines */}
        <section>
          <H2>Guías de Uso</H2>
          <VStack space="4">
            <div>
              <H3>Cuándo usar modales</H3>
              <Body2>
                • Para contenido que requiere atención inmediata del usuario
                <br />
                • Para formularios o procesos que no deben interrumpirse
                <br />
                • Para confirmaciones de acciones importantes
                <br />• Para mostrar información detallada sin perder contexto
              </Body2>
            </div>

            <div>
              <H3>Mejores prácticas</H3>
              <Body2>
                • Mantén el contenido conciso y enfocado
                <br />
                • Proporciona formas claras de cerrar el modal
                <br />
                • Usa títulos descriptivos
                <br />
                • Incluye botones de acción claros en el pie
                <br />• Evita anidar modales dentro de otros modales
              </Body2>
            </div>
          </VStack>
        </section>
      </ContentWrapper>
    </Container>
  );
};

export default ModalPage;
