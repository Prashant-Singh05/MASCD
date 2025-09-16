import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] lg:grid-rows-1 lg:grid-cols-[260px,1fr]">
      <aside className={`bg-white border-r z-30 fixed lg:static inset-y-0 left-0 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0`}>
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>
      <div className="lg:col-start-2 flex flex-col">
        <TopNav onMenu={() => setSidebarOpen((v) => !v)} />
        <main className="p-4 lg:p-6 bg-gray-50 flex-1">{children}</main>
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t">
          <Sidebar variant="bottom" onNavigate={() => setSidebarOpen(false)} />
        </nav>
      </div>
    </div>
  )
}
