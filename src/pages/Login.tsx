import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types.ts';
import api from '../api/axios';

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
        } catch (err) {
            alert("Invalid username or password");
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;