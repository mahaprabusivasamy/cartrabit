const Room = require('../models/Room');


// create a new room
exports.createRoom = async (req, res) => {
  const { ownerId, roomName, floorSize, amenities, rent, minDay, maxDay, address, description, location, adults, kids } = req.body;
  let images = [];

  if (req.files) {
    images = req.files.map(file => file.buffer.toString('base64')); // Store images as base64 strings
  }

  try {
    const room = new Room({ ownerId, roomName, floorSize, amenities, rent, minDay, maxDay, images, address, description, location, adults, kids });
    await room.save();
    res.send(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// get available rooms
exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// get each owner rooms
exports.getOwnerRooms = async (req, res) => {
  const { ownerId } = req.params;
  console.log("fetch owner room details");
  try {
    const rooms = await Room.find({ ownerId: ownerId });
    console.log("fetch owner room details");
    res.send(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// update room by owner
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
    // const roomDetails = rooms.map((room) => ({
    //   _id: room._id,
    //   roomName: room.roomName,
    //   // Add more fields as needed
    // }));

    res.status(200).json(rooms);
  } catch (err) {
    console.error('Error fetching room details:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



// delete the room by owner
exports.deleteRoom = async(req,res)=>{
  console.log("not comming");
  const { roomId } = req.params;
  console.log(roomId);
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    console.log(roomId);
    await room.remove();
    res.json({ msg: 'Room removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}