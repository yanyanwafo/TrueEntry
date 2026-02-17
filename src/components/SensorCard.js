import React, { useState } from 'react';
import './sensorCard.css';

export default function SensorCard({ name, location, level, threshold }) {
  const [expanded, setExpanded] = useState(false);
  const isViolation = level > threshold;
  const healthPercentage = Math.min((threshold / level) * 100, 100);

  return (
    <div className={`sensor-card ${isViolation ? 'violation' : ''} ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
      <div className="card-header">
        <div>
          <h3>{name}</h3>
          <p className="location">{location}</p>
        </div>
        <div className={`expand-icon ${expanded ? 'open' : ''}`}>▼</div>
      </div>

      <div className="level-display">
        <div className="level-bar">
          <div className="level-fill" style={{width: `${Math.min(level / 100 * 100, 100)}%`}}></div>
        </div>
        <p className="level-text">{level} dB</p>
      </div>

      {isViolation && <span className="alert">🚨 Violation</span>}

      {expanded && (
        <div className="card-details">
          <div className="detail-row">
            <span>Threshold:</span>
            <strong>{threshold} dB</strong>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <strong style={{color: isViolation ? '#ef4444' : '#10b981'}}>
              {isViolation ? 'Critical' : 'Safe'}
            </strong>
          </div>
          <div className="detail-row">
            <span>Health:</span>
            <div className="health-bar">
              <div className="health-fill" style={{width: `${Math.max(healthPercentage, 0)}%`, background: healthPercentage > 50 ? '#10b981' : healthPercentage > 25 ? '#f59e0b' : '#ef4444'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
