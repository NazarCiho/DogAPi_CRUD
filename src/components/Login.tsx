import LabelWithInput from "./LabelWithInput"
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function onSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setError('');
        
        try {
            const response = await axios.post(`https://dogs.kobernyk.com/login`, {
                username,
                password
            });
            
            localStorage.setItem("token", response.data.token);
            navigate('/');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Помилка авторизації');
            console.error('Login error:', error);
        }
    }

    return <>    
        <div className="login-container">
            <h1>Сторінка авторизації</h1>
            <form onSubmit={onSubmit} className="login-form">
                <LabelWithInput 
                    type="text" 
                    labelText="Ім'я користувача" 
                    name="username" 
                    value={username} 
                    onChange={(value) => setUsername(value)} 
                />
                <LabelWithInput 
                    type="password" 
                    labelText="Пароль" 
                    name="password" 
                    value={password} 
                    onChange={(value) => setPassword(value)} 
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="login-button">Залогуватися</button>
            </form>    
        </div>
    </>
}

export default Login
