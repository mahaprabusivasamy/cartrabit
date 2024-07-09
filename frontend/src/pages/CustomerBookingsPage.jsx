// src/pages/CustomerBookingsPage.jsx
import React, { useEffect, useState } from 'react';
import { getCustomerBookings } from '../services/booking';
import BookingTable from '../components/BookingTable';

const CustomerBookingsPage = ({ customer }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    console.log('Customer:', customer); // Ensure this logs the correct customer
    const fetchBookings = async () => {
      try {
        const res = await getCustomerBookings(customer); // Assuming this function returns bookings
        setBookings(res);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };
    fetchBookings();
  }, [customer]);

  console.log(bookings)

  return (
    <div>
      <h2>Your Bookings</h2>
      <BookingTable bookings={bookings} customer={customer}/>
    </div>
  );
};

export default CustomerBookingsPage;
