import { useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import "./css/AvailableRoomPage.css"

const AvailableRoomPages = ({ rooms }) => {
  return (
    <div className='roomcontainer'>
      <div className="roomList">
        {rooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomPages;
