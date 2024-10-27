import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      console.log("Attempting to delete item with ID:", id);
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      
      // Update the cart items state after a successful deletion
      setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
      alert("Item deleted successfully!"); // Optional: Provide feedback to the user
    } catch (error) {
      console.error('Error deleting cart item:', error);
      alert("Failed to delete item. Please try again."); // Optional: Provide feedback on failure
    }
  };
    
  const totalRate = () => {
    return cartItems.reduce((total, item) => total + item.rate, 0);
  };

  const handlePayment = async () => {
    const amount = totalRate() * 100; // Convert to paise
    const currency = "INR";
    const receiptId = "receipt_1"; // Example receipt ID

    try {
      // Create order
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await response.json();

      // Configure Razorpay options
      const options = {
        key: "rzp_test_Y7J8yPZseC3NNh", // Replace with your test key
        amount, // Razorpay expects the amount in paisa
        currency,
        name: "Creche Project ",
        description: "pay for your order",
        order_id: order.id, // Razorpay Order ID
        handler: async (response) => {
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount,
            currency,
            receipt: receiptId,
          };

          // Validate the payment and store it in the database
          const validateRes = await fetch("http://localhost:5000/order/validate", {
            method: "POST",
            body: JSON.stringify(paymentDetails),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const jsonRes = await validateRes.json();
          console.log("Payment Success:", jsonRes);
          alert("Thank you for your payment!");
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        console.error("Payment Failed:", response.error);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (loading) {
    return <div className="p-5 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">Loading cart items...</div>;
  }

  return (
    <div className="p-5 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-12">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col border-b border-gray-300 py-2">
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
                className="bg-red-500 text-white border-none py-1 px-2 rounded mt-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="text-lg font-bold mt-5 text-right text-green-800">
            Total Rate: ${totalRate().toFixed(2)}
          </div>
          <button
            onClick={handlePayment}
            className="inline-block bg-green-500 text-white py-2 px-4 text-lg rounded mt-5 cursor-pointer transition duration-300 ease-in-out hover:bg-green-600"
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

