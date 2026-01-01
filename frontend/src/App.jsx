import { useState } from 'react';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('profile');

  const handleLogin = () => setCurrentPage('profile');
  const handleLogout = () => setCurrentPage('login');

  return (
    <div className="App">
      {currentPage === 'profile' ? (
        <Profile onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
