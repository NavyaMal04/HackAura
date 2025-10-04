'use client'
import { useState } from 'react'
import { 
  Recycle, TrendingUp, Award, Package, 
  MapPin, Clock, CheckCircle, AlertCircle,
  ChevronRight, Zap
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('week')

  const userData = {
    name: "Eco Warrior",
    totalListings: 24,
    recycled: 18,
    pending: 6,
    greenPoints: 1240,
    co2Saved: 245,
    rank: 15,
    streak: 7
  }

  const recentWaste = [
    { id: 1, title: "Plastic Bottles - 50kg", type: "Plastic", status: "collected", date: "2 hours ago", location: "Bangalore, Karnataka", points: 50 },
    { id: 2, title: "Electronic Components", type: "E-Waste", status: "requested", date: "5 hours ago", location: "Mumbai, Maharashtra", points: 80 },
    { id: 3, title: "Cardboard Boxes - 100kg", type: "Paper", status: "listed", date: "1 day ago", location: "Delhi, NCR", points: 30 }
  ]

  const activities = [
    { icon: <CheckCircle className="w-5 h-5 text-green-500" />, title: "Waste Collected", description: "Your plastic bottles were collected by EcoRecycle", time: "2 hours ago", points: "+50 points" },
    { icon: <AlertCircle className="w-5 h-5 text-blue-500" />, title: "New Request", description: "GreenTech requested your electronic components", time: "5 hours ago", points: "" },
    { icon: <Award className="w-5 h-5 text-yellow-500" />, title: "Badge Earned!", description: "You earned 'Recycling Hero' badge", time: "1 day ago", points: "+100 points" },
    { icon: <Package className="w-5 h-5 text-purple-500" />, title: "New Listing", description: "You listed cardboard boxes", time: "1 day ago", points: "" }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {userData.name}! 👋</h1>
          <p className="text-gray-400">Here is your sustainability impact today</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center">
            <Package className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-3xl font-extrabold text-white">{userData.totalListings}</p>
            <p className="text-sm font-semibold text-gray-300 mt-1">Total Listings</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center">
            <Recycle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <p className="text-3xl font-extrabold text-white">{userData.recycled}</p>
            <p className="text-sm font-semibold text-gray-300 mt-1">Recycled</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-3xl font-extrabold text-white">{userData.greenPoints.toLocaleString()}</p>
            <p className="text-sm font-semibold text-gray-300 mt-1">Green Points</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center">
            <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <p className="text-3xl font-extrabold text-white">{userData.co2Saved} kg</p>
            <p className="text-sm font-semibold text-gray-300 mt-1">CO₂ Saved</p>
          </div>
        </div>

        {/* Streak & Rank Banner */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-orange-700 to-pink-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold">Current Streak</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{userData.streak} Days</p>
                <p className="text-orange-200">Keep it up! 🔥</p>
              </div>
              <div className="text-6xl">🔥</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold">Leaderboard Rank</h3>
                </div>
                <p className="text-3xl font-bold mb-1">#{userData.rank}</p>
                <p className="text-purple-200">Top 1% in your city! 🏆</p>
              </div>
              <div className="text-6xl">🏆</div>
            </div>
          </div>
        </div>

        {/* Left & Right Columns */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { href: "/add-waste", icon: Package, title: "Add New Waste", subtitle: "List recyclable materials", from: "green-500", to: "emerald-600" },
                  { href: "/marketplace", icon: Recycle, title: "Browse Marketplace", subtitle: "Find waste near you", from: "blue-500", to: "cyan-600" },
                  { href: "/leaderboard", icon: Award, title: "View Leaderboard", subtitle: "Check your ranking", from: "purple-500", to: "pink-600" },
                  { href: "/profile", icon: TrendingUp, title: "My Profile", subtitle: "View your stats", from: "orange-500", to: "red-600" }
                ].map((action, idx) => (
                  <Link key={idx} href={action.href} className={`group bg-gradient-to-br from-${action.from} to-${action.to} hover:from-${action.from}-600 hover:to-${action.to}-700 text-white rounded-xl p-6 transition-all hover:shadow-xl`}>
                    <div className="flex items-center justify-between mb-3">
                      <action.icon className="w-8 h-8" />
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Listings */}
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Package className="w-6 h-6 text-blue-400" />
                  Recent Listings
                </h2>
                <Link href="/marketplace" className="text-green-400 hover:text-green-500 font-semibold text-sm flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentWaste.map((waste) => (
                  <WasteListingCard key={waste.id} waste={waste} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Activity Timeline */}
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-white mb-1">{activity.title}</h4>
                      <p className="text-xs text-gray-400 mb-1">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        {activity.points && <span className="text-xs font-semibold text-green-500">{activity.points}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Waste Listing Card
function WasteListingCard({ waste }) {
  const statusConfig = {
    collected: { color: 'bg-green-600 text-green-200', icon: <CheckCircle className="w-4 h-4" /> },
    requested: { color: 'bg-blue-600 text-blue-200', icon: <AlertCircle className="w-4 h-4" /> },
    listed: { color: 'bg-gray-700 text-gray-200', icon: <Package className="w-4 h-4" /> }
  }
  const config = statusConfig[waste.status]
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
      <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>{config.icon}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white mb-1 truncate">{waste.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{waste.location}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{waste.date}</span>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-xs font-semibold ${config.color} px-2 py-1 rounded-full`}>{waste.status}</div>
        {waste.points && <div className="text-xs text-green-500 font-semibold mt-1">+{waste.points} pts</div>}
      </div>
    </div>
  )
}
