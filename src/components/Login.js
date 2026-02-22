import React, { useMemo, useState } from 'react';
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
  inputGroup: {
    marginBottom: '20px',
    position: 'relative',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#334155',
    fontSize: '13px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    boxSizing: 'border-box',
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
  },
  statusBox: {
    marginTop: '24px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#f1f5f9',
    fontSize: '12px',
    color: '#475569',
    display: 'flex',
    justifyContent: 'space-between',
  },
  indicator: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '5px',
  },
  helperText: {
    marginTop: '6px',
    fontSize: '12px',
    color: '#dc2626',
  },
  submitMessage: {
    marginTop: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    backgroundColor: '#ecfeff',
    border: '1px solid #99f6e4',
    color: '#0f766e',
  },
};

const Login = ({ onNavigateToSignup, onAuthSuccess }) => {
  const systemStatus = {
    server: 'Online',
    version: 'v2.4.1',
    load: 'Low',
    color: '#10b981',
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const isFormValid = useMemo(
    () => formData.email.trim().length > 0 && formData.password.trim().length > 0,
    [formData.email, formData.password]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      email: formData.email.trim() ? '' : 'Email is required.',
      password: formData.password.trim() ? '' : 'Password is required.',
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      setSubmitMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Signing in...');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Login successful. Redirecting to dashboard...');
      if (onAuthSuccess) {
        const fallbackName = formData.email.split('@')[0] || 'User';
        const normalizedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
        onAuthSuccess({ name: normalizedName });
      }
    }, 600);
  };

  return (
    <main style={styles.wrapper}>
      <Card
        title="Smart IoT Decibel Meter"
        subtitle="Sign in to monitor decibel readings and device status."
        elevation="medium"
      >
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              style={styles.input}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@smartiot.com"
            />
            {errors.email && <div style={styles.helperText}>{errors.email}</div>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              style={styles.input}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            <button type="button" style={styles.toggleBtn} onClick={() => setShowPassword((previous) => !previous)}>
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
            {errors.password && <div style={styles.helperText}>{errors.password}</div>}
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          {submitMessage && <div style={styles.submitMessage}>{submitMessage}</div>}
        </form>

        <div style={styles.statusBox}>
          <span>
            <span style={{ ...styles.indicator, backgroundColor: systemStatus.color }} />
            System: <strong>{systemStatus.server}</strong>
          </span>
          <span>Load: <strong>{systemStatus.load}</strong></span>
          <span>{systemStatus.version}</span>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          <span style={{ color: '#64748b' }}>New to the platform?</span>
          <span
            role="button"
            tabIndex={0}
            style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '600', marginLeft: '5px' }}
            onClick={onNavigateToSignup}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onNavigateToSignup();
              }
            }}
          >
            Create Account
          </span>
        </div>
      </Card>
    </main>
  );
};

export default Login;
