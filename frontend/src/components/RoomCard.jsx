// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { bookRoom } from '../services/booking';

// const RoomCard = ({ room }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleBook = async () => {
//     if (!startDate || !endDate) {
//       alert('Please select both start and end dates.');
//       return;
//     }

//     // Calculate duration in days
//     const stayDurationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

//     // Validate duration against room's minDay and maxDay
//     if (stayDurationDays < room.minDay || stayDurationDays > room.maxDay) {
//       alert(`Stay duration must be between ${room.minDay} and ${room.maxDay} days.`);
//       return;
//     }

//     try {
//       await bookRoom(room._id, startDate, stayDurationDays);
//       alert('Room booked successfully');
//     } catch (error) {
//       console.error('Failed to book room:', error);
//       alert('Failed to book room');
//     }
//   };

//   return (
//     <div>
//       <h3>{room.roomName}</h3>
//       <p>{room.floorSize} sqft</p>
//       <p>Amenities: {room.amenities.join(', ')}</p>
//       <p>Rent: ${room.rent}</p>
//       <div>
//         <label>From Date:</label>
//         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//       </div>
//       <div>
//         <label>To Date:</label>
//         <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
//       </div>
//       <button onClick={handleBook}>Book</button>
//     </div>
//   );
// };

// export default RoomCard;
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bookRoom } from '../services/booking';
import '../pages/css/Roomcard.css'; // Import the CSS file for styles

const RoomCard = ({ room }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBook = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const stayDurationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    if (stayDurationDays < room.minDay || stayDurationDays > room.maxDay) {
      alert(`Stay duration must be between ${room.minDay} and ${room.maxDay} days.`);
      return;
    }

    try {
      await bookRoom(room._id, startDate, stayDurationDays);
      alert('Room booked successfully');
    } catch (error) {
      console.error('Failed to book room:', error);
      alert('Failed to book room');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="room-card">
      <div className="image-slider">
        <img src={room.images[currentImageIndex]} alt={`Room ${currentImageIndex + 1}`} className="slider-image" />
        <button className="prev-button" onClick={prevImage}>&#10094;</button>
        <button className="next-button" onClick={nextImage}>&#10095;</button>
      </div>
      <div className="room-details">
        <h3 className="room-name">{room.roomName}</h3>
        <p>{room.floorSize}</p>
        <p>Amenities: {room.amenities.join(', ')}</p>
        <p>Rent: ${room.rent}</p>
        <p>Min Day: {room.minDay}, Max Day: {room.maxDay}</p>
      </div>
      <div className="date-picker-container">
        <div className="date-picker">
          <label>From Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div className="date-picker">
          <label>To Date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
      </div>
      <button className="book-button" onClick={handleBook}>Book</button>
    </div>
  );
};

export default RoomCard;
