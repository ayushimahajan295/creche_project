// src/components/AddNanny.js
import React, { useState } from 'react';
import axios from 'axios';

const Nanny = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    experience: '',
    certifications: '',
    profilePicture: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    // Add more fields as needed
  });

  const [message, setMessage] = useState('');

  const {
    firstName,
    lastName,
    age,
    experience,
    certifications,
    profilePicture,
    contactEmail,
    contactPhone,
    address,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/nanny', {
        firstName,
        lastName,
        age,
        experience,
        certifications,
        profilePicture,
        contactEmail,
        contactPhone,
        address,
      });
      setMessage(res.data.message);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        experience: '',
        certifications: '',
        profilePicture: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || 'Error creating nanny profile.');
      } else {
        setMessage('Error creating nanny profile.');
      }
    }
  };

  // **Inline Styles**
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '100px',
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#218838',
  };

  const messageStyle = {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#d4edda',
    color: '#155724',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Add Nanny Profile</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={onSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            required
            style={inputStyle}
            placeholder="Enter first name"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            required
            style={inputStyle}
            placeholder="Enter last name"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Age:</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={onChange}
            required
            min="18"
            style={inputStyle}
            placeholder="Enter age"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Experience:</label>
          <textarea
            name="experience"
            value={experience}
            onChange={onChange}
            required
            style={textareaStyle}
            placeholder="Describe experience"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Certifications (comma separated):</label>
          <input
            type="text"
            name="certifications"
            value={certifications}
            onChange={onChange}
            style={inputStyle}
            placeholder="e.g., First Aid, CPR"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePicture"
            value={profilePicture}
            onChange={onChange}
            style={inputStyle}
            placeholder="Enter image URL"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Contact Email:</label>
          <input
            type="email"
            name="contactEmail"
            value={contactEmail}
            onChange={onChange}
            required
            style={inputStyle}
            placeholder="Enter email address"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Contact Phone:</label>
          <input
            type="text"
            name="contactPhone"
            value={contactPhone}
            onChange={onChange}
            required
            style={inputStyle}
            placeholder="Enter phone number"
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Address:</label>
          <textarea
            name="address"
            value={address}
            onChange={onChange}
            style={textareaStyle}
            placeholder="Enter address"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={buttonStyle}>
            Add Nanny
          </button>
        </div>
      </form>
    </div>
  );
};

export default Nanny;
