import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import EventDetails from './pages/EventDetails';
// import CreateEvent from './pages/CreateEvent';
// import Login from './pages/Login';
// import Register from './pages/Register';
import './App.css';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
