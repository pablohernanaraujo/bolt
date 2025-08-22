// /src/app/feedback/skeleton/page.tsx
// Skeleton component documentation page with comprehensive examples
// Showcases all skeleton variants and common usage patterns
// RELEVANT FILES: ../../../ui/skeleton/index.ts, ../../components/sidebar.tsx

'use client';

import { Clock, FileText, Image, MessageSquare, User } from 'lucide-react';
import { type FC, type ReactElement, useState } from 'react';

import { Icon } from '@/icons';
import {
  Avatar,
  Badge,
  Body1,
  Body2,
  Button,
  Container,
  ContentWrapper,
  Divider,
  Grid,
  GridItem,
  H1,
  H2,
  H3,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Skeleton documentation page component
 * Comprehensive guide to using skeleton loading placeholders
 */
const SkeletonPage: FC = (): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Simulate loading states
  const toggleLoading = (): void => {
    setIsLoaded(!isLoaded);
  };

  const simulateCardLoad = (): void => {
    setCardLoaded(false);
    setTimeout(() => setCardLoaded(true), 2000);
  };

  const simulateProfileLoad = (): void => {
    setProfileLoaded(false);
    setTimeout(() => setProfileLoaded(true), 1500);
  };

  return (
    <Container as="section" paddingY="8">
      <ContentWrapper variant="screen">
        <VStack space="8">
          {/* Header */}
          <div>
            <H1>Skeleton</H1>
            <Body1>
              Skeleton loading placeholders que muestran la estructura del
              contenido mientras se cargan los datos. Proporcionan una
              experiencia visual fluida y reducen la percepción de tiempo de
              carga mediante animaciones sutiles.
            </Body1>
          </div>

          {/* Basic Usage */}
          <div>
            <H2>Uso Básico</H2>
            <Body2>
              Los componentes Skeleton se pueden usar individualmente o en
              combinación para crear patrones de carga complejos.
            </Body2>

            <div className={styles.exampleContainer}>
              <VStack space="4">
                <H3>Skeleton Básico</H3>
                <div style={{ maxWidth: '300px' }}>
                  <VStack space="3">
                    <Skeleton height="20px" />
                    <Skeleton height="20px" width="80%" />
                    <Skeleton height="20px" width="60%" />
                  </VStack>
                </div>

                <H3>SkeletonCircle</H3>
                <HStack space="4" align="center">
                  <SkeletonCircle size="xs" />
                  <SkeletonCircle size="sm" />
                  <SkeletonCircle size="md" />
                  <SkeletonCircle size="lg" />
                  <SkeletonCircle size="xl" />
                  <SkeletonCircle size="2xl" />
                </HStack>

                <H3>SkeletonText</H3>
                <div style={{ maxWidth: '400px' }}>
                  <SkeletonText noOfLines={4} spacing="0.5rem" />
                </div>
              </VStack>
            </div>
          </div>

          {/* Interactive Example */}
          <div>
            <H2>Ejemplo Interactivo</H2>
            <Body2>
              Alterna entre estados de carga y contenido cargado para ver el
              comportamiento.
            </Body2>

            <div className={styles.exampleContainer}>
              <VStack space="4">
                <HStack space="4">
                  <Button variant="primary" onClick={toggleLoading}>
                    {isLoaded ? 'Mostrar Skeleton' : 'Mostrar Contenido'}
                  </Button>
                </HStack>

                <div style={{ maxWidth: '400px' }}>
                  <VStack space="3">
                    <HStack space="3" align="start">
                      <SkeletonCircle size="lg" isLoaded={isLoaded}>
                        <Avatar size="lg" name="John Doe" />
                      </SkeletonCircle>

                      <VStack space="2" style={{ flex: 1 }}>
                        <Skeleton height="16px" isLoaded={isLoaded}>
                          <H3>John Doe</H3>
                        </Skeleton>
                        <Skeleton height="14px" width="70%" isLoaded={isLoaded}>
                          <Body2>Software Engineer</Body2>
                        </Skeleton>
                      </VStack>
                    </HStack>

                    <SkeletonText noOfLines={3} isLoaded={isLoaded}>
                      <Body2>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation.
                      </Body2>
                    </SkeletonText>
                  </VStack>
                </div>
              </VStack>
            </div>
          </div>

          {/* Common Patterns */}
          <div>
            <H2>Patrones Comunes</H2>
            <Body2>
              Ejemplos de patrones de skeleton típicos para diferentes tipos de
              contenido.
            </Body2>

            <Grid
              templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
              gap="6"
            >
              {/* Card Pattern */}
              <GridItem>
                <div className={styles.exampleContainer}>
                  <VStack space="3">
                    <HStack space="2" align="center">
                      <Icon icon={Image} size="sm" />
                      <H3>Card de Producto</H3>
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={simulateCardLoad}
                      >
                        <Icon icon={Clock} size="xs" />
                      </Button>
                    </HStack>

                    <div
                      style={{
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        padding: '1rem',
                      }}
                    >
                      <VStack space="3">
                        <Skeleton
                          height="150px"
                          borderRadius="medium"
                          isLoaded={cardLoaded}
                        >
                          <div
                            style={{
                              height: '150px',
                              backgroundColor: '#f0f0f0',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Icon icon={Image} size="xl" />
                          </div>
                        </Skeleton>

                        <VStack space="2">
                          <Skeleton height="20px" isLoaded={cardLoaded}>
                            <H3>Producto Increíble</H3>
                          </Skeleton>
                          <Skeleton
                            height="16px"
                            width="60%"
                            isLoaded={cardLoaded}
                          >
                            <Body2>$99.99</Body2>
                          </Skeleton>
                          <SkeletonText noOfLines={2} isLoaded={cardLoaded}>
                            <Body2>
                              Descripción del producto con características
                              principales y beneficios para el usuario.
                            </Body2>
                          </SkeletonText>
                        </VStack>

                        <Skeleton height="36px" isLoaded={cardLoaded}>
                          <Button variant="primary" fullWidth>
                            Agregar al Carrito
                          </Button>
                        </Skeleton>
                      </VStack>
                    </div>
                  </VStack>
                </div>
              </GridItem>

              {/* Profile Pattern */}
              <GridItem>
                <div className={styles.exampleContainer}>
                  <VStack space="3">
                    <HStack space="2" align="center">
                      <Icon icon={User} size="sm" />
                      <H3>Perfil de Usuario</H3>
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={simulateProfileLoad}
                      >
                        <Icon icon={Clock} size="xs" />
                      </Button>
                    </HStack>

                    <div
                      style={{
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        padding: '1rem',
                      }}
                    >
                      <VStack space="4">
                        {/* Profile Header */}
                        <HStack space="3" align="start">
                          <SkeletonCircle size="2xl" isLoaded={profileLoaded}>
                            <Avatar size="2xl" name="María García" />
                          </SkeletonCircle>

                          <VStack space="2" style={{ flex: 1 }}>
                            <Skeleton
                              height="24px"
                              width="150px"
                              isLoaded={profileLoaded}
                            >
                              <H3>María García</H3>
                            </Skeleton>
                            <Skeleton
                              height="18px"
                              width="120px"
                              isLoaded={profileLoaded}
                            >
                              <Body2>UX Designer</Body2>
                            </Skeleton>
                            <HStack space="2">
                              <Skeleton
                                height="24px"
                                width="60px"
                                borderRadius="full"
                                isLoaded={profileLoaded}
                              >
                                <Badge variant="solid" colorScheme="success">
                                  Pro
                                </Badge>
                              </Skeleton>
                              <Skeleton
                                height="24px"
                                width="80px"
                                borderRadius="full"
                                isLoaded={profileLoaded}
                              >
                                <Badge variant="subtle" colorScheme="info">
                                  Verified
                                </Badge>
                              </Skeleton>
                            </HStack>
                          </VStack>
                        </HStack>

                        <Divider />

                        {/* Profile Stats */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1rem',
                          }}
                        >
                          <VStack space="1" align="center">
                            <Skeleton
                              height="20px"
                              width="40px"
                              isLoaded={profileLoaded}
                            >
                              <Body1 style={{ fontWeight: 600 }}>124</Body1>
                            </Skeleton>
                            <Skeleton
                              height="16px"
                              width="60px"
                              isLoaded={profileLoaded}
                            >
                              <Body2>Projects</Body2>
                            </Skeleton>
                          </VStack>
                          <VStack space="1" align="center">
                            <Skeleton
                              height="20px"
                              width="40px"
                              isLoaded={profileLoaded}
                            >
                              <Body1 style={{ fontWeight: 600 }}>2.1k</Body1>
                            </Skeleton>
                            <Skeleton
                              height="16px"
                              width="60px"
                              isLoaded={profileLoaded}
                            >
                              <Body2>Followers</Body2>
                            </Skeleton>
                          </VStack>
                          <VStack space="1" align="center">
                            <Skeleton
                              height="20px"
                              width="40px"
                              isLoaded={profileLoaded}
                            >
                              <Body1 style={{ fontWeight: 600 }}>847</Body1>
                            </Skeleton>
                            <Skeleton
                              height="16px"
                              width="60px"
                              isLoaded={profileLoaded}
                            >
                              <Body2>Following</Body2>
                            </Skeleton>
                          </VStack>
                        </div>

                        <SkeletonText noOfLines={3} isLoaded={profileLoaded}>
                          <Body2>
                            Passionate UX designer with 5+ years of experience
                            creating intuitive digital experiences. Love working
                            on design systems and accessibility improvements.
                          </Body2>
                        </SkeletonText>
                      </VStack>
                    </div>
                  </VStack>
                </div>
              </GridItem>

              {/* Comment Thread Pattern */}
              <GridItem>
                <div className={styles.exampleContainer}>
                  <VStack space="3">
                    <HStack space="2" align="center">
                      <Icon icon={MessageSquare} size="sm" />
                      <H3>Hilo de Comentarios</H3>
                    </HStack>

                    <VStack space="3">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          style={{
                            border: '1px solid #e5e5e5',
                            borderRadius: '8px',
                            padding: '1rem',
                          }}
                        >
                          <HStack space="3" align="start">
                            <SkeletonCircle size="md" />
                            <VStack space="2" style={{ flex: 1 }}>
                              <HStack space="2" align="center">
                                <Skeleton height="16px" width="100px" />
                                <Skeleton height="14px" width="60px" />
                              </HStack>
                              <SkeletonText
                                noOfLines={item === 1 ? 3 : item === 2 ? 2 : 1}
                                spacing="0.25rem"
                              />
                              <HStack space="4">
                                <Skeleton height="14px" width="40px" />
                                <Skeleton height="14px" width="50px" />
                                <Skeleton height="14px" width="45px" />
                              </HStack>
                            </VStack>
                          </HStack>
                        </div>
                      ))}
                    </VStack>
                  </VStack>
                </div>
              </GridItem>

              {/* List Pattern */}
              <GridItem>
                <div className={styles.exampleContainer}>
                  <VStack space="3">
                    <HStack space="2" align="center">
                      <Icon icon={FileText} size="sm" />
                      <H3>Lista de Elementos</H3>
                    </HStack>

                    <VStack space="3">
                      {[
                        {
                          title: '75%',
                          subtitle: '55%',
                        },
                        {
                          title: '85%',
                          subtitle: '45%',
                        },
                        {
                          title: '70%',
                          subtitle: '60%',
                        },
                        {
                          title: '90%',
                          subtitle: '50%',
                        },
                        {
                          title: '80%',
                          subtitle: '65%',
                        },
                      ].map((item, index) => (
                        <HStack
                          key={index}
                          space="3"
                          align="center"
                          style={{
                            padding: '0.75rem',
                            border: '1px solid #e5e5e5',
                            borderRadius: '4px',
                          }}
                        >
                          <SkeletonCircle size="sm" />
                          <VStack space="1" style={{ flex: 1 }}>
                            <Skeleton height="16px" width={item.title} />
                            <Skeleton height="14px" width={item.subtitle} />
                          </VStack>
                          <Skeleton
                            height="32px"
                            width="60px"
                            borderRadius="medium"
                          />
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </div>
              </GridItem>
            </Grid>
          </div>

          {/* Animation Options */}
          <div>
            <H2>Opciones de Animación</H2>
            <Body2>
              Diferentes velocidades y tipos de animación para distintos
              contextos.
            </Body2>

            <div className={styles.exampleContainer}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                <VStack space="2" align="center">
                  <H3>Lenta</H3>
                  <Skeleton height="40px" speed="slow" />
                  <Body2>Para contenido crítico</Body2>
                </VStack>

                <VStack space="2" align="center">
                  <H3>Normal</H3>
                  <Skeleton height="40px" speed="normal" />
                  <Body2>Uso estándar</Body2>
                </VStack>

                <VStack space="2" align="center">
                  <H3>Rápida</H3>
                  <Skeleton height="40px" speed="fast" />
                  <Body2>Para microinteracciones</Body2>
                </VStack>

                <VStack space="2" align="center">
                  <H3>Sin Animación</H3>
                  <Skeleton height="40px" isAnimated={false} />
                  <Body2>Para mejor rendimiento</Body2>
                </VStack>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <H2>Accesibilidad</H2>
            <Body2>
              Los componentes Skeleton incluyen atributos ARIA apropiados para
              lectores de pantalla y cumplen con estándares de accesibilidad.
            </Body2>

            <div className={styles.exampleContainer}>
              <VStack space="4">
                <div>
                  <H3>Atributos ARIA Incluidos</H3>
                  <ul
                    style={{
                      paddingLeft: '1.5rem',
                      margin: 0,
                    }}
                  >
                    <li>
                      <code>role="status"</code> - Identifica el elemento como
                      indicador de estado
                    </li>
                    <li>
                      <code>aria-busy="true"</code> - Indica que el contenido
                      está cargando
                    </li>
                    <li>
                      <code>aria-live="polite"</code> - Anuncia cambios de
                      manera no intrusiva
                    </li>
                    <li>
                      <code>aria-label</code> - Proporciona descripción para
                      lectores de pantalla
                    </li>
                  </ul>
                </div>

                <div>
                  <H3>Consideraciones de Diseño</H3>
                  <ul
                    style={{
                      paddingLeft: '1.5rem',
                      margin: 0,
                    }}
                  >
                    <li>
                      Respeta <code>prefers-reduced-motion</code> para usuarios
                      con sensibilidad al movimiento
                    </li>
                    <li>Usa contrastes apropiados en modo de alto contraste</li>
                    <li>
                      Mantiene el flujo de layout para evitar cambios bruscos
                    </li>
                    <li>
                      Proporciona indicadores de progreso cuando es posible
                    </li>
                  </ul>
                </div>
              </VStack>
            </div>
          </div>

          {/* Best Practices */}
          <div>
            <H2>Mejores Prácticas</H2>
            <Body2>
              Guías para usar efectivamente los componentes Skeleton en tus
              aplicaciones.
            </Body2>

            <div className={styles.exampleContainer}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <div>
                    <H3>✅ Hacer</H3>
                    <ul
                      style={{
                        paddingLeft: '1.5rem',
                        margin: 0,
                      }}
                    >
                      <li>Usar skeleton que coincida con el contenido final</li>
                      <li>Mantener proporciones similares al contenido real</li>
                      <li>
                        Mostrar skeleton inmediatamente al iniciar la carga
                      </li>
                      <li>Usar animaciones sutiles y no distractivas</li>
                      <li>
                        Proporcionar feedback de progreso cuando sea posible
                      </li>
                      <li>
                        Respetar las preferencias de accesibilidad del usuario
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div>
                    <H3>❌ Evitar</H3>
                    <ul
                      style={{
                        paddingLeft: '1.5rem',
                        margin: 0,
                      }}
                    >
                      <li>Mostrar skeleton por más de 10 segundos</li>
                      <li>Usar formas que no coincidan con el contenido</li>
                      <li>Cambiar drásticamente el layout al cargar</li>
                      <li>Usar demasiadas animaciones simultáneas</li>
                      <li>Mostrar skeleton para contenido instantáneo</li>
                      <li>Olvidar manejar estados de error</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VStack>
      </ContentWrapper>
    </Container>
  );
};

export default SkeletonPage;
