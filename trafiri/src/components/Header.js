// Header component for the application with navigation links and user login/logout functionality using context API. 
//The user's first name is displayed when logged in, and a logout button is shown to log out the user. 
//The user's details are displayed when the user clicks on the login icon.

import React, { useContext, useState,  } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';
import { UserContext } from '../contexts/UserContext';
import Logo from '../assets/logo.png';
import LoginIcon from '../assets/user.png';

const Header = () => {
    // Get the user and setUser from the UserContext
    const { user, setUser } = useContext(UserContext);
    const [showUsername, setShowUsername] = useState(false);
    const { navigateTo } = useNavigation();
    // Function to toggle the display of the user's details
    const toggleUsernameDisplay = () => {
        setShowUsername(!showUsername);
    };
    // Function to handle logout
    const handleLogout = () => {
        // Perform logout actions here
        setUser(null);
        alert('Logged out successfully');
        setTimeout(() => navigateTo('/login'), 1000);

    };

    return (
        // Header component with logo, navigation links, and user login/logout functionality using context API
        <header>
            <div className="header-logo">
                <Link to="/"><img className="Logo-img" src={Logo} alt='Trafiri Logo' /></Link>
            </div>
            <nav className='navigation'>
                <ul className='list'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/places">Places</Link></li>
                    <li><Link to="/review">Review</Link></li>
                    {!user && <li><Link to="/login">Login</Link></li>}
                    {!user && <li><Link to="/register">Register</Link></li>}
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                <div className="nav-login" onClick={toggleUsernameDisplay}>
                    <div
                        className="login-image"
                        
                    >
                        <img src={LoginIcon} alt="Login" />
                    </div>
                    {showUsername && (
                        <div className="user-details">
                            <span className="username">Hello {user ? user.firstName : 'Guest'}</span>
                            {user && <button className='user-change' onClick={handleLogout}>Login</button>}
                        </div>
                    )}
                </div>
            </nav>
        </header>
        
    );
};

export default Header;
