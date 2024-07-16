import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3001/reset', userData);

      if (response.status === 200) {
        navigate('/login');
      } else {
        alert(`Password reset failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Reset error:', error);
      alert('Password reset failed. Please try again later.');
    }
  };

  return (
    <div className="reset-container">
      <h1>Reset Password</h1>
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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        <p>Do not have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Reset;
