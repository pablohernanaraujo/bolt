// /src/app/content/list/page.tsx
// List component showcase page
// Displays list variants, spacing options, and usage examples
// RELEVANT FILES: ../../../ui/list

'use client';

import { type FC, type ReactElement } from 'react';

import {
  ArrowRight,
  Calendar,
  CheckCircle,
  FileText,
  Star,
  Users,
} from '@/icons';
import { Body2, H1, H3, List } from '@/ui';

import * as styles from '../../page.css';

/**
 * List page component
 * Displays structured content in various list formats
 */
const ListPage: FC = (): ReactElement => (
  <div className={styles.section}>
    <H1>List</H1>
    <Body2>
      Component for displaying structured content in various list formats.
      Supports ordered, unordered, and basic list variants with configurable
      spacing and icons.
    </Body2>

    <div className={styles.showcase}>
      <H3>List Variants</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Unordered List (default)</Body2>
          <List.Root variant="unordered" spacing="md">
            <List.Item>First item in unordered list</List.Item>
            <List.Item>Second item with bullet point</List.Item>
            <List.Item>Third item showing list structure</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Ordered List</Body2>
          <List.Root variant="ordered" spacing="md">
            <List.Item>First step in the process</List.Item>
            <List.Item>Second step with numbering</List.Item>
            <List.Item>Third step showing sequence</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Basic List (no markers)</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item>Clean list item without markers</List.Item>
            <List.Item>Another item for minimal style</List.Item>
            <List.Item>Simple content presentation</List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Spacing Options</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Small Spacing</Body2>
          <List.Root variant="unordered" spacing="sm">
            <List.Item>Tight spacing between items</List.Item>
            <List.Item>Compact presentation</List.Item>
            <List.Item>Dense information layout</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Medium Spacing (default)</Body2>
          <List.Root variant="unordered" spacing="md">
            <List.Item>Balanced spacing for readability</List.Item>
            <List.Item>Standard presentation format</List.Item>
            <List.Item>Comfortable reading experience</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Large Spacing</Body2>
          <List.Root variant="unordered" spacing="lg">
            <List.Item>Generous spacing between items</List.Item>
            <List.Item>Emphasis on each item</List.Item>
            <List.Item>Prominent content display</List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Lists with Icons</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Feature List</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item icon={CheckCircle}>
              Advanced analytics and reporting
            </List.Item>
            <List.Item icon={CheckCircle}>
              Real-time collaboration tools
            </List.Item>
            <List.Item icon={CheckCircle}>Unlimited cloud storage</List.Item>
            <List.Item icon={CheckCircle}>24/7 customer support</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Action Items</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item icon={ArrowRight}>Review quarterly reports</List.Item>
            <List.Item icon={ArrowRight}>
              Update team contact information
            </List.Item>
            <List.Item icon={ArrowRight}>Schedule client meetings</List.Item>
            <List.Item icon={ArrowRight}>Submit expense reports</List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Mixed Content Examples</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Team Members</Body2>
          <List.Root variant="basic" spacing="lg">
            <List.Item icon={Users}>
              <strong>Development Team</strong>
              <br />5 engineers working on core features
            </List.Item>
            <List.Item icon={Users}>
              <strong>Design Team</strong>
              <br />3 designers creating user interfaces
            </List.Item>
            <List.Item icon={Users}>
              <strong>Marketing Team</strong>
              <br />4 specialists managing campaigns
            </List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Upcoming Events</Body2>
          <List.Root variant="basic" spacing="lg">
            <List.Item icon={Calendar}>
              <strong>Product Launch</strong>
              <br />
              March 15, 2024 - Quarterly release
            </List.Item>
            <List.Item icon={Calendar}>
              <strong>Team Retrospective</strong>
              <br />
              March 20, 2024 - Sprint review meeting
            </List.Item>
            <List.Item icon={Calendar}>
              <strong>Client Presentation</strong>
              <br />
              March 25, 2024 - Feature demonstration
            </List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Status and Priority Lists</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Priority Tasks</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item icon={Star}>
              Critical bug fix in authentication
            </List.Item>
            <List.Item icon={Star}>Database performance optimization</List.Item>
            <List.Item icon={Star}>Security audit completion</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Document Types</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item icon={FileText}>
              Project requirements specification
            </List.Item>
            <List.Item icon={FileText}>
              Technical architecture document
            </List.Item>
            <List.Item icon={FileText}>User acceptance test plan</List.Item>
            <List.Item icon={FileText}>
              Deployment and maintenance guide
            </List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Text Emphasis Examples</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Emphasis Levels</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item emphasis="pure">Pure emphasis (100% opacity)</List.Item>
            <List.Item emphasis="high">High emphasis (87% opacity)</List.Item>
            <List.Item emphasis="medium">
              Medium emphasis (60% opacity)
            </List.Item>
            <List.Item emphasis="low">Low emphasis (38% opacity)</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Font Weights</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item weight="normal">Normal weight (400)</List.Item>
            <List.Item weight="medium">Medium weight (500)</List.Item>
            <List.Item weight="semibold">Semibold weight (600)</List.Item>
            <List.Item weight="bold">Bold weight (700)</List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>Text Decorations</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item>Normal text without decoration</List.Item>
            <List.Item decoration="italic">Italic text style</List.Item>
            <List.Item decoration="underline">Underlined text</List.Item>
            <List.Item decoration="line-through">Strikethrough text</List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Size Variants</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Different Text Sizes</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item size="xs">Extra small text (12px)</List.Item>
            <List.Item size="sm">Small text (14px)</List.Item>
            <List.Item size="base">Base text (16px)</List.Item>
            <List.Item size="lg">Large text (18px)</List.Item>
            <List.Item size="xl">Extra large text (20px)</List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Color Schemes</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Semantic Colors</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item colorScheme="default">Default text color</List.Item>
            <List.Item colorScheme="brand">Brand color text</List.Item>
            <List.Item colorScheme="success">Success message</List.Item>
            <List.Item colorScheme="warning">Warning notification</List.Item>
            <List.Item colorScheme="error">Error message</List.Item>
            <List.Item colorScheme="info">Information text</List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Combined Emphasis</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Multiple Properties</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item weight="bold" colorScheme="brand" size="lg">
              Important brand message
            </List.Item>
            <List.Item weight="medium" decoration="italic" emphasis="medium">
              Medium italic emphasis
            </List.Item>
            <List.Item
              colorScheme="success"
              weight="semibold"
              decoration="underline"
            >
              Success with underline
            </List.Item>
            <List.Item
              colorScheme="error"
              weight="bold"
              size="sm"
              emphasis="pure"
            >
              Critical error message
            </List.Item>
          </List.Root>
        </div>

        <div>
          <Body2>With Icons and Emphasis</Body2>
          <List.Root variant="basic" spacing="md">
            <List.Item icon={CheckCircle} colorScheme="success" weight="medium">
              Completed task with success styling
            </List.Item>
            <List.Item
              icon={Star}
              colorScheme="warning"
              weight="semibold"
              size="lg"
            >
              Important starred item
            </List.Item>
            <List.Item icon={FileText} decoration="italic" emphasis="medium">
              Document with subtle styling
            </List.Item>
          </List.Root>
        </div>
      </div>

      <H3>Nested Lists</H3>
      <div className={styles.componentGroup}>
        <div>
          <Body2>Project Structure</Body2>
          <List.Root variant="unordered" spacing="sm">
            <List.Item weight="semibold" size="lg">
              Frontend Development
              <List.Root
                variant="unordered"
                spacing="sm"
                style={{ marginTop: '8px' }}
              >
                <List.Item>React components</List.Item>
                <List.Item>CSS styling</List.Item>
                <List.Item>State management</List.Item>
              </List.Root>
            </List.Item>
            <List.Item weight="semibold" size="lg">
              Backend Development
              <List.Root
                variant="unordered"
                spacing="sm"
                style={{ marginTop: '8px' }}
              >
                <List.Item>API endpoints</List.Item>
                <List.Item>Database schema</List.Item>
                <List.Item>Authentication</List.Item>
              </List.Root>
            </List.Item>
            <List.Item weight="semibold" size="lg">
              Testing & Deployment
              <List.Root
                variant="unordered"
                spacing="sm"
                style={{ marginTop: '8px' }}
              >
                <List.Item>Unit tests</List.Item>
                <List.Item>Integration tests</List.Item>
                <List.Item>CI/CD pipeline</List.Item>
              </List.Root>
            </List.Item>
          </List.Root>
        </div>
      </div>
    </div>
  </div>
);

export default ListPage;
