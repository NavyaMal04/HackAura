'use client'
import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

// --- WasteCard Component ---
function WasteCard({ waste }) {
  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 flex flex-col overflow-hidden border border-gray-700">
      {/* Waste Image */}
      {waste.image && (
        <div className="relative w-full h-48">
          <img src={waste.image} alt={waste.title} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1 truncate">{waste.title}</h3>
        <p className="text-sm text-gray-300 mb-1 truncate">{waste.location}</p>
        <p className="text-sm text-gray-300 mb-2">{waste.quantity} {waste.unit} • {waste.type}</p>

        {/* Status & User */}
        <div className="mt-auto flex justify-between items-center">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            waste.status === 'listed' ? 'bg-green-600 text-black' : 'bg-gray-600 text-white'
          }`}>
            {waste.status === 'listed' ? 'Available' : 'Requested'}
          </span>
          <span className="text-xs text-gray-400">{waste.user}</span>
        </div>
      </div>
    </div>
  )
}

// --- Marketplace Page ---
export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Mock data
  const wasteItems = [
    { id: 1, title: "Plastic Bottles - 50kg", type: "Plastic", quantity: 50, unit: "kg", location: "Bangalore, Karnataka", image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400", status: "listed", user: "EcoHome" },
    { id: 2, title: "Electronic Components", type: "E-Waste", quantity: 25, unit: "kg", location: "Mumbai, Maharashtra", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400", status: "listed", user: "TechCorp" },
    { id: 3, title: "Cardboard Boxes", type: "Paper", quantity: 100, unit: "kg", location: "Delhi, NCR", image: "https://images.unsplash.com/photo-1594583388647-364ea6532257?w=400", status: "requested", user: "RetailStore" },
    { id: 4, title: "Metal Scraps - Aluminum", type: "Metal", quantity: 75, unit: "kg", location: "Bangalore, Karnataka", image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400", status: "listed", user: "MetalWorks" }
  ]

  const wasteTypes = ['all', 'Plastic', 'E-Waste', 'Paper', 'Metal', 'Glass', 'Organic']

  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container mx-auto px-4 py-8 bg-black min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Waste Marketplace</h1>
        <p className="text-gray-400">Browse and connect with waste generators</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-gray-900 p-4 md:p-6 rounded-xl shadow-md mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white font-semibold focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white font-semibold focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {wasteTypes.map(type => (
                <option key={type} value={type} className="bg-gray-800 text-white font-semibold">
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-400 text-sm">
        Showing {filteredItems.length} result{filteredItems.length !== 1 && 's'}
      </div>

      {/* Waste Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <WasteCard key={item.id} waste={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-white">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
