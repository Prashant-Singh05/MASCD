import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Verify = lazy(() => import('./pages/Verify'))
const Items = lazy(() => import('./pages/Items'))
const Batches = lazy(() => import('./pages/Batches'))
const Recalls = lazy(() => import('./pages/Recalls'))
const Partners = lazy(() => import('./pages/Partners'))
const Audit = lazy(() => import('./pages/Audit'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/items" element={<Items />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/recalls" element={<Recalls />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}
