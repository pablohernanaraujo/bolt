// /src/app/navigation/pagination/page.tsx
// Pagination component documentation page with live examples and comprehensive usage guide
// Interactive demonstrations of pagination navigation patterns and best practices
// RELEVANT FILES: ../../../ui/pagination/index.ts, ../../page.css.ts

'use client';

import { type FC, type ReactElement, useState } from 'react';

import { ChevronLeft, ChevronRight, Icon } from '@/icons';
import {
  Body1,
  Body2,
  Button,
  Code,
  Container,
  Divider,
  H1,
  H2,
  H3,
  VStack,
} from '@/ui';
import { Pagination } from '@/ui/pagination';

import * as styles from '../../page.css';

/**
 * Pagination component documentation page
 */
const PaginationPage: FC = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<'usage' | 'api' | 'examples'>(
    'usage',
  );

  // State for interactive examples
  const [basicCurrentPage, setBasicCurrentPage] = useState(1);
  const [simpleCurrentPage, setSimpleCurrentPage] = useState(5);
  const [customCurrentPage, setCustomCurrentPage] = useState(3);
  const [dataListPage, setDataListPage] = useState(1);

  // Sample data for pagination
  const sampleData = Array.from({ length: 250 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
    price: Math.floor(Math.random() * 100) + 10,
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const currentData = sampleData.slice(
    (dataListPage - 1) * itemsPerPage,
    dataListPage * itemsPerPage,
  );

  return (
    <Container>
      <VStack space="16">
        <div className={styles.header}>
          <H1>Pagination</H1>
          <Body1>
            Navigation component for dividing content across multiple pages.
            Provides intuitive controls for users to navigate through large
            datasets efficiently.
          </Body1>

          {/* Live pagination showing current page location */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Pagination
              currentPage={2}
              totalPages={5}
              onPageChange={() => {}}
              variant="simple"
              size="medium"
            />
          </div>
        </div>

        <Divider />

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          {(['usage', 'api', 'examples'] as const).map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Usage Tab */}
        {activeTab === 'usage' && (
          <VStack space="16">
            {/* Basic Usage */}
            <section className={styles.section}>
              <H2>Basic Usage</H2>
              <Body1>
                Import the Pagination component and use it to navigate through
                multiple pages. Provide currentPage, totalPages, and an
                onPageChange callback.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <Pagination
                    currentPage={basicCurrentPage}
                    totalPages={10}
                    onPageChange={setBasicCurrentPage}
                  />
                </div>
                <Code>
                  {`import { Pagination } from '@/ui/pagination';
import { useState } from 'react';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}`}
                </Code>
              </div>
            </section>

            {/* Size Variants */}
            <section className={styles.section}>
              <H2>Size Variants</H2>
              <Body1>
                Pagination comes in three sizes: small, medium (default), and
                large. Choose the appropriate size based on your interface
                density.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Small</strong>
                      </Body2>
                      <Pagination
                        currentPage={2}
                        totalPages={5}
                        onPageChange={() => {}}
                        size="small"
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>Medium (Default)</strong>
                      </Body2>
                      <Pagination
                        currentPage={2}
                        totalPages={5}
                        onPageChange={() => {}}
                        size="medium"
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>Large</strong>
                      </Body2>
                      <Pagination
                        currentPage={2}
                        totalPages={5}
                        onPageChange={() => {}}
                        size="large"
                      />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Visual Variants */}
            <section className={styles.section}>
              <H2>Visual Variants</H2>
              <Body1>
                Choose between default and simple variants for different visual
                contexts. The simple variant has a more compact appearance with
                borders.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Default</strong>
                      </Body2>
                      <Pagination
                        currentPage={3}
                        totalPages={7}
                        onPageChange={() => {}}
                        variant="default"
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>Simple</strong>
                      </Body2>
                      <Pagination
                        currentPage={simpleCurrentPage}
                        totalPages={7}
                        onPageChange={setSimpleCurrentPage}
                        variant="simple"
                      />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Customization */}
            <section className={styles.section}>
              <H2>Customization</H2>
              <Body1>
                Customize the pagination behavior with various props including
                visible page limits, navigation buttons, and custom text.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Custom Text & Icons</strong>
                      </Body2>
                      <Pagination
                        currentPage={customCurrentPage}
                        totalPages={15}
                        onPageChange={setCustomCurrentPage}
                        maxVisiblePages={3}
                        previousText={
                          <>
                            <Icon icon={ChevronLeft} size="xs" /> Back
                          </>
                        }
                        nextText={
                          <>
                            Next <Icon icon={ChevronRight} size="xs" />
                          </>
                        }
                        firstText="Start"
                        lastText="End"
                        variant="simple"
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>Minimal Controls</strong>
                      </Body2>
                      <Pagination
                        currentPage={3}
                        totalPages={8}
                        onPageChange={() => {}}
                        showFirstLast={false}
                        maxVisiblePages={3}
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>No Navigation Buttons</strong>
                      </Body2>
                      <Pagination
                        currentPage={4}
                        totalPages={8}
                        onPageChange={() => {}}
                        showPrevNext={false}
                        showFirstLast={false}
                        maxVisiblePages={5}
                      />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>
          </VStack>
        )}

        {/* API Tab */}
        {activeTab === 'api' && (
          <VStack space="16">
            <section className={styles.section}>
              <H2>Component API</H2>

              <div className={styles.apiSection}>
                <H3>Pagination Props</H3>
                <div className={styles.apiTable}>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>currentPage</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>number</Code>
                    </div>
                    <div className={styles.apiCell}>Yes</div>
                    <div className={styles.apiCell}>
                      Current active page (1-based indexing)
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>totalPages</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>number</Code>
                    </div>
                    <div className={styles.apiCell}>Yes</div>
                    <div className={styles.apiCell}>Total number of pages</div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>onPageChange</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>(page: number) =&gt; void</Code>
                    </div>
                    <div className={styles.apiCell}>Yes</div>
                    <div className={styles.apiCell}>
                      Callback fired when page changes
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>size</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>'small' | 'medium' | 'large'</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Size variant (default: 'medium')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>variant</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>'default' | 'simple'</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Visual style variant (default: 'default')
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>showFirstLast</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>boolean</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Show first/last page buttons (default: true)
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>showPrevNext</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>boolean</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Show previous/next page buttons (default: true)
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>maxVisiblePages</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>number</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Maximum page buttons to show (default: 5)
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>disabled</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>boolean</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Whether pagination is disabled (default: false)
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>previousText</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>ReactNode</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Custom text/content for previous button
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>nextText</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>ReactNode</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Custom text/content for next button
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>firstText</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>ReactNode</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Custom text/content for first page button
                    </div>
                  </div>
                  <div className={styles.apiRow}>
                    <div className={styles.apiCell}>
                      <Code>lastText</Code>
                    </div>
                    <div className={styles.apiCell}>
                      <Code>ReactNode</Code>
                    </div>
                    <div className={styles.apiCell}>No</div>
                    <div className={styles.apiCell}>
                      Custom text/content for last page button
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.apiSection}>
                <H3>Usage Example</H3>
                <Code>
                  {`interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'simple';
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  disabled?: boolean;
  className?: string;
  previousText?: ReactNode;
  nextText?: ReactNode;
  firstText?: ReactNode;
  lastText?: ReactNode;
  pageAriaLabel?: (page: number) => string;
  'aria-label'?: string;
}`}
                </Code>
              </div>
            </section>
          </VStack>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <VStack space="16">
            {/* Data Table Example */}
            <section className={styles.section}>
              <H2>Data Table Pagination</H2>
              <Body1>
                Common use case for paginating through large datasets in tables
                or lists. This example shows pagination with a data table
                showing items per page.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="8">
                    <div
                      style={{
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '60px 1fr 100px 80px',
                          gap: '1rem',
                          padding: '0.75rem 1rem',
                          backgroundColor: 'var(--color-background-secondary)',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        <div>ID</div>
                        <div>Name</div>
                        <div>Category</div>
                        <div>Price</div>
                      </div>
                      {currentData.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '60px 1fr 100px 80px',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            borderTop: '1px solid var(--color-border-primary)',
                            fontSize: '0.875rem',
                          }}
                        >
                          <div
                            style={{
                              color: 'var(--color-foreground-tertiary)',
                            }}
                          >
                            #{item.id}
                          </div>
                          <div>{item.name}</div>
                          <div>{item.category}</div>
                          <div>${item.price}</div>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 0',
                      }}
                    >
                      <Body2
                        style={{ color: 'var(--color-foreground-tertiary)' }}
                      >
                        Showing {(dataListPage - 1) * itemsPerPage + 1}-
                        {Math.min(
                          dataListPage * itemsPerPage,
                          sampleData.length,
                        )}{' '}
                        of {sampleData.length} items
                      </Body2>
                      <Pagination
                        currentPage={dataListPage}
                        totalPages={totalPages}
                        onPageChange={setDataListPage}
                        variant="simple"
                        size="small"
                        maxVisiblePages={3}
                      />
                    </div>
                  </VStack>
                </div>

                <Code>
                  {`function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Render your table/list with currentData */}
      <TableComponent data={currentData} />
      
      <div className="pagination-container">
        <div className="results-info">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-
          {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} items
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
}`}
                </Code>
              </div>
            </section>

            {/* Large Dataset Example */}
            <section className={styles.section}>
              <H2>Large Dataset with Ellipsis</H2>
              <Body1>
                When dealing with many pages, the pagination component
                automatically adds ellipsis to keep the interface compact while
                still providing access to all pages.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Beginning of Range (Page 3 of 50)</strong>
                      </Body2>
                      <Pagination
                        currentPage={3}
                        totalPages={50}
                        onPageChange={() => {}}
                        maxVisiblePages={5}
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>Middle of Range (Page 25 of 50)</strong>
                      </Body2>
                      <Pagination
                        currentPage={25}
                        totalPages={50}
                        onPageChange={() => {}}
                        maxVisiblePages={5}
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>End of Range (Page 48 of 50)</strong>
                      </Body2>
                      <Pagination
                        currentPage={48}
                        totalPages={50}
                        onPageChange={() => {}}
                        maxVisiblePages={5}
                      />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Disabled State */}
            <section className={styles.section}>
              <H2>Disabled State</H2>
              <Body1>
                Pagination can be disabled during loading states or when data is
                being processed.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Disabled Pagination</strong>
                      </Body2>
                      <Pagination
                        currentPage={5}
                        totalPages={10}
                        onPageChange={() => {}}
                        disabled={true}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                    >
                      <Button size="small">Enable Pagination</Button>
                      <Body2
                        style={{ color: 'var(--color-foreground-tertiary)' }}
                      >
                        Toggle to see the disabled state effect
                      </Body2>
                    </div>
                  </VStack>
                </div>
              </div>
            </section>

            {/* Mobile Responsive */}
            <section className={styles.section}>
              <H2>Responsive Behavior</H2>
              <Body1>
                Pagination automatically adapts to smaller screens by reducing
                visible page numbers and adjusting button sizes appropriately.
              </Body1>

              <div className={styles.example}>
                <div className={styles.preview}>
                  <VStack space="16">
                    <div>
                      <Body2>
                        <strong>Compact for Mobile</strong>
                      </Body2>
                      <Pagination
                        currentPage={15}
                        totalPages={100}
                        onPageChange={() => {}}
                        maxVisiblePages={3}
                        size="small"
                        variant="simple"
                      />
                    </div>
                    <div>
                      <Body2>
                        <strong>Very Compact</strong>
                      </Body2>
                      <Pagination
                        currentPage={15}
                        totalPages={100}
                        onPageChange={() => {}}
                        maxVisiblePages={1}
                        size="small"
                        showFirstLast={false}
                        previousText={<Icon icon={ChevronLeft} size="xs" />}
                        nextText={<Icon icon={ChevronRight} size="xs" />}
                      />
                    </div>
                  </VStack>
                </div>
              </div>
            </section>
          </VStack>
        )}

        <Divider />

        {/* Best Practices */}
        <section className={styles.section}>
          <H2>Best Practices</H2>

          <VStack space="8">
            <div>
              <H3>When to Use</H3>
              <ul
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <li>
                  Large datasets that would cause performance issues if loaded
                  at once
                </li>
                <li>Search results with many pages</li>
                <li>Data tables with hundreds or thousands of rows</li>
                <li>Product listings in e-commerce applications</li>
                <li>Blog posts or article archives</li>
              </ul>
            </div>

            <div>
              <H3>Design Guidelines</H3>
              <ul
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <li>
                  Place pagination at the bottom of content, centered or
                  right-aligned
                </li>
                <li>Show total count and current range when possible</li>
                <li>
                  Use appropriate size variants based on interface density
                </li>
                <li>Consider using infinite scroll for mobile experiences</li>
                <li>Provide clear visual feedback for the current page</li>
                <li>
                  Keep maximum visible pages between 5-7 for optimal usability
                </li>
              </ul>
            </div>

            <div>
              <H3>Accessibility</H3>
              <ul
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <li>
                  Built with React Aria Components for full keyboard support
                </li>
                <li>Proper ARIA labels and navigation landmarks</li>
                <li>Screen reader announcements for page changes</li>
                <li>Focus management with visible focus indicators</li>
                <li>aria-current="page" for the current page button</li>
                <li>Descriptive button labels for assistive technologies</li>
              </ul>
            </div>

            <div>
              <H3>Performance Tips</H3>
              <ul
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '1.5rem',
                }}
              >
                <li>Implement server-side pagination for large datasets</li>
                <li>Use URL parameters to maintain pagination state</li>
                <li>Consider virtualization for very long lists</li>
                <li>Debounce rapid page changes if making API calls</li>
                <li>Cache recently viewed pages when possible</li>
              </ul>
            </div>
          </VStack>
        </section>
      </VStack>
    </Container>
  );
};

export default PaginationPage;
