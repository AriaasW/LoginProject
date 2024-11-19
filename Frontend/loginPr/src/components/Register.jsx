import React from "react";
import InputForm from "./Input";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios'


export default function Register() {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [gender, setGender] = useState('male');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigate();
    const leng = "User must contain more than 3 characters";
    const pass = "Password must contain more than 5 characters";

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setMessage('')
            const response = await axios.post("http://127.0.0.1:8000/users/", {
                username: username,
                password: password,
                gender: gender,
            });
            console.log("User created", response.data)
            setUser('');
            setPass('');
            setGender('male');
            setError('');
            setMessage('User created successfully!')
        } catch (err) {
            setError('Username already exists, try another one.')
        }
    } 

    return (
        <div className="register">
            <InputForm value={username} label={'Username'} onChange={(e) => setUser(e.target.value)} />
            <span>
                {username.length > 0 && username.length < 4 ? <p className="ee">{leng}</p> : null}
            </span>
            <InputForm value={password} label={'Password'} type="password" onChange={(e) => setPass(e.target.value)}/>
            <span>
                {password.length > 0 && password.length < 6 ? <p className="ee">{pass}</p> : null}
            </span>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='mcp'>MCP</option>
            </select>
            <button 
            onClick={handleRegister}
            disabled={username.length < 4 || password.length < 6}>Register</button>
            <button onClick={() => navigation('/')}>Home</button>
            {error ? <p>{error}</p> : <p>{message}</p>}
        </div>
    )
}