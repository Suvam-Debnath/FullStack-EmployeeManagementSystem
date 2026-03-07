import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
        <header>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          
          <div className="container-fluid">

            <a className="navbar-brand" href="#">Employee Management System</a>

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
                  <NavLink className="nav-link" to="/employees">
                    Employees
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/departments">
                    Departments
                  </NavLink>
                </li>

              </ul>
            </div>

          </div>

        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent