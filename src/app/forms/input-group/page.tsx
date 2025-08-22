// /src/app/forms/input-group/page.tsx
// Documentation page for InputGroup components
// Shows all InputGroup features with examples and code
// RELEVANT FILES: ../../../ui/input-group/index.tsx, ../../../ui/input/index.tsx

'use client';

import { type FC, useState } from 'react';
import {
  Check,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Phone,
  Search,
  X,
} from 'lucide-react';

import {
  Body1,
  Code,
  Container,
  Divider,
  H1,
  H2,
  H3,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  InputWithClear,
  VStack,
} from '@/ui';

const InputGroupPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [website, setWebsite] = useState('');
  const [amount, setAmount] = useState('');
  const [search, setSearch] = useState('');

  return (
    <Container>
      <VStack space="8">
        <div>
          <H1>InputGroup Components</H1>
          <Body1>
            InputGroup allows you to add addons and elements to inputs for
            enhanced functionality and visual clarity.
          </Body1>
        </div>

        <Divider />

        {/* Left Addons */}
        <section>
          <H2>Left Addons</H2>
          <Body1>Static elements that extend the input on the left side.</Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input placeholder="mywebsite" />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input placeholder="0.00" type="number" />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>+1</InputLeftAddon>
              <Input placeholder="(555) 123-4567" type="tel" />
            </InputGroup>
          </VStack>

          <Code>
            {`<InputGroup>
  <InputLeftAddon>https://</InputLeftAddon>
  <Input placeholder="mywebsite" />
</InputGroup>`}
          </Code>
        </section>

        <Divider />

        {/* Right Addons */}
        <section>
          <H2>Right Addons</H2>
          <Body1>
            Static elements that extend the input on the right side.
          </Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup>
              <Input placeholder="mywebsite" />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>

            <InputGroup>
              <Input placeholder="100" type="number" />
              <InputRightAddon>USD</InputRightAddon>
            </InputGroup>

            <InputGroup>
              <Input placeholder="john.doe" />
              <InputRightAddon>@example.com</InputRightAddon>
            </InputGroup>
          </VStack>

          <Code>
            {`<InputGroup>
  <Input placeholder="mywebsite" />
  <InputRightAddon>.com</InputRightAddon>
</InputGroup>`}
          </Code>
        </section>

        <Divider />

        {/* Both Addons */}
        <section>
          <H2>Both Addons</H2>
          <Body1>Combine left and right addons for complete context.</Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                placeholder="mywebsite"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                placeholder="0.00"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <InputRightAddon>USD</InputRightAddon>
            </InputGroup>
          </VStack>

          <Code>
            {`<InputGroup>
  <InputLeftAddon>https://</InputLeftAddon>
  <Input placeholder="mywebsite" />
  <InputRightAddon>.com</InputRightAddon>
</InputGroup>`}
          </Code>
        </section>

        <Divider />

        {/* Left Elements */}
        <section>
          <H2>Left Elements</H2>
          <Body1>
            Overlay elements positioned inside the input on the left.
          </Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup>
              <InputLeftElement>
                <Search size={16} />
              </InputLeftElement>
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <Mail size={16} />
              </InputLeftElement>
              <Input placeholder="Email address" type="email" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <Phone size={16} />
              </InputLeftElement>
              <Input placeholder="Phone number" type="tel" />
            </InputGroup>
          </VStack>

          <Code>
            {`<InputGroup>
  <InputLeftElement>
    <Search size={16} />
  </InputLeftElement>
  <Input placeholder="Search..." />
</InputGroup>`}
          </Code>
        </section>

        <Divider />

        {/* Right Elements */}
        <section>
          <H2>Right Elements</H2>
          <Body1>
            Overlay elements positioned inside the input on the right. Can be
            interactive.
          </Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup>
              <Input placeholder="Enter amount" type="number" />
              <InputRightElement>
                <DollarSign size={16} />
              </InputRightElement>
            </InputGroup>

            <InputGroup>
              <Input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement isInteractive>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </InputRightElement>
            </InputGroup>

            <InputGroup>
              <Input
                placeholder="Verification complete"
                defaultValue="Verified"
              />
              <InputRightElement>
                <Check size={16} style={{ color: 'green' }} />
              </InputRightElement>
            </InputGroup>
          </VStack>

          <Code>
            {`<InputGroup>
  <Input type={showPassword ? 'text' : 'password'} />
  <InputRightElement isInteractive>
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  </InputRightElement>
</InputGroup>`}
          </Code>
        </section>

        <Divider />

        {/* Clearable Input */}
        <section>
          <H2>Clearable Input</H2>
          <Body1>Input with built-in clear button functionality.</Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputWithClear
              placeholder="Type something to see clear button..."
              onClear={() => console.log('Cleared!')}
            />

            <InputWithClear
              placeholder="Controlled input with clear"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClear={() => setEmail('')}
            />

            <InputWithClear
              placeholder="Custom clear icon"
              defaultValue="Default value"
              clearIcon={<X size={14} />}
            />
          </VStack>

          <Code>
            {`<InputWithClear
  placeholder="Type to see clear button..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue('')}
/>`}
          </Code>
        </section>

        <Divider />

        {/* Complex Combinations */}
        <section>
          <H2>Complex Combinations</H2>
          <Body1>Combine multiple features for advanced use cases.</Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup>
              <InputLeftElement>
                <Search size={16} />
              </InputLeftElement>
              <Input placeholder="Search websites..." />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>
                <Globe size={16} />
              </InputLeftAddon>
              <Input placeholder="example.com" />
              <InputRightElement isInteractive>
                <button type="button" aria-label="Verify domain">
                  <Check size={16} />
                </button>
              </InputRightElement>
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <Lock size={16} />
              </InputLeftElement>
              <Input placeholder="Secure input" type="password" />
              <InputRightAddon>
                <Lock size={14} />
              </InputRightAddon>
            </InputGroup>
          </VStack>
        </section>

        <Divider />

        {/* Sizes */}
        <section>
          <H2>Sizes</H2>
          <Body1>
            InputGroup supports three sizes that apply to all children.
          </Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup size="small">
              <InputLeftAddon>Small</InputLeftAddon>
              <Input placeholder="Small input group" />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>

            <InputGroup size="medium">
              <InputLeftAddon>Medium</InputLeftAddon>
              <Input placeholder="Medium input group" />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>

            <InputGroup size="large">
              <InputLeftAddon>Large</InputLeftAddon>
              <Input placeholder="Large input group" />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>
          </VStack>
        </section>

        <Divider />

        {/* Variants */}
        <section>
          <H2>Variants</H2>
          <Body1>Different visual styles for the input group.</Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup variant="outline">
              <InputLeftAddon>Outline</InputLeftAddon>
              <Input placeholder="Outline variant" />
              <InputRightAddon>Style</InputRightAddon>
            </InputGroup>

            <InputGroup variant="filled">
              <InputLeftAddon>Filled</InputLeftAddon>
              <Input placeholder="Filled variant" />
              <InputRightAddon>Style</InputRightAddon>
            </InputGroup>
          </VStack>
        </section>

        <Divider />

        {/* States */}
        <section>
          <H2>States</H2>
          <Body1>Different states for the input group.</Body1>

          <VStack space="4" style={{ marginTop: '1.5rem' }}>
            <InputGroup>
              <InputLeftAddon>Normal</InputLeftAddon>
              <Input placeholder="Normal state" />
            </InputGroup>

            <InputGroup isDisabled>
              <InputLeftAddon>Disabled</InputLeftAddon>
              <Input placeholder="Disabled state" />
            </InputGroup>

            <InputGroup hasError>
              <InputLeftAddon>Error</InputLeftAddon>
              <Input placeholder="Error state" />
            </InputGroup>
          </VStack>
        </section>
      </VStack>
    </Container>
  );
};

export default InputGroupPage;
