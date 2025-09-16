import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) => `px-3 py-2 rounded ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
  return (
    <nav className="border-b bg-white sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">MASCD</Link>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>
        <div className="hidden md:flex gap-2 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/features" className={linkClass}>Features</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-2 flex flex-col">
            <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={linkClass}>About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/features" className={linkClass}>Features</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className={linkClass}>Contact</NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}
