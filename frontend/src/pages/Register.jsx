import { useState } from 'react'
import api from '../services/api.js'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [organization_id, setOrganizationId] = useState('')
  const [error, setError] = useState(null)

  const submit = async () => {
    try {
      const payload = { name, email, password, role }
      if (organization_id) payload.organization_id = Number(organization_id)
      const res = await api.post('/auth/register', payload)
      localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch (e) {
      setError(e?.response?.data?.error?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-3">
      <h2 className="text-xl font-semibold">Register</h2>
      {error && <div className="text-red-600">{error}</div>}
      <input className="border rounded px-3 py-2 w-full" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="border rounded px-3 py-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <select className="border rounded px-3 py-2 w-full" value={role} onChange={e=>setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="manufacturer">Manufacturer</option>
        <option value="distributor">Distributor</option>
        <option value="pharmacy">Pharmacy</option>
      </select>
      <input className="border rounded px-3 py-2 w-full" placeholder="Organization ID (optional)" value={organization_id} onChange={e=>setOrganizationId(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>Register</button>
    </div>
  )
}
