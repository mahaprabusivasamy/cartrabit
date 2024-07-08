// src/pages/CustomerLoginPage.jsx
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerLogin } from '../services/auth';

const CustomerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

     const customer=await customerLogin(email, password);
      navigate('/customer/dashboard',{state: { customer }});
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CustomerLoginPage;
