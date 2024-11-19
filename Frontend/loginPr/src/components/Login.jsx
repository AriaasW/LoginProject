import React, { useState } from "react";
import InputForm from "./Input";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Login({ setSelected }) {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigate();

    const handleUser = (e) => {
        setUser(e.target.value)
    }

    const handlePass = (e) => {
        setPass(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setResult('');
            setError('');
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: username,
                password: password
            });
            console.log("User checked:", response.data);
            setResult(response.data);
            setSelected(username);
            navigation('/logged');
            setUser('');
            setPass('');
        }
        catch (err) {
            setError("Invalid username or password");
        }
    }

    return (
        <div className="login">
            <div className="inputForm">
                <InputForm
                label={'Username'}
                value={username}
                onChange={handleUser} />
                <InputForm
                label={'Password'}
                type="password"
                value={password}
                onChange={handlePass} />
            </div>
            <button
                onClick={handleLogin}
                disabled={username === '' || password === ''}>Login</button>
            <button
                onClick={() => navigation('/')}
                onKeyDown={handleKeyDown}>Home</button>
            {result.message ? <p className="errr">{result.message}</p> : <p>{error}</p>}
        </div>
    )
}




