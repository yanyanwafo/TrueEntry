import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';

const styles = {
  wrapper: { display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: '#f8fafc', 
    fontFamily: '"Inter", sans-serif' 
},
  inputGroup: { marginBottom: '20px', 
    position: 'relative' 
},
  label: { display: 'block', 
    marginBottom: '6px', 
    fontWeight: '600', 
    color: '#334155', 
    fontSize: '13px' 
},
  input: { width: '100%', 
    padding: '12px 16px', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1', 
    fontSize: '16px', 
    boxSizing: 'border-box' 
},
  toggleBtn: { position: 'absolute', 
    right: '12px', 
    top: '38px', 
    background: 'none', 
    border: 'none', 
    color: '#6366f1', 
    fontSize: '11px', 
    fontWeight: '700', 
    cursor: 'pointer' 
},
  statusBox: { marginTop: '24px', 
    padding: '12px', 
    borderRadius: '8px', 
    backgroundColor: '#f1f5f9', 
    fontSize: '12px', 
    color: '#475569', 
    display: 'flex', 
    justifyContent: 'space-between' 
},
  indicator: { height: '8px', 
    width: '8px', 
    borderRadius: '50%', 
    display: 'inline-block', 
    marginRight: '5px' 
}
};

const Login = ({ onNavigate }) => {
  // 1. DYNAMIC DATA: Local object simulating system status
  const systemStatus = {
    server: "Online",
    version: "v2.4.1",
    load: "Low",
    color: "#10b981" 
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main style={styles.wrapper}>
      <Card
        title="Smart IoT Decibel Meter"
        subtitle="Sign in to monitor decibel readings and device status."
        elevation="medium"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@smartiot.com" required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              style={styles.input} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
            <button type="button" style={styles.toggleBtn} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <Button type="submit" variant="primary" fullWidth style={{ marginTop: '12px' }}>
            Login
          </Button>
        </form>

        {/* 2. DYNAMIC RENDERING: Using the systemStatus object */}
        <div style={styles.statusBox}>
          <span>
            <span style={{ ...styles.indicator, backgroundColor: systemStatus.color }}></span>
            System: <strong>{systemStatus.server}</strong>
          </span>
          <span>Load: <strong>{systemStatus.load}</strong></span>
          <span>{systemStatus.version}</span>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          <span style={{ color: '#64748b' }}>New to the platform?</span>
          <span style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '600', marginLeft: '5px' }} onClick={onNavigate}>
            Create Account
          </span>
        </div>
      </Card>
    </main>
  );
};

export default Login;