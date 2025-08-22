// /src/app/content/avatar/page.tsx
// Avatar component showcase page
// Displays avatar sizes, variants, status indicators and fallback scenarios
// RELEVANT FILES: ../../../ui/avatar, ../../page.css

'use client';

import { Crown, Heart, Shield, Star } from 'lucide-react';
import { type FC, type ReactElement } from 'react';

import { Avatar, AvatarWithImage, Body2, H1, H2, HStack, VStack } from '@/ui';

import * as styles from '../../page.css';

/**
 * Avatar page component
 * Showcases the Avatar component with all its features
 */
const AvatarPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Avatar</H1>
    <Body2>
      Componente para mostrar imágenes de perfil de usuario con fallbacks
      automáticos a iniciales o íconos. Incluye indicadores de estado y
      múltiples variantes.
    </Body2>

    <div className={styles.showcase}>
      <H2>Sizes</H2>
      <HStack space="4" align="center">
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="Usuario"
            size="xs"
          />
          <Body2>XS</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face"
            alt="Usuario"
            size="sm"
          />
          <Body2>SM</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Usuario"
            size="md"
          />
          <Body2>MD</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
            alt="Usuario"
            size="lg"
          />
          <Body2>LG</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            alt="Usuario"
            size="xl"
          />
          <Body2>XL</Body2>
        </VStack>
      </HStack>
    </div>

    <div className={styles.showcase}>
      <H2>Variants</H2>
      <HStack space="4" align="center">
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            alt="Usuario circular"
            size="lg"
            variant="circle"
          />
          <Body2>Circle</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="Usuario redondeado"
            size="lg"
            variant="rounded"
          />
          <Body2>Rounded</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face"
            alt="Usuario cuadrado"
            size="lg"
            variant="square"
          />
          <Body2>Square</Body2>
        </VStack>
      </HStack>
    </div>

    <div className={styles.showcase}>
      <H2>Status Indicators</H2>
      <HStack space="4" align="center">
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Usuario en línea"
            size="lg"
            showStatus
            status="online"
          />
          <Body2>Online</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
            alt="Usuario ausente"
            size="lg"
            showStatus
            status="away"
          />
          <Body2>Away</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            alt="Usuario ocupado"
            size="lg"
            showStatus
            status="busy"
          />
          <Body2>Busy</Body2>
        </VStack>
        <VStack space="2" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            alt="Usuario sin conexión"
            size="lg"
            showStatus
            status="offline"
          />
          <Body2>Offline</Body2>
        </VStack>
      </HStack>
    </div>

    <div className={styles.showcase}>
      <H2>Initials Fallback</H2>
      <HStack space="4" align="center">
        <VStack space="2" align="center">
          <Avatar name="Ana García" size="lg" variant="circle" />
          <Body2>Ana García</Body2>
        </VStack>
        <VStack space="2" align="center">
          <Avatar name="Pedro Martínez" size="lg" variant="rounded" />
          <Body2>Pedro Martínez</Body2>
        </VStack>
        <VStack space="2" align="center">
          <Avatar name="María López" size="lg" variant="square" />
          <Body2>María López</Body2>
        </VStack>
        <VStack space="2" align="center">
          <Avatar name="Carlos" size="lg" />
          <Body2>Single Name</Body2>
        </VStack>
      </HStack>
    </div>

    <div className={styles.showcase}>
      <H2>Custom Icons</H2>
      <HStack space="4" align="center">
        <VStack space="2" align="center">
          <Avatar size="lg" icon={Crown} />
          <Body2>Crown</Body2>
        </VStack>
        <VStack space="2" align="center">
          <Avatar size="lg" icon={Star} variant="rounded" />
          <Body2>Star</Body2>
        </VStack>
        <VStack space="2" align="center">
          <Avatar size="lg" icon={Heart} variant="square" />
          <Body2>Heart</Body2>
        </VStack>
        <VStack space="2" align="center">
          <Avatar size="lg" icon={Shield} />
          <Body2>Shield</Body2>
        </VStack>
      </HStack>
    </div>

    <div className={styles.showcase}>
      <H2>Mixed Examples</H2>
      <div className={styles.componentGroup}>
        <HStack space="3" align="center">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="Usuario 1"
            size="md"
            showStatus
            status="online"
          />
          <VStack space="1">
            <Body2 style={{ fontWeight: '500' }}>Juan Pérez</Body2>
            <Body2 style={{ color: 'var(--colors-foreground-secondary)' }}>
              En línea
            </Body2>
          </VStack>
        </HStack>

        <HStack space="3" align="center">
          <Avatar
            name="Ana María González"
            size="md"
            showStatus
            status="away"
          />
          <VStack space="1">
            <Body2 style={{ fontWeight: '500' }}>Ana María González</Body2>
            <Body2 style={{ color: 'var(--colors-foreground-secondary)' }}>
              Ausente
            </Body2>
          </VStack>
        </HStack>

        <HStack space="3" align="center">
          <Avatar size="md" icon={Shield} showStatus status="busy" />
          <VStack space="1">
            <Body2 style={{ fontWeight: '500' }}>Administrador</Body2>
            <Body2 style={{ color: 'var(--colors-foreground-secondary)' }}>
              Ocupado
            </Body2>
          </VStack>
        </HStack>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Group Display</H2>
      <div className={styles.componentGroup}>
        <HStack space="2">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face"
            alt="Usuario 1"
            size="sm"
          />
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Usuario 2"
            size="sm"
          />
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
            alt="Usuario 3"
            size="sm"
          />
          <Avatar name="MR" size="sm" />
          <Avatar size="sm" />
        </HStack>

        <HStack space="0">
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            alt="Usuario 1"
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 4,
            }}
          />
          <AvatarWithImage
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            alt="Usuario 2"
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 3,
            }}
          />
          <Avatar
            name="LP"
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 2,
            }}
          />
          <Avatar
            size="md"
            style={{
              border: '2px solid white',
              zIndex: 1,
            }}
          />
        </HStack>
      </div>
    </div>
  </div>
);

export default AvatarPage;
