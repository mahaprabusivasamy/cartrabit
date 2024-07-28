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
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
  
    e.preventDefault();

  
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!phoneRegex.test(phoneNumber)) {
      alert('Phone number must be 10 digits long');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // const phoneRegex = /^\d{10}$/;
    // if (!phoneRegex.test(phoneNumber)) {
    //   alert('Phone number must be 10 digits long');
    //   return;
    // }
    try {
      await ownerRegister(name, email, password);
      navigate('/owner/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  // owner registration
  return (
  
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
