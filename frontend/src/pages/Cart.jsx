import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        if (response.data.cartItems) {
          setCartItems(response.data.cartItems);
        } else {
          console.error('No cart items found');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      console.log("Attempting to delete item with ID:", id); // Check the ID in the console
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item._id !== id)); // Update UI after deletion
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };
    

  const totalRate = () => {
    return cartItems.reduce((total, item) => total + item.rate, 0);
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  };

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
    fontSize: '18px',
    color: '#555',
  };

  const totalStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '20px',
    textAlign: 'right',
    color: '#2d572c',
  };

  const emptyCartStyle = {
    textAlign: 'center',
    color: '#999',
    fontSize: '18px',
    marginTop: '50px',
  };

  if (loading) {
    return <div style={containerStyle}>Loading cart items...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p style={emptyCartStyle}>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={itemStyle}>
              <span>
                <strong>Name:</strong> {item.firstName} {item.lastName}
              </span>
              <span>
                <strong>Email:</strong> {item.contactEmail}
              </span>
              <span>
                <strong>Rate:</strong> ${item.rate.toFixed(2)}
              </span>
              <button
                onClick={() => deleteCartItem(item._id)}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <div style={totalStyle}>
            Total Rate: ${totalRate().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
