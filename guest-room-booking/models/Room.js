const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  roomName: {
    type: String,
    required: true
  },
  floorSize: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  minDay: {
    type: Number,
    required: true
  },
  maxDay: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
