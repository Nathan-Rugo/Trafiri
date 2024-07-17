import React from 'react';
import { Link } from 'react-router-dom'; // Import Link - client-side navigation
import Logo from '../assets/logo.png'; // Import Logo - logo
const Header = () => {
    return (
        <header>
            <div className="header-logo">
                <a href="/"><img className = "Logo-img" src= {Logo} alt='Trafiri Logo' /></a>
                </div>
            <nav className='navigation'>
                <ul className='list'>
                    <li><Link to="/">Home</Link></li> 
                    <li><Link to="/activities">Activities</Link></li> 
                    <li><Link to="/places">Places</Link></li> 
                    <li><Link to="/review">Review</Link></li> 
                    <li><Link to="/login">Login</Link></li> 
                    <li><Link to="/register">Register</Link></li> 
                    <li><Link to="/contact">Contact</Link></li> 

                </ul>
            </nav>
        </header>
    );
}

export default Header;
