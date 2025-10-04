'use client'
import { useState } from 'react'
import StatsCard from '@/components/StatsCard'
import { 
  Recycle, TrendingUp, Award, Package, 
  MapPin, Clock, CheckCircle, AlertCircle,
  ChevronRight, Calendar, Zap
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('week')

  // Mock user data
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

  // Recent waste listings
  const recentWaste = [
    {
      id: 1,
      title: "Plastic Bottles - 50kg",
      type: "Plastic",
      status: "collected",
      date: "2 hours ago",
      location: "Bangalore, Karnataka",
      points: 50
    },
    {
      id: 2,
      title: "Electronic Components",
      type: "E-Waste",
      status: "requested",
      date: "5 hours ago",
      location: "Mumbai, Maharashtra",
      points: 80
    },
    {
      id: 3,
      title: "Cardboard Boxes - 100kg",
      type: "Paper",
      status: "listed",
      date: "1 day ago",
      location: "Delhi, NCR",
      points: 30
    }
  ]

  // Activity timeline
  const activities = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Waste Collected",
      description: "Your plastic bottles were collected by EcoRecycle",
      time: "2 hours ago",
      points: "+50 points"
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-blue-500" />,
      title: "New Request",
      description: "GreenTech requested your electronic components",
      time: "5 hours ago",
      points: ""
    },
    {
      icon: <Award className="w-5 h-5 text-yellow-500" />,
      title: "Badge Earned!",
      description: "You earned 'Recycling Hero' badge",
      time: "1 day ago",
      points: "+100 points"
    },
    {
      icon: <Package className="w-5 h-5 text-purple-500" />,
      title: "New Listing",
      description: "You listed cardboard boxes",
      time: "1 day ago",
      points: ""
    }
  ]

  // Impact stats for chart
  const impactData = {
    week: [
      { day: 'Mon', waste: 12, co2: 8 },
      { day: 'Tue', waste: 19, co2: 12 },
      { day: 'Wed', waste: 15, co2: 10 },
      { day: 'Thu', waste: 25, co2: 16 },
      { day: 'Fri', waste: 22, co2: 14 },
      { day: 'Sat', waste: 30, co2: 20 },
      { day: 'Sun', waste: 28, co2: 18 }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-gray-600">Here is your sustainability impact today</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            icon={<Package className="w-8 h-8" />}
            title="Total Listings"
            value={userData.totalListings}
            color="blue"
          />
          <StatsCard 
            icon={<Recycle className="w-8 h-8" />}
            title="Recycled"
            value={userData.recycled}
            color="green"
          />
          <StatsCard 
            icon={<Award className="w-8 h-8" />}
            title="Green Points"
            value={userData.greenPoints.toLocaleString()}
            color="yellow"
          />
          <StatsCard 
            icon={<TrendingUp className="w-8 h-8" />}
            title="CO₂ Saved"
            value={`${userData.co2Saved} kg`}
            color="purple"
          />
        </div>

        {/* Streak & Rank Banner */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Current Streak</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{userData.streak} Days</p>
                <p className="text-orange-100">Keep it up! 🔥</p>
              </div>
              <div className="text-6xl">🔥</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Leaderboard Rank</h3>
                </div>
                <p className="text-3xl font-bold mb-1">#{userData.rank}</p>
                <p className="text-purple-100">Top 1% in your city! 🏆</p>
              </div>
              <div className="text-6xl">🏆</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  href="/add-waste" 
                  className="group bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl p-6 transition-all hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Package className="w-8 h-8" />
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Add New Waste</h3>
                  <p className="text-green-100 text-sm">List recyclable materials</p>
                </Link>

                <Link 
                  href="/marketplace" 
                  className="group bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl p-6 transition-all hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Recycle className="w-8 h-8" />
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Browse Marketplace</h3>
                  <p className="text-blue-100 text-sm">Find waste near you</p>
                </Link>

                <Link 
                  href="/leaderboard" 
                  className="group bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl p-6 transition-all hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Award className="w-8 h-8" />
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">View Leaderboard</h3>
                  <p className="text-purple-100 text-sm">Check your ranking</p>
                </Link>

                <Link 
                  href="/profile" 
                  className="group bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl p-6 transition-all hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="w-8 h-8" />
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">My Profile</h3>
                  <p className="text-orange-100 text-sm">View your stats</p>
                </Link>
              </div>
            </div>

            {/* Recent Listings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Package className="w-6 h-6 text-blue-500" />
                  Recent Listings
                </h2>
                <Link href="/marketplace" className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentWaste.map((waste) => (
                  <WasteListingCard key={waste.id} waste={waste} />
                ))}
              </div>
            </div>

            {/* Impact Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  Your Impact This Week
                </h2>
                <select 
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Chart will be displayed here</p>
                  <p className="text-sm text-gray-500">Install recharts to visualize your impact</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Stats */}
          <div className="space-y-6">
            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-800 mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        {activity.points && (
                          <span className="text-xs font-semibold text-green-600">
                            {activity.points}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Latest Badges
              </h2>
              <div className="space-y-3">
                <BadgeItem emoji="🌱" name="Green Starter" />
                <BadgeItem emoji="♻️" name="Recycling Hero" />
                <BadgeItem emoji="🏆" name="Top Contributor" />
              </div>
              <Link href="/profile" className="mt-4 block text-center bg-white/20 hover:bg-white/30 py-2 rounded-lg font-semibold transition">
                View All Badges
              </Link>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-3">💡 Sustainability Tip</h2>
              <p className="text-green-50 mb-4">
                Separate your waste at source! It makes recycling 3x more efficient and reduces contamination.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WasteListingCard({ waste }) {
  const statusConfig = {
    collected: { color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-4 h-4" /> },
    requested: { color: 'bg-blue-100 text-blue-700', icon: <AlertCircle className="w-4 h-4" /> },
    listed: { color: 'bg-gray-100 text-gray-700', icon: <Package className="w-4 h-4" /> }
  }

  const config = statusConfig[waste.status]

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
      <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{waste.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {waste.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {waste.date}
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-xs font-semibold ${config.color} px-2 py-1 rounded-full`}>
          {waste.status}
        </div>
        {waste.points && (
          <div className="text-xs text-green-600 font-semibold mt-1">
            +{waste.points} pts
          </div>
        )}
      </div>
    </div>
  )
}

function BadgeItem({ emoji, name }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
      <div className="text-3xl">{emoji}</div>
      <div className="font-semibold">{name}</div>
    </div>
  )
}