import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 mt-40">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
        {/* About Section */}
        <div>
          <h1 className="mb-5 text-2xl font-bold text-indigo-700">Caring Nanny</h1>
          <p className="text-gray-600 leading-relaxed">
            At Caring Nanny, we connect families with loving and qualified caregivers to ensure a safe
            and nurturing environment for your children.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5 text-indigo-700">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <NavLink to="/" className="hover:text-indigo-500 transition duration-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-indigo-500 transition duration-300">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy" className="hover:text-indigo-500 transition duration-300">
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5 text-indigo-700">Get in Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="flex items-center gap-2">
              <FaPhone className="text-indigo-700" /> +91-567484849
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-indigo-700" /> contact@caringnanny.com
            </li>
          </ul>

          {/* Social Media Links */}
          <div className="mt-5 flex space-x-3 text-indigo-700">
            <a href="#" aria-label="Facebook" className="hover:text-indigo-500">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-indigo-500">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-indigo-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t pt-5 text-center text-gray-500 text-xs">
        <p>© 2024 Caring Nanny - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

