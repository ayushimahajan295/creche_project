import React, {useState} from 'react';
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
import PurchasedNannies from './pages/PurchasedNannies';
import axios from 'axios';

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  async function generateAnswer(){
    setAnswer("loading...");
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA961mUiK07jV8Bz6Ta9V0DH6tD531Mwe0",
      method: "post",
      data: {"contents": [
        {"parts":[{"text": question}]}
      ]},

    });
    setAnswer(response[`data`]['candidates'][0]['content']['parts'][0]['text']);
  }
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
        <Route path="/Purchased" element={<PurchasedNannies />}/>
      </Routes>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} cols="30" rows="10"></textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
      <pre>{answer}</pre>
      <OurPolicy /> 
      <Footer />
    </div>
  );
};

export default App;








