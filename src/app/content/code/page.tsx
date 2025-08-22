// /src/app/content/code/page.tsx
// Code component demonstration page
// Shows various usage examples and scenarios for the Code component
// RELEVANT FILES: ../../../ui/code/index.ts, ../../page.css.ts

'use client';

import { type FC, type ReactElement } from 'react';

import { Body1, ContentWrapper, H2, H3, HStack, VStack } from '@/ui';
import { Code } from '@/ui/code';

import * as styles from '../../page.css';

/**
 * Code component demonstration page
 * Showcases different use cases and examples
 */
const CodePage: FC = (): ReactElement => (
  <ContentWrapper variant="body" paddingX="8">
    <VStack space="8">
      {/* Page Header */}
      <div className={styles.section}>
        <H2 className={styles.sectionTitle}>Code Component</H2>
        <Body1 className={styles.sectionDescription}>
          The Code component is used to display inline code snippets with
          monospace typography and theme-aware styling. Perfect for highlighting
          code, variables, file names, and commands within text.
        </Body1>
      </div>

      {/* Basic Usage */}
      <div className={styles.section}>
        <H3>Basic Usage</H3>
        <div className={styles.showcase}>
          <div className={styles.showcaseTitle}>Inline Code Examples</div>
          <VStack space="4">
            <Body1>
              Install the package with <Code>npm install react</Code> or{' '}
              <Code>yarn add react</Code>.
            </Body1>
            <Body1>
              Import the component: <Code>import React from 'react'</Code>
            </Body1>
            <Body1>
              The <Code>useState</Code> hook manages local component state.
            </Body1>
          </VStack>
        </div>
      </div>

      {/* Variables and Functions */}
      <div className={styles.section}>
        <H3>Variables and Functions</H3>
        <div className={styles.showcase}>
          <div className={styles.showcaseTitle}>Code References</div>
          <VStack space="4">
            <Body1>
              Set the <Code>isVisible</Code> prop to <Code>true</Code> to show
              the modal.
            </Body1>
            <Body1>
              Call the <Code>handleSubmit()</Code> function when the form is
              submitted.
            </Body1>
            <Body1>
              The <Code>user.email</Code> property contains the user's email
              address.
            </Body1>
          </VStack>
        </div>
      </div>

      {/* File Paths and Commands */}
      <div className={styles.section}>
        <H3>File Paths and Commands</H3>
        <div className={styles.showcase}>
          <div className={styles.showcaseTitle}>System References</div>
          <VStack space="4">
            <Body1>
              Edit the <Code>package.json</Code> file in your project root.
            </Body1>
            <Body1>
              Run <Code>npm run dev</Code> to start the development server.
            </Body1>
            <Body1>
              The configuration is stored in{' '}
              <Code>src/config/app.config.ts</Code>.
            </Body1>
          </VStack>
        </div>
      </div>

      {/* Code Snippets */}
      <div className={styles.section}>
        <H3>Code Snippets</H3>
        <div className={styles.showcase}>
          <div className={styles.showcaseTitle}>Short Code Examples</div>
          <VStack space="4">
            <Body1>
              Use <Code>console.log('Hello, world!')</Code> for debugging.
            </Body1>
            <Body1>
              Create a new array: <Code>const items = []</Code>
            </Body1>
            <Body1>
              Check if value exists: <Code>if (value) {'{}'}</Code>
            </Body1>
          </VStack>
        </div>
      </div>

      {/* Mixed Content */}
      <div className={styles.section}>
        <H3>In Context</H3>
        <div className={styles.showcase}>
          <div className={styles.showcaseTitle}>Code Within Sentences</div>
          <VStack space="4">
            <Body1>
              To create a new React component, define a function that returns
              JSX:{' '}
              <Code>
                const MyComponent = () =&gt; &lt;div&gt;Hello&lt;/div&gt;
              </Code>
              . This component can then be used in other components.
            </Body1>
            <Body1>
              Environment variables should be prefixed with{' '}
              <Code>REACT_APP_</Code> in Create React App projects. For example:{' '}
              <Code>REACT_APP_API_URL</Code>.
            </Body1>
          </VStack>
        </div>
      </div>

      {/* Theme Showcase */}
      <div className={styles.section}>
        <H3>Theme Support</H3>
        <div className={styles.showcase}>
          <div className={styles.showcaseTitle}>Dark and Light Mode</div>
          <Body1>
            The Code component automatically adapts to the current theme. Switch
            between light and dark mode using the theme toggle to see how{' '}
            <Code>background colors</Code> and <Code>text colors</Code> adjust
            automatically for optimal readability.
          </Body1>
        </div>
      </div>
    </VStack>
  </ContentWrapper>
);

export default CodePage;
