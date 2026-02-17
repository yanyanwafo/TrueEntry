import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SensorCard from './SensorCard';
import ViolationItem from './ViolationItem';
import DashboardStats from './DashboardStats';
import LogoutModal from './LogoutModal';
import './dashboard.css';

export default function Dashboard({ onLogout }) {
  const [sensors, setSensors] = useState([]);
  const [violations, setViolations] = useState([]);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:4000/sensors').then(res => setSensors(res.data)).catch(() => {});
      axios.get('http://localhost:4000/violations').then(res => setViolations(res.data)).catch(() => {});
    };
    
    fetchData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleLogoutConfirm = () => {
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Smart IoT Decibel Meter — Control Center</h1>
        <div className="header-controls">
          <button 
            className={`refresh-btn ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
            title="Auto-refresh every 5 seconds"
          >
            {autoRefresh ? '🔄 Auto-Refresh ON' : '⏸ Auto-Refresh OFF'}
          </button>
          <button 
            className="logout-btn"
            onClick={() => setShowLogoutModal(true)}
            title="Sign out"
          >
            👤 Sign Out
          </button>
        </div>
      </header>

      <DashboardStats sensors={sensors} violations={violations} />

      <div className="dashboard">
        {/* Monitoring Overview */}
        <div className="section monitoring-overview">
          <h2>Monitoring Overview</h2>
          <p>Real-time noise monitoring and system status</p>
        </div>

        {/* Registered Sensors */}
        <div className="section full-width">
          <h2>Registered IoT Decibel Sensors</h2>
          <div className="sensor-grid">
            {sensors.length === 0 ? (
              <p className="empty-state">No sensors connected. Waiting for data...</p>
            ) : (
              sensors.map(s => (
                <SensorCard 
                  key={s._id || s.id} 
                  name={s.name} 
                  location={s.location} 
                  level={s.currentLevel} 
                  threshold={s.threshold} 
                />
              ))
            )}
          </div>
        </div>

        {/* Violation Records */}
        <div className="section violations">
          <div className="violations-header">
            <h2>Violation Records</h2>
            <button 
              className="filter-btn"
              onClick={() => setShowOnlyActive(!showOnlyActive)}
            >
              {showOnlyActive ? "📊 All" : "🚨 Active"}
            </button>
          </div>
          {violations.length === 0 ? (
            <p className="empty-state">✅ No violations detected</p>
          ) : (
            <ul className="violations-list">
              {violations
                .filter(v => !showOnlyActive || v.level > 60)
                .map(v => (
                  <ViolationItem 
                    key={v._id || v.id} 
                    sensor={v.sensorId} 
                    level={v.level} 
                    timestamp={v.timestamp} 
                  />
                ))}
            </ul>
          )}
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal 
          onConfirm={handleLogoutConfirm} 
          onCancel={() => setShowLogoutModal(false)} 
        />
      )}
    </div>
  );
}
