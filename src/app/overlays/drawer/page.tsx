// /src/app/overlays/drawer/page.tsx
// Drawer component showcase and documentation page
// Displays various drawer examples and usage patterns
// RELEVANT FILES: ../../../ui/drawer/drawer.tsx, ../../components/sidebar.tsx

'use client';

import {
  ChevronRight,
  Menu as MenuIcon,
  Package,
  Settings,
  Users,
} from 'lucide-react';
import { type FC, type ReactElement, useState } from 'react';

import { Icon } from '@/icons';
import {
  Body2,
  Button,
  Container,
  ContentWrapper,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  FormField,
  H1,
  H2,
  H3,
  HStack,
  Input,
  VStack,
} from '@/ui';

/**
 * Drawer documentation and showcase page
 * Demonstrates different drawer patterns and use cases
 */
const DrawerPage: FC = (): ReactElement => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });

  return (
    <Container as="main" paddingY="8">
      <ContentWrapper variant="screen">
        <H1>Drawer</H1>
        <Body2>
          El componente Drawer proporciona paneles deslizantes accesibles que se
          abren desde los bordes de la pantalla. Ideal para navegación, menús y
          contenido contextual.
        </Body2>

        <Divider />

        {/* Basic Drawer Examples by Placement */}
        <section>
          <H2>Posicionamiento del Drawer</H2>
          <Body2>
            Los drawers pueden aparecer desde cualquier lado de la pantalla:
            izquierda, derecha, arriba o abajo.
          </Body2>

          <HStack space="4" style={{ marginTop: '1rem' }}>
            <DrawerTrigger>
              <Button variant="secondary" size="small">
                Izquierda
              </Button>
              <Drawer placement="left" size="medium" isDismissable>
                <DrawerContent title="Drawer Izquierdo" showCloseButton>
                  <Body2>
                    Este drawer se desliza desde el lado izquierdo de la
                    pantalla. Es ideal para navegación principal o menús de
                    filtros.
                  </Body2>
                </DrawerContent>
              </Drawer>
            </DrawerTrigger>

            <DrawerTrigger>
              <Button variant="secondary" size="small">
                Derecha
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
                Arriba
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
                Abajo
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
          </HStack>
        </section>

        <Divider />

        {/* Different Sizes */}
        <section>
          <H2>Tamaños de Drawer</H2>
          <Body2>
            Los drawers están disponibles en diferentes tamaños para adaptarse a
            diferentes tipos de contenido.
          </Body2>

          <HStack space="4" style={{ marginTop: '1rem' }}>
            <DrawerTrigger>
              <Button variant="secondary" size="small">
                Pequeño
              </Button>
              <Drawer placement="right" size="small" isDismissable>
                <DrawerContent title="Drawer Pequeño" showCloseButton>
                  <Body2>
                    Drawer pequeño (320px), ideal para contenido compacto como
                    filtros rápidos o información básica.
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
                    Drawer mediano (400px), perfecto para la mayoría de casos de
                    uso con contenido moderado como formularios o listas.
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
                    Drawer grande (500px) que puede acomodar más contenido,
                    ideal para formularios extensos o vistas detalladas.
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
                  <VStack space="6">
                    <Body2>
                      Este drawer cubre toda la pantalla. Es perfecto para
                      experiencias inmersivas, editores de contenido o cuando
                      necesitas todo el espacio disponible.
                    </Body2>
                    <Body2>Características del drawer pantalla completa:</Body2>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      <li>Cubre toda la pantalla</li>
                      <li>Sin bordes redondeados</li>
                      <li>Ideal para contenido extenso</li>
                      <li>
                        Mantiene todas las funcionalidades de accesibilidad
                      </li>
                    </ul>
                  </VStack>
                </DrawerContent>
              </Drawer>
            </DrawerTrigger>
          </HStack>
        </section>

        <Divider />

        {/* Navigation Drawer */}
        <section>
          <H2>Drawer de Navegación</H2>
          <Body2>
            Ejemplo de drawer usado para navegación principal con lista de
            elementos organizados.
          </Body2>

          <div style={{ marginTop: '1rem' }}>
            <DrawerTrigger>
              <Button variant="primary">
                <Icon icon={MenuIcon} size="sm" />
                Abrir Navegación
              </Button>
              <Drawer placement="left" size="medium" isDismissable>
                <DrawerContent title="Navegación" showCloseButton>
                  <VStack space="3">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon icon={Package} size="sm" />
                      Dashboard
                      <Icon icon={ChevronRight} size="xs" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon icon={Users} size="sm" />
                      Usuarios
                      <Icon icon={ChevronRight} size="xs" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon icon={Settings} size="sm" />
                      Configuración
                      <Icon icon={ChevronRight} size="xs" />
                    </div>
                  </VStack>
                </DrawerContent>
              </Drawer>
            </DrawerTrigger>
          </div>
        </section>

        <Divider />

        {/* Form Drawer */}
        <section>
          <H2>Drawer con Formulario</H2>
          <Body2>
            Ejemplo de drawer que contiene un formulario con campos de entrada y
            botones de acción en el pie.
          </Body2>

          <div style={{ marginTop: '1rem' }}>
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
          </div>
        </section>

        <Divider />

        {/* Non-dismissible Drawer */}
        <section>
          <H2>Drawer No Descartable</H2>
          <Body2>
            Drawer que no puede cerrarse haciendo clic fuera o presionando
            Escape, requiere acción explícita del usuario.
          </Body2>

          <div style={{ marginTop: '1rem' }}>
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
                      Se está procesando tu solicitud. Por favor, no cierres
                      este panel hasta que el proceso haya terminado.
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
          </div>
        </section>

        <Divider />

        {/* Animation Speed Examples */}
        <section>
          <H2>Velocidad de Animación</H2>
          <Body2>
            Controla la velocidad de las animaciones del drawer para diferentes
            experiencias de usuario.
          </Body2>

          <HStack space="4" style={{ marginTop: '1rem' }}>
            <DrawerTrigger>
              <Button variant="secondary" size="small">
                Rápido
              </Button>
              <Drawer
                placement="right"
                size="medium"
                isDismissable
                animationSpeed="fast"
              >
                <DrawerContent title="Animación Rápida" showCloseButton>
                  <Body2>
                    Animación rápida (150ms entrada, 100ms salida). Ideal para
                    interfaces que requieren interacciones muy ágiles.
                  </Body2>
                </DrawerContent>
              </Drawer>
            </DrawerTrigger>

            <DrawerTrigger>
              <Button variant="secondary" size="small">
                Normal
              </Button>
              <Drawer
                placement="right"
                size="medium"
                isDismissable
                animationSpeed="normal"
              >
                <DrawerContent title="Animación Normal" showCloseButton>
                  <Body2>
                    Animación normal (300ms entrada, 200ms salida). Velocidad
                    estándar que proporciona un buen equilibrio entre fluidez y
                    velocidad.
                  </Body2>
                </DrawerContent>
              </Drawer>
            </DrawerTrigger>

            <DrawerTrigger>
              <Button variant="secondary" size="small">
                Lento
              </Button>
              <Drawer
                placement="right"
                size="medium"
                isDismissable
                animationSpeed="slow"
              >
                <DrawerContent title="Animación Lenta" showCloseButton>
                  <Body2>
                    Animación lenta (400ms entrada, 300ms salida). Para
                    experiencias más elegantes donde el timing es importante.
                  </Body2>
                </DrawerContent>
              </Drawer>
            </DrawerTrigger>

            <DrawerTrigger>
              <Button variant="secondary" size="small">
                Sin Animación
              </Button>
              <Drawer
                placement="right"
                size="medium"
                isDismissable
                disableAnimation
              >
                <DrawerContent title="Sin Animación" showCloseButton>
                  <Body2>
                    Drawer sin animaciones. Útil para testing, accesibilidad o
                    cuando las animaciones no son deseadas.
                  </Body2>
                </DrawerContent>
              </Drawer>
            </DrawerTrigger>
          </HStack>
        </section>

        <Divider />

        {/* Usage Guidelines */}
        <section>
          <H2>Guías de Uso</H2>
          <VStack space="4">
            <div>
              <H3>Cuándo usar drawers</H3>
              <Body2>
                • Para navegación principal en aplicaciones móviles
                <br />
                • Para paneles de filtros y configuraciones
                <br />
                • Para contenido contextual que no interrumpe el flujo principal
                <br />• Para formularios secundarios o información detallada
              </Body2>
            </div>

            <div>
              <H3>Mejores prácticas</H3>
              <Body2>
                • Usa posicionamiento consistente (izquierda para navegación)
                <br />
                • Considera el contenido al elegir el tamaño
                <br />
                • Proporciona formas claras de cerrar el drawer
                <br />
                • Usa títulos descriptivos cuando sea apropiado
                <br />• Evita usar múltiples drawers al mismo tiempo
              </Body2>
            </div>

            <div>
              <H3>Diferencias con Modal</H3>
              <Body2>
                • Drawers se anclan a los bordes de la pantalla
                <br />
                • Menos disruptivos que los modales centrados
                <br />
                • Mejores para contenido que el usuario puede consultar
                frecuentemente
                <br />• Ideales para flujos de trabajo que requieren contexto
                del contenido principal
              </Body2>
            </div>
          </VStack>
        </section>
      </ContentWrapper>
    </Container>
  );
};

export default DrawerPage;
