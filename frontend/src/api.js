const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const ICP_ID = 'internet-computer';

export async function fetchICPPrice(vsCurrency = 'usd') {
  const url = `${API_BASE_URL}/simple/price?ids=${ICP_ID}&vs_currencies=${vsCurrency}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data[ICP_ID][vsCurrency];
  } catch (error) {
    console.error('Error fetching ICP price:', error);
    return null;
  }
}

export async function fetchICPData() {
  const url = `${API_BASE_URL}/coins/${ICP_ID}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      currentPrice: data.market_data.current_price.usd,
      marketCap: data.market_data.market_cap.usd,
      volume24h: data.market_data.total_volume.usd,
      priceChange24h: data.market_data.price_change_percentage_24h,
      circulatingSupply: data.market_data.circulating_supply
    };
  } catch (error) {
    console.error('Error fetching ICP data:', error);
    return null;
  }
}

export async function fetchICPPriceHistory(days = 30) {
  const url = `${API_BASE_URL}/coins/${ICP_ID}/market_chart?vs_currency=usd&days=${days}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.prices.map(item => ({
      timestamp: item[0],
      price: item[1]
    }));
  } catch (error) {
    console.error('Error fetching ICP price history:', error);
    return null;
  }
}

export async function fetchOrderbook() {
  try {
    const response = await fetch('/api/fetchBinanceOrderbook');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      bids: data.bids.map(([price, quantity]) => ({ price: parseFloat(price), quantity: parseFloat(quantity) })),
      asks: data.asks.map(([price, quantity]) => ({ price: parseFloat(price), quantity: parseFloat(quantity) }))
    };
  } catch (error) {
    console.error('Error fetching orderbook:', error);
    return null;
  }
}