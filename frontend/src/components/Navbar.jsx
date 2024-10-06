import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaSearch, FaShoppingCart } from 'react-icons/fa'; // Import icons from react-icons

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showCartTotal, setShowCartTotal] = useState(false); // State to toggle CartTotal visibility

  // Sample cart amount and delivery fee for demonstration
  const cartAmount = 100; // Replace with actual logic
  const deliveryFee = 5; // Replace with actual logic
  const currency = '$'; // Default currency set to USD

  return (
    <nav className="bg-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-800 text-lg font-bold">
          <span className="mr-4">Logo</span>
        </div>

        {/* Navbar Links */}
        <div className="flex-grow text-center">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="text-gray-800 font-bold hover:text-yellow-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/babysitters" className="text-gray-800 font-bold hover:text-yellow-500">
                Babysitters
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-800 font-bold hover:text-yellow-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-800 font-bold hover:text-yellow-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Search Bar and Cart */}
        <div className="relative flex items-center space-x-4">
          {/* Search Icon */}
          <button onClick={() => setShowSearch(!showSearch)}>
            <FaSearch className="text-gray-800 hover:text-yellow-500" size={20} />
          </button>

          {/* Search Bar */}
          {showSearch && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-400 px-4 py-2 rounded-md shadow-lg">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none border-b-2 border-yellow-500 w-full p-1 text-sm"
                type="text"
                placeholder="Search..."
              />
            </div>
          )}

          {/* Cart Icon */}
          <button onClick={() => setShowCartTotal(!showCartTotal)}>
            <FaShoppingCart className="text-gray-800 hover:text-yellow-500" size={20} />
          </button>

          {/* CartTotal Dropdown */}
          {showCartTotal && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-400 px-4 py-2 rounded-md shadow-lg">
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                  <p>Subtotal</p>
                  <p>{currency} {cartAmount}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                  <p>Shipping Fee</p>
                  <p>{currency} {deliveryFee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                  <b>Total</b>
                  <b>{currency} {cartAmount === 0 ? 0 : cartAmount + deliveryFee}.00</b>
                </div>
              </div>
            </div>
          )}

          {/* Login Button */}
          <Link to="/login">
            <button className="text-gray-800 font-bold hover:text-yellow-500 border border-gray-800 rounded px-4 py-2">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





