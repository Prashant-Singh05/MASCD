import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold">MASCD</Link>
        <div className="flex gap-4">
          <Link to="/verify" className="text-blue-600">Verify</Link>
          <Link to="/dashboard/manufacturer">Manufacturer</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}
