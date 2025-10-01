import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      This is About Page
    </div>
  )
}

export default About
