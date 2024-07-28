
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerLogin,customerLogin } from '../services/auth';
import img from "../assets/Auth/logo-owner-login.jpg"
import "./css/CustomerLoginPage.css"

const OwnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible,setPasswordVisible]=useState('')
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // const phoneRegex = /^\d{10}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // if (!phoneRegex.test(phoneNumber)) {
    //   alert('Phone number must be 10 digits long');
    //   return;
    // }

    // if (!passwordRegex.test(password)) {
    //   alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }

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
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
       
        {/* <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? '🙈' : '👁️'}
            </button> */}
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
