import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineLogout,MdOutlineTopic,MdRssFeed } from 'react-icons/md';
import { BsGrid } from 'react-icons/bs';
import { BiNews } from 'react-icons/bi';
import Scripts from './Scripts';
export default function Header() {
  let navigate = useNavigate();
  useEffect(() => {
    Scripts()
  }, [])
  const logoutfn=()=>{
    window.localStorage.setItem("login-access","false")
    return navigate('/');
  }
  return (
    <div>
         {/* partial:partials/_sidebar.html */}
  <nav className="sidebar">
    <div className="sidebar-header">
      <a href= "/news" className="sidebar-brand">
        {/* NNPA<span>UI</span> */}
        <img src="../assets/images/logo/nnpa_logo.png" alt="light theme" width={165} height={45} />
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
        <li className="nav-item not-active">
          <Link to="/news/topics" className="nav-link">
            {/* <i className="link-icon" data-feather="grid" /> */}
            <MdOutlineTopic  size={18}/>
            <span className="link-title ">Topics</span>
          </Link>
        </li>
        <li className="nav-item not-active">
          <Link to="/news/category" className="nav-link">
            {/* <i className="link-icon" data-feather="grid" /> */}
            <BsGrid  size={18}/>
            <span className="link-title ">Category</span>
          </Link>
        </li>
        <li className="nav-item not-active">
          <Link to="/news" className="nav-link">
            {/* <i className="link-icon" data-feather="table" /> */}
            <BiNews size={20}/>
            <span className="link-title">News</span>
          </Link>
        </li>
        <li className="nav-item not-active">
          <Link to="/news/rssfeed" className="nav-link">
            {/* <i className="link-icon" data-feather="table" /> */}
            <MdRssFeed size={20}/>
            <span className="link-title">RssFeed</span>
          </Link>
        </li>
        
        
        
      </ul>
    </div>
  </nav>
  {/* <nav className="settings-sidebar">
    <div className="sidebar-body">
      <a href= "#" className="settings-sidebar-toggler">
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
  </nav> */}
  {/* partial:partials/_navbar.html */}
  <div className="page-wrapper" >
  <nav className="navbar">
      <a href= "/news" className="sidebar-toggler">
        <i data-feather="menu" />
      </a>
      <div className="navbar-content">
       
        <ul className="navbar-nav">
         
          <li className="nav-item">
          <a style={{cursor:"pointer"}} onClick={()=>logoutfn()} className="nav-link ms-0">
            {/* <i className="me-2 icon-md" data-feather="log-out" /> */}
            <MdOutlineLogout className='me-1 icon-md'/>
            <span style={{}}>Log Out</span>
          </a>
            
          </li>
        </ul>
      </div>
    </nav>
    </div>
    </div>
  )
}
