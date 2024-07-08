// src/pages/OwnerRoomsPage.js
import React, { useEffect, useState } from 'react';
import { getOwnerRooms, createRoom } from '../services/room';
import RoomCard from '../components/RoomCard';
import RoomForm from '../components/RoomForm';

const OwnerRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getOwnerRooms();
        setRooms(res);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleCreate = () => {
    setCreating(true);
  };

  const handleCreateRoom = async (roomData) => {
    try {
      const newRoom = await createRoom(roomData);
      setRooms([...rooms, newRoom]);
      setCreating(false);
    } catch (error) {
      console.error('Failed to create room:', error);
      alert('Failed to create room. Please try again.');
    }
  };

  return (
    <div>
      <h2>My Rooms</h2>
      <button onClick={handleCreate}>Create Room</button>
      {creating && <RoomForm onSubmit={handleCreateRoom} />}
      <div className="room-list">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} editable />
        ))}
      </div>
    </div>
  );
};

export default OwnerRoomsPage;
