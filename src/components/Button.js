import React from 'react';

const Button = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  fullWidth = false,
  type = 'button' 
}) => {
  const baseStyles = {
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#6366f1',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)',
    },
    secondary: {
      backgroundColor: '#e2e8f0',
      color: '#0f172a',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    danger: {
      backgroundColor: '#ef4444',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.4)',
    },
  };

  const sizeStyles = {
    small: { padding: '8px 12px', fontSize: '12px' },
    medium: { padding: '12px 16px', fontSize: '14px' },
    large: { padding: '16px 24px', fontSize: '16px' },
  };

  const styles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <button 
      style={styles} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
      onMouseEnter={(e) => !disabled && (e.target.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
    >
      {children}
    </button>
  );
};

export default Button;
