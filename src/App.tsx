import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import type { User } from './types';

import './App.css';
import NoMatch from './pages/NoMatch';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = () => {
    setCurrentUser({ id: 1, username: "Seattle1" });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };


return (
    <>
      <Navbar 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails currentUser={currentUser} />} />
        <Route path="/create" element={<CreateEvent currentUser={currentUser} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
