// /src/app/navigation/accordion/page.tsx
// Accordion component showcase and documentation page
// Demonstrates various accordion patterns and configurations
// RELEVANT FILES: ../../../ui/accordion/index.ts, ../../page.css.ts

'use client';

import { type FC, type ReactElement, useState } from 'react';

import { FileText, Icon, Settings, Shield, Users } from '@/icons';
import {
  Accordion,
  AccordionItem,
  Body1,
  Code,
  Container,
  Divider,
  H1,
  H2,
  VStack,
} from '@/ui';

import * as styles from '../../page.css';

/**
 * Accordion showcase page
 * Demonstrates all accordion variants and use cases
 */
const AccordionPage: FC = (): ReactElement => {
  // State for controlled example
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    new Set(['item-1']),
  );

  return (
    <Container>
      <VStack space="16">
        <div className={styles.header}>
          <H1>Accordion</H1>
          <Body1>
            A collapsible content component that allows users to expand and
            collapse sections of content. Built with full accessibility support
            including keyboard navigation and screen reader compatibility.
          </Body1>
        </div>

        <Divider />

        {/* Default Accordion */}
        <section className={styles.section}>
          <H2>Default Accordion</H2>
          <Body1>Basic accordion with single selection mode.</Body1>

          <div className={styles.componentExample}>
            <Accordion>
              <AccordionItem
                id="default-1"
                title="What is an accordion component?"
              >
                <Body1>
                  An accordion is a UI component that allows users to expand and
                  collapse sections of content. It's useful for organizing large
                  amounts of information in a compact space.
                </Body1>
              </AccordionItem>
              <AccordionItem
                id="default-2"
                title="When should I use an accordion?"
              >
                <Body1>
                  Use accordions when you have content that can be organized
                  into distinct sections, and users don't need to see all
                  content at once. Common use cases include FAQs, navigation
                  menus, and settings panels.
                </Body1>
              </AccordionItem>
              <AccordionItem
                id="default-3"
                title="How accessible are accordions?"
              >
                <Body1>
                  Our accordion component is fully accessible with proper ARIA
                  attributes, keyboard navigation support (arrow keys, tab,
                  space/enter), and screen reader announcements.
                </Body1>
              </AccordionItem>
            </Accordion>
          </div>

          <Code>
            {`<Accordion>
  <AccordionItem id="1" title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem id="2" title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>`}
          </Code>
        </section>

        <Divider />

        {/* Multiple Selection */}
        <section className={styles.section}>
          <H2>Multiple Selection</H2>
          <Body1>Allow multiple items to be expanded simultaneously.</Body1>

          <div className={styles.componentExample}>
            <Accordion
              selectionMode="multiple"
              defaultExpandedKeys={['multi-1', 'multi-3']}
            >
              <AccordionItem id="multi-1" title="First Section">
                <Body1>
                  This section can be expanded along with other sections.
                </Body1>
              </AccordionItem>
              <AccordionItem id="multi-2" title="Second Section">
                <Body1>
                  Multiple sections can be open at the same time, allowing users
                  to compare content.
                </Body1>
              </AccordionItem>
              <AccordionItem id="multi-3" title="Third Section">
                <Body1>
                  This provides more flexibility for users who need to view
                  multiple sections simultaneously.
                </Body1>
              </AccordionItem>
            </Accordion>
          </div>

          <Code>
            {`<Accordion 
  selectionMode="multiple"
  defaultExpandedKeys={['1', '3']}
>
  <AccordionItem id="1" title="Section 1">...</AccordionItem>
  <AccordionItem id="2" title="Section 2">...</AccordionItem>
  <AccordionItem id="3" title="Section 3">...</AccordionItem>
</Accordion>`}
          </Code>
        </section>

        <Divider />

        {/* With Icons */}
        <section className={styles.section}>
          <H2>With Icons</H2>
          <Body1>
            Accordion items can include icons for better visual hierarchy.
          </Body1>

          <div className={styles.componentExample}>
            <Accordion variant="bordered">
              <AccordionItem
                id="icon-1"
                title="Documentation"
                icon={<Icon icon={FileText} size="sm" />}
              >
                <Body1>
                  Access comprehensive documentation, guides, and API
                  references.
                </Body1>
              </AccordionItem>
              <AccordionItem
                id="icon-2"
                title="Settings"
                icon={<Icon icon={Settings} size="sm" />}
              >
                <Body1>
                  Configure your preferences, notifications, and account
                  settings.
                </Body1>
              </AccordionItem>
              <AccordionItem
                id="icon-3"
                title="Team Management"
                icon={<Icon icon={Users} size="sm" />}
              >
                <Body1>Manage team members, roles, and permissions.</Body1>
              </AccordionItem>
              <AccordionItem
                id="icon-4"
                title="Security"
                icon={<Icon icon={Shield} size="sm" />}
              >
                <Body1>
                  Review security settings, two-factor authentication, and
                  access logs.
                </Body1>
              </AccordionItem>
            </Accordion>
          </div>

          <Code>
            {`<Accordion variant="bordered">
  <AccordionItem 
    id="1" 
    title="Documentation"
    icon={<Icon icon={FileText} size="sm" />}
  >
    Content here
  </AccordionItem>
</Accordion>`}
          </Code>
        </section>

        <Divider />

        {/* Variants */}
        <section className={styles.section}>
          <H2>Variants</H2>
          <Body1>Different visual styles for various use cases.</Body1>

          <VStack space="8">
            {/* Default Variant */}
            <div>
              <Body1>
                <strong>Default Variant</strong>
              </Body1>
              <div className={styles.componentExample}>
                <Accordion variant="default">
                  <AccordionItem
                    id="var-default-1"
                    title="Default Style Item 1"
                  >
                    <Body1>Simple border bottom style.</Body1>
                  </AccordionItem>
                  <AccordionItem
                    id="var-default-2"
                    title="Default Style Item 2"
                  >
                    <Body1>Clean and minimal appearance.</Body1>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Bordered Variant */}
            <div>
              <Body1>
                <strong>Bordered Variant</strong>
              </Body1>
              <div className={styles.componentExample}>
                <Accordion variant="bordered">
                  <AccordionItem
                    id="var-bordered-1"
                    title="Bordered Style Item 1"
                  >
                    <Body1>Fully bordered with rounded corners.</Body1>
                  </AccordionItem>
                  <AccordionItem
                    id="var-bordered-2"
                    title="Bordered Style Item 2"
                  >
                    <Body1>More defined visual separation.</Body1>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Separated Variant */}
            <div>
              <Body1>
                <strong>Separated Variant</strong>
              </Body1>
              <div className={styles.componentExample}>
                <Accordion variant="separated">
                  <AccordionItem
                    id="var-separated-1"
                    title="Separated Style Item 1"
                  >
                    <Body1>Each item as a separate card with shadow.</Body1>
                  </AccordionItem>
                  <AccordionItem
                    id="var-separated-2"
                    title="Separated Style Item 2"
                  >
                    <Body1>Maximum visual distinction between items.</Body1>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </VStack>
        </section>

        <Divider />

        {/* Sizes */}
        <section className={styles.section}>
          <H2>Sizes</H2>
          <Body1>Three size options for different contexts.</Body1>

          <VStack space="8">
            <div>
              <Body1>
                <strong>Small</strong>
              </Body1>
              <div className={styles.componentExample}>
                <Accordion size="small" variant="bordered">
                  <AccordionItem id="size-small-1" title="Small Size">
                    <Body1>Compact size for dense interfaces.</Body1>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div>
              <Body1>
                <strong>Medium (Default)</strong>
              </Body1>
              <div className={styles.componentExample}>
                <Accordion size="medium" variant="bordered">
                  <AccordionItem id="size-medium-1" title="Medium Size">
                    <Body1>Standard size for most use cases.</Body1>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div>
              <Body1>
                <strong>Large</strong>
              </Body1>
              <div className={styles.componentExample}>
                <Accordion size="large" variant="bordered">
                  <AccordionItem id="size-large-1" title="Large Size">
                    <Body1>Larger size for emphasis or touch interfaces.</Body1>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </VStack>
        </section>

        <Divider />

        {/* Controlled Example */}
        <section className={styles.section}>
          <H2>Controlled Mode</H2>
          <Body1>
            Control the expanded state programmatically. Current expanded:{' '}
            {Array.from(expandedKeys).join(', ') || 'none'}
          </Body1>

          <div className={styles.componentExample}>
            <Accordion
              expandedKeys={expandedKeys}
              onExpandedChange={setExpandedKeys}
              selectionMode="multiple"
              variant="bordered"
            >
              <AccordionItem id="item-1" title="Controlled Item 1">
                <Body1>This accordion's state is controlled externally.</Body1>
              </AccordionItem>
              <AccordionItem id="item-2" title="Controlled Item 2">
                <Body1>
                  You can programmatically expand or collapse items.
                </Body1>
              </AccordionItem>
              <AccordionItem id="item-3" title="Controlled Item 3">
                <Body1>
                  Useful for forms or wizards that need external control.
                </Body1>
              </AccordionItem>
            </Accordion>
          </div>

          <Code>
            {`const [expandedKeys, setExpandedKeys] = useState(new Set(['item-1']));

<Accordion 
  expandedKeys={expandedKeys}
  onExpandedChange={setExpandedKeys}
  selectionMode="multiple"
>
  <AccordionItem id="item-1" title="Item 1">...</AccordionItem>
  <AccordionItem id="item-2" title="Item 2">...</AccordionItem>
</Accordion>`}
          </Code>
        </section>

        <Divider />

        {/* Disabled Items */}
        <section className={styles.section}>
          <H2>Disabled Items</H2>
          <Body1>Individual items can be disabled.</Body1>

          <div className={styles.componentExample}>
            <Accordion>
              <AccordionItem id="disabled-1" title="Active Item">
                <Body1>This item can be expanded normally.</Body1>
              </AccordionItem>
              <AccordionItem id="disabled-2" title="Disabled Item" isDisabled>
                <Body1>This content cannot be accessed.</Body1>
              </AccordionItem>
              <AccordionItem id="disabled-3" title="Another Active Item">
                <Body1>This item is also active.</Body1>
              </AccordionItem>
            </Accordion>
          </div>

          <Code>
            {`<Accordion>
  <AccordionItem id="1" title="Active Item">...</AccordionItem>
  <AccordionItem id="2" title="Disabled Item" isDisabled>...</AccordionItem>
</Accordion>`}
          </Code>
        </section>

        <Divider />

        {/* API Reference */}
        <section className={styles.section}>
          <H2>API Reference</H2>

          <VStack space="8">
            <div>
              <Body1>
                <strong>Props</strong>
              </Body1>
              <Code>
                {`interface AccordionProps {
  items?: AccordionItemProps[];
  children?: ReactNode;
  selectionMode?: 'single' | 'multiple';
  variant?: 'default' | 'bordered' | 'separated';
  size?: 'small' | 'medium' | 'large';
  expandedKeys?: Set<string> | string[];
  defaultExpandedKeys?: Set<string> | string[];
  onExpandedChange?: (keys: Set<string>) => void;
  fullWidth?: boolean;
  className?: string;
  allowAllClosed?: boolean;
  disableAnimation?: boolean;
}

interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
  icon?: ReactNode;
}`}
              </Code>
            </div>

            <div>
              <Body1>
                <strong>Keyboard Navigation</strong>
              </Body1>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginTop: '1rem',
                }}
              >
                <li>
                  <Code>Tab</Code> - Move focus between accordion triggers
                </li>
                <li>
                  <Code>Space/Enter</Code> - Expand/collapse focused item
                </li>
                <li>
                  <Code>Arrow Down</Code> - Move focus to next item
                </li>
                <li>
                  <Code>Arrow Up</Code> - Move focus to previous item
                </li>
                <li>
                  <Code>Home</Code> - Move focus to first item
                </li>
                <li>
                  <Code>End</Code> - Move focus to last item
                </li>
              </ul>
            </div>
          </VStack>
        </section>
      </VStack>
    </Container>
  );
};

export default AccordionPage;
