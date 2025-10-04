import Link from 'next/link'
import { Recycle, TrendingUp, Award, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            ♻️ Transform Waste into Worth
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with recyclers, earn green points, and contribute to a sustainable future
          </p>
          <div className="flex gap-4 justify-center">
  <Link href="/auth/signup" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
    Get Started
  </Link>
  <Link href="/marketplace" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
    Browse Marketplace
  </Link>
</div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Recycle className="w-12 h-12 text-green-500" />}
            title="List Your Waste"
            description="Upload details about recyclable materials"
          />
          <FeatureCard 
            icon={<MapPin className="w-12 h-12 text-blue-500" />}
            title="Get Connected"
            description="Recyclers find your listings nearby"
          />
          <FeatureCard 
            icon={<TrendingUp className="w-12 h-12 text-purple-500" />}
            title="Track Impact"
            description="Monitor your environmental contribution"
          />
          <FeatureCard 
            icon={<Award className="w-12 h-12 text-yellow-500" />}
            title="Earn Rewards"
            description="Collect green points and badges"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard number="5,234" label="kg Waste Recycled" />
            <StatCard number="1,890" label="Active Users" />
            <StatCard number="12.4T" label="CO₂ Saved" />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="card text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatCard({ number, label }) {
  return (
    <div>
      <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}