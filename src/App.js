import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
// Even if importing from react-router works today, it’s not the intended public API for web apps. Using react-router-dom keeps your code future-proof and aligned with the official ecosystem.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Routes>
            {/* Exact is not required in latest react-router-dom */}
            <Route path='/' element={
              <Home />
            }></Route>
            <Route path='/about' element={
              <About />
            }></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
