import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <h1 className='mb-5 text-2xl font-bold'>Caring Nanny</h1>
            <p className='w-full md:w-2/3 text-gray-600'>
              At Caring Nanny, we connect families with loving and qualified caregivers to ensure a safe and nurturing environment for your children.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY </p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <NavLink to="/" className='hover:text-blue-500'>
                  <li>Home</li>
                </NavLink>
                <NavLink to="/about" className='hover:text-blue-500'>
                  <li>About Us</li>
                </NavLink>
                <NavLink to="/privacy-policy" className='hover:text-blue-500'>
                  <li>Privacy Policy</li>
                </NavLink>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-567484849</li>
                <li>contact@caringnanny.com</li>
            </ul>
        </div>
      </div>

      <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2024 @ Caring Nanny - All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
