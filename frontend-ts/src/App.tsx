import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ManufacturerDashboard from './pages/ManufacturerDashboard'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<ManufacturerDashboard />} />
        <Route path="/batches" element={<div className="p-6"><h1 className="text-2xl font-bold">Batches</h1></div>} />
        <Route path="/verify" element={<div className="p-6"><h1 className="text-2xl font-bold">Verification</h1></div>} />
        <Route path="/recalls" element={<div className="p-6"><h1 className="text-2xl font-bold">Recalls</h1></div>} />
        <Route path="/audit" element={<div className="p-6"><h1 className="text-2xl font-bold">Audit Logs</h1></div>} />
        <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
