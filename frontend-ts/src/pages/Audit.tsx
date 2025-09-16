import { useMemo, useState } from 'react'

type AuditEntry = { id: string; actor: string; action: string; entity: string; at: string }

const MOCK_AUDIT: AuditEntry[] = [
  { id: '1', actor: 'svc-manufacturing', action: 'CREATE_BATCH', entity: 'B-1003', at: '2025-09-10T10:03:00Z' },
  { id: '2', actor: 'svc-verify', action: 'VERIFY', entity: 'SGTIN:123...', at: '2025-09-10T10:01:12Z' },
  { id: '3', actor: 'svc-distributor', action: 'TRANSFER', entity: 'B-1002', at: '2025-09-10T09:50:22Z' },
]

export default function Audit() {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const k = q.toLowerCase()
    return MOCK_AUDIT.filter((r) => [r.actor, r.action, r.entity].some((s) => s.toLowerCase().includes(k)))
  }, [q])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-gray-600">Immutable activity trail for traceability and compliance.</p>
      </div>

      <div className="card p-4">
        <input className="input max-w-md" placeholder="Filter by actor, action, or entity" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Entity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{new Date(r.at).toLocaleString()}</td>
                <td className="px-4 py-3">{r.actor}</td>
                <td className="px-4 py-3">{r.action}</td>
                <td className="px-4 py-3">{r.entity}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No audit entries</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
