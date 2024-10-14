import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BabySitter = () => {
  const [babysitters, setBabysitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchBabysitters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nanny/list'); // Adjust API endpoint as necessary
        if (response.data.success) { // Check if the API returns success status
          setBabysitters(response.data.babysitters || []); // Adjust based on your actual API response
        } else {
          console.error('Error fetching babysitters:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching babysitters:', error);
      } finally {
        setLoading(false);
      }
    };

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    fetchBabysitters();
  }, []);

  const handleAddToCart = async (babysitter) => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        babysitterId: babysitter._id,
        firstName: babysitter.firstName,
        lastName: babysitter.lastName,
        contactEmail: babysitter.contactEmail,
        rate: babysitter.rate || 500,
      });

      const newCart = [...cart, babysitter];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      alert(`${babysitter.firstName} ${babysitter.lastName} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding babysitter to cart:', error);
      alert('Failed to add babysitter to cart.');
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-5 font-sans">
      <h1 className="mb-5 text-2xl text-center font-bold">Available Babysitters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {babysitters.length === 0 ? (
          <div className="text-center text-gray-500">No babysitters available at the moment.</div>
        ) : (
          babysitters.map((babysitter) => (
            <div key={babysitter._id} className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105">
              <img
                className="w-full h-40 object-cover"
                src={babysitter.profilePicture || 'default-image-url.jpg'}
                alt={`${babysitter.firstName} ${babysitter.lastName}`}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{`${babysitter.firstName} ${babysitter.lastName}`}</h2>
                <p className="text-gray-600">{babysitter.experience || 'No experience description available.'}</p>
                <p className="text-gray-600">Contact: {babysitter.contactEmail}</p>
                <p className="text-gray-600">Rate: ${babysitter.rate} / hour</p>
              </div>
              <button
                className="w-full bg-green-500 text-white py-2 rounded-b-lg hover:bg-green-600"
                onClick={() => handleAddToCart(babysitter)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BabySitter;

