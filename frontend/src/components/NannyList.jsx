import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NannyList.css'; // Import your CSS file for styling

const NannyList = () => {
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); 

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nanny/list');
        setNannies(response.data.nannies); // Extract the nannies array from the response
      } catch (error) {
        console.error('Error fetching nannies:', error);
      } finally {
        setLoading(false);
      }
    };
    // Fetch cart from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    fetchNannies();
  }, []);

  const handleAddToCart = async (nanny) => {
    try {
      // Send POST request to add nanny to cart
      await axios.post('http://localhost:5000/api/cart', {
        nannyId: nanny._id,
        firstName: nanny.firstName,
        lastName: nanny.lastName,
        contactEmail: nanny.contactEmail,
        rate:500,
      });

      // Update local cart state
      const newCart = [...cart, nanny];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart)); // Store cart in local storage
      alert(`${nanny.firstName} ${nanny.lastName} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding nanny to cart:', error);
      alert('Failed to add nanny to cart.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="nanny-list">
      <h1>Available Nannies</h1>
      <div className="nanny-grid">
        {nannies.map((nanny) => (
          <div key={nanny._id} className="nanny-card">
            <img
              className="nanny-image"
              src={nanny.profilePicture || 'default-image-url.jpg'}
              alt={`${nanny.firstName} ${nanny.lastName}`}
            />
            <div className="nanny-info">
              <h2>{`${nanny.firstName} ${nanny.lastName}`}</h2>
              <p>{nanny.experience || 'No experience description available.'}</p>
              <p>Contact: {nanny.contactEmail}</p>
              <p>Rate: ${nanny.rate} / hour</p>
            </div>
            <button className="add-to-cart" onClick={() => handleAddToCart(nanny)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NannyList;
