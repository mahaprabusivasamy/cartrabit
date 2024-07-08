// src/pages/OwnerLoginPage.js
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerLogin } from '../services/auth';

const OwnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const owner=await ownerLogin(email, password);
      navigate('/owner/dashboard',{state:{owner}});
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Owner Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default OwnerLoginPage;
