// /src/app/controls/link/page.tsx
// Link component documentation and showcase page
// Comprehensive examples of Link component usage and variants
// RELEVANT FILES: ../../../ui/link/index.ts, ../../page.css.ts

'use client';

import { type FC, type ReactElement } from 'react';

import { ArrowRight, Download, Mail, Phone } from '@/icons';
import { tokens } from '@/tokens/tokens.css';
import {
  Body1,
  Body2,
  Body3,
  Container,
  ContentWrapper,
  H1,
  H2,
  H3,
  HStack,
  Link,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Link component documentation page
 * Showcases all Link variants, sizes, states and usage patterns
 */
const LinkPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Link</H1>
      <Body1>
        Componente de enlace accesible construido con React Aria Components y
        completa integración con el sistema de tipografía. Proporciona
        navegación accesible, detección automática de enlaces externos y
        múltiples variantes visuales para diferentes casos de uso.
      </Body1>

      {/* Basic Usage */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Uso Básico</H2>
        <Body2>
          Los enlaces básicos proporcionan navegación accesible con estilos
          consistentes del sistema de diseño.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link href="/internal">Enlace interno</Link>
              <Link href="https://external.com" isExternal>
                Enlace externo
              </Link>
              <Link href="#section">Enlace de anclaje</Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link href="/internal">Enlace interno</Link>
<Link href="https://external.com" isExternal>Enlace externo</Link>
<Link href="#section">Enlace de anclaje</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* Variants */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Variantes</H2>
        <Body2>
          Diferentes estilos visuales para distintos contextos y jerarquías.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link variant="primary" href="#primary">
                Primary Link
              </Link>
              <Link variant="secondary" href="#secondary">
                Secondary Link
              </Link>
              <Link variant="external" href="https://external.com" isExternal>
                External Link
              </Link>
              <Link variant="disabled" isDisabled>
                Disabled Link
              </Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link variant="primary">Primary Link</Link>
<Link variant="secondary">Secondary Link</Link>
<Link variant="external" isExternal>External Link</Link>
<Link variant="disabled" isDisabled>Disabled Link</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* Typography Sizes */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Tamaños de Tipografía</H2>
        <Body2>
          Los enlaces se integran completamente con el sistema de tipografía,
          heredando tamaños, pesos y espaciado consistentes.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <Link size="h1" href="#h1">
              Enlace H1 - 48px
            </Link>
            <Link size="h2" href="#h2">
              Enlace H2 - 36px
            </Link>
            <Link size="h3" href="#h3">
              Enlace H3 - 30px
            </Link>
            <Link size="h4" href="#h4">
              Enlace H4 - 24px
            </Link>
            <Link size="h5" href="#h5">
              Enlace H5 - 20px
            </Link>
            <Link size="body1" href="#body1">
              Enlace Body1 - 18px
            </Link>
            <Link size="body2" href="#body2">
              Enlace Body2 - 16px
            </Link>
            <Link size="body3" href="#body3">
              Enlace Body3 - 14px
            </Link>
            <Link size="caption" href="#caption">
              Enlace Caption - 12px
            </Link>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link size="h1">Enlace H1</Link>
<Link size="body1">Enlace Body1</Link>
<Link size="caption">Enlace Caption</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* Underline Behavior */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Comportamiento del Subrayado</H2>
        <Body2>
          Control flexible sobre cuándo y cómo se muestran los subrayados en los
          enlaces.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link underlineBehavior="none" href="#none">
                Sin subrayado
              </Link>
              <Link underlineBehavior="hover" href="#hover">
                Subrayado al pasar
              </Link>
              <Link underlineBehavior="always" href="#always">
                Siempre subrayado
              </Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link underlineBehavior="none">Sin subrayado</Link>
<Link underlineBehavior="hover">Subrayado al pasar</Link>
<Link underlineBehavior="always">Siempre subrayado</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* Typography Modifiers */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Modificadores de Tipografía</H2>
        <Body2>
          Los enlaces heredan todos los modificadores del sistema de tipografía
          para máxima flexibilidad de estilo.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link bold href="#bold">
                Enlace en negrilla
              </Link>
              <Link italic href="#italic">
                Enlace en cursiva
              </Link>
              <Link highlight href="#highlight">
                Enlace resaltado
              </Link>
            </HStack>
            <HStack space="6">
              <Link underline strikeThrough href="#strike">
                Enlace tachado
              </Link>
              <Link isTruncated style={{ maxWidth: '150px' }} href="#truncated">
                Este es un enlace muy largo que será truncado
              </Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link bold>Enlace en negrilla</Link>
<Link italic>Enlace en cursiva</Link>
<Link highlight>Enlace resaltado</Link>
<Link strikeThrough>Enlace tachado</Link>
<Link isTruncated>Enlace truncado</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* Icons */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Enlaces con Iconos</H2>
        <Body2>
          Soporte para iconos personalizados con posicionamiento flexible y
          detección automática de enlaces externos.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link icon={ArrowRight} iconPosition="right" href="#arrow">
                Enlace con flecha
              </Link>
              <Link icon={Download} iconPosition="left" href="#download">
                Descargar archivo
              </Link>
            </HStack>
            <HStack space="6">
              <Link icon={Mail} href="mailto:example@email.com">
                Enviar email
              </Link>
              <Link icon={Phone} href="tel:+1234567890">
                Llamar teléfono
              </Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link icon={ArrowRight} iconPosition="right">Enlace con flecha</Link>
<Link icon={Download} iconPosition="left">Descargar archivo</Link>
<Link icon={Mail} href="mailto:example@email.com">Enviar email</Link>
<Link icon={Phone} href="tel:+1234567890">Llamar teléfono</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* External Links */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Enlaces Externos</H2>
        <Body2>
          Los enlaces externos se detectan automáticamente y reciben atributos
          de seguridad apropiados como target="_blank" y rel="noopener
          noreferrer".
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link href="https://github.com" isExternal>
                Repositorio GitHub
              </Link>
              <Link
                variant="external"
                href="https://docs.example.com"
                isExternal
              >
                Documentación externa
              </Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link href="https://github.com" isExternal>Repositorio GitHub</Link>
<Link variant="external" href="https://docs.example.com" isExternal>
  Documentación externa
</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* States */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Estados</H2>
        <Body2>
          Los enlaces proporcionan feedback visual claro para diferentes estados
          de interacción y accesibilidad.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link href="#normal">Estado normal</Link>
              <Link href="#visited" style={{ color: 'purple' }}>
                Estado visitado (simulado)
              </Link>
              <Link isDisabled>Estado deshabilitado</Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link href="#normal">Estado normal</Link>
<Link isDisabled>Estado deshabilitado</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* Polymorphic Usage */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Uso Polimórfico</H2>
        <Body2>
          El componente Link es polimórfico y puede renderizarse como diferentes
          elementos HTML manteniendo el estilo de enlace.
        </Body2>

        <div className={styles.componentExample}>
          <VStack space="4">
            <HStack space="6">
              <Link as="button" onClick={() => alert('Button clicked!')}>
                Botón con estilo de enlace
              </Link>
              <Link as="span" role="link" tabIndex={0}>
                Span con estilo de enlace
              </Link>
            </HStack>
          </VStack>
        </div>

        <div className={styles.codeExample}>
          <Body3>
            <code>{`<Link as="button" onClick={handleClick}>Botón con estilo de enlace</Link>
<Link as="span" role="link" tabIndex={0}>Span con estilo de enlace</Link>`}</code>
          </Body3>
        </div>
      </div>

      {/* Accessibility */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Accesibilidad</H2>
        <Body2>Características de accesibilidad del componente Link:</Body2>

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
                ⌨️ Navegación por Teclado
              </H3>
              <Body2>
                Tab para enfocar, Enter/Space para activar, Shift+Tab para
                navegación inversa.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🔍 Lectores de Pantalla
              </H3>
              <Body2>
                Soporte completo con ARIA attributes apropiados, estados
                anunciados correctamente.
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🔗 Enlaces Externos
              </H3>
              <Body2>
                Atributos de seguridad automáticos (target="_blank",
                rel="noopener noreferrer").
              </Body2>
            </div>

            <div>
              <H3 style={{ marginBottom: tokens.space[2] }}>
                🎯 Áreas de Toque
              </H3>
              <Body2>
                Áreas de toque optimizadas para dispositivos móviles con
                espaciado adecuado.
              </Body2>
            </div>
          </VStack>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div style={{ marginTop: tokens.space[8] }}>
        <H2>Pautas de Uso</H2>
        <Body2>Mejores prácticas para usar el componente Link:</Body2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
            <H3
              style={{
                marginBottom: tokens.space[2],
                color: 'green',
              }}
            >
              ✅ Hacer
            </H3>
            <VStack space="2">
              <Body3>• Usar descripciones claras y descriptivas</Body3>
              <Body3>• Indicar claramente los enlaces externos</Body3>
              <Body3>• Proporcionar contexto para enlaces ambiguos</Body3>
              <Body3>• Usar tamaños apropiados para el contexto</Body3>
            </VStack>
          </div>

          <div
            style={{
              padding: tokens.space[4],
              border: '1px solid var(--colors-border-primary)',
              borderRadius: tokens.radius.md,
            }}
          >
            <H3
              style={{
                marginBottom: tokens.space[2],
                color: 'red',
              }}
            >
              ❌ Evitar
            </H3>
            <VStack space="2">
              <Body3>• Texto de enlace genérico como "click aquí"</Body3>
              <Body3>• Enlaces muy cercanos sin espaciado</Body3>
              <Body3>• Usar solo color para indicar enlaces</Body3>
              <Body3>• Enlaces externos sin indicación</Body3>
            </VStack>
          </div>
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default LinkPage;
