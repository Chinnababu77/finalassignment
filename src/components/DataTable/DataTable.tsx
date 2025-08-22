import React from 'react'
import { clsx } from 'clsx'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  emptyText?: string
}

type SortState<T> = { key: keyof T | null; order: 'asc'|'desc'|null }

export function DataTable<T extends { [k: string]: any; id?: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  emptyText = 'No data'
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>({ key: null, order: null })
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  const sorted = React.useMemo(() => {
    if (!sort.key || !sort.order) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const va = a[sort.key!]
      const vb = b[sort.key!]
      if (va === vb) return 0
      if (va == null) return -1
      if (vb == null) return 1
      if (va > vb) return sort.order === 'asc' ? 1 : -1
      return sort.order === 'asc' ? -1 : 1
    })
    return copy
  }, [data, sort])

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return
    const key = col.dataIndex as keyof T
    setSort(s => {
      if (s.key !== key) return { key, order: 'asc' }
      if (s.order === 'asc') return { key, order: 'desc' }
      return { key: null, order: null }
    })
  }

  const allChecked = selectable && data.length > 0 && selected.size === data.length
  const indeterminate = selectable && selected.size > 0 && selected.size < data.length

  const updateSelection = (rowIndex: number | 'all') => {
    if (!selectable) return
    const next = new Set(selected)
    if (rowIndex === 'all') {
      if (selected.size === data.length) next.clear()
      else data.forEach((_, i) => next.add(i))
    } if (next.has(rowIndex)) {
 	 next.delete(rowIndex);
	} else {
  	next.add(rowIndex);
	}

    setSelected(next)
    onRowSelect?.(Array.from(next).map(i => sorted[i]))
  }

  return (
    <div className="relative border rounded-2xl overflow-hidden">
      <div className={clsx('absolute inset-0 bg-white/50 dark:bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center', !loading && 'hidden')} aria-hidden={!loading}>
        <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-transparent rounded-full" role="status" aria-label="Loading"></div>
      </div>
      <table className="w-full border-collapse text-sm md:text-base">
        <thead className="bg-gray-50 dark:bg-zinc-800">
          <tr>
            {selectable && (
              <th className="p-3 text-left w-10">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={!!allChecked}
                  ref={el => { if (el) el.indeterminate = !!indeterminate as any }}
                  onChange={() => updateSelection('all')}
                />
              </th>
            )}
            {columns.map(col => (
              <th key={col.key} className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 select-none">
                <button
                  className={clsx('inline-flex items-center gap-1', col.sortable && 'hover:underline')}
                  onClick={() => toggleSort(col)}
                  aria-sort={sort.key === col.dataIndex ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  {col.title}
                  {col.sortable && (
                    <span aria-hidden className="text-xs">
                      {sort.key === col.dataIndex ? (sort.order === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && !loading && (
            <tr>
              <td className="p-6 text-center text-gray-500" colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyText}
              </td>
            </tr>
          )}
          {sorted.map((row, i) => (
            <tr key={(row.id ?? i) as React.Key} className="odd:bg-white even:bg-gray-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800">
              {selectable && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${i+1}`}
                    checked={selected.has(i)}
                    onChange={() => updateSelection(i)}
                  />
                </td>
              )}
              {columns.map(col => (
                <td key={col.key} className="p-3">
                  {col.render ? col.render(row[col.dataIndex], row) : String(row[col.dataIndex] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
