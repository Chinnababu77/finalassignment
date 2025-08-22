import React, { useState } from 'react'
import { InputField } from './components/InputField/InputField'
import { DataTable, Column } from './components/DataTable/DataTable'

type User = { id: number; name: string; email: string; role: 'admin'|'editor'|'viewer' }

const initialData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer' },
]

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
]

export default function App() {
  const [value, setValue] = useState('')
  const [rows, setRows] = useState<User[]>(initialData)

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-b from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-950">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Front-End Components Demo</h1>
          <p className="text-gray-600 dark:text-gray-300">InputField and DataTable with React + TS + Tailwind</p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl shadow-soft bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-semibold mb-4">InputField</h2>
            <div className="space-y-4">
              <InputField
                label="Your name"
                placeholder="Type your name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                helperText="Helper text goes here"
                variant="outlined"
                size="md"
              />
              <InputField
                label="Password"
                placeholder="Enter password"
                variant="filled"
                size="md"
                type="password"
                helperText="Toggle to view password"
                passwordToggle
              />
              <InputField
                label="Search"
                placeholder="Search..."
                variant="ghost"
                clearable
                loading
              />
              <InputField
                label="Email"
                placeholder="name@example.com"
                invalid
                errorMessage="Please enter a valid email"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl shadow-soft bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-semibold mb-4">DataTable</h2>
            <DataTable
              data={rows}
              columns={columns}
              selectable
              onRowSelect={(sel) => console.log('Selected rows:', sel)}
            />
          </div>
        </section>
      </div>
    </div>
  )
}