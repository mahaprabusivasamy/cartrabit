
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerLogin,customerLogin } from '../services/auth';
import img from "../assets/Auth/logo-owner-login.jpg"
import "./css/CustomerLoginPage.css"

const OwnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const owner=await customerLogin(email, password);
      console.log(owner)
     localStorage.setItem('user', JSON.stringify(owner));
      navigate('/owner/dashboard',{state: { owner }});
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  // owner login 
  return (
    
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
