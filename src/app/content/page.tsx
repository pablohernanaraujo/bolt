// /src/app/content/page.tsx
// Content components overview page
// Introduction to content components with links to all available content elements
// RELEVANT FILES: avatar/page.tsx

'use client';

import { type FC, type ReactElement } from 'react';
import Link from 'next/link';

import { Icon, List as ListIcon, Tag, User } from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import {
  Avatar,
  AvatarWithImage,
  Badge,
  Body2,
  Button,
  Container,
  ContentWrapper,
  H1,
  H3,
  HStack,
  List,
  VStack,
} from '@/ui';

import * as styles from '../page.css';

/**
 * Content overview page component
 * Provides introduction to content components and navigation to content pages
 */
const ContentPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Content</H1>
      <Body2>
        Nuestra biblioteca de componentes de contenido proporciona elementos
        para mostrar información de usuarios y datos. Cada componente está
        diseñado para ser flexible, accesible y mantener la coherencia visual
        con nuestro design system.
      </Body2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: tokens.space[6],
          marginTop: tokens.space[6],
        }}
      >
        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={Tag} size="xl" />
          </div>
          <H3>Badge</H3>
          <Body2>
            Indicadores de estado para resaltar elementos con reconocimiento
            rápido. Disponibles en múltiples variantes, colores y tamaños para
            señalar status, categorías y notificaciones.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <HStack space="2" style={{ marginBottom: tokens.space[3] }}>
              <Badge variant="solid" colorScheme="success" size="small">
                Active
              </Badge>
              <Badge variant="subtle" colorScheme="warning" size="small">
                Pending
              </Badge>
              <Badge variant="outline" colorScheme="brand" size="small">
                Pro
              </Badge>
            </HStack>
            <Link href="/content/badge">
              <Button variant="primary" size="small">
                Ver Badge
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={User} size="xl" />
          </div>
          <H3>Avatar</H3>
          <Body2>
            Componente para mostrar imágenes de perfil de usuario con fallbacks
            automáticos a iniciales o íconos. Incluye indicadores de estado y
            múltiples variantes de forma y tamaño.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <HStack space="2" style={{ marginBottom: tokens.space[3] }}>
              <AvatarWithImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Usuario de ejemplo"
                size="sm"
                showStatus
                status="online"
              />
              <Avatar name="Ana García" size="sm" variant="rounded" />
              <Avatar size="sm" variant="square" />
            </HStack>
            <Link href="/content/avatar">
              <Button variant="primary" size="small">
                Ver Avatar
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewIcon}>
            <Icon icon={ListIcon} size="xl" />
          </div>
          <H3>List</H3>
          <Body2>
            Componente para mostrar contenido estructurado en varios formatos de
            lista. Incluye listas ordenadas, no ordenadas y básicas con
            espaciado configurable e iconos opcionales.
          </Body2>
          <div style={{ marginTop: tokens.space[4] }}>
            <VStack space="2" style={{ marginBottom: tokens.space[3] }}>
              <List.Root variant="basic" spacing="sm">
                <List.Item>Primer elemento de lista</List.Item>
                <List.Item>Segundo elemento estructurado</List.Item>
                <List.Item>Tercer elemento con formato</List.Item>
              </List.Root>
            </VStack>
            <Link href="/content/list">
              <Button variant="primary" size="small">
                Ver List
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[8] }}>
        <H3>Características de los Componentes de Contenido</H3>
        <Body2>
          Todos nuestros componentes de contenido están diseñados con los
          siguientes principios en mente:
        </Body2>

        <div
          style={{
            marginTop: tokens.space[4],
            padding: tokens.space[6],
            backgroundColor: 'var(--colors-background-secondary)',
            borderRadius: tokens.radius.lg,
            border: '1px solid var(--colors-border-primary)',
          }}
        >
          <VStack space="4">
            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🎯 Accesibilidad Completa
              </H3>
              <Body2>
                Todos los componentes incluyen atributos ARIA apropiados,
                soporte para lectores de pantalla y cumplimiento de WCAG 2.1.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🔄 Fallbacks Inteligentes
              </H3>
              <Body2>
                Los componentes manejan automáticamente casos de error y
                proporcionan fallbacks elegantes cuando la información no está
                disponible.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🎨 Design Tokens
              </H3>
              <Body2>
                Utilizan nuestros design tokens para colores, espaciado y
                tipografía, garantizando consistencia visual en todo el sistema.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>📱 Responsive</H3>
              <Body2>
                Diseñados para funcionar perfectamente en todos los tamaños de
                pantalla con adaptabilidad automática.
              </Body2>
            </div>
          </VStack>
        </div>
      </div>

      <div style={{ marginTop: tokens.space[6] }}>
        <H3>Casos de Uso</H3>
        <Body2>
          Los componentes de contenido son perfectos para diferentes escenarios:
        </Body2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: tokens.space[4],
            marginTop: tokens.space[4],
          }}
        >
          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>👤 Perfiles</H3>
            <Body2>
              Ideales para mostrar información de usuarios en perfiles,
              comentarios y listas de miembros.
            </Body2>
          </div>

          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>💬 Mensajería</H3>
            <Body2>
              Perfectos para aplicaciones de chat, comentarios y sistemas de
              comunicación.
            </Body2>
          </div>

          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3 style={{ marginBottom: tokens.space[2] }}>📋 Listas</H3>
            <Body2>
              Excelentes para listas de contactos, equipos y directorios de
              usuarios.
            </Body2>
          </div>
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default ContentPage;
