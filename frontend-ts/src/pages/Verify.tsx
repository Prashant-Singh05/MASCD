import { useState } from 'react'

export default function Verify() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<null | { valid: boolean; medicine: string; batchId: string; status: string }>(null)
  const [loading, setLoading] = useState(false)

  function onVerify(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      if (!code) { setResult({ valid: false, medicine: '', batchId: '', status: 'invalid' }); setLoading(false); return }
      const ok = code.toLowerCase().includes('b-') || code.toLowerCase().includes('sgtin')
      setResult(ok ? { valid: true, medicine: 'PainAway 200mg', batchId: 'B-1001', status: 'with_pharmacy' } : { valid: false, medicine: '', batchId: '', status: 'invalid' })
      setLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Verification</h1>
        <p className="text-gray-600">Scan or enter an SGTIN/QR code to verify product authenticity.</p>
      </div>

      <form onSubmit={onVerify} className="card p-4 flex items-center gap-3">
        <input className="input" placeholder="Enter SGTIN or scan QR" value={code} onChange={(e) => setCode(e.target.value)} aria-label="Verification code" />
        <button className="button-primary" disabled={loading}>{loading ? 'Verifying…' : 'Verify'}</button>
      </form>

      {result && (
        <div className={`card p-5 ${result.valid ? 'border-green-200' : 'border-red-200'}`}>
          {result.valid ? (
            <div>
              <div className="text-green-700 font-semibold mb-2">Authentic</div>
              <div className="grid md:grid-cols-3 gap-2 text-sm">
                <div><span className="text-gray-500">Medicine:</span> {result.medicine}</div>
                <div><span className="text-gray-500">Batch:</span> {result.batchId}</div>
                <div><span className="text-gray-500">Status:</span> {result.status}</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-red-700 font-semibold mb-2">Not Found</div>
              <p className="text-sm text-gray-600">The code you entered is invalid or not registered.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
