// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

// owner login
export const ownerLogin = async (email, password) => {
  try{
    const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    const{token,owner}=res.data;

    localStorage.setItem('x-auth-token',token);
    localStorage.setItem('owner', JSON.stringify(owner));
    return owner;
  }catch (error) {
    throw new Error('Login failed'); // Handle login failure
  }
};

// owner registration
export const ownerRegister = async (name, email, password) => {
  await axios.post(`${API_URL}/api/auth/register`, { name, email, password, role: 'owner' });
};

// customer login 
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

  // customer registration
export const customerRegister = async (name, email, password) => {
  await axios.post(`${API_URL}/api/auth/register`, { name, email, password, role: 'customer' });
};
