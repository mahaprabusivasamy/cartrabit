// src/services/room.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getAvailableRooms = async () => {
  const res = await axios.get(`${API_URL}/api/rooms/available`);
  return res.data;
};

export const getOwnerRooms = async () => {
  const res = await axios.get(`${API_URL}/owner/rooms`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return res.data;
};

export const createRoom = async (roomData) => {
  const res = await axios.post(`${API_URL}/owner/rooms`, roomData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return res.data;
};
