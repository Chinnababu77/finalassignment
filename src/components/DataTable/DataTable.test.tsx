import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DataTable, Column } from './DataTable'

type Row = { id: number; name: string; value: number }
const rows: Row[] = [
  { id: 1, name: 'B', value: 2 },
  { id: 2, name: 'A', value: 1 },
]
const columns: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'value', title: 'Value', dataIndex: 'value', sortable: true },
]

test('sorts by column when header clicked', () => {
  render(<DataTable<Row> data={rows} columns={columns} />)
  const headers = screen.getAllByRole('button', { name: /Name|Value/ })
  fireEvent.click(headers[0]) // sort asc by Name
  const body = screen.getAllByRole('row')
  const firstDataRow = body[1]
  expect(within(firstDataRow).getByText('A')).toBeInTheDocument()
})

test('selects rows when selectable', () => {
  render(<DataTable<Row> data={rows} columns={columns} selectable />)
  const checkboxes = screen.getAllByRole('checkbox')
  fireEvent.click(checkboxes[1]) // first row checkbox
  expect((checkboxes[1] as HTMLInputElement).checked).toBe(true)
})