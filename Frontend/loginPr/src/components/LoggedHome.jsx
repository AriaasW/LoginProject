import { useState } from 'react';
import image from '../assets/correct.jpg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoggedHome({ selected }) {
    const navigate = useNavigate()
    const [res, setRes] = useState('');
    const [err, setErr] = useState('');
  
    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Are you sure you want to delete your account?")

        if (!confirmation) {
            return null;
        } 
        try {
            setRes('')
            const response = await axios.post("http://127.0.0.1:8000/delete/", {
                username: selected
            })
            setRes(response);
            alert("Account deleted!")
            navigate('/');
        }
        catch(err) {
            setErr("Failed to delete your account!")
        }
    }

    return (
        <div className='log'>
            <div className='style1'>
                <h1>Logged in</h1>
                <img src={image}></img>
            </div>
            <div className='style2'>
                <span>Logged as: {selected}</span>
                <button onClick={() => navigate('/')}>log out</button>
                <button onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
    )
}