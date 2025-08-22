// /src/app/feedback/page.tsx
// Overview page for feedback components
// Landing page explaining feedback components and their purpose in user communication
// RELEVANT FILES: toast/page.tsx, ../components/sidebar.tsx

'use client';

import { AlertCircle, Loader2, MessageCircle, Square } from 'lucide-react';
import { type FC, type ReactElement } from 'react';

import { Icon } from '@/icons';
import { Body2, Container, ContentWrapper, H1, H3 } from '@/ui';

import * as styles from '../page.css';

/**
 * Feedback overview page component
 * Provides introduction to feedback components and their communication patterns
 */
const FeedbackPage: FC = (): ReactElement => (
  <Container as="section" paddingY="8">
    <ContentWrapper variant="screen">
      <H1>Feedback</H1>
      <Body2>
        Los componentes de feedback proporcionan comunicación directa entre la
        aplicación y el usuario. Están diseñados para informar sobre estados,
        acciones completadas, errores o cualquier información importante que
        requiera la atención del usuario de manera no intrusiva.
      </Body2>

      <div style={{ marginTop: '1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={Square} size="xl" />
              </div>
              <H3>Skeleton</H3>
              <Body2>
                Placeholders de carga que muestran la estructura del contenido
                mientras se cargan los datos. Proporcionan una experiencia
                visual fluida y reducen la percepción de tiempo de carga.
              </Body2>
            </div>
          </div>

          <div>
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={Loader2} size="xl" />
              </div>
              <H3>Spinner</H3>
              <Body2>
                Indicadores de carga visual que proporcionan feedback durante
                operaciones asíncronas como carga de datos, procesamiento o
                espera. Mantiene informado al usuario sobre procesos en curso.
              </Body2>
            </div>
          </div>

          <div>
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={MessageCircle} size="xl" />
              </div>
              <H3>Toast</H3>
              <Body2>
                Notificaciones temporales que aparecen para informar al usuario
                sobre acciones completadas, errores o estados importantes. Se
                posicionan estratégicamente y desaparecen automáticamente.
              </Body2>
            </div>
          </div>

          <div>
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={AlertCircle} size="xl" />
              </div>
              <H3>Próximamente</H3>
              <Body2>
                Más componentes de feedback como Alert, Notification, Banner y
                Snackbar estarán disponibles próximamente para cubrir diferentes
                escenarios de comunicación.
              </Body2>
            </div>
          </div>
        </div>
      </div>

      {/* Principios de Diseño de Feedback */}
      <div style={{ marginTop: '3rem' }}>
        <H3>Principios de Diseño de Feedback</H3>
        <div style={{ marginTop: '1.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <div className={styles.overviewCard}>
                <H3>Claridad</H3>
                <Body2>
                  Los mensajes deben ser claros, concisos y fáciles de entender.
                  Utiliza un lenguaje directo que el usuario pueda procesar
                  rápidamente.
                </Body2>
              </div>
            </div>

            <div>
              <div className={styles.overviewCard}>
                <H3>Oportunidad</H3>
                <Body2>
                  El feedback debe aparecer en el momento adecuado, cercano
                  temporalmente a la acción que lo desencadenó para mantener el
                  contexto.
                </Body2>
              </div>
            </div>

            <div>
              <div className={styles.overviewCard}>
                <H3>Relevancia</H3>
                <Body2>
                  Solo muestra información que sea útil y relevante para el
                  usuario en ese momento específico. Evita el ruido informativo.
                </Body2>
              </div>
            </div>

            <div>
              <div className={styles.overviewCard}>
                <H3>No Intrusivo</H3>
                <Body2>
                  El feedback debe informar sin interrumpir el flujo de trabajo
                  del usuario. Permite continuar con las tareas principales.
                </Body2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tipos de Feedback */}
      <div style={{ marginTop: '3rem' }}>
        <H3>Tipos de Feedback</H3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem',
          }}
        >
          <div>
            <div className={styles.overviewCard}>
              <H3 style={{ color: '#28a745' }}>Éxito</H3>
              <Body2>
                Confirma que una acción se completó exitosamente. Refuerza la
                confianza del usuario y proporciona satisfacción por la tarea
                completada.
              </Body2>
            </div>
          </div>

          <div>
            <div className={styles.overviewCard}>
              <H3 style={{ color: '#dc3545' }}>Error</H3>
              <Body2>
                Informa sobre problemas que impiden completar una acción. Debe
                incluir información sobre qué salió mal y cómo solucionarlo.
              </Body2>
            </div>
          </div>

          <div>
            <div className={styles.overviewCard}>
              <H3 style={{ color: '#ffc107' }}>Advertencia</H3>
              <Body2>
                Alerta sobre situaciones que requieren atención pero no bloquean
                la funcionalidad. Previene errores potenciales.
              </Body2>
            </div>
          </div>

          <div>
            <div className={styles.overviewCard}>
              <H3 style={{ color: '#17a2b8' }}>Información</H3>
              <Body2>
                Proporciona contexto adicional o actualizaciones sobre el estado
                del sistema que pueden ser útiles para el usuario.
              </Body2>
            </div>
          </div>
        </div>
      </div>

      {/* Mejores Prácticas */}
      <div style={{ marginTop: '3rem' }}>
        <H3>Mejores Prácticas</H3>
        <div className={styles.overviewCard} style={{ marginTop: '1rem' }}>
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
                  <li>Usar un lenguaje claro y directo</li>
                  <li>Mostrar feedback inmediatamente después de la acción</li>
                  <li>Incluir iconos que refuercen el mensaje</li>
                  <li>Proporcionar acciones relevantes cuando sea apropiado</li>
                  <li>Respetar la duración apropiada para cada tipo</li>
                  <li>Mantener consistencia en el tono y estilo</li>
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
                  <li>Mostrar demasiados mensajes simultáneamente</li>
                  <li>Usar jerga técnica o mensajes crípticos</li>
                  <li>Hacer que los mensajes persistan demasiado tiempo</li>
                  <li>Interrumpir flujos críticos sin justificación</li>
                  <li>Usar colores o iconos inconsistentes</li>
                  <li>Mostrar feedback para acciones triviales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  </Container>
);

export default FeedbackPage;
