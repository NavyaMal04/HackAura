'use client'
import { User, Award, Package, TrendingUp } from 'lucide-react'

export default function Profile() {
  const user = {
    name: "Eco Warrior",
    email: "ecowarrior@example.com",
    role: "generator",
    joinedDate: "Jan 2024",
    greenPoints: 1240,
    totalListings: 24,
    recycled: 18,
    co2Saved: "245 kg"
  }

  const badges = [
    { icon: "🌱", name: "Green Starter", desc: "First listing" },
    { icon: "♻️", name: "Recycling Hero", desc: "10 items recycled" },
    { icon: "🏆", name: "Top Contributor", desc: "500+ points" },
    { icon: "⭐", name: "Consistent", desc: "7 day streak" }
  ]

  const recentListings = [
    { title: "Plastic Bottles", status: "collected", date: "2 days ago" },
    { title: "Cardboard Boxes", status: "requested", date: "5 days ago" },
    { title: "E-waste Components", status: "listed", date: "1 week ago" }
  ]

  return (
    <div className="min-h-screen bg-black text-white container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md md:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-gray-400 mb-2">{user.email}</p>
            <span className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm font-semibold">
              {user.role}
            </span>
            <p className="text-sm text-gray-500 mt-4">Member since {user.joinedDate}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <StatBox icon={<Award className="w-6 h-6" />} label="Green Points" value={user.greenPoints} color="yellow" />
            <StatBox icon={<Package className="w-6 h-6" />} label="Total Listings" value={user.totalListings} color="blue" />
            <StatBox icon={<Package className="w-6 h-6" />} label="Recycled" value={user.recycled} color="green" />
            <StatBox icon={<TrendingUp className="w-6 h-6" />} label="CO₂ Saved" value={user.co2Saved} color="purple" />
          </div>

          {/* Badges */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">🏅 Badges Earned</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <div className="text-3xl">{badge.icon}</div>
                  <div>
                    <div className="font-semibold text-white">{badge.name}</div>
                    <div className="text-sm text-gray-400">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Recent Listings</h3>
            <div className="space-y-3">
              {recentListings.map((listing, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-semibold text-white">{listing.title}</div>
                    <div className="text-sm text-gray-400">{listing.date}</div>
                  </div>
                  <StatusBadge status={listing.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon, label, value, color }) {
  const colors = {
    yellow: 'bg-yellow-900 text-yellow-400',
    blue: 'bg-blue-900 text-blue-400',
    green: 'bg-green-900 text-green-400',
    purple: 'bg-purple-900 text-purple-400'
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <div className={`${colors[color]} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1 text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

function StatusBadge({ status }) {
  const colors = {
    collected: 'bg-green-900 text-green-400',
    requested: 'bg-blue-900 text-blue-400',
    listed: 'bg-gray-700 text-gray-300'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
      {status}
    </span>
  )
}
