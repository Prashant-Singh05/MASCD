import { useState } from 'react'
import api from '../services/api.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const submit = async () => {
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch (e) {
      setError(e?.response?.data?.error?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-3">
      <h2 className="text-xl font-semibold">Login</h2>
      {error && <div className="text-red-600">{error}</div>}
      <input className="border rounded px-3 py-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>Login</button>
    </div>
  )
}
