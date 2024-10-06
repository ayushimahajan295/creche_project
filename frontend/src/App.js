import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home'; // Adjust based on your structure
import Footer from './components/Footer';
import About from './components/About'; // Import the About component
import Contact from './components/Contact'; // Import the About component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} /> {/* Add the About route */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;





