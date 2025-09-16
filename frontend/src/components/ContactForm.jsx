import { useState } from 'react'
import Button from './Button.jsx'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <form onSubmit={submit} className="space-y-3 max-w-xl">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input className="w-full border rounded px-3 py-2" value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })} placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm mb-1">Message</label>
        <textarea className="w-full border rounded px-3 py-2" rows={4} value={form.message} onChange={e=>setForm({ ...form, message: e.target.value })} placeholder="How can we help?" />
      </div>
      <Button type="submit">Send</Button>
      {sent && <div className="text-green-600 text-sm">Thanks! We will get back to you.</div>}
    </form>
  )
}
