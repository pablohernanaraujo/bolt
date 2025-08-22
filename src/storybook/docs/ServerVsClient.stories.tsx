// src/storybook/docs/ServerVsClient.stories.tsx
// Interactive examples demonstrating server vs client component patterns
// Shows practical differences between server-compatible and client-enhanced components
// RELEVANT FILES: button-server.tsx, button-client.tsx, modal-server.tsx, modal-client.tsx

import { ButtonClient } from '@/ui/button/button-client';
import { ButtonServer } from '@/ui/button/button-server';
import { ModalServer } from '@/ui/modal/modal-server';
import { Body1 } from '@/ui/typography';
import { H2 } from '@/ui/typography/h2';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';

const meta: Meta = {
  title: 'Documentation/Server vs Client Demos',
  parameters: {
    docs: {
      description: {
        component: `
# Server vs Client Component Interactive Demos

Este conjunto de stories demuestra las diferencias prácticas entre componentes server y client en el design system.

## Principios Clave

- **Server Components**: Renderizado en servidor, zero JavaScript, funcionan sin hidratación
- **Client Components**: Requieren JavaScript, soportan interactividad, hooks de React
- **Hybrid Pattern**: Estructura server + interactividad client quirúrgica

## Performance Impact

- Server components contribuyen **0 bytes** al JavaScript bundle
- Client components añaden JavaScript según funcionalidad
- Hybrid pattern minimiza JavaScript mientras mantiene UX rica
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Comparación directa entre Button Server y Client
 * Muestra las diferencias en funcionalidad y bundle impact
 */
export const ButtonComparison: Story = {
  name: '🔄 Button: Server vs Client',
  render: () => {
    const ButtonComparisonDemo = (): ReactElement => {
      const [clientClicks, setClientClicks] = useState(0);

      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }}
        >
          {/* Server Component Demo */}
          <div
            style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <H2>🖥️ Server Component</H2>
            <Body1>
              ButtonServer renderiza en el servidor sin JavaScript. Funciona con
              formularios y navegación básica.
            </Body1>

            <div style={{ marginTop: '1rem' }}>
              <ButtonServer
                variant="primary"
                type="button"
                // No puede usar onClick con estado React
                // En producción usaría form action o href
              >
                Server Button
              </ButtonServer>
            </div>

            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#666',
              }}
            >
              ✅ Zero JavaScript
              <br />
              ✅ SEO friendly
              <br />
              ✅ Funciona sin hidratación
              <br />
              ❌ No interactividad compleja
              <br />❌ No useState/useEffect
            </div>

            <details style={{ marginTop: '1rem' }}>
              <summary>Ver código Server</summary>
              <pre
                style={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                }}
              >
                {`// button-server.tsx (NO "use client")
export const ButtonServer = forwardRef<HTMLButtonElement, Props>(
  ({ variant, children, ...props }, ref) => (
    <button 
      ref={ref} 
      className={buildClassName(variant)} 
      {...props}
    >
      {children}
    </button>
  )
);`}
              </pre>
            </details>
          </div>

          {/* Client Component Demo */}
          <div
            style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <H2>💻 Client Component</H2>
            <Body1>
              ButtonClient soporta hooks de React, estados complejos, y toda la
              funcionalidad de React Aria.
            </Body1>

            <div style={{ marginTop: '1rem' }}>
              <ButtonClient
                variant="primary"
                onPress={() => setClientClicks((prev) => prev + 1)}
              >
                Client Button ({clientClicks} clicks)
              </ButtonClient>
            </div>

            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#666',
              }}
            >
              ✅ Full React hooks
              <br />
              ✅ React Aria integration
              <br />
              ✅ Complex interactions
              <br />
              ✅ Advanced accessibility
              <br />
              ❌ Requires JavaScript
              <br />❌ Bundle size impact
            </div>

            <details style={{ marginTop: '1rem' }}>
              <summary>Ver código Client</summary>
              <pre
                style={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                }}
              >
                {`// button-client.tsx
'use client';

export const ButtonClient = (props) => {
  return (
    <AriaButton 
      className={buildClassName(props)}
      {...props}
    >
      {props.children}
    </AriaButton>
  );
};`}
              </pre>
            </details>
          </div>
        </div>
      );
    };

    return <ButtonComparisonDemo />;
  },
};

/**
 * Demo del patrón híbrido con Modal
 * Estructura server + interactividad client quirúrgica
 */
export const ModalHybridPattern: Story = {
  name: '🏗️ Modal: Hybrid Pattern',
  render: (): ReactElement => {
    const ModalHybridDemo = (): ReactElement => {
      const [isModalOpen, setIsModalOpen] = useState(false);

      return (
        <div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <H2>🏗️ Hybrid Modal Pattern</H2>
            <Body1>
              Modal structure renderizada en servidor + interactividad client
              solo donde se necesita. Esto minimiza el JavaScript mientras
              mantiene UX rica.
            </Body1>

            <div style={{ marginTop: '1rem' }}>
              <ButtonClient onPress={() => setIsModalOpen(true)}>
                Open Modal
              </ButtonClient>
            </div>

            {isModalOpen && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                }}
              >
                {/* Server-rendered modal structure */}
                <ModalServer
                  size="medium"
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '1.5rem',
                  }}
                >
                  <H2>Hybrid Modal Demo</H2>
                  <Body1>Este modal combina:</Body1>
                  <ul style={{ marginTop: '1rem' }}>
                    <li>
                      🖥️ <strong>Structure</strong>: Renderizada en servidor
                      (ModalServer)
                    </li>
                    <li>
                      💻 <strong>Interactions</strong>: Client component solo
                      para close button
                    </li>
                    <li>
                      ⚡ <strong>Performance</strong>: JavaScript mínimo para
                      máxima funcionalidad
                    </li>
                  </ul>

                  {/* Solo el close button necesita JavaScript */}
                  <div
                    style={{
                      marginTop: '1.5rem',
                      textAlign: 'right',
                    }}
                  >
                    <ButtonClient
                      variant="secondary"
                      onPress={() => setIsModalOpen(false)}
                    >
                      Close Modal
                    </ButtonClient>
                  </div>
                </ModalServer>
              </div>
            )}

            <details style={{ marginTop: '1rem' }}>
              <summary>Ver patrón de código Hybrid</summary>
              <pre
                style={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                }}
              >
                {`// modal/modal.tsx - Main API
export { ModalServer as Modal } from './modal-server';     // Default: Server
export { ModalCloseButton } from './modal-client';         // Client pieces

// modal/modal-server.tsx (NO "use client")
export const ModalServer = ({ title, children, ...props }) => (
  <div role="dialog" aria-modal="true" {...props}>
    {title && <h2>{title}</h2>}
    <div>{children}</div>
  </div>
);

// modal/modal-client.tsx
'use client';
export const ModalCloseButton = ({ onClose }) => (
  <Button onClick={onClose}>Close</Button>
);

// Usage: Server component con client enhancements
function MyPage() {
  return (
    <Modal title="Server Structure">
      <p>Server-rendered content</p>
      <ModalCloseButton /> {/* Only this needs JS */}
    </Modal>
  );
}`}
              </pre>
            </details>
          </div>
        </div>
      );
    };

    return <ModalHybridDemo />;
  },
};

/**
 * Demo de Progressive Enhancement
 * Muestra cómo funcionalidad base sin JS se mejora con JS
 */
export const ProgressiveEnhancement: Story = {
  name: '📈 Progressive Enhancement',
  render: (): ReactElement => {
    const ProgressiveEnhancementDemo = (): ReactElement => {
      const [formData, setFormData] = useState({
        email: '',
        subscribed: false,
      });

      const handleFormSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        setFormData({
          ...formData,
          subscribed: true,
        });
      };

      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }}
        >
          {/* Base Functionality */}
          <div
            style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <H2>🔧 Base Functionality (No JS)</H2>
            <Body1>
              Form funciona completamente sin JavaScript usando server actions.
            </Body1>

            <form
              style={{ marginTop: '1rem' }}
              action="/api/newsletter"
              method="POST"
            >
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email-basic">Email:</label>
                <input
                  id="email-basic"
                  type="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.25rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <ButtonServer type="submit" variant="primary">
                Subscribe (Server Action)
              </ButtonServer>
            </form>

            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#666',
              }}
            >
              ✅ Funciona sin JavaScript
              <br />
              ✅ Form submission nativa
              <br />
              ✅ Server-side validation
              <br />
              ✅ SEO friendly
              <br />
              ❌ No feedback instantáneo
              <br /> ❌ No validación en tiempo real
            </div>
          </div>

          {/* Enhanced Functionality */}
          <div
            style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <H2>⚡ Enhanced (Con JS)</H2>
            <Body1>
              Mismo form con progressive enhancements para mejor UX.
            </Body1>

            <form onSubmit={handleFormSubmit} style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email-enhanced">Email:</label>
                <input
                  id="email-enhanced"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.25rem',
                    border: `1px solid ${formData.email.includes('@') ? 'green' : '#ccc'}`,
                    borderRadius: '4px',
                  }}
                />
                {formData.email && !formData.email.includes('@') && (
                  <div
                    style={{
                      color: 'red',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                    }}
                  >
                    Please enter a valid email
                  </div>
                )}
              </div>

              <ButtonClient
                type="submit"
                variant="primary"
                isDisabled={!formData.email.includes('@')}
              >
                {formData.subscribed ? '✓ Subscribed!' : 'Subscribe (Enhanced)'}
              </ButtonClient>
            </form>

            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#666',
              }}
            >
              ✅ Validación en tiempo real
              <br />
              ✅ Feedback instantáneo
              <br />
              ✅ Optimistic updates
              <br />
              ✅ Mejor UX interactiva
              <br />
              ✅ Fallback a funcionalidad base
              <br />
            </div>

            <details style={{ marginTop: '1rem' }}>
              <summary>Ver patrón Progressive Enhancement</summary>
              <pre
                style={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                }}
              >
                {`// Base form (Server Component)
function NewsletterForm() {
  return (
    <form action="/api/newsletter" method="POST">
      <input type="email" name="email" required />
      <ButtonServer type="submit">Subscribe</ButtonServer>
      
      {/* Enhancement carga bajo demanda */}
      <FormEnhancement />
    </form>
  );
}

// Enhancement (Client Component)
'use client';
function FormEnhancement() {
  // Añade validación en tiempo real, loading states, etc.
  // Invisible si JavaScript no está disponible
}`}
              </pre>
            </details>
          </div>
        </div>
      );
    };

    return <ProgressiveEnhancementDemo />;
  },
};

/**
 * Demo de Bundle Impact
 * Muestra visualmente el impacto en el bundle de diferentes patterns
 */
export const BundleImpactDemo: Story = {
  name: '📦 Bundle Impact Analysis',
  render: () => {
    const bundleData = {
      serverOnly: {
        components: ['ButtonServer', 'Card', 'Body1', 'Container'],
        jsSize: '0 KB',
        features: ['Static rendering', 'Form integration', 'Zero hydration'],
        color: '#22c55e',
      },
      clientOnly: {
        components: ['ButtonClient', 'Modal', 'Dropdown', 'Tooltip'],
        jsSize: '~45 KB',
        features: ['Full interactivity', 'React hooks', 'Advanced A11y'],
        color: '#ef4444',
      },
      hybrid: {
        components: ['ModalServer + ModalClient', 'FormBase + FormEnhancement'],
        jsSize: '~12 KB',
        features: ['Best of both worlds', 'Minimal JS', 'Progressive UX'],
        color: '#3b82f6',
      },
    };

    return (
      <div>
        <div
          style={{
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <H2>📦 Bundle Impact Comparison</H2>
          <Body1>
            Comparación visual del impacto en el bundle de diferentes
            architectural patterns.
          </Body1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '1.5rem',
          }}
        >
          {Object.entries(bundleData).map(([pattern, data]) => (
            <div
              key={pattern}
              style={{
                borderLeft: `4px solid ${data.color}`,
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            >
              <h3
                style={{
                  textTransform: 'capitalize',
                  marginBottom: '1rem',
                  color: data.color,
                }}
              >
                {pattern.replace(/([A-Z])/g, ' $1')} Pattern
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <strong>Bundle Size: {data.jsSize}</strong>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: data.color,
                      width:
                        pattern === 'serverOnly'
                          ? '0%'
                          : pattern === 'hybrid'
                            ? '25%'
                            : '100%',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong>Components:</strong>
                <ul
                  style={{
                    marginTop: '0.5rem',
                    paddingLeft: '1rem',
                  }}
                >
                  {data.components.map((comp) => (
                    <li key={comp} style={{ fontSize: '0.875rem' }}>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Features:</strong>
                <ul
                  style={{
                    marginTop: '0.5rem',
                    paddingLeft: '1rem',
                  }}
                >
                  {data.features.map((feature) => (
                    <li key={feature} style={{ fontSize: '0.875rem' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <H2>🎯 Recommendations</H2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            <div>
              <h4
                style={{
                  color: '#22c55e',
                  marginBottom: '0.5rem',
                }}
              >
                ✅ Use Server-Only When:
              </h4>
              <ul
                style={{
                  fontSize: '0.875rem',
                  paddingLeft: '1rem',
                }}
              >
                <li>Static content display</li>
                <li>Form submissions</li>
                <li>Navigation links</li>
                <li>SEO-critical pages</li>
              </ul>
            </div>

            <div>
              <h4
                style={{
                  color: '#3b82f6',
                  marginBottom: '0.5rem',
                }}
              >
                🎯 Use Hybrid When:
              </h4>
              <ul
                style={{
                  fontSize: '0.875rem',
                  paddingLeft: '1rem',
                }}
              >
                <li>Complex UI with some interactivity</li>
                <li>Performance is critical</li>
                <li>Progressive enhancement needed</li>
                <li>Large applications</li>
              </ul>
            </div>

            <div>
              <h4
                style={{
                  color: '#ef4444',
                  marginBottom: '0.5rem',
                }}
              >
                ⚡ Use Client-Only When:
              </h4>
              <ul
                style={{
                  fontSize: '0.875rem',
                  paddingLeft: '1rem',
                }}
              >
                <li>Heavy interactivity required</li>
                <li>Real-time features</li>
                <li>Complex state management</li>
                <li>Admin dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Demo de Testing Patterns
 * Muestra cómo testear server vs client components
 */
export const TestingPatternsDemo: Story = {
  name: '🧪 Testing Patterns',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
      }}
    >
      <div
        style={{
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <H2>🖥️ Server Component Testing</H2>
        <Body1>Testing strategies para componentes server-rendered.</Body1>

        <details style={{ marginTop: '1rem' }}>
          <summary>Ver ejemplo de test Server</summary>
          <pre
            style={{
              fontSize: '0.75rem',
              overflow: 'auto',
            }}
          >
            {`// button-server.test.tsx
import { renderServer } from '@/test-utils';
import { ButtonServer } from './button-server';

describe('ButtonServer', () => {
  it('renders on server without errors', () => {
    const { serverHTML } = renderServer(
      <ButtonServer variant="primary">
        Test Button
      </ButtonServer>
    );
    
    expect(serverHTML).toContain('Test Button');
    expect(serverHTML).toContain('button');
  });

  it('works without JavaScript', () => {
    const { staticHTML } = renderStaticOnly(
      <form action="/submit" method="POST">
        <ButtonServer type="submit">Submit</ButtonServer>
      </form>
    );
    
    expect(staticHTML).toContain('action="/submit"');
  });
});`}
          </pre>
        </details>

        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#666',
          }}
        >
          <strong>Server Testing Focus:</strong>
          <br />
          ✅ SSR rendering
          <br />
          ✅ Static HTML output
          <br />
          ✅ Accessibility attributes
          <br />
          ✅ No hydration mismatches
          <br />
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <H2>💻 Client Component Testing</H2>
        <Body1>Testing strategies para componentes con interactividad.</Body1>

        <details style={{ marginTop: '1rem' }}>
          <summary>Ver ejemplo de test Client</summary>
          <pre
            style={{
              fontSize: '0.75rem',
              overflow: 'auto',
            }}
          >
            {`// button-client.test.tsx
import { render, userEvent } from '@testing-library/react';
import { ButtonClient } from './button-client';

describe('ButtonClient', () => {
  it('handles user interactions', async () => {
    const onPress = vi.fn();
    render(
      <ButtonClient onPress={onPress}>
        Click me
      </ButtonClient>
    );
    
    await userEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('supports React Aria features', () => {
    render(
      <ButtonClient isDisabled>
        Disabled Button
      </ButtonClient>
    );
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});`}
          </pre>
        </details>

        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#666',
          }}
        >
          <strong>Client Testing Focus:</strong>
          <br />
          ✅ User interactions
          <br />
          ✅ State management
          <br />
          ✅ Event handling
          <br />
          ✅ React hooks behavior
          <br />
        </div>
      </div>
    </div>
  ),
};
