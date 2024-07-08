const Room = require('../models/Room');

// exports.createRoom = async (req, res) => {
//   const { owner_id, room_name, floor_size, amenities, min_days, max_days, images } = req.body;
//   try {
//     const room = new Room({ owner_id, room_name, floor_size, amenities, min_days, max_days, images });
//     await room.save();
//     res.send(room);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
// const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const { ownerId, roomName, floorSize, amenities, rent, minDay, maxDay, images } = req.body;

  try {
    const room = new Room({ ownerId, roomName, floorSize, amenities, rent, minDay, maxDay, images });
    await room.save();
    res.send(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ is_available: true });
    res.send(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getOwnerRooms = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const rooms = await Room.find({ owner_id: ownerId });
    res.send(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const updateData = req.body;
  try {
    const room = await Room.findByIdAndUpdate(roomId, updateData, { new: true });
    res.send(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.details = async (req, res) => {
  const roomIds = req.body.roomIds; // Array of room IDs from request body

  try {
    // Find rooms by IDs
    const rooms = await Room.find({ _id: { $in: roomIds } });

    // Map room details as needed (simplified here for roomName)
    const roomDetails = rooms.map((room) => ({
      _id: room._id,
      roomName: room.roomName,
      // Add more fields as needed
    }));

    res.status(200).json(roomDetails);
  } catch (err) {
    console.error('Error fetching room details:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
