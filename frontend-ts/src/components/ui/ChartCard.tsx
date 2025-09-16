import { ReactNode } from 'react'

export default function ChartCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="card">
      <div className="p-4 border-b">
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="p-2 md:p-4">{children}</div>
    </section>
  )
}
