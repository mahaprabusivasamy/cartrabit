
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bookRoom } from '../services/booking';
import '../pages/css/Roomcard.css'; // Import the CSS file for styles
import { useNavigation } from 'react-router-dom';

const RoomCard = ({ room }) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 

  const handleBook = async () => {
    // if (!startDate || !endDate) {
    //   alert('Please select both start and end dates.');
    //   return;
    // }
  
    // const stayDurationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // if (stayDurationDays < room.minDay || stayDurationDays > room.maxDay) {
    //   alert(`Stay duration must be between ${room.minDay} and ${room.maxDay} days.`);
    //   return;
    // }

    // try {
    //   await bookRoom(room._id, startDate, stayDurationDays);
    //   alert('Room booked successfully');
    // } catch (error) {
    //   console.error('Failed to book room:', error);
    //   alert('F=ailed to book room');
    // }
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
            <p className='description'>{room.description}</p>
            <p className='minmax'>Min Day: {room.minDay}, Max Day: {room.maxDay}</p>
            <p className='rent'>Rent: {room.rent}</p>
          </div>
          <button className="bookbutton" onClick={handleBook()}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
