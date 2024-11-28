// 7.17 - NavBar
import React from 'react';
import { Link } from 'react-router-dom';
import '../app.css';

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar-container">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Blogs
        </Link>
        <Link to="/users" className="navbar-link">
          Users
        </Link>
      </div>
      {user && (
        <div className="navbar-user-info">
          <span className="navbar-user-text">{user.name} logged in</span>
          <button className="navbar-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
