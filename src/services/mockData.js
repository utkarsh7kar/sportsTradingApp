export const getInitialPriceData = () => [
  { price: '38¢', shares: '14,984.00', type: 'buy', volume: 100 },
  { price: '37¢', shares: '14,984.00', type: 'buy', volume: 85 },
  { price: '36¢', shares: '14,984.00', type: 'buy', volume: 70 },
  { price: '35.6¢', shares: '14,984.00', type: 'buy', volume: 50 },
  { price: '35¢', shares: '14,984.00', type: 'buy', volume: 30 },
  { price: '34.5¢', shares: '(Spread 1%)', type: 'spread' },
  { price: '34¢', shares: '14,984.00', type: 'sell', volume: 30 },
  { price: '33.5¢', shares: '14,984.00', type: 'sell', volume: 40 },
  { price: '33.4¢', shares: '14,984.00', type: 'sell', volume: 60 },
  { price: '32¢', shares: '14,984.00', type: 'sell', volume: 80 },
  { price: '30¢', shares: '14,984.00', type: 'sell', volume: 100 }
];

export const simulatePriceChange = (currentPrices) => {
  const newPrices = currentPrices.map(item => {
    if (item.type === 'spread') return item;
    const randomChange = Math.random() > 0.5 ? 0.1 : -0.1;
    const newPrice = (parseFloat(item.price) + randomChange).toFixed(1);
    const newVolume = Math.floor(Math.random() * 70) + 30; // Random volume between 30-100
    return {
      ...item,
      price: `${newPrice}¢`,
      shares: Math.floor(Math.random() * 5000 + 10000).toLocaleString('en-US', { minimumFractionDigits: 2 }),
      volume: newVolume
    };
  });
  
  const buyPrices = newPrices.filter(item => item.type === 'buy').map(item => parseFloat(item.price));
  const sellPrices = newPrices.filter(item => item.type === 'sell').map(item => parseFloat(item.price));
  const newMidPrice = ((Math.max(...buyPrices) + Math.min(...sellPrices)) / 2).toFixed(1);
  
  return {
    newPrices,
    newMidPrice: `${newMidPrice}¢`
  };
};
