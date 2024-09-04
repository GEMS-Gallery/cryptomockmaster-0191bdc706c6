import React from 'react';

function WalletModal({ onClose, onConnectInternetIdentity }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Select Wallet</h2>
        <ul className="wallet-list">
          <li><button onClick={onConnectInternetIdentity}>Internet Identity</button></li>
          <li><button onClick={() => alert('Plug Wallet connection not implemented yet')}>Plug Wallet</button></li>
          <li><button onClick={() => alert('Stoic Wallet connection not implemented yet')}>Stoic Wallet</button></li>
        </ul>
      </div>
    </div>
  );
}

export default WalletModal;