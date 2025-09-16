import { useState } from 'react'
import api from '../../services/api.js'

export default function Manufacturer() {
  const [form, setForm] = useState({ medicine_id: '', manufacture_date: '', expiry_date: '', quantity_produced: 100 })
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const submit = async () => {
    try {
      setError(null)
      const res = await api.post('/batches', {
        medicine_id: Number(form.medicine_id),
        manufacture_date: form.manufacture_date,
        expiry_date: form.expiry_date,
        quantity_produced: Number(form.quantity_produced)
      })
      setResult(res.data)
    } catch (e) {
      setError(e?.response?.data?.error?.message || 'Failed to create batch')
    }
  }

  return (
    <div className="space-y-3 max-w-lg">
      <h2 className="text-xl font-semibold">Manufacturer Dashboard</h2>
      {error && <div className="text-red-600">{error}</div>}
      <input className="border rounded px-3 py-2 w-full" placeholder="Medicine ID" value={form.medicine_id} onChange={e => setForm({ ...form, medicine_id: e.target.value })} />
      <input type="date" className="border rounded px-3 py-2 w-full" placeholder="Manufacture Date" value={form.manufacture_date} onChange={e => setForm({ ...form, manufacture_date: e.target.value })} />
      <input type="date" className="border rounded px-3 py-2 w-full" placeholder="Expiry Date" value={form.expiry_date} onChange={e => setForm({ ...form, expiry_date: e.target.value })} />
      <input type="number" className="border rounded px-3 py-2 w-full" placeholder="Quantity" value={form.quantity_produced} onChange={e => setForm({ ...form, quantity_produced: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>Create Batch</button>
      {result && (
        <div className="bg-white p-3 rounded border">
          <div className="font-semibold">Batch Code: {result.batch_code}</div>
          {result.qr_data_url && <img src={result.qr_data_url} alt="Batch QR" className="mt-2" />}
        </div>
      )}
    </div>
  )
}
