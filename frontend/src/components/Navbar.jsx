import React, { useState } from 'react';
import profileIcon from '../assets/frontend_assets/profile_icon.png';
import cartIcon from '../assets/frontend_assets/cart_icon.png';
import menuIcon from '../assets/frontend_assets/menu_icon.png';
import dropdownIcon from '../assets/frontend_assets/dropdown_icon.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/' className='font-bold text-xl'>Caring Nanny</Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
        </NavLink>
        <NavLink to='/babysitter' className='flex flex-col items-center gap-1'>
          <p>BABYSITTER</p>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
        </NavLink>
        {/* Chatbot Button */}
      </ul>

      <div className='flex items-center gap-6'>
        <div className='relative'>
          <img
            onClick={handleDropdownToggle}
            className='w-5 cursor-pointer'
            src={profileIcon}
            alt="Profile"
          />
          {dropdownVisible && (
            <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
              <Link to='/signup' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Sign Up</Link>
              <Link to='/login' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Login</Link>
              <Link to='/profile' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>My Profile</Link>
              <div onClick={logout} className='block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer'>Sign Out</div>
              <a href='http://localhost:5174' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Sign In as Admin</a>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative'>
          <img src={cartIcon} className='w-5 min-w-5' alt="Cart" />
        </Link>

       
        <img onClick={() => setVisible(true)} src={menuIcon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={dropdownIcon} alt="Back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/babysitter'>BABYSITTER</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
