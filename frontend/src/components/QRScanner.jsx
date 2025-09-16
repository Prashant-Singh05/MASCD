import { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'

export default function QRScanner({ onResult }) {
  const [error, setError] = useState(null)
  return (
    <div>
      <Scanner
        onScan={(result) => {
          if (Array.isArray(result) && result[0]?.rawValue) {
            onResult(result[0].rawValue)
          } else if (typeof result === 'string') {
            onResult(result)
          }
        }}
        onError={(err) => setError(err?.message || 'Scan error')}
      />
      {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
    </div>
  )
}
