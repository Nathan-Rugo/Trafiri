// Code to render the application and define the routes for the different pages of the application
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Places from './components/Places';
import Review from './components/Review';
import { NavigationProvider } from './contexts/NavigationContext'; // Import the NavigationProvider context provider to provide navigation state to all components in the application
import './App.css'; // Import the CSS file for the application styling
const App = () => {
  return (
     // Wrap the application with the NavigationProvider context provider to provide navigation state to all components in the application
      // Using the BrowserRouter component to define the routing for the application
        // Header component to display the navigation links
    <NavigationProvider>
      <Router> 
        <Header /> 
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/activities' element={<Activities />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/places" element={<Places />} />
          <Route path="/review" element={<Review />} />
        </Routes>
        <Footer />
      </Router>
    </NavigationProvider>
  );
}

export default App;
