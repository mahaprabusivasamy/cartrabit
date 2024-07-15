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
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(password!=confirmPassword){
      alert("Enter same password");
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Phone number must be 10 digits long');
      return;
    }
    try {
      await customerRegister(name, email, password,confirmPassword);
      navigate('/customer/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  // customer registration
  return (
   
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
        <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="\d{10}"
              title="Phone number must be 10 digits long"
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
