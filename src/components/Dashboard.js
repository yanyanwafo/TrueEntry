import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SensorCard from './SensorCard';
import ViolationItem from './ViolationItem';
import DashboardStats from './DashboardStats';
import LogoutModal from './LogoutModal';
import './dashboard.css';

export default function Dashboard({ onLogout, userName = 'User' }) {
  const [sensors, setSensors] = useState([]);
  const [violations, setViolations] = useState([]);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:4000/sensors').then((res) => setSensors(res.data)).catch(() => {});
      axios.get('http://localhost:4000/violations').then((res) => setViolations(res.data)).catch(() => {});
    };

    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [autoRefresh]);

  const handleLogoutConfirm = () => {
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-inner">
          <div className="header-title-block">
            <p className="welcome-user">Welcome, {userName}</p>
            <h1>Smart IoT Decibel Meter - Control Center</h1>
          </div>
          <div className="header-controls">
            <button
              className={`refresh-btn ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
              title="Auto-refresh every 5 seconds"
            >
              {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
            </button>
            <button
              className="logout-btn"
              onClick={() => setShowLogoutModal(true)}
              title="Sign out"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <DashboardStats sensors={sensors} violations={violations} />

        <div className="dashboard-grid">
          <section className="section monitoring-overview">
            <h2>Monitoring Overview</h2>
            <p>Real-time noise monitoring and system status</p>
          </section>

          <section className="section full-width">
            <h2>Registered IoT Decibel Sensors</h2>
            <div className="sensor-grid">
              {sensors.length === 0 ? (
                <p className="empty-state">No sensors connected. Waiting for data...</p>
              ) : (
                sensors.map((sensor) => (
                  <SensorCard
                    key={sensor._id || sensor.id}
                    name={sensor.name}
                    location={sensor.location}
                    level={sensor.currentLevel}
                    threshold={sensor.threshold}
                  />
                ))
              )}
            </div>
          </section>

          <section className="section violations">
            <div className="violations-header">
              <h2>Violation Records</h2>
              <button
                className="filter-btn"
                onClick={() => setShowOnlyActive(!showOnlyActive)}
              >
                {showOnlyActive ? 'All' : 'Active'}
              </button>
            </div>
            {violations.length === 0 ? (
              <p className="empty-state">No violations detected</p>
            ) : (
              <ul className="violations-list">
                {violations
                  .filter((violation) => !showOnlyActive || violation.level > 60)
                  .map((violation) => (
                    <ViolationItem
                      key={violation._id || violation.id}
                      sensor={violation.sensorId}
                      level={violation.level}
                      timestamp={violation.timestamp}
                    />
                  ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
