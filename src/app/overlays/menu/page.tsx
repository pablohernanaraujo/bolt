// /src/app/overlays/menu/page.tsx
// Menu component documentation and examples
// Interactive demonstrations of Menu component features and usage
// RELEVANT FILES: ../../../ui/menu/menu.tsx, ../../components/sidebar.tsx

'use client';

import { type FC, type ReactElement } from 'react';
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

import { Icon } from '@/icons';
import {
  Body2,
  Button,
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
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from '@/ui/menu';

/**
 * Menu documentation page component
 * Comprehensive examples and usage patterns for Menu components
 */
const MenuPage: FC = (): ReactElement => (
  <Container as="main" paddingY="8">
    <ContentWrapper variant="screen">
      <VStack space="12">
        {/* Header */}
        <VStack space="4">
          <H1>Menu</H1>
          <Body2>
            El componente Menu proporciona menús contextuales accesibles
            construidos con React Aria Components. Incluye navegación completa
            por teclado, soporte para lectores de pantalla, y posicionamiento
            flexible para crear interfaces de usuario profesionales.
          </Body2>
        </VStack>

        {/* Basic Menu */}
        <VStack space="6">
          <H2>Menú Básico</H2>
          <Body2>
            Un menú simple con elementos seleccionables. Se abre al hacer clic
            en el trigger y se puede navegar con las flechas del teclado.
          </Body2>

          <HStack space="4">
            <MenuTrigger>
              <Button variant="primary">Acciones</Button>
              <Menu onAction={(key) => console.log('Acción:', key)}>
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

            <MenuTrigger>
              <Button variant="secondary">Archivo</Button>
              <Menu onAction={(key) => console.log('Archivo:', key)}>
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
              </Menu>
            </MenuTrigger>
          </HStack>
        </VStack>

        {/* Menu with Sections */}
        <VStack space="6">
          <H2>Menú con Secciones</H2>
          <Body2>
            Los menús pueden organizarse en secciones semánticas con encabezados
            opcionales y separadores visuales para mejor organización.
          </Body2>

          <HStack space="4">
            <MenuTrigger>
              <Button variant="ghost">Editar</Button>
              <Menu size="large">
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
          </HStack>
        </VStack>

        {/* Different Sizes */}
        <VStack space="6">
          <H2>Tamaños</H2>
          <Body2>
            Tres tamaños disponibles para adaptar el menú al contexto: small,
            medium y large.
          </Body2>

          <HStack space="4">
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
        </VStack>

        {/* Different Placements */}
        <VStack space="6">
          <H2>Posicionamiento</H2>
          <Body2>
            El menú puede posicionarse en diferentes ubicaciones relativas al
            elemento trigger.
          </Body2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              justifyItems: 'center',
              padding: '3rem',
            }}
          >
            <MenuTrigger>
              <Button variant="ghost" size="small">
                Top
              </Button>
              <Menu placement="top">
                <MenuItem id="top1">Arriba 1</MenuItem>
                <MenuItem id="top2">Arriba 2</MenuItem>
              </Menu>
            </MenuTrigger>

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
                Top End
              </Button>
              <Menu placement="top end">
                <MenuItem id="te1">Top End 1</MenuItem>
                <MenuItem id="te2">Top End 2</MenuItem>
              </Menu>
            </MenuTrigger>

            <MenuTrigger>
              <Button variant="ghost" size="small">
                Left
              </Button>
              <Menu placement="left">
                <MenuItem id="left1">Izquierda 1</MenuItem>
                <MenuItem id="left2">Izquierda 2</MenuItem>
              </Menu>
            </MenuTrigger>

            <div
              style={{
                padding: '1rem',
                border: '2px dashed #ccc',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Body2>Centro</Body2>
            </div>

            <MenuTrigger>
              <Button variant="ghost" size="small">
                Right
              </Button>
              <Menu placement="right">
                <MenuItem id="right1">Derecha 1</MenuItem>
                <MenuItem id="right2">Derecha 2</MenuItem>
              </Menu>
            </MenuTrigger>

            <MenuTrigger>
              <Button variant="ghost" size="small">
                Bottom
              </Button>
              <Menu placement="bottom">
                <MenuItem id="bottom1">Abajo 1</MenuItem>
                <MenuItem id="bottom2">Abajo 2</MenuItem>
              </Menu>
            </MenuTrigger>

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
                Bottom End
              </Button>
              <Menu placement="bottom end">
                <MenuItem id="be1">Bottom End 1</MenuItem>
                <MenuItem id="be2">Bottom End 2</MenuItem>
              </Menu>
            </MenuTrigger>
          </div>
        </VStack>

        {/* With Icon Buttons */}
        <VStack space="6">
          <H2>Con IconButtons</H2>
          <Body2>
            Los menús funcionan perfectamente con IconButtons para crear
            interfaces más compactas.
          </Body2>

          <HStack space="4">
            <MenuTrigger>
              <IconButton
                icon={MoreHorizontal}
                aria-label="Más opciones"
                variant="ghost"
              />
              <Menu>
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
              <Menu variant="accent">
                <MenuItem id="general">Configuración general</MenuItem>
                <MenuItem id="privacy">Privacidad</MenuItem>
                <MenuItem id="notifications">Notificaciones</MenuItem>
                <MenuSeparator />
                <MenuItem id="logout" variant="danger">
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </MenuTrigger>
          </HStack>
        </VStack>

        {/* Item Variants */}
        <VStack space="6">
          <H2>Variantes de Elementos</H2>
          <Body2>
            Los elementos del menú pueden tener diferentes variantes visuales
            para indicar diferentes tipos de acciones.
          </Body2>

          <HStack space="4">
            <MenuTrigger>
              <Button variant="secondary">Estados</Button>
              <Menu>
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
          </HStack>
        </VStack>

        {/* Accessibility Note */}
        <VStack space="4">
          <H3>Accesibilidad</H3>
          <Body2>
            El componente Menu incluye soporte completo para accesibilidad:
          </Body2>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Navegación completa por teclado (flechas, Enter, Escape)</li>
            <li>Soporte para lectores de pantalla con ARIA apropiado</li>
            <li>Gestión automática del foco</li>
            <li>Indicadores visuales claros para el estado del foco</li>
            <li>Atajos de teclado opcionales para acciones rápidas</li>
          </ul>
        </VStack>
      </VStack>
    </ContentWrapper>
  </Container>
);

export default MenuPage;
