import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [credential, setCredential] = useState({ email: '', password: '' })
    const host = 'http://localhost:5000/api'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const parsedJson = await response.json();
        if (parsedJson.success) {
            //Save Token in LocalStorage and Redirect
            localStorage.setItem('auth-token', parsedJson.authtoken)
            navigate('/');
        }
        else {
            alert('Invalid Credentials!!!');
        }
        console.log(parsedJson);
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login