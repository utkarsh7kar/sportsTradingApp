import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TradingInterface from './components/TradingInterface';
import OrderBook from './components/OrderBook';
import OpenOrders from './components/OpenOrders';
import Footer from './components/Footer';
import { getInitialPriceData, simulatePriceChange } from './services/mockData';
import './styles/App.scss';

function App() {
  const [priceData, setPriceData] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);
  const [midPrice, setMidPrice] = useState('34.5¢');
  const [currentPrice, setCurrentPrice] = useState('34¢');
  const [priceChange, setPriceChange] = useState('+0.84%');
  const [shares, setShares] = useState(0);
  const [hideOtherPairs, setHideOtherPairs] = useState(false);
  const [showTradeHistory, setShowTradeHistory] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    // Initial data load
    const initialData = getInitialPriceData();
    setPriceData(initialData);
  }, []);

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      const { newPrices, newMidPrice } = simulatePriceChange(priceData);
      setPriceData(newPrices);
      setMidPrice(newMidPrice);
      
      // Update current price and change
      const newCurrentPrice = newPrices.find(p => p.type === 'sell')?.price || '34¢';
      setCurrentPrice(newCurrentPrice);
      setPriceChange(Math.random() > 0.5 ? `+${(Math.random() * 1.5).toFixed(2)}%` : `-${(Math.random() * 1.5).toFixed(2)}%`);
    }, 3000);
    return () => clearInterval(interval);
  }, [priceData]);

  const placeOrder = () => {
    if (shares <= 0) return;
    const newOrder = {
      id: Date.now(),
      team: 'CSK / IPL Winner',
      type: 'Limit / Buy',
      date: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      shares,
      price: midPrice,
      filled: '0.00 / 0.01',
      filledPrice: '30¢'
    };
    setOpenOrders([...openOrders, newOrder]);
    setShares(0);
    setSliderValue(0);
  };

  const cancelOrder = (id) => {
    setOpenOrders(openOrders.filter(order => order.id !== id));
  };

  const cancelAllOrders = () => {
    setOpenOrders([]);
  };

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="trading-section">
          <TradingInterface 
            midPrice={midPrice}
            currentPrice={currentPrice}
            priceChange={priceChange}
            shares={shares}
            setShares={setShares}
            placeOrder={placeOrder}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
          <OrderBook priceData={priceData} />
        </div>
        <OpenOrders 
          orders={openOrders} 
          hideOtherPairs={hideOtherPairs}
          showTradeHistory={showTradeHistory}
          setHideOtherPairs={setHideOtherPairs}
          setShowTradeHistory={setShowTradeHistory}
          cancelOrder={cancelOrder}
          cancelAllOrders={cancelAllOrders}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
