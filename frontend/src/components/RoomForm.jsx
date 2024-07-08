// src/components/RoomForm.js
import React, { useState } from 'react';
import { createRoom } from '../services/room';

const RoomForm = ({ room, onClose }) => {
  const [roomData, setRoomData] = useState(
    room || {
      roomName: '',
      floorSize: '',
      amenities: [],
      rent: 0,
      minDay: 1,
      maxDay: 20,
      images: [],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRoom(roomData);
      alert('Room created successfully!');
      if (onClose) onClose();
    } catch (error) {
      console.error('Failed to create room:', error);
      alert('Failed to create room. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  return (
    <div>
      <h2>{room ? 'Edit Room' : 'Create New Room'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="roomName" placeholder="Room Name" value={roomData.roomName} onChange={handleChange} required />
        <input type="text" name="floorSize" placeholder="Floor Size" value={roomData.floorSize} onChange={handleChange} required />
        <input type="number" name="rent" placeholder="Rent" value={roomData.rent} onChange={handleChange} required />
        <textarea name="amenities" placeholder="Amenities (comma-separated)" value={roomData.amenities.join(',')} onChange={handleChange} required />
        <input type="number" name="minDay" placeholder="Minimum Days" value={roomData.minDay} onChange={handleChange} required />
        <input type="number" name="maxDay" placeholder="Maximum Days" value={roomData.maxDay} onChange={handleChange} required />
        <input type="text" name="images" placeholder="Image URLs (comma-separated)" value={roomData.images.join(',')} onChange={handleChange} required />
        <button type="submit">{room ? 'Update Room' : 'Create Room'}</button>
      </form>
    </div>
  );
};

export default RoomForm;
