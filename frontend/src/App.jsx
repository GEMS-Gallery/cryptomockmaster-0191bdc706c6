import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import Header from './components/Header';
import Chart from './components/Chart';
import TradingPanel from './components/TradingPanel';
import WalletModal from './components/WalletModal';
import { fetchICPData, fetchICPPriceHistory, fetchOrderbook } from './api';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange24h, setPriceChange24h] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [orderbook, setOrderbook] = useState(null);
  const [currentTimeframe, setCurrentTimeframe] = useState(30);

  useEffect(() => {
    initAuthClient();
    updatePriceInfo();
    updateChart(currentTimeframe);
    updateOrderbook();

    const priceInterval = setInterval(updatePriceInfo, 60000);
    const orderbookInterval = setInterval(updateOrderbook, 5000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(orderbookInterval);
    };
  }, []);

  const initAuthClient = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);
      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);
      if (isAuth) {
        const identity = await client.getIdentity();
        setUserPrincipal(identity.getPrincipal().toString());
      }
    } catch (error) {
      console.error('Error initializing auth client:', error);
    }
  };

  const updatePriceInfo = async () => {
    try {
      const data = await fetchICPData();
      if (data) {
        setCurrentPrice(data.currentPrice);
        setPriceChange24h(data.priceChange24h);
      }
    } catch (error) {
      console.error('Error updating price info:', error);
    }
  };

  const updateChart = async (days) => {
    try {
      setCurrentTimeframe(days);
      const priceHistory = await fetchICPPriceHistory(days);
      if (priceHistory) {
        setChartData(priceHistory);
      }
    } catch (error) {
      console.error('Error updating chart:', error);
    }
  };

  const updateOrderbook = async () => {
    try {
      const data = await fetchOrderbook();
      if (data) {
        setOrderbook(data);
      }
    } catch (error) {
      console.error('Error updating orderbook:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          setIsAuthenticated(true);
          setShowWalletModal(false);
          initAuthClient(); // Re-initialize to get the updated principal
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setUserPrincipal('');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Header 
          isAuthenticated={isAuthenticated}
          userPrincipal={userPrincipal}
          onSelectWallet={() => setShowWalletModal(true)}
          onLogout={handleLogout}
        />
        <main>
          <Chart 
            data={chartData}
            currentTimeframe={currentTimeframe}
            onTimeframeChange={updateChart}
            currentPrice={currentPrice}
            priceChange24h={priceChange24h}
          />
          <TradingPanel 
            orderbook={orderbook}
            currentPrice={currentPrice}
          />
        </main>
        {showWalletModal && (
          <WalletModal 
            onClose={() => setShowWalletModal(false)}
            onConnectInternetIdentity={handleLogin}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;