// Reset password component that allows users to reset their password by providing their email address and new password. 
// The component sends a POST request to the server with the email and password, and if the request is successful, the user is redirected to the login page. 
// If the request fails, an error message is displayed.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reset = () => {
  // State variables to store the user's email, password, and confirm password values, as well as the message to display to the user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    // User data to send to the server
    const userData = {
      email,
      password,
    };

    try {
      // Send reset request to server
      const response = await axios.post('http://localhost:3001/reset', userData);

      if (response.status === 200) {
        setMessage('Password reset successful');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(`Password reset failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Reset error:', error);
      setMessage('Password reset failed. Please try again later.');
    }
  };

  return (
    // Reset password form with email, password, and confirm password input fields
    <div className="reset-container">
      <h1>Reset Password</h1>
      {message && <p className="reset-message">{message}</p>}
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
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </form>
      

    </div>
  );
};

export default Reset;
