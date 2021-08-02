import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className="header mb-3">
      <nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}}>
        <div className="container-fluid">
          <ul className="navbar-nav d-flex flex-row me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/login" activeClassName="active">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/register" activeClassName="active">
                Sign up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin-panel" activeClassName="active">
                Admin panel
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;