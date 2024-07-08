// src/pages/OwnerRegisterPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerRegister } from '../services/auth';

const OwnerRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await ownerRegister(name, email, password);
      navigate('/owner/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Owner Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default OwnerRegisterPage;
