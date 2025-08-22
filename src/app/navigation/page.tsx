// /src/app/navigation/page.tsx
// Navigation components overview page
// Lists all navigation-related components in the design system
// RELEVANT FILES: ./accordion/page.tsx, ../page.css.ts

'use client';

import Link from 'next/link';
import { type FC, type ReactElement } from 'react';

import { ChevronRight, Icon, Menu, Navigation } from '@/icons';
import { Body1, Container, Divider, H1, H2, VStack } from '@/ui';

import * as styles from '../page.css';

/**
 * Navigation section overview page
 * Displays all navigation components available in the design system
 */
const NavigationPage: FC = (): ReactElement => (
  <Container>
    <VStack space="16">
      <div className={styles.header}>
        <H1>Navigation Components</H1>
        <Body1>
          Components for organizing and navigating content in your application.
          These components help users understand where they are and where they
          can go.
        </Body1>
      </div>

      <Divider />

      {/* Components Grid */}
      <section className={styles.section}>
        <H2>Available Components</H2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
          }}
        >
          {/* Accordion Component */}
          <Link
            href="/navigation/accordion"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              className={styles.overviewCard}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
              }}
            >
              <div className={styles.overviewIcon}>
                <Icon icon={Menu} size="lg" />
              </div>
              <h3 className={styles.overviewCardTitle}>Accordion</h3>
              <p className={styles.overviewCardDescription}>
                Collapsible content sections with smooth animations and keyboard
                navigation. Supports single and multiple selection modes.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1rem',
                  gap: '0.25rem',
                  color: 'var(--color-brand-primary)',
                }}
              >
                <span>View Component</span>
                <Icon icon={ChevronRight} size="sm" />
              </div>
            </div>
          </Link>

          {/* Breadcrumb Component */}
          <Link
            href="/navigation/breadcrumb"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              className={styles.overviewCard}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
              }}
            >
              <div className={styles.overviewIcon}>
                <Icon icon={Navigation} size="lg" />
              </div>
              <h3 className={styles.overviewCardTitle}>Breadcrumb</h3>
              <p className={styles.overviewCardDescription}>
                Navigation path indicator showing the user's location in the
                application hierarchy. Supports truncation, custom separators,
                and responsive design.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1rem',
                  gap: '0.25rem',
                  color: 'var(--color-brand-primary)',
                }}
              >
                <span>View Component</span>
                <Icon icon={ChevronRight} size="sm" />
              </div>
            </div>
          </Link>

          {/* Tabs Component (Coming Soon) */}
          <div
            style={{
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={Menu} size="lg" />
              </div>
              <h3 className={styles.overviewCardTitle}>Tabs</h3>
              <p className={styles.overviewCardDescription}>
                Organize content into separate views where only one view is
                visible at a time.
              </p>
              <div
                style={{
                  marginTop: '1rem',
                  color: 'var(--color-foreground-tertiary)',
                }}
              >
                Coming Soon
              </div>
            </div>
          </div>

          {/* Pagination Component (Coming Soon) */}
          <div
            style={{
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={ChevronRight} size="lg" />
              </div>
              <h3 className={styles.overviewCardTitle}>Pagination</h3>
              <p className={styles.overviewCardDescription}>
                Navigate through multiple pages of content with customizable
                page sizes.
              </p>
              <div
                style={{
                  marginTop: '1rem',
                  color: 'var(--color-foreground-tertiary)',
                }}
              >
                Coming Soon
              </div>
            </div>
          </div>

          {/* Stepper Component (Coming Soon) */}
          <div
            style={{
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={Navigation} size="lg" />
              </div>
              <h3 className={styles.overviewCardTitle}>Stepper</h3>
              <p className={styles.overviewCardDescription}>
                Guide users through multi-step processes with clear progress
                indication.
              </p>
              <div
                style={{
                  marginTop: '1rem',
                  color: 'var(--color-foreground-tertiary)',
                }}
              >
                Coming Soon
              </div>
            </div>
          </div>

          {/* Navigation Rail (Coming Soon) */}
          <div
            style={{
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            <div className={styles.overviewCard}>
              <div className={styles.overviewIcon}>
                <Icon icon={Menu} size="lg" />
              </div>
              <h3 className={styles.overviewCardTitle}>Navigation Rail</h3>
              <p className={styles.overviewCardDescription}>
                Vertical navigation component for primary app navigation on
                larger screens.
              </p>
              <div
                style={{
                  marginTop: '1rem',
                  color: 'var(--color-foreground-tertiary)',
                }}
              >
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Usage Guidelines */}
      <section className={styles.section}>
        <H2>Usage Guidelines</H2>

        <VStack space="8">
          <div>
            <Body1>
              <strong>When to use navigation components:</strong>
            </Body1>
            <ul
              style={{
                marginTop: '0.5rem',
                paddingLeft: '1.5rem',
              }}
            >
              <li>
                To help users understand their current location in the
                application
              </li>
              <li>
                To provide clear pathways to different sections of content
              </li>
              <li>
                To organize large amounts of information into manageable chunks
              </li>
              <li>To guide users through multi-step processes</li>
            </ul>
          </div>

          <div>
            <Body1>
              <strong>Best practices:</strong>
            </Body1>
            <ul
              style={{
                marginTop: '0.5rem',
                paddingLeft: '1.5rem',
              }}
            >
              <li>Keep navigation consistent across your application</li>
              <li>Use clear, descriptive labels for navigation items</li>
              <li>Provide visual feedback for the current location/state</li>
              <li>Ensure all navigation components are keyboard accessible</li>
              <li>Test navigation patterns with real users</li>
            </ul>
          </div>

          <div>
            <Body1>
              <strong>Accessibility considerations:</strong>
            </Body1>
            <ul
              style={{
                marginTop: '0.5rem',
                paddingLeft: '1.5rem',
              }}
            >
              <li>All navigation components support keyboard navigation</li>
              <li>Proper ARIA labels and roles are included</li>
              <li>Focus management is handled automatically</li>
              <li>Screen reader announcements for state changes</li>
            </ul>
          </div>
        </VStack>
      </section>
    </VStack>
  </Container>
);

export default NavigationPage;
