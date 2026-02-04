import { Link } from 'react-router-dom';
import type { User } from '../types';

import './Navbar.css';

interface NavbarProps {
    currentUser: User | null;
    onLogout: () => void;
}


function Navbar({ currentUser,  onLogout }: NavbarProps) {
    return (
        <nav className="main-navbar">
        <h1 className="nav-logo">Seattle In Your Lens</h1>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/create">Create Event</Link></li>
            {currentUser ? (
                <div className="user-section">
                    <span className="username">Logged in as: {currentUser.username}</span>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            ) : (
                <li><Link to="/login" className="login-link">Login</Link></li>
            )}
        </ul>
    </nav>
    );
}

export default Navbar;
