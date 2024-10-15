import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; // Import SignUp component
//import PlaceOrder from './pages/PlaceOrder';
//import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//import Verify from './pages/Verify';
import OurPolicy from './components/OurPolicy'; // Import OurPolicy component
import MyProfile from './pages/MyProfile';  // Import NannyList component
import BabySitter from './pages/BabySitter';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/babysitter' element={<BabySitter />} /> {/* Updated route for NannyList */}
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/babysitter/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} /> {/* Add SignUp route */}
       {/*} <Route path='/place-order' element={<PlaceOrder />} />*/}
        {/*<Route path='/orders' element={<Orders />} />*/}
        {/*<Route path='/verify' element={<Verify />} />*/}
        <Route path='/profile' element={<MyProfile />} /> {/* Add MyProfile route */}
      </Routes>
      <OurPolicy /> 
      <Footer />
    </div>
  );
};

export default App;








