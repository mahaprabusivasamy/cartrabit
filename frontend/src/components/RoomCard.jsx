
import { useState } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../pages/css/Roomcard.css'; 
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const handleBook = async () => {
    
    navigate('/booking', { state: { room } });

  };
  

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length);
  };

  const getBase64ImageSrc = (base64String) => {

    return `data:image/jpeg;base64,${base64String}`;
  };


  // room card to display the rooms
  return (
    <div className="roomCardContainer">
      <div className="room-card">
        <div className="image-slider">
          <img 
            src={getBase64ImageSrc(room.images[currentImageIndex])} 
            alt={`Room ${currentImageIndex + 1}`} 
            className="slider-image" 
          />
          <button className="prev-button" onClick={prevImage}>&#10094;</button>
          <button className="next-button" onClick={nextImage}>&#10095;</button>
        </div>
        <div className="rc_container">
          <div className="room-details">
            <h3 className="roomname">{room.roomName}</h3>
            <p className='location'>{room.location}</p>
            <p className='address'>{room.address}</p>
            <p className='description'>{room.description}</p>
            <p className='minmax'>Min Day: {room.minDay}, Max Day: {room.maxDay}</p>
            <p className='rent'>Rent: {room.rent}</p>
          </div>
          <button className="bookbutton" onClick={handleBook}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
