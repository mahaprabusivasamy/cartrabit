// src/services/room.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getAvailableRooms = async () => {
  const res = await axios.get(`${API_URL}/api/rooms/available`);
  return res.data;
};

export const getOwnerRooms = async (ownerId) => {
  console.log("fetch owner room details");
  const res = await axios.get(`${API_URL}/api/rooms/owner/${ownerId}`, {
    headers: { 'x-auth-token': `${localStorage.getItem('x-auth-token')}` },
  });
  return res.data;
};

export const createRoom = async (roomData) => {
  const res = await axios.post(`${API_URL}/api/rooms/create`, roomData, {
    headers: { 'Content-Type': 'multipart/form-data',
       'x-auth-token': `${localStorage.getItem('x-auth-token')}` },
  });
  return res.data;
};
export const getRoomDetails = async (roomIds) => {
  const res = await axios.post(`${API_URL}/api/rooms/details`, {roomIds});
  return res.data;
};

export const updateRoomDetails = async(roomId,roomData)=>{
const res=await axios.put(`${API_URL}/api/rooms/${roomId}`,roomData,{
  headers:{'x-auth-token':`${localStorage.getItem('x-auth-token')}`},
});
return res.data;
}

// export const getRoomDetails = async (roomIds) => {
//   try {
//     const response = await axios.post('http://127.0.0.1:5000/api/rooms/details', { roomIds });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch room details:', error);
//     throw error;
//   }
// };

export const deleteRoom = async(roomId)=>{
  const res=await axios.delete(`${API_URL}/api/rooms/delete/${roomId}`,{
    headers:{'x-auth-token':`${localStorage.getItem('x-auth-token')}`},
  })
  return res.data;
}