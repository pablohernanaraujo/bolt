// /src/storybook/overlays/modal-enhanced.stories.tsx
// Enhanced Modal stories with comprehensive accessibility and interaction testing
// Includes focus management, keyboard navigation, and screen reader testing
// RELEVANT FILES: ../../ui/modal/index.tsx, modal.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { useState } from 'react';

import { AlertTriangle, Save, Trash, X, Settings } from '../../icons';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
} from '../../ui/modal';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { FormField } from '../../ui/form-field';
import { VStack, HStack, Container } from '../../ui/layout';
import { H2, H3, Body1, Body2 } from '../../ui/typography';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal (Enhanced)',
  component: Modal,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Enhanced Modal component documentation with comprehensive accessibility testing, focus management, and real-world usage patterns.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'focus-order',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
          {
            id: 'aria-dialog',
            enabled: true,
          },
          {
            id: 'aria-modal',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'full'],
      description: 'Size of the modal',
    },
    isDismissable: {
      control: 'boolean',
      description: 'Whether the modal can be dismissed by clicking outside or pressing Escape',
    },
    isKeyboardDismissDisabled: {
      control: 'boolean',
      description: 'Whether keyboard dismiss (Escape key) is disabled',
    },
  },
  args: {
    size: 'medium',
    isDismissable: true,
    isKeyboardDismissDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Comprehensive Modal Showcase
 */
export const ComprehensiveShowcase: Story = {
  render: () => (
    <Container>
      <VStack gap="8">
        <div>
          <H2>Modal Component Showcase</H2>
          <Body1>
            Complete demonstration of all modal variants, sizes, and accessibility features.
          </Body1>
        </div>

        <section aria-labelledby="sizes-heading">
          <H3 id="sizes-heading">Modal Sizes</H3>
          <HStack gap="4" style={{ flexWrap: 'wrap' }}>
            <ModalTrigger>
              <Button variant="secondary" size="small">
                Small Modal
              </Button>
              <Modal size="small" isDismissable data-testid="small-modal">
                <ModalContent title="Small Modal" showCloseButton>
                  <Body2>
                    This is a small modal, perfect for quick confirmations or brief messages.
                  </Body2>
                </ModalContent>
              </Modal>
            </ModalTrigger>

            <ModalTrigger>
              <Button variant="secondary" size="small">
                Medium Modal
              </Button>
              <Modal size="medium" isDismissable data-testid="medium-modal">
                <ModalContent title="Medium Modal" showCloseButton>
                  <Body2>
                    This is a medium-sized modal, suitable for most use cases with moderate content.
                  </Body2>
                </ModalContent>
              </Modal>
            </ModalTrigger>

            <ModalTrigger>
              <Button variant="secondary" size="small">
                Large Modal
              </Button>
              <Modal size="large" isDismissable data-testid="large-modal">
                <ModalContent title="Large Modal" showCloseButton>
                  <Body2>
                    This is a large modal that can accommodate more content, ideal for extensive forms or detailed content.
                  </Body2>
                </ModalContent>
              </Modal>
            </ModalTrigger>
          </HStack>
        </section>

        <section aria-labelledby="behavior-heading">
          <H3 id="behavior-heading">Behavior Options</H3>
          <VStack gap="3">
            <ModalTrigger>
              <Button variant="primary">
                Dismissible Modal (Default)
              </Button>
              <Modal size="medium" isDismissable data-testid="dismissible-modal">
                <ModalContent title="Dismissible Modal" showCloseButton>
                  <Body2>
                    This modal can be closed by clicking outside, pressing Escape, or using the close button.
                  </Body2>
                </ModalContent>
              </Modal>
            </ModalTrigger>

            <ModalTrigger>
              <Button variant="secondary">
                Non-Dismissible Modal
              </Button>
              <Modal 
                size="medium" 
                isDismissable={false} 
                isKeyboardDismissDisabled 
                data-testid="non-dismissible-modal"
              >
                <ModalContent title="Non-Dismissible Modal" showCloseButton={false}>
                  <VStack gap="4">
                    <Body2>
                      This modal cannot be closed by clicking outside or pressing Escape. 
                      You must use an action button to close it.
                    </Body2>
                  </VStack>
                </ModalContent>
                <ModalFooter>
                  <Button variant="primary" slot="close">
                    Complete Action
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalTrigger>
          </VStack>
        </section>
      </VStack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all modal features and accessibility patterns.',
      },
    },
  },
};

/**
 * Focus Management Test
 */
