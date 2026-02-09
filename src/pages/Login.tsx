import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types.ts';
import api from '../api/axios';

import './Login.css';

interface LoginProps {
    onLoginSuccess: (user: User) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            const response = await api.post('/login', {
                username,
                password
            });

            
            onLoginSuccess(response.data);
            navigate('/');
        } catch {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="login-button">
                    LET'S EXPLORE →
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;