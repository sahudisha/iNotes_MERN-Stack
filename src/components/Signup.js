import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credential, setCredential] = useState({ name: '', email: '', password: '' })
  const host = 'http://localhost:5000/api'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      //Save Token in LocalStorage and Redirect
      localStorage.setItem('auth-token', jsonResponse.authtoken)
      navigate('/');
      props.showAlert('Account Created Successfully','success')
    }
    else {
      props.showAlert('Invalid User','danger');
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credential.name} onChange={onChange} />
        </div>
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

export default Signup