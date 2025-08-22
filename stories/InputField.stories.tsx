import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '../src/components/InputField/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'text' },
  },
  parameters: { controls: { expanded: true } },
}
export default meta;
type Story = StoryObj<typeof InputField>;

export const Basic: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    helperText: 'We will never share your email.',
    variant: 'outlined',
    size: 'md',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    invalid: true,
    errorMessage: 'Please enter a valid email',
  },
};

export const WithPasswordToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    passwordToggle: true,
    variant: 'filled',
  },
};

export const Loading: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type...',
    loading: true,
    clearable: true,
    variant: 'ghost',
  },
};