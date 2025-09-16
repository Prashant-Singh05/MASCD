import { useState } from 'react'
import api from '../services/api.js'
import QRScanner from '../components/QRScanner.jsx'
import BatchCard from '../components/BatchCard.jsx'

export default function Verify() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleVerify = async (value) => {
    const batch_code = value ?? code
    if (!batch_code) return
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/verify', { batch_code })
      setResult(res.data)
    } catch (e) {
      setError(e?.response?.data?.error?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const onScan = (text) => {
    // If QR contains a URL with batch_code param, try to parse
    try {
      if (text.includes('batch_code=')) {
        const url = new URL(text)
        const bc = url.searchParams.get('batch_code')
        if (bc) {
          setCode(bc)
          handleVerify(bc)
          return
        }
      }
    } catch {}
    setCode(text)
    handleVerify(text)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Verify Batch</h2>
        <div className="flex gap-2">
          <input className="border rounded px-3 py-2 w-full" placeholder="Enter batch code" value={code} onChange={e => setCode(e.target.value)} />
          <button className="bg-blue-600 text-white px-4 rounded" onClick={() => handleVerify()}>Verify</button>
        </div>
        <div className="mt-4">
          <QRScanner onResult={onScan} />
        </div>
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {result && (
          <div className="space-y-3">
            <div className="font-semibold">Result: {result.result}</div>
            {result.batch && <BatchCard batch={result.batch} />}
            <div>
              <div className="font-semibold mb-1">History (preview)</div>
              <ul className="list-disc pl-5 text-sm">
                {(result.history_preview || []).map((h) => (
                  <li key={h.id}>{new Date(h.timestamp).toLocaleString()} — to_org_id: {h.to_org_id ?? 'N/A'} {h.note ? `— ${h.note}` : ''}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
