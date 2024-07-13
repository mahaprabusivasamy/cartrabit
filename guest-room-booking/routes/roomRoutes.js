const express = require('express');
const router = express.Router();
// for image
const multer = require('multer');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create',upload.array('images'), authMiddleware, roomController.createRoom);
router.get('/available', roomController.getAvailableRooms);
router.get('/owner/:ownerId', authMiddleware, roomController.getOwnerRooms);
router.put('/:roomId', authMiddleware, roomController.updateRoom);
router.post('/details',authMiddleware,roomController.details)
router.delete('/delete/:roomId',authMiddleware,roomController.deleteRoom);
module.exports = router;
