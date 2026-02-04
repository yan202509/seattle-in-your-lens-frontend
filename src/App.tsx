import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import type { User } from './types';
import Login from './pages/Login';

import './App.css';
import NoMatch from './pages/NoMatch';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // check if getting the user succesfullu from backend
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };


return (
    <>
      <Navbar 
        currentUser={currentUser} 
        onLogout={handleLogout}
      />

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails currentUser={currentUser} />} />
        <Route path="/create" element={<CreateEvent currentUser={currentUser} />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </>
  );
}

export default App;
