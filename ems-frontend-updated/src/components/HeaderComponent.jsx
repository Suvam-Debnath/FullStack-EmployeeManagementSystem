import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Responsive header with active link highlighting,
 * icons for routes, and Bootstrap collapse animation.
 */
const HeaderComponent = () => {
  const brandStyle = {
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  };

  const linkIcon = {
    marginRight: '6px'
  };

  const closeMobileMenu = () => {
    const collapseEl = document.getElementById('navbarNav');
    if (!collapseEl || !collapseEl.classList.contains('show')) return;

    const bsCollapse = window.bootstrap?.Collapse;
    if (bsCollapse) {
      const instance = bsCollapse.getInstance(collapseEl) || new bsCollapse(collapseEl, { toggle: false });
      instance.hide();
    } else {
      collapseEl.classList.remove('show');
      collapseEl.setAttribute('aria-expanded', 'false');
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.classList.add('collapsed');
    }
  };

  // activeClassName is no longer supported in v6; use className callback
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        style={{ transition: 'background-color 0.3s ease' }}
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" style={brandStyle}>
            Employee Management System
          </NavLink>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className={getNavLinkClass} end onClick={closeMobileMenu}>
                  🏠 Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/employees" className={getNavLinkClass} onClick={closeMobileMenu}>
                  <span style={linkIcon}>👥</span>Employees
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/departments" className={getNavLinkClass} onClick={closeMobileMenu}>
                  <span style={linkIcon}>🏢</span>Departments
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard" className={getNavLinkClass} onClick={closeMobileMenu}>
                  <span style={linkIcon}>📊</span>Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderComponent