import React, { useCallback, useEffect, useState } from 'react';
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';

const ROUTES = {
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
};

const getInitialPath = () => window.location.pathname;

function App() {
  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('isAuthenticated') === 'true');
  const [authUserName, setAuthUserName] = useState(() => sessionStorage.getItem('authUserName') || 'User');

  const navigate = useCallback((path, replace = false) => {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  }, []);

  useEffect(() => {
    if (!Object.values(ROUTES).includes(currentPath)) {
      navigate(ROUTES.login, true);
      return;
    }

    if (!isAuthenticated && currentPath === ROUTES.dashboard) {
      navigate(ROUTES.login, true);
      return;
    }

    if (isAuthenticated && (currentPath === ROUTES.login || currentPath === ROUTES.signup)) {
      navigate(ROUTES.dashboard, true);
    }
  }, [currentPath, isAuthenticated, navigate]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAuthSuccess = (user = {}) => {
    const nextUserName = (user.name || '').trim() || 'User';
    setIsAuthenticated(true);
    setAuthUserName(nextUserName);
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('authUserName', nextUserName);
    navigate(ROUTES.dashboard);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthUserName('User');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('authUserName');
    navigate(ROUTES.login);
  };

  if (currentPath === ROUTES.signup) {
    return (
      <div className="App">
        <Signup onNavigateToLogin={() => navigate(ROUTES.login)} onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  if (currentPath === ROUTES.dashboard && isAuthenticated) {
    return (
      <div className="App">
        <Dashboard onLogout={handleLogout} userName={authUserName} />
      </div>
    );
  }

  return (
    <div className="App">
      <Login onNavigateToSignup={() => navigate(ROUTES.signup)} onAuthSuccess={handleAuthSuccess} />
    </div>
  );
}

export default App;
