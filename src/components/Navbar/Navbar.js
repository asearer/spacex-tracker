import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        
        <li><Link to="/upcominglaunches">Upcoming Launches</Link></li>
        <li><Link to="/pastlaunches">Past Launches</Link></li>
        <li><Link to="/launches">All Launches</Link></li>
        <li><Link to="/successful">Successful</Link></li>
        <li><Link to="/failed">Failed</Link></li>
        <li><Link to="/links">Links</Link></li>
        <li><Link to="/about">About</Link></li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
