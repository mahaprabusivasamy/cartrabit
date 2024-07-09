// src/pages/CustomerRegisterPage.jsx
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerRegister } from '../services/auth';
import img from "../assets/Auth/logo-login.jpg"
import "./css/CustomerRegisterPage.css"

const CustomerRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(password!=confirmPassword){
      alert("Enter same password");
    }
    try {
      await customerRegister(name, email, password,confirmPassword);
      navigate('/customer/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    // <div>
    //   <h2>Customer Register</h2>
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
      <h2>Register Customer</h2>
      <p>Create your account to start booking your favorite stays.</p>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/customer/login">Login here</a>
      </p>
    </div>
  </div>
  );
};

export default CustomerRegisterPage;
