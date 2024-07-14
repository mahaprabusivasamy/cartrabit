const mongoose = require('mongoose');
const { Schema } = mongoose;


// booking shema
const bookingSchema = new Schema({
  booking_id: { type: String, required: true },
  room_id: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  customer_details: {
    name: { type: String, required: true},
    email: { type: String , required: true},
    phone: { type: String , required: true},
    address: { type: String , required: true}
  },
  from_date: { type: Date , required: true},
  to_date: { type: Date, required: true},
  adults: { type: Number, required: true},
  kids: { type: Number, required: true },
  amount: { type: Number, required: true}
});

module.exports = mongoose.model('Booking', bookingSchema);
