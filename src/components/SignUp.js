import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8fafc', 
    fontFamily: '"Inter", sans-serif',
  },
  inputGroup: { marginBottom: '20px', position: 'relative' }, 
  label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '13px' },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  },

  toggleBtn: {
    position: 'absolute',
    right: '12px',
    top: '38px', 
    background: 'none',
    border: 'none',
    color: '#6366f1',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' },
  link: { color: '#6366f1', cursor: 'pointer', fontWeight: '600', marginLeft: '5px' }
};

const Signup = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });


  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account created for ${formData.fullName}!`);
  };

  return (
    <main style={styles.wrapper}>
      <Card
        title="Smart IoT Decibel Meter"
        subtitle="Create your account"
        elevation="medium"
      >
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="fullName" style={styles.label}>Full Name</label>
            <input 
              id="fullName"
              type="text" 
              placeholder="Enter your name" 
              style={styles.input}
              value={formData.fullName}
              onChange={handleChange}
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Work Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="you@company.com" 
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input 
              id="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Create a password" 
              style={{ ...styles.input, paddingRight: '60px' }} 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            
            <button 
              type="button" 
              style={styles.toggleBtn} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Button type="submit" variant="primary" fullWidth style={{ marginTop: '10px' }}>
            Create Account
          </Button>
        </form>

        <div style={styles.footer}>
          <span>Already have an account?</span>
          <span style={styles.link} onClick={onNavigate}>
            Sign In
          </span>
        </div>
      </Card>
    </main>
  );
};

export default Signup;