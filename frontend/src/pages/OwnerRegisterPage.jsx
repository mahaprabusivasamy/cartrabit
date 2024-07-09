// src/pages/OwnerRegisterPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerRegister } from '../services/auth';
import "./css/CustomerRegisterPage.css"
import img from "../assets/Auth/logo-owner-login.jpg"


const OwnerRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword ] = useState('');
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
    // <div>
    //   <h2>Owner Register</h2>
    //   <form onSubmit={handleRegister}>
    //     <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
    //     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     <button type="submit">Register</button>
    //   </form>
    // </div>
    <div className="register-container">
    <div className="register-image">
      <img src={img} alt="Register" />
    </div>
    <div className="register-form">
      <h2>Register House Owner</h2>
      <p>Create your account to start rent your roomto ear.</p>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn-reg" type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/owner/login">Login here</a>
      </p>
    </div>
  </div>
  );
};

export default OwnerRegisterPage;
