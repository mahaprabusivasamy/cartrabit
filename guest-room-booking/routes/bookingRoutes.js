const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/book', authMiddleware, bookingController.bookRoom);
router.get('/', authMiddleware, bookingController.getBookings);

module.exports = router;
