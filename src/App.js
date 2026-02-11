import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/SignUp';

function App() {
  const [view, setView] = useState('login'); 

  return (
    <div className="App">
      {view === 'login' ? (
        <Login onNavigate={() => setView('signup')} />
      ) : (
        <Signup onNavigate={() => setView('login')} />
      )}
    </div>
  );
}

export default App;