export const FocusManagement: Story = {
  render: () => {
    const FocusTestModal = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Container>
          <VStack gap="6">
            <div>
              <H2>Focus Management</H2>
              <Body1>
                Test focus management, focus trapping, and focus restoration.
              </Body1>
            </div>

            <VStack gap="4">
              <Button 
                data-testid="before-modal-button"
                onClick={() => setIsOpen(true)}
              >
                Button Before Modal
              </Button>

              <ModalTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                <Button data-testid="trigger-button">
                  Open Focus Test Modal
                </Button>
                <Modal size="medium" isDismissable data-testid="focus-modal">
                  <ModalHeader title="Focus Management Test" showCloseButton />
                  <ModalBody>
                    <VStack gap="4">
                      <Body2>
                        Focus should be trapped within this modal. Try tabbing through the elements.
                      </Body2>
                      
                      <FormField label="First Input">
                        <Input 
                          data-testid="first-input"
                          placeholder="First focusable element"
                        />
                      </FormField>

                      <FormField label="Second Input">
                        <Input 
                          data-testid="second-input"
                          placeholder="Second focusable element"
                        />
                      </FormField>

                      <Button data-testid="modal-button">
                        Focusable Button
                      </Button>
                    </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="secondary" slot="close" data-testid="cancel-button">
                      Cancel
                    </Button>
                    <Button variant="primary" slot="close" data-testid="confirm-button">
                      Confirm
                    </Button>
                  </ModalFooter>
                </Modal>
              </ModalTrigger>

              <Button data-testid="after-modal-button">
                Button After Modal
              </Button>
            </VStack>
          </VStack>
        </Container>
      );
    };

    return <FocusTestModal />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open modal
    const triggerButton = canvas.getByTestId('trigger-button');
    await userEvent.click(triggerButton);
    
    // Check that focus moves to modal
    const firstInput = canvas.getByTestId('first-input');
    await expect(firstInput).toHaveFocus();
    
    // Test tab navigation within modal
    await userEvent.tab();
    const secondInput = canvas.getByTestId('second-input');
    await expect(secondInput).toHaveFocus();
    
    // Continue tabbing
    await userEvent.tab();
    const modalButton = canvas.getByTestId('modal-button');
    await expect(modalButton).toHaveFocus();
    
    // Tab to footer buttons
    await userEvent.tab();
    const cancelButton = canvas.getByTestId('cancel-button');
    await expect(cancelButton).toHaveFocus();
    
    // Close modal and check focus restoration
    await userEvent.click(cancelButton);
    await expect(triggerButton).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests focus management including focus trapping and restoration.',
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
            Test keyboard interactions including Escape key, Enter key, and arrow navigation.
          </Body1>
        </div>

        <HStack gap="4" style={{ flexWrap: 'wrap' }}>
          <ModalTrigger>
            <Button data-testid="escape-test-button">
              Test Escape Key
            </Button>
            <Modal size="small" isDismissable data-testid="escape-modal">
              <ModalContent title="Escape Key Test" showCloseButton>
                <Body2>
                  Press Escape to close this modal.
                </Body2>
              </ModalContent>
            </Modal>
          </ModalTrigger>

          <ModalTrigger>
            <Button data-testid="no-escape-button">
              No Escape Key
            </Button>
            <Modal 
              size="small" 
              isDismissable={false}
              isKeyboardDismissDisabled 
              data-testid="no-escape-modal"
            >
              <ModalContent title="No Escape Key" showCloseButton={false}>
                <VStack gap="3">
                  <Body2>
                    Escape key is disabled. Use the button to close.
                  </Body2>
                </VStack>
              </ModalContent>
              <ModalFooter>
                <Button variant="primary" slot="close" data-testid="close-button">
                  Close Modal
                </Button>
              </ModalFooter>
            </Modal>
          </ModalTrigger>

          <ModalTrigger>
            <Button data-testid="enter-test-button">
              Test Enter Key
            </Button>
            <Modal size="medium" isDismissable data-testid="enter-modal">
              <ModalHeader title="Enter Key Test" showCloseButton />
              <ModalBody>
                <Body2>
                  Try pressing Enter on the buttons below.
                </Body2>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="secondary" 
                  slot="close" 
                  data-testid="secondary-action"
                >
                  Secondary Action
                </Button>
                <Button 
                  variant="primary" 
                  slot="close" 
                  data-testid="primary-action"
                >
                  Primary Action
                </Button>
              </ModalFooter>
            </Modal>
          </ModalTrigger>
        </HStack>
      </VStack>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test Escape key
    const escapeTestButton = canvas.getByTestId('escape-test-button');
    await userEvent.click(escapeTestButton);
    
    // Press Escape to close
    await userEvent.keyboard('{Escape}');
    
    // Modal should be closed (button should be focusable again)
    await expect(escapeTestButton).toHaveFocus();
    
    // Test disabled Escape key
    const noEscapeButton = canvas.getByTestId('no-escape-button');
    await userEvent.click(noEscapeButton);
    
    // Try to close with Escape (should not work)
    await userEvent.keyboard('{Escape}');
    
    // Modal should still be open, use close button
    const closeButton = canvas.getByTestId('close-button');
    await userEvent.click(closeButton);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests keyboard navigation including Escape key behavior and Enter key activation.',
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
            Modals with proper ARIA attributes and labels for screen reader users.
          </Body1>
        </div>

        <VStack gap="4">
          <ModalTrigger>
            <Button data-testid="basic-modal-trigger">
              Basic Modal with ARIA
            </Button>
            <Modal 
              size="medium" 
              isDismissable 
              data-testid="basic-aria-modal"
              aria-labelledby="basic-modal-title"
              aria-describedby="basic-modal-description"
            >
              <ModalHeader title="Basic Modal" showCloseButton />
              <ModalBody>
                <Body2 id="basic-modal-description">
                  This modal has proper ARIA labels and descriptions for screen readers.
                  It includes role="dialog", aria-modal="true", and appropriate labeling.
                </Body2>
              </ModalBody>
            </Modal>
          </ModalTrigger>

          <ModalTrigger>
            <Button data-testid="form-modal-trigger">
              Form Modal with Validation
            </Button>
            <Modal 
              size="medium" 
              isDismissable 
              data-testid="form-modal"
              aria-labelledby="form-modal-title"
            >
              <ModalHeader title="User Information" showCloseButton />
              <ModalBody>
                <form>
                  <VStack gap="4">
                    <FormField 
                      label="Email Address" 
                      isRequired
                      errorMessage="Please enter a valid email address"
                    >
                      <Input
                        type="email"
                        data-testid="email-input"
                        isRequired
                        hasError
                        aria-invalid="true"
                        aria-describedby="email-error"
                      />
                    </FormField>

                    <FormField 
                      label="Full Name"
                      description="Enter your first and last name"
                    >
                      <Input
                        type="text"
                        data-testid="name-input"
                        aria-describedby="name-description"
                      />
                    </FormField>
                  </VStack>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" slot="close">
                  Cancel
                </Button>
                <Button variant="primary" slot="close">
                  Save Information
                </Button>
              </ModalFooter>
            </Modal>
          </ModalTrigger>

          <ModalTrigger>
            <Button data-testid="confirmation-modal-trigger">
              Confirmation Modal
            </Button>
            <Modal 
              size="small" 
              isDismissable 
              data-testid="confirmation-modal"
              aria-labelledby="confirmation-title"
              aria-describedby="confirmation-description"
            >
              <ModalHeader showCloseButton>
                <H3 id="confirmation-title" style={{ margin: 0, color: '#e53e3e' }}>
                  Delete Account
                </H3>
              </ModalHeader>
              <ModalBody>
                <VStack gap="3">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle style={{ color: '#e53e3e' }} size={20} />
                    <Body2 style={{ fontWeight: 600, color: '#e53e3e' }}>
                      Destructive Action
                    </Body2>
                  </div>
                  <Body2 id="confirmation-description">
                    This action cannot be undone. Your account and all associated data will be permanently deleted.
                  </Body2>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" slot="close">
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  slot="close"
                  aria-describedby="delete-warning"
                >
                  Delete Account
                </Button>
                <span id="delete-warning" className="sr-only">
                  Warning: This action is irreversible and will permanently delete your account
                </span>
              </ModalFooter>
            </Modal>
          </ModalTrigger>
        </VStack>
      </VStack>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test basic modal ARIA attributes
    const basicTrigger = canvas.getByTestId('basic-modal-trigger');
    await userEvent.click(basicTrigger);
    
    const basicModal = canvas.getByTestId('basic-aria-modal');
    await expect(basicModal).toHaveAttribute('role', 'dialog');
    await expect(basicModal).toHaveAttribute('aria-modal', 'true');
    await expect(basicModal).toHaveAttribute('aria-labelledby', 'basic-modal-title');
    
    // Close modal
    await userEvent.keyboard('{Escape}');
    
    // Test form modal validation states
    const formTrigger = canvas.getByTestId('form-modal-trigger');
    await userEvent.click(formTrigger);
    
    const emailInput = canvas.getByTestId('email-input');
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(emailInput).toHaveAttribute('required');
    
    // Close modal
    await userEvent.keyboard('{Escape}');
  },
  parameters: {
    docs: {
      description: {
        story: 'Screen reader compatibility with proper ARIA attributes, labels, and descriptions.',
      },
    },
  },
};

