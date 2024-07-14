const Booking = require('../models/Booking');
const Room = require('../models/Room');


// exports.bookRoom= async (req,res)=>{
//   try {
//     const {
//             booking_id,
//             room_id,
//             customer_details,
//             from_date,
//             to_date,
//             adults,
//             kids,
//             amount,
//           } = req.body.bookingData;  

//     const bookings = await Booking.create({
//       booking_id,
//       room_id,
//       customer_details,
//       from_date,
//       to_date,
//       adults,
//       kids,
//       amount
//     });
//     console.log('Booking saved successfully');
//     res.status(200).json({ message: 'Room booked successfully', bookings });
//   } catch (error) {
//     console.error('Failed to save booking:', error);
//     res.status(500).json({ message: 'Failed to book room', error: error.message });
//   }
  
// }

// booking  a room
exports.bookRooms = async (req, res) => {
  try {
    const {
      booking_id,
      room_id,
      customer_details,
      from_date,
      to_date,
      adults,
      kids,
      amount
    } = req.body.bookingData; // Access properties from req.body.bookingData

    console.log(from_date, to_date);
    console.log(room_id, booking_id, customer_details, adults, kids, amount);

    // Convert dates from string to Date objects
    const fromDate = new Date(from_date); // Assuming from_date is a valid date string
    const toDate = new Date(to_date); // Assuming to_date is a valid date string

    // Create a new Booking object using data from req.body
    const newBooking = new Booking({
      booking_id,
      room_id,
      customer_details,
      from_date: fromDate,
      to_date: toDate,
      adults,
      kids,
      amount
    });

    // Save the new booking to the database
    await newBooking.save();

    console.log('Booking saved successfully');
    res.status(200).json({ message: 'Room booked successfully', booking: newBooking });
  } catch (error) {
    console.error('Failed to save booking:', error);
    res.status(500).json({ message: 'Failed to book room', error: error.message });
  }
};

// get booking details of the booked room
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room_id').populate('customer_id');
    res.send(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// based on the from and to date to fetch booked rooms
exports.getBookingsInRange = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const bookings = await Booking.find({
      from_date: { $lte: to },
      to_date: { $gte: from }
    }).populate('room_id');

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


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
