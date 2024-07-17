// Login component. It sends a POST request to the server with the user's email and password. If the user is successfully logged in, the server sends back the user's data, which is then stored in the UserContext. The user is then redirected to the home page. If the login fails, an error message is displayed.
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext'; // Adjust the path accordingly

const Login = () => {
    // State variables to store the user's email, password, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the server with the user's email and password
            const response = await axios.post('http://localhost:3001/login', { email, password });
            // If the response status is 200, the user is successfully logged in
            if (response.status === 200) {
                setUser(response.data.user);
                navigate('/');
            } else {
                setMessage('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to fetch. Check if you have typed the correct credentials');
        }
    };

    return (
        // Login form with email, password input fields, and a submit button
        <div className="login-container">
            <h1>Login</h1>
            <div className={message ? 'message error' : 'hidden'}>{message}</div>
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
};

export default Login;
