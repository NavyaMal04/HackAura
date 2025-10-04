'use client';
import Image from 'next/image'
import { useState } from 'react'
import { Upload, MapPin, ChevronDown } from 'lucide-react'

export default function AddWaste() {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Plastic',
    quantity: '',
    unit: 'kg',
    location: '',
    description: '',
    image: null
  })

  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Waste listing created successfully! 🎉')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-white">Add Waste Listing</h1>
      <p className="text-gray-300 mb-8">List your recyclable waste for collection</p>

      <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Title *</label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g., Plastic Bottles - 50kg"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-black text-white font-normal focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Type, Quantity, and Unit */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Waste Type */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2">Waste Type *</label>
            <select
              name="type"
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-black text-white font-bold appearance-none pr-10 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Plastic">Plastic</option>
              <option value="E-Waste">E-Waste</option>
              <option value="Paper">Paper</option>
              <option value="Metal">Metal</option>
              <option value="Glass">Glass</option>
              <option value="Organic">Organic</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity *</label>
            <input
              type="number"
              name="quantity"
              required
              placeholder="50"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-black text-white font-normal focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          {/* Unit */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2">Unit *</label>
            <select
              name="unit"
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-black text-white font-bold appearance-none pr-10 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="pieces">pieces</option>
              <option value="liters">liters</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Location *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
            <input
              type="text"
              name="location"
              required
              placeholder="Bangalore, Karnataka"
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-black text-white font-normal focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Additional details about the waste..."
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-black text-white font-normal focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Upload Image</label>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
            {imagePreview ? (
              <div className="relative">
                <Image src={imagePreview} alt="Preview" width={256} height={256} className="max-h-64 mx-auto rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null)
                    setFormData(prev => ({ ...prev, image: null }))
                  }}
                  className="mt-4 text-red-500 hover:text-red-600 font-semibold"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 font-bold transition text-black"
        >
          Create Listing
        </button>
      </form>
    </div>
  )
}
