import React from 'react';

function Header({ isAuthenticated, userPrincipal, onSelectWallet, onLogout }) {
  return (
    <header>
      <div>
        <span style={{ fontWeight: 'bold' }}>Josh Exchange</span>
        <span style={{ marginLeft: '1rem' }}>ICP ▼</span>
      </div>
      <div className="user-info">
        {isAuthenticated ? (
          <>
            <span>{`Connected: ${userPrincipal.slice(0, 5)}...${userPrincipal.slice(-5)}`}</span>
            <button onClick={onLogout} className="select-wallet">Logout</button>
          </>
        ) : (
          <button onClick={onSelectWallet} className="select-wallet">Select Wallet</button>
        )}
      </div>
    </header>
  );
}

export default Header;