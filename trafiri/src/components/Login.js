import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });

      if (response.status === 200) {
        navigate('/');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch');
    }
  };

  return (
    <div className="login-container">
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
