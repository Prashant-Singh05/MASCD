import { useState } from 'react'
import { Package, Database, AlarmClock } from 'lucide-react'
import { motion } from 'framer-motion'
import KpiCard from '../components/ui/KpiCard'
import DataTable, { Column } from '../components/ui/DataTable'

// Mock batches
type Batch = { id: string; medicine: string; quantity: number; mfg: string; exp: string; status: 'in_production'|'with_distributor'|'with_pharmacy'|'sold' }
const MOCK: Batch[] = [
  { id: 'B-1001', medicine: 'PainAway 200mg', quantity: 1000, mfg: '2024-01-01', exp: '2026-01-01', status: 'in_production' },
  { id: 'B-1002', medicine: 'CoughRelief 10mg', quantity: 500, mfg: '2024-02-15', exp: '2025-12-31', status: 'with_distributor' },
]

export default function ManufacturerDashboard() {
  const [batches, setBatches] = useState<Batch[]>(MOCK)
  const [form, setForm] = useState({ medicineId: '', mfgDate: '', expDate: '', qty: '' })
  const [error, setError] = useState<string | null>(null)
  const columns: Column<Batch>[] = [
    { key: 'id', header: 'Batch ID' },
    { key: 'medicine', header: 'Medicine' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'mfg', header: 'Manufacture Date' },
    { key: 'exp', header: 'Expiry Date' },
    { key: 'status', header: 'Status', render: (r) => <span className="px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">{r.status}</span> },
  ]

  function createBatch(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.medicineId || !form.mfgDate || !form.expDate || !form.qty) {
      setError('All fields are required')
      return
    }
    const qty = Number(form.qty)
    if (!Number.isFinite(qty) || qty <= 0) { setError('Quantity must be a positive number'); return }
    const newBatch: Batch = {
      id: `B-${Math.floor(Math.random()*9000+1000)}`,
      medicine: form.medicineId,
      quantity: qty,
      mfg: form.mfgDate,
      exp: form.expDate,
      status: 'in_production'
    }
    setBatches((b) => [newBatch, ...b])
    setForm({ medicineId: '', mfgDate: '', expDate: '', qty: '' })
    // Simple toast
    alert('Batch created successfully')
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <KpiCard title="Active Batches" value={batches.length} icon={<Package className="w-5 h-5 text-accent-600" />} />
        <KpiCard title="Total Medicines" value={12} icon={<Database className="w-5 h-5 text-accent-600" />} />
        <KpiCard title="Pending Recalls" value={1} icon={<AlarmClock className="w-5 h-5 text-accent-600" />} />
      </div>

      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border shadow-soft">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">Create New Batch</h2>
          <p className="text-sm text-gray-600">Enter batch details. All fields are required.</p>
        </div>
        <form onSubmit={createBatch} className="p-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">Medicine ID</label>
            <input className="w-full border rounded px-3 py-2" placeholder="e.g., PainAway 200mg" value={form.medicineId} onChange={e=>setForm({ ...form, medicineId: e.target.value })} required aria-required />
          </div>
          <div>
            <label className="block text-sm mb-1">Manufacture Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={form.mfgDate} onChange={e=>setForm({ ...form, mfgDate: e.target.value })} required aria-required />
          </div>
          <div>
            <label className="block text-sm mb-1">Expiry Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={form.expDate} onChange={e=>setForm({ ...form, expDate: e.target.value })} required aria-required />
          </div>
          <div>
            <label className="block text-sm mb-1">Quantity</label>
            <input type="number" min={1} className="w-full border rounded px-3 py-2" value={form.qty} onChange={e=>setForm({ ...form, qty: e.target.value })} required aria-required />
          </div>
          <div className="md:col-span-2 lg:col-span-4 flex items-center justify-between">
            {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
            <button type="submit" className="ml-auto bg-accent-600 hover:bg-accent-700 text-white px-5 py-2.5 rounded-md font-medium">Create Batch</button>
          </div>
        </form>
      </motion.section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Recent Batches</h2>
        <DataTable data={batches} columns={columns} pageSize={5} />
      </section>
    </div>
  )
}
