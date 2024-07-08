// src/services/booking.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getOwnerBookings = async () => {
  const res = await axios.get(`${API_URL}/api/bookings/owner`, {
    headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
  });
  return res.data;
};

export const getCustomerBookings = async () => {
  const res = await axios.get(`${API_URL}/api/bookings/customer`, {
    headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
  });
  return res.data;
};

export const bookRoom = async (room_id, booked_date, stay_duration_days) => {
    const token = localStorage.getItem('x-auth-token');
    if (!token) {
      throw new Error('No token found');
    }
  
    try {
      const res = await axios.post(
        `${API_URL}/api/bookings/book`,
        { room_id, booked_date, stay_duration_days },
        {
          headers: { 'x-auth-token': token },
        }
      );
      return res.data;
    } catch (error) {
      throw error.response.data.msg || error.message;
    }
  };