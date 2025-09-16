import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

export default function KpiCard({ title, value, icon }: { title: string; value: number; icon?: ReactNode }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const duration = 600
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setDisplay(Math.round(value * p))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-soft border">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600">{title}</div>
        {icon}
      </div>
      <div className="text-3xl font-extrabold tracking-tight">{display.toLocaleString()}</div>
    </motion.div>
  )
}
