// /src/app/feedback/toast/page.tsx
// Toast component demonstration page
// Showcases all toast variants, positions, and interactive features for feedback
// RELEVANT FILES: /src/ui/toast/toast.tsx, /src/ui/toast/types.ts

'use client';

import { type FC, type ReactElement } from 'react';

import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Code } from '@/ui/code';
import { Container } from '@/ui/layout/container';
import { ContentWrapper } from '@/ui/layout/content-wrapper';
import { HStack } from '@/ui/layout/hstack';
import { VStack } from '@/ui/layout/vstack';
import { ToastProvider, type ToastVariant, useToast } from '@/ui/toast';
import { Body1, Body2, H1, H2, H3 } from '@/ui/typography';

/**
 * Toast demo controls component
 */
const ToastDemo: FC = (): ReactElement => {
  const { toast, closeAll } = useToast();

  const showToast = (
    variant: ToastVariant,
    withTitle: boolean = false,
  ): void => {
    const baseProps = {
      variant,
      description: `This is a ${variant} toast notification. It will auto-dismiss after a few seconds.`,
    };

    if (withTitle) {
      toast({
        ...baseProps,
        title: `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Message`,
      });
    } else {
      toast(baseProps);
    }
  };

  const showCustomToast = (): void => {
    toast({
      variant: 'info',
      title: 'Custom Configuration',
      description:
        'This toast has a custom duration and cannot be auto-dismissed.',
      duration: null, // Won't auto-dismiss
    });
  };

  const showLongToast = (): void => {
    toast({
      variant: 'warning',
      title: 'Long Content Example',
      description:
        'This is a longer toast message that demonstrates how the component handles multiple lines of text. The content will wrap appropriately and maintain good readability.',
      duration: 10000, // 10 seconds
    });
  };

  return (
    <VStack space="16">
      <VStack space="8">
        <H3>Basic Variants</H3>
        <Body2>
          Click the buttons below to trigger different toast variants:
        </Body2>
        <HStack space="2" wrap>
          <Button variant="primary" onClick={() => showToast('success')}>
            Success Toast
          </Button>
          <Button variant="secondary" onClick={() => showToast('error')}>
            Error Toast
          </Button>
          <Button variant="secondary" onClick={() => showToast('warning')}>
            Warning Toast
          </Button>
          <Button variant="secondary" onClick={() => showToast('info')}>
            Info Toast
          </Button>
        </HStack>
      </VStack>

      <VStack space="8">
        <H3>With Titles</H3>
        <Body2>Toasts can include both titles and descriptions:</Body2>
        <HStack space="2" wrap>
          <Button variant="primary" onClick={() => showToast('success', true)}>
            Success with Title
          </Button>
          <Button variant="secondary" onClick={() => showToast('error', true)}>
            Error with Title
          </Button>
        </HStack>
      </VStack>

      <VStack space="8">
        <H3>Custom Configurations</H3>
        <Body2>Toasts can be customized for different use cases:</Body2>
        <HStack space="2" wrap>
          <Button variant="secondary" onClick={showCustomToast}>
            Non-dismissing Toast
          </Button>
          <Button variant="secondary" onClick={showLongToast}>
            Long Duration Toast
          </Button>
        </HStack>
      </VStack>

      <VStack space="8">
        <H3>Bulk Actions</H3>
        <HStack space="2" wrap>
          <Button
            variant="ghost"
            onClick={() => {
              // Show multiple toasts quickly
              showToast('success');
              setTimeout(() => showToast('info'), 100);
              setTimeout(() => showToast('warning'), 200);
            }}
          >
            Show Multiple Toasts
          </Button>
          <Button variant="danger" onClick={closeAll}>
            Close All Toasts
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

/**
 * Toast page component
 */
const ToastPage: FC = (): ReactElement => (
  <Container>
    <ContentWrapper>
      <VStack space="24">
        {/* Header */}
        <VStack space="8">
          <H1>Toast</H1>
          <Body1>
            Toast notifications provide brief feedback about an operation
            through a message that appears temporarily at a chosen position on
            the screen.
          </Body1>
          <HStack space="2">
            <Badge variant="solid">Accessible</Badge>
            <Badge variant="solid">Responsive</Badge>
            <Badge variant="solid">Animated</Badge>
          </HStack>
        </VStack>

        {/* Interactive Demo */}
        <ToastProvider position="bottom-right" max={3}>
          <VStack space="24">
            <VStack space="8">
              <H2>Interactive Demo</H2>
              <Body2>
                Experience the Toast component in action. Try different variants
                and observe the behavior, animations, and accessibility
                features.
              </Body2>
            </VStack>

            <ToastDemo />
          </VStack>
        </ToastProvider>

        {/* Features */}
        <VStack space="8">
          <H2>Features</H2>
          <VStack space="2" as="ul">
            <Body2 as="li">
              <strong>Multiple Variants:</strong> Success, error, warning, and
              info variants with appropriate colors and icons
            </Body2>
            <Body2 as="li">
              <strong>Flexible Positioning:</strong> Six position options (top,
              bottom, corners) with responsive behavior on mobile
            </Body2>
            <Body2 as="li">
              <strong>Auto-dismiss:</strong> Configurable timeout with pause on
              hover and progress indicator
            </Body2>
            <Body2 as="li">
              <strong>Manual Control:</strong> Optional close button and
              keyboard support (Escape key)
            </Body2>
            <Body2 as="li">
              <strong>Stacking:</strong> Multiple toasts stack vertically with
              smooth animations
            </Body2>
            <Body2 as="li">
              <strong>Accessibility:</strong> ARIA live regions, proper roles,
              and screen reader support
            </Body2>
          </VStack>
        </VStack>

        {/* Usage */}
        <VStack space="8">
          <H2>Usage</H2>
          <Body2>
            The Toast component uses a provider pattern for global state
            management:
          </Body2>
          <Code>
            {`import { ToastProvider, useToast } from '@/ui/toast';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider position="bottom-right" max={5}>
      <MyComponent />
    </ToastProvider>
  );
}

// Use the toast hook in components
function MyComponent() {
  const { toast, close, closeAll } = useToast();

  const showSuccessToast = () => {
    toast({
      variant: 'success',
      title: 'Success!',
      description: 'Your action was completed successfully.',
      duration: 5000,
    });
  };

  return (
    <button onClick={showSuccessToast}>
      Show Success Toast
    </button>
  );
}`}
          </Code>
        </VStack>

        {/* Configuration */}
        <VStack space="8">
          <H2>Configuration Options</H2>
          <Body2>
            Toast components can be configured with these properties:
          </Body2>
          <VStack space="2">
            <Code>
              {`interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: ReactNode;
  duration?: number | null; // null = no auto-dismiss
  isClosable?: boolean;
  onClose?: (id: string) => void;
  icon?: ReactNode; // Custom icon override
}`}
            </Code>
            <Code>
              {`interface ToastProviderProps {
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 
            'bottom-left' | 'bottom-right';
  max?: number; // Maximum number of toasts
  duration?: number; // Default duration for all toasts
}`}
            </Code>
          </VStack>
        </VStack>

        {/* Best Practices */}
        <VStack space="8">
          <H2>Best Practices</H2>
          <VStack space="2" as="ul">
            <Body2 as="li">
              <strong>Keep messages concise:</strong> Toast notifications should
              be brief and to the point
            </Body2>
            <Body2 as="li">
              <strong>Use appropriate variants:</strong> Match the variant to
              the message type (success for confirmations, error for failures,
              etc.)
            </Body2>
            <Body2 as="li">
              <strong>Consider timing:</strong> Error messages may need longer
              duration, while success messages can be shorter
            </Body2>
            <Body2 as="li">
              <strong>Limit quantity:</strong> Don't overwhelm users with too
              many simultaneous toasts
            </Body2>
            <Body2 as="li">
              <strong>Provide actions when needed:</strong> For critical errors,
              consider including action buttons or links to resolve issues
            </Body2>
          </VStack>
        </VStack>
      </VStack>
    </ContentWrapper>
  </Container>
);

export default ToastPage;
