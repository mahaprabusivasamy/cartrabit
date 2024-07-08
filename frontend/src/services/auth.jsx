// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const ownerLogin = async (email, password) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  localStorage.setItem('x-auth-token', res.data.token);
};

export const ownerRegister = async (name, email, password) => {
  await axios.post(`${API_URL}/api/auth/register`, { name, email, password, role: 'owner' });
};

export const customerLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token, user } = response.data;
  
      localStorage.setItem('x-auth-token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Store user details in local storage
  
      return user; // Return user object upon successful login
    } catch (error) {
      throw new Error('Login failed'); // Handle login failure
    }
  };

export const customerRegister = async (name, email, password) => {
  await axios.post(`${API_URL}/api/auth/register`, { name, email, password, role: 'customer' });
};
