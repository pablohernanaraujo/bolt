// /src/app/test-input-group/page.tsx
// Test page for InputGroup components demonstration
// Shows various input group configurations with addons and elements
// RELEVANT FILES: ../../ui/input-group/index.tsx, ../../ui/input/index.tsx

'use client';

import { Eye, EyeOff, Lock, Search } from 'lucide-react';
import { ReactNode, useState } from 'react';

import {
  Container,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  InputWithClear,
  VStack,
} from '@/ui';

export default function TestInputGroupPage(): ReactNode {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <VStack space="8" style={{ padding: '2rem' }}>
        <h1>Input Group Components Test</h1>

        {/* Basic with left addon */}
        <div>
          <h3>URL Input with Addons</h3>
          <InputGroup>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="mywebsite" />
            <InputRightAddon>.com</InputRightAddon>
          </InputGroup>
        </div>

        {/* Currency input */}
        <div>
          <h3>Currency Input</h3>
          <InputGroup>
            <InputLeftAddon>$</InputLeftAddon>
            <Input placeholder="0.00" type="number" />
            <InputRightAddon>USD</InputRightAddon>
          </InputGroup>
        </div>

        {/* Search with icon */}
        <div>
          <h3>Search Input with Icon</h3>
          <InputGroup>
            <InputLeftElement>
              <Search size={16} />
            </InputLeftElement>
            <Input placeholder="Search..." />
          </InputGroup>
        </div>

        {/* Email with clear */}
        <div>
          <h3>Clearable Email Input</h3>
          <InputWithClear
            placeholder="john.doe@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClear={() => setEmail('')}
          />
        </div>

        {/* Password with toggle */}
        <div>
          <h3>Password with Visibility Toggle</h3>
          <InputGroup>
            <InputLeftElement>
              <Lock size={16} />
            </InputLeftElement>
            <Input
              placeholder="Enter password"
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
        </div>

        {/* Different sizes */}
        <div>
          <h3>Different Sizes</h3>
          <VStack space="3">
            <InputGroup size="small">
              <InputLeftAddon>Small</InputLeftAddon>
              <Input placeholder="Small input" />
            </InputGroup>

            <InputGroup size="medium">
              <InputLeftAddon>Medium</InputLeftAddon>
              <Input placeholder="Medium input" />
            </InputGroup>

            <InputGroup size="large">
              <InputLeftAddon>Large</InputLeftAddon>
              <Input placeholder="Large input" />
            </InputGroup>
          </VStack>
        </div>

        {/* Different variants */}
        <div>
          <h3>Different Variants</h3>
          <VStack space="3">
            <InputGroup variant="outline">
              <InputLeftAddon>Outline</InputLeftAddon>
              <Input placeholder="Outline variant" />
            </InputGroup>

            <InputGroup variant="filled">
              <InputLeftAddon>Filled</InputLeftAddon>
              <Input placeholder="Filled variant" />
            </InputGroup>
          </VStack>
        </div>
      </VStack>
    </Container>
  );
}
