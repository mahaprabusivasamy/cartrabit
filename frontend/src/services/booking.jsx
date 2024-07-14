// src/services/booking.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

// owner room bookings details
export const getOwnerBookings = async () => {
  const res = await axios.get(`${API_URL}/api/bookings/owner`, {
    headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
  });
  return res.data;
};

//customer bookings details
export const getCustomerBookings = async (customer) => {
  const res = await axios.get(`${API_URL}/api/bookings/customer?customerId=${customer.id} `, {
    headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
  });
  return res.data;
};

// book a room 
export const bookroom = async (bookingData) => {
  console.log("111");
  const res = await axios.post(`${API_URL}/api/bookings/book `,{bookingData});
  console.log("api fe sucess");
  return res.data;
};


// get the booking range for avoid multiple booking on same date
export const getBookingsInRange = async (filters) => {
  try {
    const response = await axios.post('/api/bookings/bookings-in-range', filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};