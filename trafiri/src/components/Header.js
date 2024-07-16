import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for client-side navigation
import Logo from '../assets/logo.png'; // Import Logo
const Header = () => {
    return (
        <header>
            <div className="header-logo">
                <a href="/"><img className = "Logo-img" src= {Logo} alt='Trafiri Logo' /></a>
                </div>
            <nav className='navigation'>
                <ul className='list'>
                    <li><Link to="/">Home</Link></li> {/* Use Link for React Router */}
                    <li><Link to="/activities">Activities</Link></li> {/* Use Link for React Router */}
                    <li><Link to="/places">Places</Link></li> {/* Use Link for React Router */}
                    <li><Link to="/review">Review</Link></li> {/* Use Link for React Router */}
                    <li><Link to="/login">Login</Link></li> {/* Use Link for React Router */}
                    <li><Link to="/register">Register</Link></li> {/* Use Link for React Router */}
                    <li><Link to="/contact">Contact</Link></li> {/* Use Link for React Router */}

                </ul>
            </nav>
        </header>
    );
}

export default Header;
