// /src/storybook/navigation/pagination.stories.tsx
// Pagination component stories showcasing all variants and interactive features
// Complete documentation for the Pagination component with real-world examples
// RELEVANT FILES: ../../ui/pagination/index.ts, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Icon,
} from '../../icons';
import { Pagination } from '../../ui/pagination';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Navigation component for dividing content across multiple pages. Provides intuitive controls with keyboard support, screen reader compatibility, and smart ellipsis handling for large page ranges.',
      },
    },
  },
  argTypes: {
    currentPage: {
      control: {
        type: 'number',
        min: 1,
        max: 50,
      },
      description: 'Current active page (1-based indexing)',
      defaultValue: 1,
    },
    totalPages: {
      control: {
        type: 'number',
        min: 1,
        max: 100,
      },
      description: 'Total number of pages',
      defaultValue: 10,
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for pagination controls',
      defaultValue: 'medium',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'simple'],
      description: 'Visual style variant',
      defaultValue: 'default',
    },
    showFirstLast: {
      control: { type: 'boolean' },
      description: 'Show first/last page buttons',
      defaultValue: true,
    },
    showPrevNext: {
      control: { type: 'boolean' },
      description: 'Show previous/next page buttons',
      defaultValue: true,
    },
    maxVisiblePages: {
      control: {
        type: 'number',
        min: 3,
        max: 10,
      },
      description: 'Maximum page buttons to show (excluding navigation)',
      defaultValue: 5,
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the pagination is disabled',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * Default pagination with standard settings
 */
export const Default: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'medium',
    variant: 'default',
  },
  render: function Render(args) {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

/**
 * Different size variants
 */
export const Sizes: Story = {
  render: function Render() {
    const [smallPage, setSmallPage] = useState(2);
    const [mediumPage, setMediumPage] = useState(3);
    const [largePage, setLargePage] = useState(4);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div>
          <h3>Small Size</h3>
          <Pagination
            currentPage={smallPage}
            totalPages={8}
            onPageChange={setSmallPage}
            size="small"
          />
        </div>
        <div>
          <h3>Medium Size (Default)</h3>
          <Pagination
            currentPage={mediumPage}
            totalPages={8}
            onPageChange={setMediumPage}
            size="medium"
          />
        </div>
        <div>
          <h3>Large Size</h3>
          <Pagination
            currentPage={largePage}
            totalPages={8}
            onPageChange={setLargePage}
            size="large"
          />
        </div>
      </div>
    );
  },
};

/**
 * Visual variants for different contexts
 */
export const Variants: Story = {
  render: function Render() {
    const [defaultPage, setDefaultPage] = useState(3);
    const [simplePage, setSimplePage] = useState(4);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div>
          <h3>Default Variant</h3>
          <Pagination
            currentPage={defaultPage}
            totalPages={7}
            onPageChange={setDefaultPage}
            variant="default"
          />
        </div>
        <div>
          <h3>Simple Variant</h3>
          <Pagination
            currentPage={simplePage}
            totalPages={7}
            onPageChange={setSimplePage}
            variant="simple"
          />
        </div>
      </div>
    );
  },
};

/**
 * Large dataset with ellipsis handling
 */
export const LargeDataset: Story = {
  render: function Render() {
    const [beginningPage, setBeginningPage] = useState(3);
    const [middlePage, setMiddlePage] = useState(25);
    const [endPage, setEndPage] = useState(48);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div>
          <h3>Beginning of Range (Page 3 of 50)</h3>
          <Pagination
            currentPage={beginningPage}
            totalPages={50}
            onPageChange={setBeginningPage}
            maxVisiblePages={5}
          />
        </div>
        <div>
          <h3>Middle of Range (Page 25 of 50)</h3>
          <Pagination
            currentPage={middlePage}
            totalPages={50}
            onPageChange={setMiddlePage}
            maxVisiblePages={5}
          />
        </div>
        <div>
          <h3>End of Range (Page 48 of 50)</h3>
          <Pagination
            currentPage={endPage}
            totalPages={50}
            onPageChange={setEndPage}
            maxVisiblePages={5}
          />
        </div>
      </div>
    );
  },
};

/**
 * Custom text and icons
 */
