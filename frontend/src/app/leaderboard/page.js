'use client'
import LeaderboardTable from '@/components/LeaderboardTable'
import { Trophy, TrendingUp, Award, Zap } from 'lucide-react'

export default function Leaderboard() {
  const impactStats = [
    { icon: <Trophy className="w-8 h-8" />, label: "Total Recycled", value: "12,450 kg", color: "yellow" },
    { icon: <TrendingUp className="w-8 h-8" />, label: "CO₂ Saved", value: "8.7 tons", color: "green" },
    { icon: <Award className="w-8 h-8" />, label: "Active Users", value: "1,890", color: "blue" },
    { icon: <Zap className="w-8 h-8" />, label: "This Month", value: "+45%", color: "purple" }
  ]

  const topUsers = [
    { rank: 1, name: "GreenTech Industries", points: 5420, recycled: "1,234 kg", avatar: "🏭" },
    { rank: 2, name: "EcoWarrior", points: 4890, recycled: "987 kg", avatar: "🌱" },
    { rank: 3, name: "RecycleHub", points: 4210, recycled: "856 kg", avatar: "♻️" },
    { rank: 4, name: "SustainableLiving", points: 3750, recycled: "732 kg", avatar: "🌍" },
    { rank: 5, name: "ZeroWasteZone", points: 3420, recycled: "654 kg", avatar: "🌿" },
    { rank: 6, name: "EcoHome", points: 2980, recycled: "543 kg", avatar: "🏡" },
    { rank: 7, name: "GreenFuture", points: 2650, recycled: "478 kg", avatar: "🌳" },
    { rank: 8, name: "CleanEarth", points: 2340, recycled: "421 kg", avatar: "🌏" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Community Leaderboard
        </h1>
        <p className="text-gray-600">Top contributors making a real impact</p>
      </div>

      {/* Impact Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {impactStats.map((stat, index) => (
          <ImpactCard key={index} {...stat} />
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">🏆 Top 3 Champions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topUsers.slice(0, 3).map((user) => (
            <PodiumCard key={user.rank} user={user} />
          ))}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Full Rankings</h2>
        <LeaderboardTable users={topUsers} />
      </div>
    </div>
  )
}

function ImpactCard({ icon, label, value, color }) {
  const colors = {
    yellow: 'text-yellow-500 bg-yellow-50',
    green: 'text-green-500 bg-green-50',
    blue: 'text-blue-500 bg-blue-50',
    purple: 'text-purple-500 bg-purple-50'
  }

  return (
    <div className="card">
      <div className={`${colors[color]} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  )
}

function PodiumCard({ user }) {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
  const heights = { 1: 'md:translate-y-0', 2: 'md:translate-y-4', 3: 'md:translate-y-8' }

  return (
    <div className={`card text-center ${heights[user.rank]} transition-transform`}>
      <div className="text-6xl mb-4">{medals[user.rank]}</div>
      <div className="text-4xl mb-2">{user.avatar}</div>
      <h3 className="text-xl font-bold mb-2">{user.name}</h3>
      <div className="text-3xl font-bold text-green-600 mb-1">{user.points}</div>
      <div className="text-sm text-gray-600">Green Points</div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">Total Recycled</div>
        <div className="font-semibold">{user.recycled}</div>
      </div>
    </div>
  )
}