import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
         {/* partial:partials/_sidebar.html */}
  <nav className="sidebar">
    <div className="sidebar-header">
      <a href= "/" className="sidebar-brand">
        Noble<span>UI</span>
      </a>
      <div className="sidebar-toggler not-active">
        <span />
        <span />
        <span />
      </div>
    </div>
    <div className="sidebar-body">
      <ul className="nav">
        <li className="nav-item nav-category">Main</li>
        {/* <li className="nav-item">
          <Link to="/text" className="nav-link">
            <i className="link-icon" data-feather="box" />
            <span className="link-title">Dashboard</span>
          </Link>
        </li>  */}
        <li className="nav-item">
          <Link to="/news/category" className="nav-link">
            <i className="link-icon" data-feather="grid" />
            <span className="link-title">Category</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/news" className="nav-link">
            <i className="link-icon" data-feather="table" />
            <span className="link-title">News</span>
          </Link>
        </li>
        
        
        
      </ul>
    </div>
  </nav>
  <nav className="settings-sidebar">
    <div className="sidebar-body">
      <a href= "/" className="settings-sidebar-toggler">
        <i data-feather="settings" />
      </a>
      <h6 className="text-muted mb-2">Sidebar:</h6>
      <div className="mb-3 pb-3 border-bottom">
        <div className="form-check form-check-inline">
          <input type="radio" className="form-check-input" name="sidebarThemeSettings" id="sidebarLight" defaultValue="sidebar-light"  />
          <label className="form-check-label" htmlFor="sidebarLight">
            Light
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input type="radio" className="form-check-input" name="sidebarThemeSettings" id="sidebarDark" defaultValue="sidebar-dark" defaultChecked />
          <label className="form-check-label" htmlFor="sidebarDark">
            Dark
          </label>
        </div>
      </div>
      <div className="theme-wrapper">
        <h6 className="text-muted mb-2">Light Theme:</h6>
        <a className="theme-item active" href="dashboard.html">
          <img src="../assets/images/screenshots/light.jpg" alt="light theme" />
        </a>
       
      </div>
    </div>
  </nav>
  {/* partial:partials/_navbar.html */}
  <div className="page-wrapper" >
  <nav className="navbar">
      <a href= "/" className="sidebar-toggler">
        <i data-feather="menu" />
      </a>
      <div className="navbar-content">
       
        <ul className="navbar-nav">
         
          <li className="nav-item dropdown">
          <Link to="/" className="text-body ms-0">
            <i className="me-2 icon-md" data-feather="log-out" />
            <span>Log Out</span>
          </Link>
            
          </li>
        </ul>
      </div>
    </nav>
    </div>
    </div>
  )
}