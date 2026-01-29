// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
        <h1>nav bar thing: Seattle In Your Lens</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Event</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>
    </nav>
    );
}

export default Navbar;
