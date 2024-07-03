import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">

      <div className="collapse navbar-collapse container" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="all">
              All Expenses
            </a>
          </li>
        </ul>
      </div>
      <div className="container justify-content-center">
        <h1 className="fw-bold">Personal Finance Tracker</h1>
      </div>
      
      <div className="container"></div>
    </nav>
  );
};

export default Navbar;
