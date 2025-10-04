import mongoose from 'mongoose'

const WasteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  type: {
    type: String,
    enum: ['Plastic', 'E-Waste', 'Paper', 'Metal', 'Glass', 'Organic'],
    required: [true, 'Please select a waste type'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
  },
  unit: {
    type: String,
    enum: ['kg', 'ton', 'pieces', 'liters'],
    default: 'kg',
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ['listed', 'requested', 'collected'],
    default: 'listed',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt field on save
WasteSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.models.Waste || mongoose.model('Waste', WasteSchema)