import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      This is About Us Component made by {a.state.name + " " + a.state.title}
    </div>
  )
}

export default About
