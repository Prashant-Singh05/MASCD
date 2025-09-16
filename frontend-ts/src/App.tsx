import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ManufacturerDashboard from './pages/ManufacturerDashboard'
import Batches from './pages/Batches'
import Verify from './pages/Verify'
import Audit from './pages/Audit'
import Settings from './pages/Settings'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<ManufacturerDashboard />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/recalls" element={<div className="p-6"><h1 className="text-2xl font-bold">Recalls</h1></div>} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
