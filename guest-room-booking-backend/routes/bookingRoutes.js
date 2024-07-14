// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');


// routes for booking

// book a room
router.post('/book', bookingController.bookRooms);


router.get('/', authMiddleware, bookingController.getBookings);
router.get('/owner', authMiddleware, bookingController.getOwnerBookings); 
router.get('/:id', bookingController.getCustomerBookings);
router.post('/bookings-in-range',bookingController.getBookingsInRange)
module.exports = router;
