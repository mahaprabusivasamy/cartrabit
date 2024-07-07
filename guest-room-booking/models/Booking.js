const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  room_id: { type: Schema.Types.ObjectId, ref: 'Room' },
  customer_id: { type: Schema.Types.ObjectId, ref: 'User' },
  rental_amount: Number,
  booked_date: Date,
  stay_duration: Number,
  status: { type: String, enum: ['booked', 'available'], default: 'booked' }
});

module.exports = mongoose.model('Booking', bookingSchema);
