import React, { useState } from 'react';
import './logoutModal.css';

export default function LogoutModal({ onConfirm, onCancel }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onConfirm();
    }, 800);
  };

  return (
    <div className="logout-modal-overlay" onClick={onCancel}>
      <div className={`logout-modal ${isConfirming ? 'confirming' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="logout-icon">👋</div>
        <h2>Ready to leave?</h2>
        <p>Your monitoring session will end. You can log back in anytime.</p>
        
        <div className="logout-modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Stay Connected
          </button>
          <button className="btn-confirm" onClick={handleConfirm}>
            {isConfirming ? '✓ Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
