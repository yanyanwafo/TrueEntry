import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';

const Dashboard = ({ onLogout }) => {
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const mockDevices = [
    { id: 1, name: 'Living Room', decibels: 45, status: 'Normal' },
    { id: 2, name: 'Bedroom', decibels: 32, status: 'Quiet' },
    { id: 3, name: 'Kitchen', decibels: 62, status: 'Elevated' },
    { id: 4, name: 'Office', decibels: 58, status: 'Elevated' },
  ];

  const getStatusColor = (decibels) => {
    if (decibels < 40) return '#10b981'; // green
    if (decibels < 60) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const containerStyles = {
    main: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '24px',
      fontFamily: '"Inter", sans-serif',
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '16px',
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#0f172a',
      margin: '0',
    },
    controls: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    viewToggle: {
      display: 'flex',
      gap: '8px',
      backgroundColor: '#e2e8f0',
      padding: '4px',
      borderRadius: '8px',
    },
    toggleBtn: {
      padding: '6px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      color: '#64748b',
      transition: 'all 0.2s ease',
    },
    activeToggle: {
      backgroundColor: '#ffffff',
      color: '#0f172a',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
      gap: '20px',
      marginBottom: '24px',
    },
    deviceCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    deviceCardHover: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-4px)',
    },
    deviceName: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#0f172a',
      margin: '0 0 12px 0',
    },
    decibelDisplay: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '8px',
      marginBottom: '12px',
    },
    decibelValue: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#0f172a',
    },
    decibelUnit: {
      fontSize: '14px',
      color: '#64748b',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      marginBottom: '12px',
    },
    expandedContent: {
      borderTop: '1px solid #e2e8f0',
      paddingTop: '12px',
      marginTop: '12px',
    },
    expandedText: {
      fontSize: '12px',
      color: '#64748b',
      lineHeight: '1.6',
      margin: '8px 0',
    },
  };

  return (
    <div style={containerStyles.main}>
      <div style={containerStyles.wrapper}>
        {/* Header */}
        <div style={containerStyles.header}>
          <h1 style={containerStyles.title}>Smart IoT Decibel Meter</h1>
          <div style={containerStyles.controls}>
            <div style={containerStyles.viewToggle}>
              <button
                style={{
                  ...containerStyles.toggleBtn,
                  ...(viewMode === 'grid' ? containerStyles.activeToggle : {}),
                }}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                style={{
                  ...containerStyles.toggleBtn,
                  ...(viewMode === 'list' ? containerStyles.activeToggle : {}),
                }}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
            <Button onClick={onLogout} variant="secondary" size="small">
              Logout
            </Button>
          </div>
        </div>

        {/* Devices Grid */}
        <div style={containerStyles.grid}>
          {mockDevices.map((device) => (
            <div
              key={device.id}
              style={{
                ...containerStyles.deviceCard,
                ...(expandedDevice === device.id ? containerStyles.deviceCardHover : {}),
              }}
              onClick={() =>
                setExpandedDevice(expandedDevice === device.id ? null : device.id)
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                if (expandedDevice !== device.id) {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <h3 style={containerStyles.deviceName}>{device.name}</h3>
              <div
                style={{
                  ...containerStyles.statusBadge,
                  backgroundColor: getStatusColor(device.decibels),
                  color: '#ffffff',
                }}
              >
                {device.status}
              </div>
              <div style={containerStyles.decibelDisplay}>
                <span
                  style={{
                    ...containerStyles.decibelValue,
                    color: getStatusColor(device.decibels),
                  }}
                >
                  {device.decibels}
                </span>
                <span style={containerStyles.decibelUnit}>dB</span>
              </div>

              {/* Expandable Content */}
              {expandedDevice === device.id && (
                <div style={containerStyles.expandedContent}>
                  <p style={containerStyles.expandedText}>
                    <strong>Last Updated:</strong> 2 minutes ago
                  </p>
                  <p style={containerStyles.expandedText}>
                    <strong>Average:</strong> {device.decibels - 2} dB (24h)
                  </p>
                  <p style={containerStyles.expandedText}>
                    <strong>Peak:</strong> {device.decibels + 8} dB (today)
                  </p>
                  <Button
                    size="small"
                    variant="primary"
                    fullWidth
                    style={{ marginTop: '8px' }}
                  >
                    View Details
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <Card title="Summary" elevation="low">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#6366f1' }}>
                {mockDevices.length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Active Devices
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>
                {mockDevices.filter((d) => d.decibels < 40).length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Quiet
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#ef4444' }}>
                {mockDevices.filter((d) => d.decibels >= 60).length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Elevated
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
