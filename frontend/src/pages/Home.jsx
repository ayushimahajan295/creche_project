// src/components/Home.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Home = () => {
  const characterRef = useRef(null);

  useEffect(() => {
    // GSAP animation for the character carrying "Connecting" text
    gsap.fromTo(characterRef.current, 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" }
    );
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-100 to-white px-10 md:px-20">
      {/* Left Side with Animated Character */}
      <div className="flex-1 flex flex-col items-start justify-center space-y-6">
        <motion.h1
          className="text-5xl font-bold text-indigo-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Caring Connect 
        </motion.h1>
        
        {/* Description about Caring Connect */}
        <motion.p
          className="text-lg text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Caring Connect is dedicated to bridging the gap between families and trusted caregivers.
          Our mission is to ensure peace of mind for parents by connecting them with compassionate,
          reliable, and skilled nannies who prioritize children's well-being and development.
        </motion.p>

        <div ref={characterRef} className="text-2xl font-semibold text-indigo-600">
          {/* Character animation carrying "Connecting" */}
          👩‍👧 <span className="text-indigo-700">Connecting Families & Caregivers</span>
        </div>
      </div>

      {/* Right Side with Nanny Image */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src='/nanny.webp'
          alt="Nanny"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default Home;
