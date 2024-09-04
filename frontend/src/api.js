const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const ICP_ID = 'internet-computer';

async function handleApiError(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchICPPrice(vsCurrency = 'usd') {
  const url = `${API_BASE_URL}/simple/price?ids=${ICP_ID}&vs_currencies=${vsCurrency}`;
  try {
    const response = await fetch(url);
    const data = await handleApiError(response);
    return data[ICP_ID][vsCurrency];
  } catch (error) {
    console.error('Error fetching ICP price:', error);
    throw error;
  }
}

export async function fetchICPData() {
  const url = `${API_BASE_URL}/coins/${ICP_ID}`;
  try {
    const response = await fetch(url);
    const data = await handleApiError(response);
    return {
      currentPrice: data.market_data.current_price.usd,
      marketCap: data.market_data.market_cap.usd,
      volume24h: data.market_data.total_volume.usd,
      priceChange24h: data.market_data.price_change_percentage_24h,
      circulatingSupply: data.market_data.circulating_supply
    };
  } catch (error) {
    console.error('Error fetching ICP data:', error);
    throw error;
  }
}

export async function fetchICPPriceHistory(days = 30) {
  const url = `${API_BASE_URL}/coins/${ICP_ID}/market_chart?vs_currency=usd&days=${days}`;
  try {
    const response = await fetch(url);
    const data = await handleApiError(response);
    return data.prices.map(item => ({
      timestamp: item[0],
      price: item[1]
    }));
  } catch (error) {
    console.error('Error fetching ICP price history:', error);
    throw error;
  }
}

export async function fetchOrderbook() {
  try {
    const response = await fetch('/api/fetchBinanceOrderbook');
    const data = await handleApiError(response);
    return {
      bids: data.bids.map(([price, quantity]) => ({ price: parseFloat(price), quantity: parseFloat(quantity) })),
      asks: data.asks.map(([price, quantity]) => ({ price: parseFloat(price), quantity: parseFloat(quantity) }))
    };
  } catch (error) {
    console.error('Error fetching orderbook:', error);
    throw error;
  }
}