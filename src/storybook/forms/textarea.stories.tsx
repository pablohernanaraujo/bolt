// /src/storybook/forms/textarea.stories.tsx
// TextArea component stories showcasing all variants, sizes, and states
// Complete documentation for the TextArea component
// RELEVANT FILES: ../../ui/textarea/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from '../../ui';
import { TextArea } from '../../ui/textarea';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof TextArea> = {
  title: 'Forms/TextArea',
  component: TextArea,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible textarea component built with React Aria Components. Supports multiple variants, sizes, resize options, and validation states with full keyboard navigation and screen reader support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Visual style variant of the textarea',
      defaultValue: 'outline',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the textarea',
      defaultValue: 'medium',
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior of the textarea',
      defaultValue: 'vertical',
    },
    rows: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
      description: 'Number of rows for the textarea',
      defaultValue: 3,
    },
    maxRows: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
      },
      description: 'Maximum number of rows for auto-resize',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the textarea has an error state',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
      defaultValue: 'Enter your text here...',
    },
    'aria-label': {
      control: 'text',
      description:
        'Accessibility label for the textarea (required when no visible label)',
      defaultValue: 'Text area field',
    },
  },
  args: {
    placeholder: 'Enter your text here...',
    variant: 'outline',
    size: 'medium',
    resize: 'vertical',
    rows: 3,
    hasError: false,
    isDisabled: false,
    'aria-label': 'Text area field',
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

/**
 * Default TextArea Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    placeholder: 'Default textarea',
    'aria-label': 'Default textarea field',
  },
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
    <VStack space="4">
      <TextArea
        variant="outline"
        placeholder="Outline variant - Enter your text here..."
        aria-label="Outline variant"
      />
      <TextArea
        variant="filled"
        placeholder="Filled variant - Enter your text here..."
        aria-label="Filled variant"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available textarea variants: outline (border style) and filled (background style).',
      },
    },
  },
};

/**
 * Sizes Story
 */
export const Sizes: Story = {
  render: () => (
    <VStack space="4">
      <TextArea
        variant="outline"
        size="small"
        placeholder="Small textarea"
        aria-label="Small textarea"
      />
      <TextArea
        variant="outline"
        size="medium"
        placeholder="Medium textarea"
        aria-label="Medium textarea"
      />
      <TextArea
        variant="outline"
        size="large"
        placeholder="Large textarea"
        aria-label="Large textarea"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available textarea sizes: small, medium, and large.',
      },
    },
  },
};

/**
 * Resize Options Story
 */
export const ResizeOptions: Story = {
  render: () => (
    <VStack space="4">
      <TextArea
        resize="none"
        placeholder="No resize - fixed size"
        aria-label="Non-resizable textarea"
      />
      <TextArea
        resize="vertical"
        placeholder="Vertical resize only"
        aria-label="Vertical resizable textarea"
      />
      <TextArea
        resize="horizontal"
        placeholder="Horizontal resize only"
        aria-label="Horizontal resizable textarea"
      />
      <TextArea
        resize="both"
        placeholder="Both directions resize"
        aria-label="Both directions resizable textarea"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different resize options: none (fixed), vertical, horizontal, and both directions.',
      },
    },
  },
};

/**
 * Rows Configuration Story
 */
export const RowsConfiguration: Story = {
  render: () => (
    <VStack space="4">
      <TextArea
        rows={2}
        placeholder="2 rows textarea"
        aria-label="2 rows textarea"
      />
      <TextArea
        rows={4}
        placeholder="4 rows textarea"
        aria-label="4 rows textarea"
      />
      <TextArea
        rows={6}
        placeholder="6 rows textarea"
        aria-label="6 rows textarea"
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Configure initial height using rows property.',
      },
    },
  },
};

/**
 * States Story
 */
export const States: Story = {
  render: () => (
    <VStack space="4">
      <TextArea placeholder="Normal state" aria-label="Normal state" />
      <TextArea
        placeholder="Disabled state"
        aria-label="Disabled state"
        isDisabled
      />
      <TextArea placeholder="Error state" aria-label="Error state" hasError />
      <TextArea
        placeholder="Disabled with error"
        aria-label="Disabled with error"
        isDisabled
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different textarea states: normal, disabled, error, and combinations.',
      },
    },
  },
};

/**
 * Filled Variant with States
 */
export const FilledVariantStates: Story = {
  render: () => (
    <VStack space="4">
      <TextArea
        variant="filled"
        placeholder="Normal filled"
        aria-label="Normal filled"
      />
      <TextArea
        variant="filled"
        placeholder="Disabled filled"
        aria-label="Disabled filled"
        isDisabled
      />
      <TextArea
        variant="filled"
        placeholder="Error filled"
        aria-label="Error filled"
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filled variant in different states.',
      },
    },
  },
};

/**
 * Size and Variant Combinations
 */
export const Combinations: Story = {
  render: () => (
    <VStack space="4">
      <TextArea
        variant="outline"
        size="small"
        resize="none"
        rows={2}
        placeholder="Small outline, non-resizable"
        aria-label="Small outline textarea"
      />
      <TextArea
        variant="filled"
        size="medium"
        resize="vertical"
        rows={3}
        placeholder="Medium filled, vertical resize"
        aria-label="Medium filled textarea"
      />
      <TextArea
        variant="outline"
        size="large"
        resize="both"
        rows={4}
        placeholder="Large outline, both resize"
        aria-label="Large outline textarea"
      />
      <TextArea
        variant="filled"
        size="large"
        resize="vertical"
        rows={3}
        placeholder="Large filled with error state"
        aria-label="Large filled textarea with error"
        hasError
      />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Various combinations of variants, sizes, resize options, and states.',
      },
    },
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  decorators: [withCentered],
  args: {
    placeholder: 'Playground textarea',
    variant: 'outline',
    size: 'medium',
    resize: 'vertical',
    rows: 3,
    hasError: false,
    isDisabled: false,
    'aria-label': 'Playground textarea field',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all textarea props and combinations.',
      },
    },
  },
};
