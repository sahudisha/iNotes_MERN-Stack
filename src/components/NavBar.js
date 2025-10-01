import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
   
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" end>iNotes</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>About</NavLink>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('auth-token') ?
                    <form className="d-flex">
                        <NavLink to="/login" className="btn btn-primary mx-1" role="button">Login</NavLink>
                        <NavLink to="/signup" className="btn btn-primary mx-1" role="button">Signup</NavLink>
                    </form>
                    :
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    );
}

export default NavBar;
