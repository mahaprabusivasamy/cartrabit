// src/pages/OwnerLoginPage.js
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerLogin } from '../services/auth';
import img from "../assets/Auth/logo-owner-login.jpg"
import "./css/CustomerLoginPage.css"

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
    // <div>
    //   <h2>Owner Login</h2>
    //   <form onSubmit={handleLogin}>
    //     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
    <div className="login-container">
    <div className="login-image">
      <img src={img} alt="Login" />
    </div>
    <div className="login-form">
      <h2>Login House Owner</h2>
      <form onSubmit={handleLogin}>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/owner/register">Register here</a>
      </p>
    </div>
  </div>
  );
};

export default OwnerLoginPage;
