import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, ScanLine, AlarmClock, ScrollText, Settings } from 'lucide-react'

export default function Sidebar({ variant = 'side', onNavigate }: { variant?: 'side'|'bottom', onNavigate?: () => void }) {
  const link = ({ isActive }: { isActive: boolean }) => `flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-4 py-3 ${isActive ? 'text-accent-700 font-semibold' : 'text-gray-600 hover:text-accent-700'}`
  const items = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/batches', label: 'Batches', icon: Package },
    { to: '/verify', label: 'Verification', icon: ScanLine },
    { to: '/recalls', label: 'Recalls', icon: AlarmClock },
    { to: '/audit', label: 'Audit Logs', icon: ScrollText },
    { to: '/settings', label: 'Settings', icon: Settings }
  ]
  return (
    <div className={variant==='bottom' ? 'grid grid-cols-5' : ''}>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className={link} onClick={onNavigate} aria-label={label}>
          <Icon className="w-5 h-5" />
          <span className="text-sm hidden lg:inline">{label}</span>
        </NavLink>
      ))}
    </div>
  )
}
