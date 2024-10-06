import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate input here (optional)

    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
        aadharCard,
        phoneNumber,
      });
      setLoading(false);
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      setLoading(false);
      console.error(err); // Log the error for debugging
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignUp} className="bg-gray-800 p-6 rounded-lg w-96">
        <h1 className="text-white text-2xl mb-4">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white">Aadhar Card</label>
          <input
            type="text"
            value={aadharCard}
            onChange={(e) => setAadharCard(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className={`bg-yellow-500 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;


