import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3001/register', userData);

      if (response.status === 200) {
        setMessage('Registration successful. Please check your email for confirmation.');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage(response.data.message);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Registration error:',error);
      setMessage('Registration failed: ' + error.response.data.message);
      setMessageType('error');
    }
  };

  return (
    <div className="register-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      {message && (
        <div className={messageType === 'success' ? 'message success' : 'message error'}>
          {message}
        </div>
      )}
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;
