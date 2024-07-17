import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });

      if (response.status === 200) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage('Login failed. Please check if you have entered the right credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to fetch. Please check if you have entered the right credentials.');
    }
  };

  return (
    <div className="login-container">
      {message && <p className="login-message">{message}</p>}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Do not have an account? <a href="/register">Sign up</a></p>
        <p>Forgot password? <a href="/reset">Reset password</a></p>
      </form>
    </div>
  );
}

export default Login;
