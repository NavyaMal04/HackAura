'use client'
import { MapPin, Package, Calendar, User } from 'lucide-react'
import Image from 'next/image'

export default function WasteCard({ waste }) {
  const statusColors = {
    listed: 'bg-green-100 text-green-700',
    requested: 'bg-blue-100 text-blue-700',
    collected: 'bg-gray-100 text-gray-700'
  }

  const typeColors = {
    Plastic: 'bg-blue-500',
    'E-Waste': 'bg-purple-500',
    Paper: 'bg-yellow-500',
    Metal: 'bg-gray-500',
    Glass: 'bg-cyan-500',
    Organic: 'bg-green-500'
  }

  return (
    <div className="card hover:shadow-xl transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative h-48 -m-6 mb-4 rounded-t-lg overflow-hidden">
        <img
          src={waste.image}
          alt={waste.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[waste.status]}`}>
            {waste.status}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`${typeColors[waste.type]} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
            {waste.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 line-clamp-1">{waste.title}</h3>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          <span>{waste.quantity} {waste.unit}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{waste.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{waste.user}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{waste.createdAt}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {waste.status === 'listed' && (
          <>
            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition">
              Request
            </button>
            <button className="px-4 border-2 border-green-500 text-green-600 hover:bg-green-50 py-2 rounded-lg font-semibold transition">
              View
            </button>
          </>
        )}
        {waste.status === 'requested' && (
          <button className="w-full border-2 border-blue-500 text-blue-600 py-2 rounded-lg font-semibold">
            View Details
          </button>
        )}
        {waste.status === 'collected' && (
          <button className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg font-semibold cursor-not-allowed">
            Collected
          </button>
        )}
      </div>
    </div>
  )
}