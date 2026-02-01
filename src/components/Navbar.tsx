import { Link } from 'react-router-dom';
import type { User } from '../pages/Login';



interface NavbarProps {
    currentUser: User | null;
    onLogin: () => void;
    onLogout: () => void;
}


function Navbar({ currentUser, onLogin, onLogout }: NavbarProps) {
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
                <button onClick={onLogin}>Log In (Seattle1)</button>
            )}
        </ul>
    </nav>
    );
}

export default Navbar;
