import { useEffect, useState } from 'react';
import { getOwnerRooms } from '../services/room';
import RoomCard from '../components/RoomCard';
import OwnerRoomCard from '../components/OwnerRoomCard';

const OwnerRoomsPage = ({ownerId}) => {
  const [rooms, setRooms] = useState([]);
  // const ownerId = JSON.parse(localStorage.getItem('owner')).id; // Assuming owner ID is stored in localStorage

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getOwnerRooms(ownerId);
        console.log(ownerId);
        console.log(res);
        setRooms(res);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };
    fetchRooms();
  }, [ownerId]);  

  return (
    <div>
      <h2>My Rooms</h2>
      <div className="room-card-container">
        {rooms.map(room => (
         <OwnerRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default OwnerRoomsPage;
