// /src/app/layout/grid/page.tsx
// Grid component showcase page
// Demonstrates CSS Grid layout component with flexible positioning and spanning
// RELEVANT FILES: ../../../ui/layout/grid, ../../../ui/button

'use client';

import { type FC, type ReactElement } from 'react';

import { Icon, Package, Palette, Settings, User, Zap } from '@/icons';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import {
  Badge,
  Body2,
  Button,
  Grid,
  GridItem,
  H1,
  H2,
  H3,
  Overline,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Grid page component
 * CSS Grid layout component that provides flexible grid layouts with precise positioning
 */
const GridPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>Grid</H1>
    <Body2>
      Componente de layout CSS Grid que proporciona layouts de cuadrícula
      flexibles con posicionamiento preciso y control de spanning para crear
      interfaces complejas y responsivas.
    </Body2>

    <div className={styles.showcase}>
      <H2>Basic Usage</H2>
      <div className={styles.componentGroup}>
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
          <GridItem>
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: tokens.radius.md,
                textAlign: 'center',
              }}
            >
              Item 1
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderRadius: tokens.radius.md,
                textAlign: 'center',
              }}
            >
              Item 2
            </div>
          </GridItem>
          <GridItem>
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                borderRadius: tokens.radius.md,
                textAlign: 'center',
              }}
            >
              Item 3
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Column Templates</H2>
      <VStack space="6">
        <div className={styles.componentItem}>
          <Overline>Equal Columns - repeat(3, 1fr)</Overline>
          <Grid templateColumns="repeat(3, 1fr)" gap="4">
            {[1, 2, 3].map((i) => (
              <GridItem key={i}>
                <div
                  style={{
                    padding: tokens.space[3],
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: tokens.radius.md,
                    textAlign: 'center',
                  }}
                >
                  Item {i}
                </div>
              </GridItem>
            ))}
          </Grid>
        </div>

        <div className={styles.componentItem}>
          <Overline>Fixed + Flexible - 200px 1fr 100px</Overline>
          <Grid templateColumns="200px 1fr 100px" gap="4">
            {[1, 2, 3].map((i) => (
              <GridItem key={i}>
                <div
                  style={{
                    padding: tokens.space[3],
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: tokens.radius.md,
                    textAlign: 'center',
                  }}
                >
                  Item {i}
                </div>
              </GridItem>
            ))}
          </Grid>
        </div>

        <div className={styles.componentItem}>
          <Overline>Auto-fit - repeat(auto-fit, minmax(150px, 1fr))</Overline>
          <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap="4">
            {[1, 2, 3, 4].map((i) => (
              <GridItem key={i}>
                <div
                  style={{
                    padding: tokens.space[3],
                    backgroundColor: 'rgba(251, 146, 60, 0.1)',
                    borderRadius: tokens.radius.md,
                    textAlign: 'center',
                  }}
                >
                  Item {i}
                </div>
              </GridItem>
            ))}
          </Grid>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>GridItem Spanning</H2>
      <VStack space="6">
        <div className={styles.componentItem}>
          <Overline>Column Spanning</Overline>
          <Grid templateColumns="repeat(4, 1fr)" gap="4">
            <GridItem colSpan={2}>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: tokens.radius.md,
                  textAlign: 'center',
                }}
              >
                Spans 2 columns
              </div>
            </GridItem>
            <GridItem>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: tokens.radius.md,
                  textAlign: 'center',
                }}
              >
                Single
              </div>
            </GridItem>
            <GridItem>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  borderRadius: tokens.radius.md,
                  textAlign: 'center',
                }}
              >
                Single
              </div>
            </GridItem>
          </Grid>
        </div>

        <div className={styles.componentItem}>
          <Overline>Row Spanning</Overline>
          <Grid
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(2, 80px)"
            gap="4"
          >
            <GridItem rowSpan={2}>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  borderRadius: tokens.radius.md,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Spans 2 rows
              </div>
            </GridItem>
            <GridItem>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: 'rgba(236, 72, 153, 0.1)',
                  borderRadius: tokens.radius.md,
                  textAlign: 'center',
                }}
              >
                Item 2
              </div>
            </GridItem>
            <GridItem>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: tokens.radius.md,
                  textAlign: 'center',
                }}
              >
                Item 3
              </div>
            </GridItem>
            <GridItem>
              <div
                style={{
                  padding: tokens.space[3],
                  backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  borderRadius: tokens.radius.md,
                  textAlign: 'center',
                }}
              >
                Item 4
              </div>
            </GridItem>
          </Grid>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Named Grid Areas</H2>
      <div className={styles.componentGroup}>
        <Grid
          templateAreas={`
            "header header header"
            "sidebar main main"
            "footer footer footer"
          `}
          templateColumns="200px 1fr 1fr"
          templateRows="auto 200px auto"
          gap="4"
        >
          <GridItem area="header">
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: colors.background.secondary,
                borderRadius: tokens.radius.md,
                textAlign: 'center',
              }}
            >
              <strong>Header</strong>
            </div>
          </GridItem>
          <GridItem area="sidebar">
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderRadius: tokens.radius.md,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <strong>Sidebar</strong>
            </div>
          </GridItem>
          <GridItem area="main">
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                borderRadius: tokens.radius.md,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <strong>Main Content</strong>
            </div>
          </GridItem>
          <GridItem area="footer">
            <div
              style={{
                padding: tokens.space[4],
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderRadius: tokens.radius.md,
                textAlign: 'center',
              }}
            >
              <strong>Footer</strong>
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>

    <div className={styles.showcase}>
      <H2>Real-world Examples</H2>
      <VStack space="8">
        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[4] }}>Card Grid</H3>
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6">
            {[
              {
                name: 'Components',
                icon: Package,
                color: 'rgba(59, 130, 246, 0.1)',
              },
              {
                name: 'Design Tokens',
                icon: Palette,
                color: 'rgba(34, 197, 94, 0.1)',
              },
              {
                name: 'Themes',
                icon: Zap,
                color: 'rgba(251, 146, 60, 0.1)',
              },
              {
                name: 'Settings',
                icon: Settings,
                color: 'rgba(168, 85, 247, 0.1)',
              },
            ].map((item, i) => (
              <GridItem key={i}>
                <div
                  style={{
                    padding: tokens.space[6],
                    backgroundColor: item.color,
                    borderRadius: tokens.radius.lg,
                    textAlign: 'center',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{ marginBottom: tokens.space[4] }}>
                    <Icon icon={item.icon} size="xl" />
                  </div>
                  <H3 style={{ marginBottom: tokens.space[3] }}>{item.name}</H3>
                  <Body2 style={{ marginBottom: tokens.space[4] }}>
                    Description for {item.name.toLowerCase()}
                  </Body2>
                  <Button variant="primary" size="small">
                    Learn More
                  </Button>
                </div>
              </GridItem>
            ))}
          </Grid>
        </div>

        <div className={styles.componentItem}>
          <H3 style={{ marginBottom: tokens.space[4] }}>Dashboard Layout</H3>
          <Grid
            templateColumns="1fr 1fr 250px"
            templateRows="auto auto 1fr"
            gap="4"
            style={{ minHeight: '400px' }}
          >
            {/* Main metric - spans 2 columns */}
            <GridItem colSpan={2}>
              <div
                style={{
                  padding: tokens.space[6],
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: tokens.radius.lg,
                  textAlign: 'center',
                }}
              >
                <H3 style={{ marginBottom: tokens.space[2] }}>Total Users</H3>
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: tokens.space[2],
                  }}
                >
                  24,563
                </div>
                <Badge variant="solid" colorScheme="success">
                  +12.3%
                </Badge>
              </div>
            </GridItem>

            {/* Sidebar - spans all rows */}
            <GridItem rowSpan={3}>
              <div
                style={{
                  padding: tokens.space[4],
                  backgroundColor: colors.background.secondary,
                  borderRadius: tokens.radius.lg,
                  height: '100%',
                }}
              >
                <H3 style={{ marginBottom: tokens.space[4] }}>Quick Actions</H3>
                <VStack space="3">
                  <Button
                    variant="ghost"
                    size="small"
                    style={{ width: '100%' }}
                  >
                    <Icon icon={User} size="sm" />
                    Users
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    style={{ width: '100%' }}
                  >
                    <Icon icon={Settings} size="sm" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    style={{ width: '100%' }}
                  >
                    <Icon icon={Package} size="sm" />
                    Products
                  </Button>
                </VStack>
              </div>
            </GridItem>

            {/* Secondary metrics */}
            <GridItem>
              <div
                style={{
                  padding: tokens.space[4],
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: tokens.radius.lg,
                  textAlign: 'center',
                }}
              >
                <H3 style={{ marginBottom: tokens.space[2] }}>Revenue</H3>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                  }}
                >
                  $12,340
                </div>
              </div>
            </GridItem>

            <GridItem>
              <div
                style={{
                  padding: tokens.space[4],
                  backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  borderRadius: tokens.radius.lg,
                  textAlign: 'center',
                }}
              >
                <H3 style={{ marginBottom: tokens.space[2] }}>Orders</H3>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                  }}
                >
                  1,234
                </div>
              </div>
            </GridItem>

            {/* Chart area - spans 2 columns */}
            <GridItem colSpan={2}>
              <div
                style={{
                  padding: tokens.space[4],
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  borderRadius: tokens.radius.lg,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VStack space="2" style={{ textAlign: 'center' }}>
                  <Icon icon={Zap} size="xl" />
                  <H3>Analytics Chart</H3>
                  <Body2>Chart visualization would go here</Body2>
                </VStack>
              </div>
            </GridItem>
          </Grid>
        </div>
      </VStack>
    </div>

    <div className={styles.showcase}>
      <H2>Props</H2>
      <div className={styles.componentGroup}>
        <VStack space="4">
          <Body2>
            <strong>Grid Props:</strong>
          </Body2>
          <ul
            style={{
              paddingLeft: tokens.space[6],
              margin: 0,
            }}
          >
            <li>
              <code>templateColumns</code> - Define column structure
            </li>
            <li>
              <code>templateRows</code> - Define row structure
            </li>
            <li>
              <code>templateAreas</code> - Named grid areas
            </li>
            <li>
              <code>gap</code> - Spacing between items
            </li>
            <li>
              <code>columnGap / rowGap</code> - Specific axis spacing
            </li>
            <li>
              <code>autoColumns / autoRows</code> - Auto-sizing
            </li>
            <li>
              <code>autoFlow</code> - Grid auto-flow direction
            </li>
          </ul>

          <Body2 style={{ marginTop: tokens.space[4] }}>
            <strong>GridItem Props:</strong>
          </Body2>
          <ul
            style={{
              paddingLeft: tokens.space[6],
              margin: 0,
            }}
          >
            <li>
              <code>colSpan / rowSpan</code> - Span multiple columns/rows
            </li>
            <li>
              <code>colStart / colEnd</code> - Column positioning
            </li>
            <li>
              <code>rowStart / rowEnd</code> - Row positioning
            </li>
            <li>
              <code>area</code> - Named grid area placement
            </li>
          </ul>
        </VStack>
      </div>
    </div>
  </div>
);

export default GridPage;
