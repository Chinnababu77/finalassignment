import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from '../src/components/DataTable/DataTable';

type User = { id: number; name: string; email: string; role: 'admin'|'editor'|'viewer' }

const data: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer' },
]

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
]

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  render: (args) => <DataTable<User> {...args} />,
  parameters: { controls: { expanded: true } },
}
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Basic: Story = {
  args: {
    data,
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data,
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};