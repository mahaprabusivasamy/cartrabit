// src/components/BookingTable.jsx
import React, { useEffect, useState } from 'react';
import { getRoomDetails } from '../services/room';
import "../pages/css/bookingTable.css"
const BookingTable = ({ bookings, customer }) => {
  const [roomDetails, setRoomDetails] = useState({});

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomIds = bookings.map((booking) => booking.room_id);
        const roomDetailsResponse = await getRoomDetails(roomIds);
        console.log(roomDetailsResponse);
        
        // Map room details by room ID
        const roomDetailsMap = {};
        roomDetailsResponse.forEach((room) => {
          roomDetailsMap[room._id] = room;
        });

        setRoomDetails(roomDetailsMap);
      } catch (error) {
        console.error('Failed to fetch room details:', error);
      }
    };

    if (bookings.length > 0) {
      fetchRoomDetails();
    }
  }, [bookings]);

  return (
    <div>
      {/* <h2>Bookings</h2> */}
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Customer Name</th>
            <th>Booked Date</th>
            <th>Duration (days)</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td data-label="Room Name">{roomDetails[booking.room_id]?.roomName || 'Loading...'}</td>
              <td data-label="Customer Name">{customer.name}</td>
              <td data-label="Booked Date">{booking.booked_date}</td>
              <td data-label="Duration (days)">{booking.stay_duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
