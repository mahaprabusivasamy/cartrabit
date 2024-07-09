const Booking = require('../models/Booking');
const Room = require('../models/Room');


// exports.bookRoom = async (req, res) => {
//   const { room_id, customer_id, rental_amount, booked_date, stay_duration } = req.body;

//   try {
//     // Check if the room is available
//     const room = await Room.findById(room_id);
//     if (!room) {
//       return res.status(404).json({ msg: 'Room not found' });
//     }
//     if (!room.isAvailable) {
//       return res.status(400).json({ msg: 'Room is not available' });
//     }

//     // Create the booking
//     const booking = new Booking({
//       room_id,
//       customer_id,
//       rental_amount,
//       booked_date: new Date(booked_date),
//       stay_duration,
//       status: 'booked'
//     });
//     await booking.save();

//     // Update the room's availability
//     room.isAvailable = false;
//     await room.save();

//     // Schedule availability update
//     const expiryDate = new Date(booked_date);
//     expiryDate.setDate(expiryDate.getDate() + stay_duration);

//     const timeUntilExpiry = expiryDate.getTime() - new Date().getTime();
//     setTimeout(async () => {
//       await Room.findByIdAndUpdate(room_id, { isAvailable: true });
//       await Booking.findByIdAndUpdate(booking._id, { status: 'available' });
//     }, timeUntilExpiry);

//     res.status(201).json({ msg: 'Booking created successfully', booking });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
exports.bookRoom = async (req, res) => {
  const { room_id, customer_id, rental_amount, booked_date, stay_duration_days } = req.body;

  try {
    // Check if the room is available
    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    if (!room.isAvailable) {
      return res.status(400).json({ msg: 'Room is not available' });
    }

    // Validate stay duration against room's min and max days
    if (stay_duration_days < room.minDay || stay_duration_days > room.maxDay) {
      return res.status(400).json({
        msg: `Stay duration must be between ${room.minDay} and ${room.maxDay} days.`
      });
    }
    console.log('Received booked_date:', booked_date);
    const bookingDate = new Date(booked_date);
    console.log('Parsed booked_date:', bookingDate);
    
    // Create the booking
    try{
    const booking = new Booking({
      room_id,
      customer_id,
      rental_amount,
      booked_date: new Date(booked_date), // Ensure 'booked_date' is properly formatted
      stay_duration: stay_duration_days,
      status: 'booked'
    });
    await booking.save();
    console.log('Booking created:', booking);
  }catch(error){
    console.log('Error creating booking:',error);
    return res.status(400).json({ msg: 'Invalid booking details' });
  }

    // Update the room's availability
    room.isAvailable = false;
    await room.save();
    console.log('Room availability updated to false:', room);

    // Schedule availability update
    const expiryDate = new Date(booked_date);
    expiryDate.setDate(expiryDate.getDate() + stay_duration_days);

    const timeUntilExpiry = expiryDate.getTime() - new Date().getTime();
    console.log('Time until expiry:', timeUntilExpiry);

    setTimeout(async () => {
      const updatedRoom = await Room.findByIdAndUpdate(room_id, { isAvailable: true }, { new: true });
      const updatedBooking = await Booking.findByIdAndUpdate(booking._id, { status: 'available' }, { new: true });
      console.log('Room availability updated to true:', updatedRoom);
      console.log('Booking status updated to available:', updatedBooking);
    }, timeUntilExpiry);

    res.status(201).json({ msg: 'Booking created successfully', booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// exports.bookRoom = async (req, res) => {
//   const { room_id, customer_id, rental_amount, booked_date, stay_duration_minutes } = req.body;

//   try {
//     // Check if the room is available
//     const room = await Room.findById(room_id);
//     if (!room) {
//       return res.status(404).json({ msg: 'Room not found' });
//     }
//     if (!room.isAvailable) {
//       return res.status(400).json({ msg: 'Room is not available' });
//     }

//     // Create the booking
//     const booking = new Booking({
//       room_id,
//       customer_id,
//       rental_amount,
//       booked_date: new Date(booked_date),
//       stay_duration: stay_duration_minutes,
//       status: 'booked'
//     });
//     await booking.save();
//     console.log('Booking created:', booking);

//     // Update the room's availability
//     room.isAvailable = false;
//     await room.save();
//     console.log('Room availability updated to false:', room);

//     // Schedule availability update
//     const expiryDate = new Date(booked_date);
//     expiryDate.setMinutes(expiryDate.getMinutes() + stay_duration_minutes);

//     const timeUntilExpiry = expiryDate.getTime() - Date.now();
//     console.log('Time until expiry (milliseconds):', timeUntilExpiry);

//     setTimeout(async () => {
//       try {
//         const updatedRoom = await Room.findByIdAndUpdate(room_id, { isAvailable: true }, { new: true });
//         const updatedBooking = await Booking.findByIdAndUpdate(booking._id, { status: 'available' }, { new: true });
//         console.log('Room availability updated to true:', updatedRoom);
//         console.log('Booking status updated to available:', updatedBooking);
//       } catch (updateErr) {
//         console.error('Error updating room or booking status:', updateErr.message);
//       }
//     }, timeUntilExpiry);

//     res.status(201).json({ msg: 'Booking created successfully', booking });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room_id').populate('customer_id');
    res.send(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// controllers/bookingController.js
// const Booking = require('../models/Booking');
// const Room = require('../models/Room');

exports.getOwnerBookings = async (req, res) => {
  try {
    const ownerId = req.user.id; // Assuming you have owner id in the JWT token

    // Find all rooms by owner
    const rooms = await Room.find({ owner_id: ownerId });

    // Extract room ids
    const roomIds = rooms.map(room => room._id);

    // Find bookings for those rooms
    const bookings = await Booking.find({ room_id: { $in: roomIds } }).populate('customer_id', 'name email');

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// exports.getCustomerBookings = async (req, res) => {
//   const { id } = req.query; // Assuming you pass customer_id as a query parameter

//   try {
//     const bookings = await Booking.find({customer_id:id});
//     res.json(bookings);
//   } catch (error) {
//     console.error('Error fetching customer bookings:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
// In your controller file (e.g., controllers/booking.js)
exports.getCustomerBookings = async (req, res) => {
  const { customerId } = req.query; // Ensure you use the correct parameter

  try {
    const bookings = await Booking.find({ customer_id: customerId });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching customer bookings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
