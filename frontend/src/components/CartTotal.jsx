import React, { useState } from 'react';

const CartTotal = () => {
  // Replace context with local state for demonstration
  const [currency] = useState('$'); // Default currency set to USD
  const [deliveryFee] = useState(5); // Sample delivery fee
  const [cartAmount, setCartAmount] = useState(100); // Sample cart amount

  return (
    <div className='w-full'>
      {/* Replacing Title with a simple header */}
      <div className='text-2xl'>
        <h2>
          <span>CART </span>
          <span>TOTALS</span>
        </h2>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {cartAmount}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {deliveryFee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {cartAmount === 0 ? 0 : cartAmount + deliveryFee}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
