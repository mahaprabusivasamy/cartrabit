import { useEffect, useState } from 'react';
import { getOwnerRooms } from '../services/room';
import RoomCard from '../components/RoomCard';
import OwnerRoomCard from '../components/OwnerRoomCard';
import "../pages/css/Room.css"

const OwnerRoomsPage = ({ownerId}) => {
  const [rooms, setRooms] = useState([]);
  
// fetch owner rooms
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

  // owner rooms
  return (
    <div>
      <h2 className='title'>My Rooms</h2>
      <div className="room-card-container">
        {rooms.map(room => (
         <OwnerRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default OwnerRoomsPage;
