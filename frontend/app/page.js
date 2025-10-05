'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Package, Leaf, Award, TrendingUp, Camera, Users, RefreshCw } from 'lucide-react';
import { getItems, postItem, claimItem } from '@/lib/api';

export default function WasteExchangeApp() {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    estimatedWeight: ''
  });
  
  const [userStats] = useState({
    itemsRecycled: 47,
    kgRecycled: 156,
    co2Saved: 234,
    rank: 12,
    badges: ['🌱 Eco Starter', '♻️ Recycling Hero']
  });

  const categories = ['All', 'Plastic', 'E-Waste', 'Paper', 'Clothes', 'Metal'];

  useEffect(() => {
    loadItems();
  }, [selectedCategory]);

  const loadItems = async () => {
    setLoading(true);
    const filters = selectedCategory !== 'All' ? { category: selectedCategory } : {};
    const result = await getItems(filters);
    
    if (result.success) {
      setItems(result.items);
    }
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePostSubmit = async () => {
    if (!formData.title || !formData.category || !formData.description || !formData.location) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    const result = await postItem({
      ...formData,
      postedBy: 'user123',
      postedByName: 'You'
    });

    if (result.success) {
      alert('Item posted successfully! 🎉');
      setFormData({ title: '', category: '', description: '', location: '', estimatedWeight: '' });
      setActiveTab('browse');
      loadItems();
    } else {
      alert('Error posting item: ' + result.error);
    }
    setLoading(false);
  };

  const handleClaimItem = async (itemId) => {
    setLoading(true);
    const result = await claimItem(itemId, 'user456', 'Anonymous Claimer');
    
    if (result.success) {
      alert('Item claimed! The poster will contact you soon. 📞');
      loadItems();
    } else {
      alert('Error claiming item: ' + result.error);
    }
    setLoading(false);
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Plastic': '🍾',
      'E-Waste': '💻',
      'Paper': '📦',
      'Clothes': '👕',
      'Metal': '🔩'
    };
    return emojis[category] || '📦';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    try {
      const date = new Date(timestamp._seconds * 1000);
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  const renderBrowse = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-white hover:bg-green-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={loadItems}
          disabled={loading}
          className="ml-2 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 font-medium">No items found</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to post recyclable items!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
              <div className="flex gap-4">
                <div className="text-5xl">{getCategoryEmoji(item.category)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-1">
                        {item.category}
                      </span>
                    </div>
                    {item.status === 'claimed' && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                        Claimed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {item.location}
                    </div>
                    {item.estimatedWeight > 0 && (
                      <div className="flex items-center gap-1">
                        <Leaf size={16} className="text-green-600" />
                        {item.estimatedWeight} kg • {item.estimatedImpact?.toFixed(1)} kg CO₂ saved
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">
                      Posted by {item.postedByName} • {formatDate(item.createdAt)}
                    </span>
                    {item.status === 'available' && (
                      <button 
                        onClick={() => handleClaimItem(item.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium disabled:opacity-50"
                      >
                        Claim Item
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPost = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Post Recyclable Item</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Item Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., Old Laptop"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select 
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="Plastic">Plastic</option>
            <option value="E-Waste">E-Waste</option>
            <option value="Paper">Paper</option>
            <option value="Clothes">Clothes</option>
            <option value="Metal">Metal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe the item's condition, quantity, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Your area/landmark"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Estimated Weight (kg)</label>
          <input
            type="number"
            value={formData.estimatedWeight}
            onChange={(e) => handleInputChange('estimatedWeight', e.target.value)}
            placeholder="e.g., 5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Photos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition cursor-pointer">
            <Camera size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB (Coming soon)</p>
          </div>
        </div>

        <button
          onClick={handlePostSubmit}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Item'}
        </button>
      </div>
    </div>
  );

  const renderImpact = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Package size={20} />
            <span className="text-sm opacity-90">Items Recycled</span>
          </div>
          <div className="text-3xl font-bold">{userStats.itemsRecycled}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} />
            <span className="text-sm opacity-90">Total Weight</span>
          </div>
          <div className="text-3xl font-bold">{userStats.kgRecycled} kg</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Leaf size={20} />
            <span className="text-sm opacity-90">CO₂ Saved</span>
          </div>
          <div className="text-3xl font-bold">{userStats.co2Saved} kg</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} />
            <span className="text-sm opacity-90">Your Rank</span>
          </div>
          <div className="text-3xl font-bold">#{userStats.rank}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" />
          Your Badges
        </h3>
        <div className="flex flex-wrap gap-3">
          {userStats.badges.map((badge, idx) => (
            <div key={idx} className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full text-sm font-medium">
              {badge}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Users className="text-green-600" />
          Community Leaderboard
        </h3>
        <div className="space-y-3">
          {[
            { name: 'EcoWarrior123', items: 234, rank: 1 },
            { name: 'GreenChamp', items: 189, rank: 2 },
            { name: 'RecycleKing', items: 167, rank: 3 },
            { name: 'You', items: userStats.itemsRecycled, rank: userStats.rank, highlight: true }
          ].map((user, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3 rounded-lg ${
                user.highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg w-8">#{user.rank}</span>
                <span className={user.highlight ? 'font-semibold' : ''}>{user.name}</span>
              </div>
              <span className="text-sm text-gray-600">{user.items} items</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Leaf size={28} />
            Open Waste Exchange
          </h1>
          <p className="text-green-100 text-sm mt-1">Community-driven recycling marketplace</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex">
          {[
            { id: 'browse', label: 'Browse Items', icon: Package },
            { id: 'post', label: 'Post Item', icon: Camera },
            { id: 'impact', label: 'My Impact', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition ${
                activeTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {activeTab === 'browse' && renderBrowse()}
        {activeTab === 'post' && renderPost()}
        {activeTab === 'impact' && renderImpact()}
      </div>
    </div>
  );
}