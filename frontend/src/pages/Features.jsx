import FeatureCard from '../components/FeatureCard.jsx'

export default function Features() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Features</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard title="Batch Tracking" description="Track batches through each transfer." />
        <FeatureCard title="Verification" description="Scan QR codes to confirm authenticity." />
        <FeatureCard title="Reports" description="Summaries like expired unsold batches." />
      </div>
    </div>
  )
}
