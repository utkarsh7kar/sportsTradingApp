import React, { useState } from 'react';
import '../styles/OrderForm.scss';

const OrderForm = ({ placeOrder, midPrice }) => {
  const [shares, setShares] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(shares);
    setShares(0);
  };

  return (
    <div className="order-form">
      <h2>BUY/LONG</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shares</label>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="price-display">
          <span>Current Price: {midPrice}</span>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;