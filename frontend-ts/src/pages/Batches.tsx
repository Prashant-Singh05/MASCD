import DataTable, { Column } from '../components/ui/DataTable'
import { useMemo } from 'react'

export type BatchRow = { id: string; medicine: string; quantity: number; mfg: string; exp: string; status: string }

const MOCK_BATCHES: BatchRow[] = [
  { id: 'B-1003', medicine: 'AllergyEase 5mg', quantity: 1200, mfg: '2024-03-10', exp: '2026-03-09', status: 'with_pharmacy' },
  { id: 'B-1002', medicine: 'CoughRelief 10mg', quantity: 500, mfg: '2024-02-15', exp: '2025-12-31', status: 'with_distributor' },
  { id: 'B-1001', medicine: 'PainAway 200mg', quantity: 1000, mfg: '2024-01-01', exp: '2026-01-01', status: 'in_production' },
]

export default function Batches() {
  const columns: Column<BatchRow>[] = useMemo(() => ([
    { key: 'id', header: 'Batch ID' },
    { key: 'medicine', header: 'Medicine' },
    { key: 'quantity', header: 'Qty' },
    { key: 'mfg', header: 'MFG' },
    { key: 'exp', header: 'EXP' },
    { key: 'status', header: 'Status', render: (r) => <span className="badge">{r.status}</span> },
  ]), [])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Batches</h1>
        <p className="text-gray-600">Manage manufacturing batches with quick search and filters.</p>
      </div>
      <DataTable data={MOCK_BATCHES} columns={columns} pageSize={8} />
    </div>
  )
}
