// /src/storybook/forms/input-enhanced.stories.tsx
// Enhanced Input stories with comprehensive accessibility and interaction testing
// Includes form validation, keyboard navigation, and screen reader testing
// RELEVANT FILES: ../../ui/input/index.tsx, input.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { useState } from 'react';

import { Search, AlertCircle, Eye, EyeOff } from '../../icons';
import { Input, InputField } from '../../ui/input';
import { Button } from '../../ui/button';
import { VStack, HStack, Container } from '../../ui/layout';
import { H2, H3, Body1, Body2 } from '../../ui/typography';
import { FormField } from '../../ui/form-field';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input (Enhanced)',
  component: Input,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Enhanced Input component documentation with comprehensive accessibility testing, validation patterns, and real-world usage examples.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order',
            enabled: true,
          },
          {
            id: 'label-title-only',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Visual style variant of the input',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Type of the input field',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
  },
  args: {
    placeholder: 'Enhanced input',
    variant: 'outline',
    size: 'medium',
    type: 'text',
    hasError: false,
    isDisabled: false,
    isRequired: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Comprehensive Input Showcase
 */
export const ComprehensiveShowcase: Story = {
  render: () => (
    <Container>
      <VStack gap="8">
        <div>
          <H2>Input Component Showcase</H2>
          <Body1>
            Complete demonstration of all input variants, types, and states with 
            accessibility considerations and form validation.
          </Body1>
        </div>

        <section aria-labelledby="variants-heading">
          <H3 id="variants-heading">Variants</H3>
          <VStack gap="4">
            <Input 
              variant="outline" 
              placeholder="Outline variant"
              aria-label="Outline variant input"
            />
            <Input 
              variant="filled" 
              placeholder="Filled variant"
              aria-label="Filled variant input"
            />
          </VStack>
        </section>

        <section aria-labelledby="sizes-heading">
          <H3 id="sizes-heading">Sizes</H3>
          <VStack gap="4">
            <Input 
              size="small" 
              placeholder="Small input"
              aria-label="Small size input"
            />
            <Input 
              size="medium" 
              placeholder="Medium input"
              aria-label="Medium size input"
            />
            <Input 
              size="large" 
              placeholder="Large input"
              aria-label="Large size input"
            />
          </VStack>
        </section>

        <section aria-labelledby="types-heading">
          <H3 id="types-heading">Input Types</H3>
          <VStack gap="4">
            <Input 
              type="text" 
              placeholder="Text input"
              aria-label="Text input"
            />
            <Input 
              type="email" 
              placeholder="user@example.com"
              aria-label="Email input"
            />
            <Input 
              type="password" 
              placeholder="Password"
              aria-label="Password input"
            />
            <Input 
              type="search" 
              placeholder="Search..."
              aria-label="Search input"
            />
            <Input 
              type="tel" 
              placeholder="+1 (555) 123-4567"
              aria-label="Phone number input"
            />
            <Input 
              type="url" 
              placeholder="https://example.com"
              aria-label="URL input"
            />
            <Input 
              type="number" 
              placeholder="Enter number"
              aria-label="Number input"
            />
          </VStack>
        </section>

        <section aria-labelledby="states-heading">
          <H3 id="states-heading">States</H3>
          <VStack gap="4">
            <Input 
              placeholder="Normal state"
              aria-label="Normal state input"
            />
            <Input 
              placeholder="Disabled state"
              aria-label="Disabled state input"
              isDisabled
            />
            <Input 
              placeholder="Error state"
              aria-label="Error state input"
              hasError
              aria-describedby="error-description"
            />
            <Input 
              placeholder="Required input"
              aria-label="Required input"
              isRequired
              aria-describedby="required-description"
            />
            <Body2 id="error-description" style={{ color: '#e53e3e' }}>
              This field has an error. Please check your input.
            </Body2>
            <Body2 id="required-description" style={{ color: '#666' }}>
              This field is required and must be filled out.
            </Body2>
          </VStack>
        </section>
      </VStack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all input features with accessibility best practices.',
      },
    },
  },
};

