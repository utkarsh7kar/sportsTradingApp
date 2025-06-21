import React, { useEffect, useRef } from 'react';
import '../styles/OrderBook.scss';

const OrderBook = ({ priceData }) => {
  const orderRowsRef = useRef([]);

  // Update volume-based background widths
  useEffect(() => {
    orderRowsRef.current.forEach((row, index) => {
      if (!row || !priceData[index]) return;
      
      const item = priceData[index];
      if (item.type !== 'spread' && item.volume) {
        row.style.setProperty('--volume-width', `${item.volume}%`);
      }
    });
  }, [priceData]);

  return (
    <div className="order-book">
      <div className="column-headers">
        <span>Price</span>
        <span>Shares (CSK)</span>
      </div>
      <div className="order-list">
        {priceData.map((item, index) => (
          <div 
            key={index} 
            className={`order-row ${item.type}`}
            ref={el => orderRowsRef.current[index] = el}
          >
            {item.type === 'spread' ? (
              <>
                <span className="price">{item.price}</span>
                <span className="shares">{item.shares}</span>
              </>
            ) : (
              <>
                <span className="price">{item.price}</span>
                <span className="shares">{item.shares}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
