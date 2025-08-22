// /src/storybook/content/code.stories.tsx
// Code component stories showcasing inline code display functionality
// Complete documentation for the Code component
// RELEVANT FILES: ../../ui/code/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Body1, VStack } from '../../ui';
import { Code } from '../../ui/code';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Code> = {
  title: 'Content/Code',
  component: Code,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Code component for displaying inline code snippets with monospace typography and theme-aware styling. Perfect for highlighting code, variables, file names, and commands within text.',
      },
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Code content to display',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'npm install react',
  },
};

export const Variable: Story = {
  args: {
    children: 'useState',
  },
};

export const Function: Story = {
  args: {
    children: 'handleSubmit()',
  },
};

export const FilePath: Story = {
  args: {
    children: 'src/components/Button.tsx',
  },
};

export const Command: Story = {
  args: {
    children: 'npm run dev',
  },
};

// In Context Examples
export const InlineUsage: Story = {
  render: () => (
    <VStack space="4">
      <Body1>
        Install the package with <Code>npm install react</Code> or{' '}
        <Code>yarn add react</Code>.
      </Body1>
      <Body1>
        The <Code>useState</Code> hook manages local component state.
      </Body1>
      <Body1>
        Edit the <Code>package.json</Code> file in your project root.
      </Body1>
    </VStack>
  ),
};

export const CodeSnippet: Story = {
  args: {
    children: "console.log('Hello, world!')",
  },
};

export const JSXExample: Story = {
  args: {
    children: 'const App = () => <div>Hello</div>',
  },
};

export const ObjectProperty: Story = {
  args: {
    children: 'user.email',
  },
};

export const BooleanValue: Story = {
  args: {
    children: 'true',
  },
};

export const EnvironmentVariable: Story = {
  args: {
    children: 'REACT_APP_API_URL',
  },
};

// Complex Examples
export const MixedContent: Story = {
  render: () => (
    <Body1>
      To create a new React component, define a function that returns JSX:{' '}
      <Code>const MyComponent = () =&gt; &lt;div&gt;Hello&lt;/div&gt;</Code>.
      This component can then be used in other components by importing it with{' '}
      <Code>import MyComponent from './MyComponent'</Code>.
    </Body1>
  ),
};

export const TechnicalDocumentation: Story = {
  render: () => (
    <VStack space="3">
      <Body1>
        The <Code>useEffect</Code> hook accepts two parameters: a function and
        an optional dependency array.
      </Body1>
      <Body1>
        Set the <Code>strictMode</Code> property to <Code>true</Code> in your
        configuration.
      </Body1>
      <Body1>
        Access the environment variable using <Code>process.env.NODE_ENV</Code>.
      </Body1>
    </VStack>
  ),
};

// All Examples Showcase
export const AllExamples: Story = {
  render: () => (
    <VStack space="6">
      <div>
        <h3 style={{ marginBottom: '8px' }}>Commands & Installation</h3>
        <VStack space="2">
          <Body1>
            <Code>npm install</Code> - Install dependencies
          </Body1>
          <Body1>
            <Code>yarn dev</Code> - Start development server
          </Body1>
          <Body1>
            <Code>git commit -m "message"</Code> - Commit changes
          </Body1>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '8px' }}>Functions & Variables</h3>
        <VStack space="2">
          <Body1>
            <Code>useState</Code> - React state hook
          </Body1>
          <Body1>
            <Code>isVisible</Code> - Boolean variable
          </Body1>
          <Body1>
            <Code>getUserData()</Code> - Function call
          </Body1>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '8px' }}>File Paths & Config</h3>
        <VStack space="2">
          <Body1>
            <Code>src/components/Button.tsx</Code> - Component file
          </Body1>
          <Body1>
            <Code>package.json</Code> - Package configuration
          </Body1>
          <Body1>
            <Code>.env.local</Code> - Environment variables
          </Body1>
        </VStack>
      </div>

      <div>
        <h3 style={{ marginBottom: '8px' }}>Code Snippets</h3>
        <VStack space="2">
          <Body1>
            <Code>import React from 'react'</Code> - Import statement
          </Body1>
          <Body1>
            <Code>{'const [state, setState] = useState()'}</Code> - Hook usage
          </Body1>
          <Body1>
            <Code>{'if (condition) { return; }'}</Code> - Conditional logic
          </Body1>
        </VStack>
      </div>
    </VStack>
  ),
};