/**
 * Form Integration Examples
 */
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      email: '',
      phone: '',
      website: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
      
      if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        newErrors.website = 'Website must start with http:// or https://';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <Container>
        <VStack gap="6">
          <div>
            <H2>Form Integration</H2>
            <Body1>
              Real-world form example with validation and proper labeling.
            </Body1>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <VStack gap="4">
              <FormField
                label="First Name"
                isRequired
                errorMessage={errors.firstName}
                description="Enter your first name"
              >
                <Input
                  data-testid="first-name-input"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  hasError={!!errors.firstName}
                  isRequired
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'first-name-error' : 'first-name-description'}
                />
              </FormField>

              <FormField
                label="Email"
                isRequired
                errorMessage={errors.email}
                description="We'll use this to contact you"
              >
                <Input
                  data-testid="email-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  hasError={!!errors.email}
                  isRequired
                  aria-invalid={!!errors.email}
                  placeholder="user@example.com"
                />
              </FormField>

              <FormField
                label="Phone Number"
                errorMessage={errors.phone}
                description="Optional - for important updates only"
              >
                <Input
                  data-testid="phone-input"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  hasError={!!errors.phone}
                  aria-invalid={!!errors.phone}
                  placeholder="+1 (555) 123-4567"
                />
              </FormField>

              <FormField
                label="Website"
                errorMessage={errors.website}
                description="Your personal or company website"
              >
                <Input
                  data-testid="website-input"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  hasError={!!errors.website}
                  aria-invalid={!!errors.website}
                  placeholder="https://example.com"
                />
              </FormField>

              <HStack gap="3">
                <Button type="submit" data-testid="submit-button">
                  Submit Form
                </Button>
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => {
                    setFormData({ firstName: '', email: '', phone: '', website: '' });
                    setErrors({});
                  }}
                >
                  Reset
                </Button>
              </HStack>
            </VStack>
          </form>
        </VStack>
      </Container>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test form validation
    const submitButton = canvas.getByTestId('submit-button');
    await userEvent.click(submitButton);
    
    // Check that validation errors appear
    const firstNameInput = canvas.getByTestId('first-name-input');
    await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
    
    // Fill out valid data
    await userEvent.type(firstNameInput, 'John');
    
    const emailInput = canvas.getByTestId('email-input');
    await userEvent.type(emailInput, 'john@example.com');
    
    // Submit with valid data
    await userEvent.click(submitButton);
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete form integration with validation and proper error handling.',
      },
    },
  },
};

/**
 * Keyboard Navigation Test
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <Container>
      <VStack gap="6">
        <div>
          <H2>Keyboard Navigation</H2>
          <Body1>
            Test keyboard navigation with Tab, Shift+Tab, and input-specific shortcuts.
          </Body1>
        </div>

        <form>
          <VStack gap="4">
            <FormField label="First Input">
              <Input
                data-testid="first-input"
                type="text"
                placeholder="Tab to next field"
              />
            </FormField>

            <FormField label="Email Input">
              <Input
                data-testid="email-input"
                type="email"
                placeholder="Shift+Tab to go back"
              />
            </FormField>

            <FormField label="Search Input">
              <Input
                data-testid="search-input"
                type="search"
                placeholder="Escape to clear"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.currentTarget.value = '';
                  }
                }}
              />
            </FormField>

            <FormField label="Number Input">
              <Input
                data-testid="number-input"
                type="number"
                placeholder="Arrow keys to increment/decrement"
                step="1"
                min="0"
                max="100"
              />
            </FormField>

            <Button data-testid="submit-button">Submit</Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test tab navigation
    const firstInput = canvas.getByTestId('first-input');
    const emailInput = canvas.getByTestId('email-input');
    const searchInput = canvas.getByTestId('search-input');
    
    // Focus first input
    await userEvent.tab();
    await expect(firstInput).toHaveFocus();
    
    // Tab to next input
    await userEvent.tab();
    await expect(emailInput).toHaveFocus();
    
    // Tab to search input
    await userEvent.tab();
    await expect(searchInput).toHaveFocus();
    
    // Type in search and test escape to clear
    await userEvent.type(searchInput, 'test search');
    await userEvent.keyboard('{Escape}');
    await expect(searchInput).toHaveValue('');
  },
  parameters: {
    docs: {
      description: {
        story: 'Keyboard navigation testing with focus management and keyboard shortcuts.',
      },
    },
  },
};

/**
 * Screen Reader Compatibility
 */
