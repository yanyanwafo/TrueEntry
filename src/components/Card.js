import React from 'react';

const Card = ({ 
  title, 
  subtitle, 
  children, 
  footer,
  elevation = 'medium',
  padding = 'default'
}) => {
  const elevationStyles = {
    low: { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    medium: { boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
    high: { boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' },
  };

  const paddingStyles = {
    small: '20px',
    default: '40px',
    large: '60px',
  };

  const styles = {
    container: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      ...elevationStyles[elevation],
      padding: paddingStyles[padding],
      width: '100%',
      maxWidth: '420px',
    },
    header: {
      marginBottom: title || subtitle ? '24px' : '0',
    },
    titleStyle: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#0f172a',
      margin: '0 0 8px 0',
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0',
    },
    body: {
      marginBottom: footer ? '24px' : '0',
    },
    footerStyle: {
      borderTop: '1px solid #e2e8f0',
      paddingTop: '16px',
      marginTop: '24px',
    },
  };

  return (
    <div style={styles.container}>
      {(title || subtitle) && (
        <div style={styles.header}>
          {title && <h2 style={styles.titleStyle}>{title}</h2>}
          {subtitle && <p style={styles.subtitleStyle}>{subtitle}</p>}
        </div>
      )}
      <div style={styles.body}>{children}</div>
      {footer && <div style={styles.footerStyle}>{footer}</div>}
    </div>
  );
};

export default Card;
