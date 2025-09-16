import { Bell } from 'lucide-react'

export default function TopNav({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between gap-3 p-3 lg:p-4">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded hover:bg-gray-100" onClick={onMenu} aria-label="Open menu">
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </button>
          <div className="font-extrabold tracking-tight">MASCD</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-100" aria-label="Notifications"><Bell className="w-5 h-5" /></button>
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="inline-block w-6 h-6 rounded-full bg-accent-500" aria-hidden></span>
              <span className="text-sm font-medium">You</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
