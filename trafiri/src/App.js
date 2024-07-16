import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';
import './App.css';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Places from './components/Places';
import Review from './components/Review';

const App = () => {
  return (
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
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
