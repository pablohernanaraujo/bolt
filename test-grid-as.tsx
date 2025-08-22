// Test file to verify Grid 'as' prop TypeScript error is fixed

import { Grid, GridItem } from './src/ui';

// This should now work without TypeScript errors
const TestGridAs = () => (
  <div>
    {/* Test Grid with 'as' prop */}
    <Grid as="section" templateColumns="repeat(2, 1fr)" gap="4">
      <GridItem as="article">Item 1</GridItem>
      <GridItem as="div">Item 2</GridItem>
    </Grid>

    {/* Test Grid with default 'div' */}
    <Grid templateColumns="repeat(3, 1fr)" gap="2">
      <GridItem>Default Item 1</GridItem>
      <GridItem>Default Item 2</GridItem>
    </Grid>

    {/* Test with semantic HTML */}
    <Grid as="main" templateColumns="1fr 2fr" gap="6">
      <GridItem as="aside">Sidebar</GridItem>
      <GridItem as="section">Main Content</GridItem>
    </Grid>
  </div>
);

export default TestGridAs;