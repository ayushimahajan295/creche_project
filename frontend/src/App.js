// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; // Import SignUp component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OurPolicy from './components/OurPolicy';
import MyProfile from './pages/MyProfile';  // Import MyProfile component
import BabySitter from './pages/BabySitter';
import PurchasedNannies from './pages/PurchasedNannies';
import NannyBot from './components/NannyBot';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/babysitter' element={<BabySitter />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/babysitter/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path="/Purchased" element={<PurchasedNannies />} />
      </Routes>

      <NannyBot />

      <OurPolicy />
      <Footer />
    </div>
  );
};

export default App;









