// /src/storybook/layout/aspect-ratio.stories.tsx
// AspectRatio component stories showcasing all ratio variations and use cases
// Complete documentation for the AspectRatio component
// RELEVANT FILES: ../../ui/layout/aspect-ratio/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Camera, Icon, Image as ImageIcon, Package, Video } from '../../icons';
import { Button } from '../../ui/button';
import { AspectRatio } from '../../ui/layout/aspect-ratio';
import { withCentered, withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'AspectRatio is a container component that maintains consistent width-to-height proportions across different screen sizes. It provides predefined aspect ratio presets and supports custom ratios with object-fit control for content positioning.',
      },
    },
  },
  argTypes: {
    preset: {
      control: { type: 'select' },
      options: [
        'square',
        'video',
        'photo',
        'classic',
        'cinema',
        'portrait',
        'golden',
      ],
      description: 'Predefined aspect ratio preset',
    },
    ratio: {
      control: { type: 'object' },
      description: 'Custom aspect ratio with width and height values',
    },
    objectFit: {
      control: { type: 'select' },
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      description: 'How content should fit within the container',
      defaultValue: 'cover',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'figure'],
      description: 'HTML element to render as (polymorphic)',
      defaultValue: 'div',
    },
  },
  args: {
    preset: 'video',
    objectFit: 'cover',
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

/**
 * Default AspectRatio Story
 */
export const Default: Story = {
  decorators: [withCentered],
  args: {
    children: (
      <div
        style={{
          backgroundColor: 'rgba(0, 100, 200, 0.1)',
          border: '1px solid rgba(0, 100, 200, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon icon={Video} size="xl" />
          <div
            style={{
              marginTop: '8px',
              fontSize: '14px',
            }}
          >
            16:9 Video
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic AspectRatio with video preset (16:9) containing placeholder content.',
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
    children: (
      <div
        style={{
          backgroundColor: 'rgba(100, 200, 100, 0.1)',
          border: '1px solid rgba(100, 200, 100, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        Playground Content
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all AspectRatio props and see how they affect the container dimensions.',
      },
    },
  },
};

/**
 * Preset Aspect Ratios
 */
export const PresetAspectRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>preset="square" (1:1)</h3>
        <AspectRatio preset="square" style={{ maxWidth: '200px' }}>
          <div
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.1)',
              border: '1px solid rgba(255, 100, 100, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Icon icon={Package} size="lg" />
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>preset="video" (16:9)</h3>
        <AspectRatio preset="video" style={{ maxWidth: '320px' }}>
          <div
            style={{
              backgroundColor: 'rgba(0, 100, 200, 0.1)',
              border: '1px solid rgba(0, 100, 200, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Icon icon={Video} size="lg" />
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>preset="photo" (4:3)</h3>
        <AspectRatio preset="photo" style={{ maxWidth: '280px' }}>
          <div
            style={{
              backgroundColor: 'rgba(100, 200, 100, 0.1)',
              border: '1px solid rgba(100, 200, 100, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Icon icon={Camera} size="lg" />
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>preset="classic" (3:2)</h3>
        <AspectRatio preset="classic" style={{ maxWidth: '270px' }}>
          <div
            style={{
              backgroundColor: 'rgba(200, 100, 200, 0.1)',
              border: '1px solid rgba(200, 100, 200, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Icon icon={ImageIcon} size="lg" />
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>preset="cinema" (21:9)</h3>
        <AspectRatio preset="cinema" style={{ maxWidth: '350px' }}>
          <div
            style={{
              backgroundColor: 'rgba(150, 150, 100, 0.1)',
              border: '1px solid rgba(150, 150, 100, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <span style={{ fontSize: '14px' }}>Ultra-wide Cinema</span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>preset="portrait" (3:4)</h3>
        <AspectRatio preset="portrait" style={{ maxWidth: '180px' }}>
          <div
            style={{
              backgroundColor: 'rgba(100, 150, 200, 0.1)',
              border: '1px solid rgba(100, 150, 200, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                textAlign: 'center',
              }}
            >
              Portrait
              <br />
              3:4
            </span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>preset="golden" (1.618:1)</h3>
        <AspectRatio preset="golden" style={{ maxWidth: '290px' }}>
          <div
            style={{
              backgroundColor: 'rgba(200, 150, 100, 0.1)',
              border: '1px solid rgba(200, 150, 100, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <span style={{ fontSize: '14px' }}>Golden Ratio</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available preset aspect ratios with their corresponding dimensions.',
      },
    },
  },
};

/**
 * Custom Aspect Ratios
 */
export const CustomAspectRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>
          ratio=&#123;&#123; width: 5, height: 3 &#125;&#125;
        </h3>
        <AspectRatio
          ratio={{
            width: 5,
            height: 3,
          }}
          style={{ maxWidth: '300px' }}
        >
          <div
            style={{
              backgroundColor: 'rgba(100, 200, 150, 0.1)',
              border: '1px solid rgba(100, 200, 150, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <span style={{ fontSize: '14px' }}>5:3 Custom</span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>
          ratio=&#123;&#123; width: 2, height: 3 &#125;&#125;
        </h3>
        <AspectRatio
          ratio={{
            width: 2,
            height: 3,
          }}
          style={{ maxWidth: '200px' }}
        >
          <div
            style={{
              backgroundColor: 'rgba(200, 100, 150, 0.1)',
              border: '1px solid rgba(200, 100, 150, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                textAlign: 'center',
              }}
            >
              2:3
              <br />
              Tall
            </span>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>
          ratio=&#123;&#123; width: 7, height: 2 &#125;&#125;
        </h3>
        <AspectRatio
          ratio={{
            width: 7,
            height: 2,
          }}
          style={{ maxWidth: '350px' }}
        >
          <div
            style={{
              backgroundColor: 'rgba(150, 100, 200, 0.1)',
              border: '1px solid rgba(150, 100, 200, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <span style={{ fontSize: '14px' }}>7:2 Ultra-wide</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Custom aspect ratios using width and height values for precise control.',
      },
    },
  },
};

/**
 * Object Fit Options
 */
export const ObjectFitOptions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>objectFit="cover" (default)</h3>
        <AspectRatio
          preset="video"
          objectFit="cover"
          style={{ maxWidth: '300px' }}
        >
          <div
            style={{
              backgroundColor: '#ff6b6b',
              border: '3px solid #ff5252',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              width: '120%',
              height: '120%',
            }}
          >
            Large Content (Cover)
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>objectFit="contain"</h3>
        <AspectRatio
          preset="video"
          objectFit="contain"
          style={{ maxWidth: '300px' }}
        >
          <div
            style={{
              backgroundColor: '#4ecdc4',
              border: '3px solid #26a69a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              width: '80%',
              height: '60%',
            }}
          >
            Small Content (Contain)
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>objectFit="fill"</h3>
        <AspectRatio
          preset="video"
          objectFit="fill"
          style={{ maxWidth: '300px' }}
        >
          <div
            style={{
              backgroundColor: '#45b7d1',
              border: '3px solid #2196f3',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              width: '80%',
              height: '80%',
            }}
          >
            Content (Fill)
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different object-fit options for controlling how content fits within the aspect ratio container.',
      },
    },
  },
};

/**
 * Image Examples
 */
export const ImageExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Video Thumbnail (16:9)</h3>
        <AspectRatio preset="video" style={{ maxWidth: '320px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative',
            }}
          >
            <Icon icon={Video} size="xl" style={{ opacity: 0.8 }} />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              12:34
            </div>
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Profile Photo (Square)</h3>
        <AspectRatio preset="square" style={{ maxWidth: '200px' }}>
          <div
            style={{
              background:
                'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            J
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Photo Gallery (4:3)</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            maxWidth: '400px',
          }}
        >
          {[
            'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(45deg, #d299c2 0%, #fef9d7 100%)',
          ].map((gradient, index) => (
            <AspectRatio key={index} preset="photo">
              <div
                style={{
                  background: gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {index + 1}
              </div>
            </AspectRatio>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples showing how AspectRatio works with image-like content.',
      },
    },
  },
};

/**
 * Card Examples
 */
export const CardExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Video Card</h3>
        <div
          style={{
            maxWidth: '320px',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <AspectRatio preset="video">
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
              }}
            >
              <Icon icon={Video} size="xl" style={{ opacity: 0.8 }} />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                5:42
              </div>
            </div>
          </AspectRatio>
          <div style={{ padding: '16px' }}>
            <h4
              style={{
                margin: '0 0 8px 0',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Video Title
            </h4>
            <p
              style={{
                margin: '0 0 16px 0',
                color: '#666',
                fontSize: '14px',
              }}
            >
              This is a video description showing how AspectRatio maintains
              consistent proportions.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <Button variant="primary" size="small">
                Watch
              </Button>
              <Button variant="ghost" size="small">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Product Cards Grid</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '400px',
          }}
        >
          {[
            {
              name: 'Product A',
              color: '#ff6b6b',
            },
            {
              name: 'Product B',
              color: '#4ecdc4',
            },
          ].map((product, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white',
              }}
            >
              <AspectRatio preset="square">
                <div
                  style={{
                    backgroundColor: product.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  <Icon icon={Package} size="xl" style={{ opacity: 0.8 }} />
                </div>
              </AspectRatio>
              <div style={{ padding: '12px' }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                  }}
                >
                  $99
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card layouts using AspectRatio for consistent media areas.',
      },
    },
  },
};

/**
 * Responsive Behavior
 */
export const ResponsiveBehavior: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Responsive Video Container</h3>
        <div
          style={{
            border: '2px dashed #ccc',
            padding: '16px',
            maxWidth: '600px',
          }}
        >
          <AspectRatio preset="video">
            <div
              style={{
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Icon icon={Video} size="xl" />
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '14px',
                  }}
                >
                  Responsive 16:9 Container
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    opacity: 0.7,
                  }}
                >
                  Resize browser to see responsive behavior
                </div>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Grid with Consistent Ratios</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            maxWidth: '600px',
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <AspectRatio key={item} preset="square">
              <div
                style={{
                  backgroundColor: `hsl(${item * 60}, 70%, 60%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                {item}
              </div>
            </AspectRatio>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Responsive behavior examples showing how AspectRatio adapts to different container sizes.',
      },
    },
  },
};
