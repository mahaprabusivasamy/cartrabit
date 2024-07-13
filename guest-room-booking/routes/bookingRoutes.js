// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/book', bookingController.bookRooms);
router.get('/', authMiddleware, bookingController.getBookings);
router.get('/owner', authMiddleware, bookingController.getOwnerBookings); // New route for owner bookings
router.get('/:id', bookingController.getCustomerBookings);

module.exports = router;
