import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Top Section: Logo + Search */}
      <div className="navbar-top">
        <Link to="/" className="logo-link">
          <span className="brand-name" style={{ fontSize: '40px' }}>ExamFobia</span>
        </Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search books ..."
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      {/* Bottom Section: Menu */}
      <div className="navbar-bottom">
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li className="dropdown">
            <span>Downloads</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/papers">Previous Year Question Papers</Link>

              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