/**
 * Real-World Usage Patterns
 */
export const RealWorldPatterns: Story = {
  render: () => {
    const [userData, setUserData] = useState({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    });

    return (
      <Container>
        <VStack gap="6">
          <div>
            <H2>Real-World Usage Patterns</H2>
            <Body1>
              Common modal patterns found in real applications.
            </Body1>
          </div>

          <HStack gap="4" style={{ flexWrap: 'wrap' }}>
            {/* Settings Modal */}
            <ModalTrigger>
              <Button variant="secondary">
                <Settings size={16} />
                Edit Profile
              </Button>
              <Modal size="medium" isDismissable>
                <ModalHeader title="Edit Profile" showCloseButton />
                <ModalBody>
                  <VStack gap="4">
                    <FormField label="Full Name" isRequired>
                      <Input
                        value={userData.name}
                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </FormField>
                    
                    <FormField label="Email Address" isRequired>
                      <Input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </FormField>
                    
                    <FormField label="Role">
                      <select 
                        value={userData.role}
                        onChange={(e) => setUserData(prev => ({ ...prev, role: e.target.value }))}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          width: '100%',
                        }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </FormField>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" slot="close">
                    Cancel
                  </Button>
                  <Button variant="primary" slot="close">
                    <Save size={16} />
                    Save Changes
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalTrigger>

            {/* Confirmation Modal */}
            <ModalTrigger>
              <Button variant="danger">
                <Trash size={16} />
                Delete Item
              </Button>
              <Modal size="small" isDismissable>
                <ModalHeader showCloseButton>
                  <H3 style={{ margin: 0, color: '#e53e3e' }}>
                    Confirm Deletion
                  </H3>
                </ModalHeader>
                <ModalBody>
                  <VStack gap="3">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertTriangle style={{ color: '#e53e3e' }} size={20} />
                      <Body2 style={{ fontWeight: 600 }}>
                        This action cannot be undone
                      </Body2>
                    </div>
                    <Body2>
                      Are you sure you want to delete this item? All associated data will be permanently removed.
                    </Body2>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" slot="close">
                    Cancel
                  </Button>
                  <Button variant="danger" slot="close">
                    <Trash size={16} />
                    Delete
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalTrigger>

            {/* Full Screen Modal */}
            <ModalTrigger>
              <Button variant="primary">
                Open Editor
              </Button>
              <Modal size="full" isDismissable>
                <ModalHeader title="Document Editor" showCloseButton />
                <ModalBody>
                  <VStack gap="6">
                    <Body1>
                      Full-screen modal simulating a document editor or complex application interface.
                    </Body1>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr',
                      gap: '2rem',
                      minHeight: '500px',
                    }}>
                      <div style={{ borderRight: '1px solid #e5e5e5', paddingRight: '1rem' }}>
                        <H3>Sidebar</H3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          <li style={{ padding: '0.5rem 0' }}>📄 Document 1</li>
                          <li style={{ padding: '0.5rem 0' }}>📄 Document 2</li>
                          <li style={{ padding: '0.5rem 0' }}>📄 Document 3</li>
                          <li style={{ padding: '0.5rem 0' }}>📁 Folder 1</li>
                        </ul>
                      </div>
                      
                      <div>
                        <H3>Main Content Area</H3>
                        <div style={{
                          backgroundColor: '#f8f9fa',
                          padding: '2rem',
                          borderRadius: '8px',
                          minHeight: '400px',
                        }}>
                          <Body2>
                            This area would contain the main editing interface, canvas, or content view.
                            Full-screen modals are perfect for immersive experiences that need maximum space.
                          </Body2>
                        </div>
                      </div>
                    </div>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" slot="close">
                    Exit Without Saving
                  </Button>
                  <Button variant="primary" slot="close">
                    <Save size={16} />
                    Save & Exit
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalTrigger>
          </HStack>
        </VStack>
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world modal patterns including settings forms, confirmations, and full-screen editors.',
      },
    },
  },
};