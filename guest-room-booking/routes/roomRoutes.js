const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, roomController.createRoom);
router.get('/available', roomController.getAvailableRooms);
router.get('/owner/:ownerId', authMiddleware, roomController.getOwnerRooms);
router.put('/:roomId', authMiddleware, roomController.updateRoom);

module.exports = router;
