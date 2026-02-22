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
    marginBottom: '8px',
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
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#64748b',
  },
  link: {
    color: '#6366f1',
    cursor: 'pointer',
    fontWeight: '600',
    marginLeft: '5px',
  },
  helperText: {
    marginTop: '6px',
    fontSize: '12px',
    color: '#dc2626',
  },
  successText: {
    marginTop: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #86efac',
    color: '#166534',
  },
  passwordHint: {
    marginTop: '6px',
    fontSize: '12px',
    color: '#64748b',
  },
};

const Signup = ({ onNavigateToLogin, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const passwordStrength = useMemo(() => {
    const length = formData.password.length;
    if (length >= 10) {
      return 'Strong';
    }
    if (length >= 6) {
      return 'Medium';
    }
    if (length > 0) {
      return 'Weak';
    }
    return 'Not set';
  }, [formData.password]);

  const isFormValid = useMemo(
    () => Boolean(formData.fullName.trim() && formData.email.trim() && formData.password.trim()),
    [formData.fullName, formData.email, formData.password]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      fullName: formData.fullName.trim() ? '' : 'Full name is required.',
      email: formData.email.trim() ? '' : 'Email is required.',
      password: formData.password.trim() ? '' : 'Password is required.',
    };

    setErrors(nextErrors);

    if (nextErrors.fullName || nextErrors.email || nextErrors.password) {
      setSubmitMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Creating your account...');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage(`Account created for ${formData.fullName}. Redirecting...`);
      if (onAuthSuccess) {
        onAuthSuccess({ name: formData.fullName });
      }
    }, 700);
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
              name="fullName"
              type="text"
              placeholder="Enter your name"
              style={styles.input}
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <div style={styles.helperText}>{errors.fullName}</div>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Work Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div style={styles.helperText}>{errors.email}</div>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              style={{ ...styles.input, paddingRight: '60px' }}
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              style={styles.toggleBtn}
              onClick={() => setShowPassword((previous) => !previous)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            <div style={styles.passwordHint}>Password strength: {passwordStrength}</div>
            {errors.password && <div style={styles.helperText}>{errors.password}</div>}
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>

          {submitMessage && <div style={styles.successText}>{submitMessage}</div>}
        </form>

        <div style={styles.footer}>
          <span>Already have an account?</span>
          <span
            role="button"
            tabIndex={0}
            style={styles.link}
            onClick={onNavigateToLogin}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onNavigateToLogin();
              }
            }}
          >
            Sign In
          </span>
        </div>
      </Card>
    </main>
  );
};

export default Signup;

