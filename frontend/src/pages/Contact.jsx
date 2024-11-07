import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="p-8 md:p-16 bg-white ">
      <div className="text-center text-2xl font-semibold mb-6">
        <h2>Hey we are here!</h2>
        <h3 className="text-3xl font-bold">Get in touch with us</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Phone Number */}
        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-lg p-6 gap-4 w-full md:w-1/4 h-40"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaPhone className="text-3xl text-gray-700" />
          <div>
            <p className="font-semibold">Phone Number</p>
            <p className="text-gray-600">+91 9991268863</p>
          </div>
        </motion.div>

        {/* Headquarters */}
        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-lg p-6 gap-4 w-full md:w-1/4 h-40"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaMapMarkerAlt className="text-3xl text-gray-700" />
          <div>
            <p className="font-semibold">Headquarters</p>
            <p className="text-gray-600">Pune, 411027</p>
          </div>
        </motion.div>

        {/* Email ID */}
        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-lg p-6 gap-4 w-full md:w-1/4 h-40"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaEnvelope className="text-3xl text-gray-700" />
          <div>
            <p className="font-semibold">E-mail ID</p>
            <p className="text-gray-600">support@caringnanny.com</p>
          </div>
        </motion.div>

        {/* WhatsApp */}
        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-lg p-6 gap-4 w-full md:w-1/4 h-40"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaWhatsapp className="text-3xl text-green-600" />
          <div>
            <p className="font-semibold">WhatsApp</p>
            <p className="text-gray-600">+91 9991268863</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;


