const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// room schema
const roomSchema = new Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomName: { type: String, required: true },
  floorSize: { type: String, required: true },
  amenities: { type: [String], required: true },
  rent: { type: Number, required: true },
  minDay: { type: Number, required: true },
  maxDay: { type: Number, required: true },
  images: { type: [String], required: true },
  isAvailable: { type: Boolean, default: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  adults: { type: Number, required: true },
  kids: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);