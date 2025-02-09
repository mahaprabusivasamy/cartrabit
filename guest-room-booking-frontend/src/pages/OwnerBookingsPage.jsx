// src/pages/OwnerBookingsPage.jsx
import  { useEffect, useState } from 'react';
import { getOwnerBookings } from '../services/booking';
import BookingTable from '../components/BookingTable';

const OwnerBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getOwnerBookings();
        setBookings(res);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  // booking details of the owner 
  return (
    <div>
      <h2>Bookings</h2>
      <BookingTable bookings={bookings} />
    </div>
  );
};

export default OwnerBookingsPage;
