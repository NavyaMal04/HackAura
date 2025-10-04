import StatsCard from '@/components/StatsCard'
import { Recycle, TrendingUp, Award, Package } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          icon={<Package className="w-8 h-8" />}
          title="Total Listings"
          value="24"
          color="blue"
        />
        <StatsCard 
          icon={<Recycle className="w-8 h-8" />}
          title="Recycled"
          value="18"
          color="green"
        />
        <StatsCard 
          icon={<Award className="w-8 h-8" />}
          title="Green Points"
          value="1,240"
          color="yellow"
        />
        <StatsCard 
          icon={<TrendingUp className="w-8 h-8" />}
          title="CO₂ Saved"
          value="245 kg"
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/add-waste" className="block w-full btn-primary text-center">
              ➕ Add New Waste Listing
            </Link>
            <Link href="/marketplace" className="block w-full border-2 border-green-500 text-green-600 font-semibold py-2 px-6 rounded-lg text-center hover:bg-green-50 transition">
              🛒 Browse Marketplace
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            <ActivityItem status="collected" text="Plastic bottles collected by EcoRecycle" />
            <ActivityItem status="requested" text="Metal scraps requested by GreenTech" />
            <ActivityItem status="listed" text="You listed E-waste components" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ status, text }) {
  const colors = {
    collected: 'bg-green-100 text-green-700',
    requested: 'bg-blue-100 text-blue-700',
    listed: 'bg-gray-100 text-gray-700'
  }
  
  return (
    <div className="flex items-center gap-3">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
        {status}
      </span>
      <span className="text-gray-600">{text}</span>
    </div>
  )
}