export const CustomContent: Story = {
  render: function Render() {
    const [page1, setPage1] = useState(5);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(7);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div>
          <h3>Custom Navigation Text</h3>
          <Pagination
            currentPage={page1}
            totalPages={12}
            onPageChange={setPage1}
            previousText="Back"
            nextText="Next"
            firstText="Start"
            lastText="End"
            variant="simple"
          />
        </div>
        <div>
          <h3>Icons with Text</h3>
          <Pagination
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
            previousText={
              <>
                <Icon icon={ChevronLeft} size="xs" /> Previous
              </>
            }
            nextText={
              <>
                Next <Icon icon={ChevronRight} size="xs" />
              </>
            }
            firstText={
              <>
                <Icon icon={ArrowLeft} size="xs" /> First
              </>
            }
            lastText={
              <>
                Last <Icon icon={ArrowRight} size="xs" />
              </>
            }
          />
        </div>
        <div>
          <h3>Icon Only (Mobile-friendly)</h3>
          <Pagination
            currentPage={page3}
            totalPages={15}
            onPageChange={setPage3}
            previousText={<Icon icon={ChevronLeft} size="xs" />}
            nextText={<Icon icon={ChevronRight} size="xs" />}
            firstText={<Icon icon={ArrowLeft} size="xs" />}
            lastText={<Icon icon={ArrowRight} size="xs" />}
            size="small"
            maxVisiblePages={3}
          />
        </div>
      </div>
    );
  },
};

/**
 * Configuration options
 */
export const Configuration: Story = {
  render: function Render() {
    const [config1Page, setConfig1Page] = useState(4);
    const [config2Page, setConfig2Page] = useState(6);
    const [config3Page, setConfig3Page] = useState(5);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div>
          <h3>Minimal Controls (No First/Last)</h3>
          <Pagination
            currentPage={config1Page}
            totalPages={12}
            onPageChange={setConfig1Page}
            showFirstLast={false}
            maxVisiblePages={3}
          />
        </div>
        <div>
          <h3>No Navigation Buttons</h3>
          <Pagination
            currentPage={config2Page}
            totalPages={10}
            onPageChange={setConfig2Page}
            showPrevNext={false}
            showFirstLast={false}
            maxVisiblePages={5}
          />
        </div>
        <div>
          <h3>Compact (3 visible pages)</h3>
          <Pagination
            currentPage={config3Page}
            totalPages={20}
            onPageChange={setConfig3Page}
            maxVisiblePages={3}
            variant="simple"
            size="small"
          />
        </div>
      </div>
    );
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h3>Disabled Pagination</h3>
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={() => {}}
          disabled={true}
        />
      </div>
      <div>
        <h3>Disabled Simple Variant</h3>
        <Pagination
          currentPage={3}
          totalPages={8}
          onPageChange={() => {}}
          disabled={true}
          variant="simple"
        />
      </div>
    </div>
  ),
};

/**
 * Data table pagination example
 */
export const DataTableExample: Story = {
  render: function Render() {
    const DataTableExample = (): ReactElement => {
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;

      // Sample data
      const sampleData = Array.from({ length: 47 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
        price: Math.floor(Math.random() * 200) + 20,
        status: ['Active', 'Inactive', 'Pending'][i % 3],
      }));

      const totalPages = Math.ceil(sampleData.length / itemsPerPage);
      const currentData = sampleData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      );

      return (
        <div
          style={{
            border: '1px solid var(--color-border-primary)',
            borderRadius: '8px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 120px 100px 100px',
              gap: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color-background-secondary)',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderBottom: '1px solid var(--color-border-primary)',
            }}
          >
            <div>ID</div>
            <div>Product Name</div>
            <div>Category</div>
            <div>Price</div>
            <div>Status</div>
          </div>

          {/* Table Body */}
          {currentData.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 120px 100px 100px',
                gap: '1rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                borderBottom:
                  index < currentData.length - 1
                    ? '1px solid var(--color-border-secondary)'
                    : 'none',
                backgroundColor:
                  index % 2 === 0
                    ? 'transparent'
                    : 'var(--color-background-secondary)',
              }}
            >
              <div style={{ color: 'var(--color-foreground-tertiary)' }}>
                #{item.id}
              </div>
              <div>{item.name}</div>
              <div>{item.category}</div>
              <div>${item.price}</div>
              <div>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor:
                      item.status === 'Active'
                        ? 'var(--color-semantic-success)'
                        : item.status === 'Inactive'
                          ? 'var(--color-semantic-error)'
                          : 'var(--color-semantic-warning)',
                    color: 'white',
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}

          {/* Pagination Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: 'var(--color-background-secondary)',
              borderTop: '1px solid var(--color-border-primary)',
            }}
          >
            <div
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-foreground-tertiary)',
              }}
            >
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, sampleData.length)} of{' '}
              {sampleData.length} results
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              variant="simple"
              size="small"
              maxVisiblePages={3}
            />
          </div>
        </div>
      );
    };

    return (
      <div>
        <h3>Product Data Table with Pagination</h3>
        <DataTableExample />
      </div>
    );
  },
};

/**
 * Responsive behavior demonstration
 */
export const Responsive: Story = {
  render: function Render() {
    const [mobilePage, setMobilePage] = useState(15);
    const [compactPage, setCompactPage] = useState(8);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div>
          <p>
            <strong>Mobile-optimized with reduced visible pages</strong>
          </p>
          <Pagination
            currentPage={mobilePage}
            totalPages={100}
            onPageChange={setMobilePage}
            maxVisiblePages={3}
            size="small"
            variant="simple"
          />
        </div>
        <div>
          <p>
            <strong>Very compact for tight spaces</strong>
          </p>
          <Pagination
            currentPage={compactPage}
            totalPages={50}
            onPageChange={setCompactPage}
            maxVisiblePages={1}
            size="small"
            showFirstLast={false}
            previousText={<Icon icon={ChevronLeft} size="xs" />}
            nextText={<Icon icon={ChevronRight} size="xs" />}
          />
        </div>
      </div>
    );
  },
};

