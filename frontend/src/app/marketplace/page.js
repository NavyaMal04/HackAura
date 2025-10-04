'use client'
import { useState } from 'react'
import WasteCard from '@/components/WasteCard'
import { Search, Filter } from 'lucide-react'

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Mock data - replace with API call
  const wasteItems = [
    {
      id: 1,
      title: "Plastic Bottles - 50kg",
      type: "Plastic",
      quantity: 50,
      unit: "kg",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400",
      status: "listed",
      user: "EcoHome",
      createdAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Electronic Components",
      type: "E-Waste",
      quantity: 25,
      unit: "kg",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400",
      status: "listed",
      user: "TechCorp",
      createdAt: "5 hours ago"
    },
    {
      id: 3,
      title: "Cardboard Boxes",
      type: "Paper",
      quantity: 100,
      unit: "kg",
      location: "Delhi, NCR",
      image: "https://images.unsplash.com/photo-1594583388647-364ea6532257?w=400",
      status: "requested",
      user: "RetailStore",
      createdAt: "1 day ago"
    },
    {
      id: 4,
      title: "Metal Scraps - Aluminum",
      type: "Metal",
      quantity: 75,
      unit: "kg",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
      status: "listed",
      user: "MetalWorks",
      createdAt: "3 days ago"
    }
  ]

  const wasteTypes = ['all', 'Plastic', 'E-Waste', 'Paper', 'Metal', 'Glass', 'Organic']

  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Waste Marketplace</h1>
        <p className="text-gray-600">Browse and connect with waste generators</p>
      </div>

      {/* Search and Filter */}
      <div className="card mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {wasteTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredItems.length} results
      </div>

      {/* Waste Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <WasteCard key={item.id} waste={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}