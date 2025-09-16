export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-3">{icon || '⭐'}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