/**
 * Interactive playground
 */
export const Interactive: Story = {
  render: () => {
    const InteractiveExample = (): ReactElement => {
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(20);
      const [maxVisible, setMaxVisible] = useState(5);

      const resetToMiddle = (): void => {
        setCurrentPage(Math.floor(totalPages / 2));
      };

      const jumpToEnd = (): void => {
        setCurrentPage(totalPages);
      };

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          <div>
            <h3>Interactive Pagination Playground</h3>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Total Pages:
                </label>
                <input
                  type="number"
                  value={totalPages}
                  onChange={(e) => {
                    const newTotal = Math.max(1, parseInt(e.target.value) || 1);
                    setTotalPages(newTotal);
                    setCurrentPage(Math.min(currentPage, newTotal));
                  }}
                  min="1"
                  max="100"
                  style={{
                    padding: '0.25rem',
                    width: '80px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <label
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Max Visible:
                </label>
                <input
                  type="number"
                  value={maxVisible}
                  onChange={(e) =>
                    setMaxVisible(Math.max(3, parseInt(e.target.value) || 3))
                  }
                  min="3"
                  max="10"
                  style={{
                    padding: '0.25rem',
                    width: '80px',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => setCurrentPage(1)}
                style={{
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
              >
                Jump to Start
              </button>
              <button
                onClick={resetToMiddle}
                style={{
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
              >
                Jump to Middle
              </button>
              <button
                onClick={jumpToEnd}
                style={{
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
              >
                Jump to End
              </button>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={maxVisible}
            variant="simple"
          />

          <div
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-foreground-tertiary)',
              textAlign: 'center',
            }}
          >
            Current page: <strong>{currentPage}</strong> of{' '}
            <strong>{totalPages}</strong>
          </div>
        </div>
      );
    };

    return <InteractiveExample />;
  },
};

/**
 * Accessibility features demonstration
 */
export const AccessibilityFeatures: Story = {
  render: function Render() {
    const [accessibilityPage, setAccessibilityPage] = useState(3);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div>
          <h3>Accessibility Features</h3>
          <ul
            style={{
              marginTop: '0.5rem',
              paddingLeft: '1.5rem',
            }}
          >
            <li>Built with React Aria Components for full keyboard support</li>
            <li>Proper ARIA labels and navigation landmarks</li>
            <li>Screen reader announcements for page changes</li>
            <li>Focus management with visible focus indicators</li>
            <li>aria-current="page" for current page button</li>
            <li>Descriptive button labels for assistive technologies</li>
          </ul>
        </div>

        <div>
          <h3>Try keyboard navigation:</h3>
          <Pagination
            currentPage={accessibilityPage}
            totalPages={15}
            onPageChange={setAccessibilityPage}
            maxVisiblePages={5}
            aria-label="Product listing navigation"
          />
        </div>

        <div
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-foreground-tertiary)',
          }}
        >
          <p>
            <strong>Keyboard shortcuts:</strong>
          </p>
          <ul
            style={{
              marginTop: '0.25rem',
              paddingLeft: '1.5rem',
            }}
          >
            <li>Tab: Navigate between pagination buttons</li>
            <li>Enter/Space: Activate focused button</li>
            <li>Arrow Keys: Navigate between buttons (when focused)</li>
          </ul>
        </div>
      </div>
    );
  },
};
