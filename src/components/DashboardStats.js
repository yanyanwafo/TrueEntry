import React, { useState, useEffect } from 'react';
import './dashboardStats.css';

export default function DashboardStats({ sensors = [], violations = [] }) {
  const [animating, setAnimating] = useState(true);
  const [displayStats, setDisplayStats] = useState({
    active: 0,
    violations: 0,
    avgNoise: 0,
  });

  useEffect(() => {
    
    setAnimating(true);
    const timer = setTimeout(() => {
      const violationCount = violations.filter(v => v.level > 60).length;
      const avgNoise = sensors.length > 0
        ? Math.round(sensors.reduce((sum, s) => sum + (s.currentLevel || 0), 0) / sensors.length)
        : 0;

      setDisplayStats({
        active: sensors.length,
        violations: violationCount,
        avgNoise: avgNoise,
      });
      setAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [sensors, violations]);

  return (
    <div className="dashboard-stats">
      <div className={`stat-card ${animating ? 'animating' : ''}`}>
        <div className="stat-icon">📡</div>
        <div className="stat-content">
          <div className="stat-label">Active Sensors</div>
          <div className="stat-value">{displayStats.active}</div>
        </div>
      </div>

      <div className={`stat-card alert ${animating ? 'animating' : ''}`}>
        <div className="stat-icon">🚨</div>
        <div className="stat-content">
          <div className="stat-label">Violations</div>
          <div className="stat-value">{displayStats.violations}</div>
        </div>
      </div>

      <div className={`stat-card ${animating ? 'animating' : ''}`}>
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <div className="stat-label">Avg Noise Level</div>
          <div className="stat-value">{displayStats.avgNoise} <span className="unit">dB</span></div>
        </div>
      </div>
    </div>
  );
}
