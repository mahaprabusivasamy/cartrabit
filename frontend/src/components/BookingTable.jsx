// src/components/BookingTable.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingTable = ({ bookings }) => {
  const [roomDetails, setRoomDetails] = useState({});

  useEffect(() => {
    const fetchRoomDetails = async () => {
        try {
          // Fetch room details for each booking
          const roomIds = bookings.map((booking) => booking.room_id);
          const token = localStorage.getItem('x-auth-token'); // Assuming token is stored in localStorage
           
          const roomDetailsResponse = await axios.post(
            'http://127.0.0.1:5000/api/rooms/details',
            { roomIds },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          const roomDetailsMap = {};
          roomDetailsResponse.data.forEach((room) => {
            roomDetailsMap[room._id] = room;
          });
          setRoomDetails(roomDetailsMap);
        } catch (error) {
          console.error('Failed to fetch room details:', error);
        }
      };

    fetchRoomDetails();
  }, [bookings]); // Re-run effect whenever bookings change

  return (
    <div>
      <h2>Bookings</h2>
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
              <td>{roomDetails[booking.room_id]?.roomName || 'Loading...'}</td>
              <td>{booking.customer ? booking.customer.name : 'N/A'}</td>
              <td>{booking.booked_date}</td>
              <td>{booking.stay_duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
