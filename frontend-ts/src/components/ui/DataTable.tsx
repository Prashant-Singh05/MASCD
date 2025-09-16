import { useMemo, useState } from 'react'

export type Column<T> = { key: keyof T; header: string; render?: (row: T) => React.ReactNode }

export default function DataTable<T extends Record<string, any>>({ data, columns, pageSize = 10 }: { data: T[]; columns: Column<T>[]; pageSize?: number }) {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const filtered = useMemo(() => {
    if (!q) return data
    const k = q.toLowerCase()
    return data.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(k)))
  }, [data, q])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="bg-white rounded-2xl border shadow-soft">
      <div className="p-4 border-b flex items-center justify-between gap-2">
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Search" className="border rounded px-3 py-2 w-full max-w-sm" aria-label="Search table" />
        <div className="text-sm text-gray-600">{filtered.length} results</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              {columns.map((c) => (<th key={String(c.key)} className="px-4 py-3">{c.header}</th>))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={columns.length}>No data</td></tr>
            )}
            {pageData.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                {columns.map((c) => (<td key={String(c.key)} className="px-4 py-3">{c.render ? c.render(row) : String(row[c.key])}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 border-t flex items-center justify-between text-sm">
        <button className="px-3 py-1 rounded border" onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous page">Prev</button>
        <div>Page {page} / {totalPages}</div>
        <button className="px-3 py-1 rounded border" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} aria-label="Next page">Next</button>
      </div>
    </div>
  )
}