export const ScreenReaderCompatibility: Story = {
  render: () => (
    <Container>
      <VStack gap="6">
        <div>
          <H2>Screen Reader Compatibility</H2>
          <Body1>
            Inputs with proper ARIA attributes and labels for screen reader users.
          </Body1>
        </div>

        <form>
          <VStack gap="4">
            <FormField
              label="Username"
              isRequired
              description="Must be at least 3 characters long"
            >
              <Input
                data-testid="username-input"
                type="text"
                isRequired
                aria-describedby="username-description"
                minLength={3}
              />
            </FormField>

            <FormField
              label="Password"
              isRequired
              description="Must contain at least 8 characters"
            >
              <Input
                data-testid="password-input"
                type="password"
                isRequired
                aria-describedby="password-description"
                minLength={8}
              />
            </FormField>

            <FormField
              label="Confirm Password"
              isRequired
              errorMessage="Passwords do not match"
            >
              <Input
                data-testid="confirm-password-input"
                type="password"
                isRequired
                hasError
                aria-invalid="true"
                aria-describedby="confirm-password-error"
              />
            </FormField>

            <fieldset>
              <legend>Contact Information</legend>
              <VStack gap="3">
                <FormField label="Email">
                  <Input
                    data-testid="contact-email-input"
                    type="email"
                    placeholder="user@example.com"
                  />
                </FormField>
                
                <FormField label="Phone">
                  <Input
                    data-testid="contact-phone-input"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </FormField>
              </VStack>
            </fieldset>

            <div role="group" aria-labelledby="search-group-label">
              <H3 id="search-group-label">Search Options</H3>
              <FormField label="Search Query">
                <Input
                  data-testid="search-query-input"
                  type="search"
                  role="searchbox"
                  placeholder="Enter search terms..."
                  aria-describedby="search-help"
                />
              </FormField>
              <Body2 id="search-help" style={{ color: '#666' }}>
                Use quotation marks for exact phrases
              </Body2>
            </div>
          </VStack>
        </form>
      </VStack>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test required inputs have proper attributes
    const usernameInput = canvas.getByTestId('username-input');
    await expect(usernameInput).toHaveAttribute('required');
    await expect(usernameInput).toHaveAttribute('aria-describedby', 'username-description');
    
    // Test error state has proper ARIA
    const confirmPasswordInput = canvas.getByTestId('confirm-password-input');
    await expect(confirmPasswordInput).toHaveAttribute('aria-invalid', 'true');
    
    // Test search input has proper role
    const searchInput = canvas.getByTestId('search-query-input');
    await expect(searchInput).toHaveAttribute('role', 'searchbox');
  },
  parameters: {
    docs: {
      description: {
        story: 'Screen reader compatibility with proper ARIA attributes and semantic structure.',
      },
    },
  },
};

/**
 * Validation States
 */
export const ValidationStates: Story = {
  render: () => {
    const [values, setValues] = useState({
      valid: 'valid@example.com',
      invalid: 'invalid-email',
      required: '',
      minLength: 'ab',
    });

    return (
      <Container>
        <VStack gap="6">
          <div>
            <H2>Validation States</H2>
            <Body1>
              Different validation states and how they're communicated to users.
            </Body1>
          </div>

          <VStack gap="4">
            <FormField
              label="Valid Email"
              description="This email is valid"
            >
              <Input
                type="email"
                value={values.valid}
                onChange={(e) => setValues(prev => ({ ...prev, valid: e.target.value }))}
                aria-describedby="valid-email-description"
              />
            </FormField>

            <FormField
              label="Invalid Email"
              errorMessage="Please enter a valid email address"
            >
              <Input
                type="email"
                value={values.invalid}
                onChange={(e) => setValues(prev => ({ ...prev, invalid: e.target.value }))}
                hasError
                aria-invalid="true"
                aria-describedby="invalid-email-error"
              />
            </FormField>

            <FormField
              label="Required Field"
              isRequired
              errorMessage="This field is required"
            >
              <Input
                type="text"
                value={values.required}
                onChange={(e) => setValues(prev => ({ ...prev, required: e.target.value }))}
                hasError={!values.required}
                isRequired
                aria-invalid={!values.required}
                placeholder="Enter some text..."
              />
            </FormField>

            <FormField
              label="Minimum Length"
              errorMessage="Must be at least 3 characters"
              description="Currently has less than 3 characters"
            >
              <Input
                type="text"
                value={values.minLength}
                onChange={(e) => setValues(prev => ({ ...prev, minLength: e.target.value }))}
                hasError={values.minLength.length < 3}
                aria-invalid={values.minLength.length < 3}
                minLength={3}
                placeholder="Type at least 3 characters..."
              />
            </FormField>
          </VStack>
        </VStack>
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Various validation states with proper error messaging and ARIA attributes.',
      },
    },
  },
};