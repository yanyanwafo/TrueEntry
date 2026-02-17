import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('login'); // 'login', 'signup', 'dashboard'

  return (
    <div className="App">
      {view === 'login' ? (
        <Login onNavigate={() => setView('signup')} />
      ) : view === 'signup' ? (
        <Signup onNavigate={() => setView('login')} />
      ) : (
        <Dashboard onLogout={() => setView('login')} />
      )}
    </div>
  );
}

export default App;