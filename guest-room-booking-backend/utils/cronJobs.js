// const cron = require('node-cron');
// const Booking = require('../models/Booking');
// const Room = require('../models/Room');

// cron.schedule('0 0 * * *', async () => {
//   const bookings = await Booking.find({ status: 'booked' });
//   const currentDate = new Date();

//   bookings.forEach(async booking => {
//     const expiryDate = new Date(booking.booked_date);
//     expiryDate.setDate(expiryDate.getDate() + booking.stay_duration);

//     if (currentDate > expiryDate) {
//       await Room.findByIdAndUpdate(booking.room_id, { is_available: true });
//       await Booking.findByIdAndUpdate(booking._id, { status: 'available' });
//     }
//   });
// });
