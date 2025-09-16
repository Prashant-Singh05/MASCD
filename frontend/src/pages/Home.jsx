import Button from '../components/Button.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import ContactForm from '../components/ContactForm.jsx'

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-b from-blue-50 to-white rounded-lg">
        <h1 className="text-3xl md:text-5xl font-extrabold">Medicine Authenticity & Supply Chain</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Track and verify medicines across the supply chain with simple tools for manufacturers, distributors, pharmacies, and customers.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button>Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </section>

      <section id="features" className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Features</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard title="Batch Tracking" description="Follow each batch from production to sale." />
          <FeatureCard title="QR Verification" description="Quickly verify authenticity by scanning a QR." />
          <FeatureCard title="Role-Based Flows" description="Dashboards for manufacturers, distributors, and pharmacies." />
        </div>
      </section>

      <section id="about" className="space-y-3">
        <h2 className="text-2xl font-bold text-center">About</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center">MASCD is a demo project showcasing a supply chain authenticity workflow. This frontend is fully responsive and ready for API integration.</p>
      </section>

      <section id="contact" className="space-y-3">
        <h2 className="text-2xl font-bold text-center">Contact</h2>
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
