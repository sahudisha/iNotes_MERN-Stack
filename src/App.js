import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
// Even if importing from react-router works today, it’s not the intended public API for web apps. Using react-router-dom keeps your code future-proof and aligned with the official ecosystem.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              {/* Exact is not required in latest react-router-dom */}
              <Route path='/' element={
                <Home showAlert={showAlert} />
              }></Route>
              <Route path='/about' element={
                <About showAlert={showAlert} />
              }></Route>
              <Route path='/login' element={
                <Login showAlert={showAlert} />
              }></Route>
              <Route path='/signup' element={
                <Signup showAlert={showAlert} />
              }></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
