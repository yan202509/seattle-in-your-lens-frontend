import { Link } from 'react-router-dom';
import type { User } from '../types';



interface NavbarProps {
    currentUser: User | null;
    onLogout: () => void;
}


function Navbar({ currentUser,  onLogout }: NavbarProps) {
    return (
        <nav>
        <h1>nav bar thing: Seattle In Your Lens</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Event</Link></li>
            {currentUser ? (
                <div>
                    <span>Logged in as: {currentUser.username}</span>
                    <button onClick={onLogout}>Logout</button>
                </div>
            ) : (
                <li><Link to="/login">Login</Link></li>
            )}
        </ul>
    </nav>
    );
}

export default Navbar;
