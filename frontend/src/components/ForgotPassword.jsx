import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleForgotPassword} className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-white text-2xl mb-4">Forgot Password</h1>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
