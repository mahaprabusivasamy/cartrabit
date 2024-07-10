// src/pages/AvailableRoomsPage.jsx
import  { useEffect, useState } from 'react';
import { getAvailableRooms } from '../services/room';
import RoomCard from '../components/RoomCard';

const AvailableRoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getAvailableRooms();
        console.log(res)
        setRooms(res);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>
      <div>
        {rooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomsPage;
