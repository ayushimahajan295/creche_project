import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      // Assuming the backend returns a token
      localStorage.setItem('token', response.data.token); // Store token in local storage

      // Redirect to home or another page
      navigate('/'); // Use useNavigate to redirect
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-white text-2xl mb-4">Login</h1>
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
        <div className="mb-4">
          <label className="block text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Login
        </button>

        {/* Links for forgot password and sign up */}
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-yellow-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/sign-up" className="text-yellow-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;



