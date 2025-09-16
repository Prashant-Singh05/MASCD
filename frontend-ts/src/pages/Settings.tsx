import { useState } from 'react'

export default function Settings() {
  const [form, setForm] = useState({ name: 'Prashant', email: 'user@example.com', password: '' })
  const [role, setRole] = useState<'Manufacturer'|'Distributor'|'Retailer'|'Regulator'>('Manufacturer')
  const [saved, setSaved] = useState(false)

  function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-600">Manage your profile and access level.</p>
      </div>

      {saved && <div className="rounded-md bg-green-50 text-green-800 border border-green-200 px-4 py-2">Saved</div>}

      <section className="card">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Profile</h2>
          <p className="text-sm text-gray-600">Update your personal details.</p>
        </div>
        <form onSubmit={onSave} className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="input" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Password</label>
            <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="button-primary" type="submit">Save</button>
          </div>
        </form>
      </section>

      <section className="card">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Access & Roles</h2>
          <p className="text-sm text-gray-600">Select the role for this account (mock).</p>
        </div>
        <div className="p-4">
          <label className="block text-sm mb-1">Role</label>
          <select className="input" value={role} onChange={(e)=>setRole(e.target.value as any)}>
            <option>Manufacturer</option>
            <option>Distributor</option>
            <option>Retailer</option>
            <option>Regulator</option>
          </select>
        </div>
      </section>
    </div>
  )
}
