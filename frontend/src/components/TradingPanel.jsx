import React, { useState } from 'react';

function TradingPanel({ orderbook, currentPrice }) {
  const [isMarketOrder, setIsMarketOrder] = useState(true);
  const [leverage, setLeverage] = useState(1);
  const [tradeAmount, setTradeAmount] = useState('');

  const limitPrice = currentPrice * 1.001; // Simulated limit price (0.1% above market price)
  const availableBalance = 1030.4007; // Mock available balance

  const updateTradeInfo = () => {
    const amount = parseFloat(tradeAmount) || 0;
    const price = isMarketOrder ? currentPrice : limitPrice;
    const value = amount * price;
    const cost = value / leverage;
    return { value, cost };
  };

  const { value, cost } = updateTradeInfo();

  const setTradeAmountPercentage = (percentage) => {
    const maxAmount = availableBalance * leverage / currentPrice;
    const amount = maxAmount * (percentage / 100);
    setTradeAmount(amount.toFixed(4));
  };

  const placeTrade = (isBuy) => {
    const amount = parseFloat(tradeAmount) || 0;
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    const orderType = isMarketOrder ? 'market' : 'limit';
    const price = isMarketOrder ? currentPrice : limitPrice;
    const leverageText = leverage > 1 ? ` with ${leverage}x leverage` : '';
    const message = `${isBuy ? 'Buy' : 'Sell'} ${orderType} order placed successfully for ${amount} ICP at $${price.toFixed(2)}${leverageText}`;
    alert(message);
  };

  return (
    <div className="trading-panel">
      <div className="order-book">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 'bold' }}>Order Book</span>
          <span style={{ color: '#6B7280' }}>ICP</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Price(USDT)</th>
              <th style={{ textAlign: 'right' }}>Amount(ICP)</th>
              <th style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderbook && orderbook.asks.slice().reverse().map(({ price, quantity }, index) => (
              <tr key={`ask-${index}`}>
                <td className="sell">{price.toFixed(4)}</td>
                <td style={{ textAlign: 'right' }}>{quantity.toFixed(4)}</td>
                <td style={{ textAlign: 'right' }}>{(price * quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tbody>
            {orderbook && orderbook.bids.map(({ price, quantity }, index) => (
              <tr key={`bid-${index}`}>
                <td className="buy">{price.toFixed(4)}</td>
                <td style={{ textAlign: 'right' }}>{quantity.toFixed(4)}</td>
                <td style={{ textAlign: 'right' }}>{(price * quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="trade-section">
        <h3 style={{ marginTop: 0 }}>Trade</h3>
        <div className="price-info">
          <div>Market Price: <span>${currentPrice.toFixed(4)}</span></div>
          <div>Limit Price: <span>${limitPrice.toFixed(4)}</span></div>
        </div>
        <div className="trade-type">
          <button className={leverage === 1 ? 'active' : ''} onClick={() => setLeverage(1)}>Cross</button>
          <button className={leverage === 10 ? 'active' : ''} onClick={() => setLeverage(10)}>10.00x</button>
        </div>
        <div className="leverage">
          <button className={!isMarketOrder ? 'active' : ''} onClick={() => setIsMarketOrder(false)}>Limit</button>
          <button className={isMarketOrder ? 'active' : ''} onClick={() => setIsMarketOrder(true)}>Market</button>
        </div>
        <input 
          type="number" 
          value={tradeAmount} 
          onChange={(e) => setTradeAmount(e.target.value)} 
          placeholder="0.00"
        />
        <div className="percentage-buttons">
          <button onClick={() => setTradeAmountPercentage(10)}>10%</button>
          <button onClick={() => setTradeAmountPercentage(25)}>25%</button>
          <button onClick={() => setTradeAmountPercentage(50)}>50%</button>
          <button onClick={() => setTradeAmountPercentage(75)}>75%</button>
        </div>
        <div style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Value</span>
            <span>{value.toFixed(2)} USDT</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Cost</span>
            <span>{cost.toFixed(2)} USDT</span>
          </div>
        </div>
        <div className="buy-sell-buttons">
          <button className="buy-button" onClick={() => placeTrade(true)}>Buy</button>
          <button className="sell-button" onClick={() => placeTrade(false)}>Sell</button>
        </div>
        <div className="balance-info">
          <div>
            <span>Initial Margin</span>
            <span style={{ color: '#34D399' }}>25.00%</span>
          </div>
          <div>
            <span>Maintenance Margin</span>
            <span style={{ color: '#34D399' }}>25.00%</span>
          </div>
          <div>
            <span>Margin Balance</span>
            <span>1,030.4007 USDT</span>
          </div>
          <div>
            <span>Available Balance</span>
            <span>{availableBalance.toFixed(4)} USDT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingPanel;