import React from 'react'

export default function Text() {
  return (
    <div className="main-wrapper">
  {/* partial:partials/_sidebar.html */}
  <nav className="sidebar">
    <div className="sidebar-header">
      <a href="#" className="sidebar-brand">
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
        <li className="nav-item">
          <a href="dashboard.html" className="nav-link">
            <i className="link-icon" data-feather="box" />
            <span className="link-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item nav-category">web apps</li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#emails" role="button" aria-expanded="false" aria-controls="emails">
            <i className="link-icon" data-feather="mail" />
            <span className="link-title">Email</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="emails">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/email/inbox.html" className="nav-link">Inbox</a>
              </li>
              <li className="nav-item">
                <a href="pages/email/read.html" className="nav-link">Read</a>
              </li>
              <li className="nav-item">
                <a href="pages/email/compose.html" className="nav-link">Compose</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a href="pages/apps/chat.html" className="nav-link">
            <i className="link-icon" data-feather="message-square" />
            <span className="link-title">Chat</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="pages/apps/calendar.html" className="nav-link">
            <i className="link-icon" data-feather="calendar" />
            <span className="link-title">Calendar</span>
          </a>
        </li>
        <li className="nav-item nav-category">Components</li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#uiComponents" role="button" aria-expanded="false" aria-controls="uiComponents">
            <i className="link-icon" data-feather="feather" />
            <span className="link-title">UI Kit</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="uiComponents">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/ui-components/accordion.html" className="nav-link">Accordion</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/alerts.html" className="nav-link">Alerts</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/badges.html" className="nav-link">Badges</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/breadcrumbs.html" className="nav-link">Breadcrumbs</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/buttons.html" className="nav-link">Buttons</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/button-group.html" className="nav-link">Button group</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/cards.html" className="nav-link">Cards</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/carousel.html" className="nav-link">Carousel</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/collapse.html" className="nav-link">Collapse</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/dropdowns.html" className="nav-link">Dropdowns</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/list-group.html" className="nav-link">List group</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/media-object.html" className="nav-link">Media object</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/modal.html" className="nav-link">Modal</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/navs.html" className="nav-link">Navs</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/navbar.html" className="nav-link">Navbar</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/pagination.html" className="nav-link">Pagination</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/popover.html" className="nav-link">Popovers</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/progress.html" className="nav-link">Progress</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/scrollbar.html" className="nav-link">Scrollbar</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/scrollspy.html" className="nav-link">Scrollspy</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/spinners.html" className="nav-link">Spinners</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/tabs.html" className="nav-link">Tabs</a>
              </li>
              <li className="nav-item">
                <a href="pages/ui-components/tooltips.html" className="nav-link">Tooltips</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#advancedUI" role="button" aria-expanded="false" aria-controls="advancedUI">
            <i className="link-icon" data-feather="anchor" />
            <span className="link-title">Advanced UI</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="advancedUI">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/advanced-ui/cropper.html" className="nav-link">Cropper</a>
              </li>
              <li className="nav-item">
                <a href="pages/advanced-ui/owl-carousel.html" className="nav-link">Owl carousel</a>
              </li>
              <li className="nav-item">
                <a href="pages/advanced-ui/sortablejs.html" className="nav-link">SortableJs</a>
              </li>
              <li className="nav-item">
                <a href="pages/advanced-ui/sweet-alert.html" className="nav-link">Sweet Alert</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#forms" role="button" aria-expanded="false" aria-controls="forms">
            <i className="link-icon" data-feather="inbox" />
            <span className="link-title">Forms</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="forms">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/forms/basic-elements.html" className="nav-link">Basic Elements</a>
              </li>
              <li className="nav-item">
                <a href="pages/forms/advanced-elements.html" className="nav-link">Advanced Elements</a>
              </li>
              <li className="nav-item">
                <a href="pages/forms/editors.html" className="nav-link">Editors</a>
              </li>
              <li className="nav-item">
                <a href="pages/forms/wizard.html" className="nav-link">Wizard</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#charts" role="button" aria-expanded="false" aria-controls="charts">
            <i className="link-icon" data-feather="pie-chart" />
            <span className="link-title">Charts</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="charts">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/charts/apex.html" className="nav-link">Apex</a>
              </li>
              <li className="nav-item">
                <a href="pages/charts/chartjs.html" className="nav-link">ChartJs</a>
              </li>
              <li className="nav-item">
                <a href="pages/charts/flot.html" className="nav-link">Flot</a>
              </li>
              <li className="nav-item">
                <a href="pages/charts/peity.html" className="nav-link">Peity</a>
              </li>
              <li className="nav-item">
                <a href="pages/charts/sparkline.html" className="nav-link">Sparkline</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#tables" role="button" aria-expanded="false" aria-controls="tables">
            <i className="link-icon" data-feather="layout" />
            <span className="link-title">Table</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="tables">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/tables/basic-table.html" className="nav-link">Basic Tables</a>
              </li>
              <li className="nav-item">
                <a href="pages/tables/data-table.html" className="nav-link">Data Table</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#icons" role="button" aria-expanded="false" aria-controls="icons">
            <i className="link-icon" data-feather="smile" />
            <span className="link-title">Icons</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="icons">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/icons/feather-icons.html" className="nav-link">Feather Icons</a>
              </li>
              <li className="nav-item">
                <a href="pages/icons/flag-icons.html" className="nav-link">Flag Icons</a>
              </li>
              <li className="nav-item">
                <a href="pages/icons/mdi-icons.html" className="nav-link">Mdi Icons</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item nav-category">Pages</li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" role="button" aria-expanded="false" aria-controls="general-pages">
            <i className="link-icon" data-feather="book" />
            <span className="link-title">Special pages</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="general-pages">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/general/blank-page.html" className="nav-link">Blank page</a>
              </li>
              <li className="nav-item">
                <a href="pages/general/faq.html" className="nav-link">Faq</a>
              </li>
              <li className="nav-item">
                <a href="pages/general/invoice.html" className="nav-link">Invoice</a>
              </li>
              <li className="nav-item">
                <a href="pages/general/profile.html" className="nav-link">Profile</a>
              </li>
              <li className="nav-item">
                <a href="pages/general/pricing.html" className="nav-link">Pricing</a>
              </li>
              <li className="nav-item">
                <a href="pages/general/timeline.html" className="nav-link">Timeline</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#authPages" role="button" aria-expanded="false" aria-controls="authPages">
            <i className="link-icon" data-feather="unlock" />
            <span className="link-title">Authentication</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="authPages">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/auth/login.html" className="nav-link">Login</a>
              </li>
              <li className="nav-item">
                <a href="pages/auth/register.html" className="nav-link">Register</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#errorPages" role="button" aria-expanded="false" aria-controls="errorPages">
            <i className="link-icon" data-feather="cloud-off" />
            <span className="link-title">Error</span>
            <i className="link-arrow" data-feather="chevron-down" />
          </a>
          <div className="collapse" id="errorPages">
            <ul className="nav sub-menu">
              <li className="nav-item">
                <a href="pages/error/404.html" className="nav-link">404</a>
              </li>
              <li className="nav-item">
                <a href="pages/error/500.html" className="nav-link">500</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item nav-category">Docs</li>
        <li className="nav-item">
          <a href="https://www.nobleui.com/html/documentation/docs.html" target="_blank" className="nav-link">
            <i className="link-icon" data-feather="hash" />
            <span className="link-title">Documentation</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <nav className="settings-sidebar">
    <div className="sidebar-body">
      <a href="#" className="settings-sidebar-toggler">
        <i data-feather="settings" />
      </a>
      <h6 className="text-muted mb-2">Sidebar:</h6>
      <div className="mb-3 pb-3 border-bottom">
        <div className="form-check form-check-inline">
          <input type="radio" className="form-check-input" name="sidebarThemeSettings" id="sidebarLight" defaultValue="sidebar-light" defaultChecked />
          <label className="form-check-label" htmlFor="sidebarLight">
            Light
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input type="radio" className="form-check-input" name="sidebarThemeSettings" id="sidebarDark" defaultValue="sidebar-dark" />
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
        <h6 className="text-muted mb-2">Dark Theme:</h6>
        <a className="theme-item" href="https://www.nobleui.com/html/template/demo2/dashboard.html">
          <img src="../assets/images/screenshots/dark.jpg" alt="light theme" />
        </a>
      </div>
    </div>
  </nav>
  {/* partial */}
  <div className="page-wrapper">
    {/* partial:partials/_navbar.html */}
    <nav className="navbar">
      <a href="#" className="sidebar-toggler">
        <i data-feather="menu" />
      </a>
      <div className="navbar-content">
        <form className="search-form">
          <div className="input-group">
            <div className="input-group-text">
              <i data-feather="search" />
            </div>
            <input type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="flag-icon flag-icon-us mt-1" title="us" /> <span className="ms-1 me-1 d-none d-md-inline-block">English</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="languageDropdown">
              <a href="javascript:;" className="dropdown-item py-2"><i className="flag-icon flag-icon-us" title="us" id="us" /> <span className="ms-1"> English </span></a>
              <a href="javascript:;" className="dropdown-item py-2"><i className="flag-icon flag-icon-fr" title="fr" id="fr" /> <span className="ms-1"> French </span></a>
              <a href="javascript:;" className="dropdown-item py-2"><i className="flag-icon flag-icon-de" title="de" id="de" /> <span className="ms-1"> German </span></a>
              <a href="javascript:;" className="dropdown-item py-2"><i className="flag-icon flag-icon-pt" title="pt" id="pt" /> <span className="ms-1"> Portuguese </span></a>
              <a href="javascript:;" className="dropdown-item py-2"><i className="flag-icon flag-icon-es" title="es" id="es" /> <span className="ms-1"> Spanish </span></a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="appsDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i data-feather="grid" />
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="appsDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p className="mb-0 fw-bold">Web Apps</p>
                <a href="javascript:;" className="text-muted">Edit</a>
              </div>
              <div className="row g-0 p-1">
                <div className="col-3 text-center">
                  <a href="pages/apps/chat.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"><i data-feather="message-square" className="icon-lg mb-1" /><p className="tx-12">Chat</p></a>
                </div>
                <div className="col-3 text-center">
                  <a href="pages/apps/calendar.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"><i data-feather="calendar" className="icon-lg mb-1" /><p className="tx-12">Calendar</p></a>
                </div>
                <div className="col-3 text-center">
                  <a href="pages/email/inbox.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"><i data-feather="mail" className="icon-lg mb-1" /><p className="tx-12">Email</p></a>
                </div>
                <div className="col-3 text-center">
                  <a href="pages/general/profile.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"><i data-feather="instagram" className="icon-lg mb-1" /><p className="tx-12">Profile</p></a>
                </div>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="javascript:;">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="messageDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i data-feather="mail" />
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="messageDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p>9 New Messages</p>
                <a href="javascript:;" className="text-muted">Clear all</a>
              </div>
              <div className="p-1">
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face2.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Leonardo Payne</p>
                      <p className="tx-12 text-muted">Project status</p>
                    </div>
                    <p className="tx-12 text-muted">2 min ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face3.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Carl Henson</p>
                      <p className="tx-12 text-muted">Client meeting</p>
                    </div>
                    <p className="tx-12 text-muted">30 min ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face4.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Jensen Combs</p>
                      <p className="tx-12 text-muted">Project updates</p>
                    </div>
                    <p className="tx-12 text-muted">1 hrs ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face5.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Amiah Burton</p>
                      <p className="tx-12 text-muted">Project deatline</p>
                    </div>
                    <p className="tx-12 text-muted">2 hrs ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face6.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Yaretzi Mayo</p>
                      <p className="tx-12 text-muted">New record</p>
                    </div>
                    <p className="tx-12 text-muted">5 hrs ago</p>
                  </div>	
                </a>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="javascript:;">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i data-feather="bell" />
              <div className="indicator">
                <div className="circle" />
              </div>
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="notificationDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p>6 New Notifications</p>
                <a href="javascript:;" className="text-muted">Clear all</a>
              </div>
              <div className="p-1">
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="gift" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>New Order Recieved</p>
                    <p className="tx-12 text-muted">30 min ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="alert-circle" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Server Limit Reached!</p>
                    <p className="tx-12 text-muted">1 hrs ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face6.jpg" alt="userr" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>New customer registered</p>
                    <p className="tx-12 text-muted">2 sec ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="layers" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Apps are ready for update</p>
                    <p className="tx-12 text-muted">5 hrs ago</p>
                  </div>	
                </a>
                <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="download" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Download completed</p>
                    <p className="tx-12 text-muted">6 hrs ago</p>
                  </div>	
                </a>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="javascript:;">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face1.jpg" alt="profile" />
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="profileDropdown">
              <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                <div className="mb-3">
                  <img className="wd-80 ht-80 rounded-circle" src="../assets/images/faces/face1.jpg" alt />
                </div>
                <div className="text-center">
                  <p className="tx-16 fw-bolder">Amiah Burton</p>
                  <p className="tx-12 text-muted">amiahburton@gmail.com</p>
                </div>
              </div>
              <ul className="list-unstyled p-1">
                <li className="dropdown-item py-2">
                  <a href="pages/general/profile.html" className="text-body ms-0">
                    <i className="me-2 icon-md" data-feather="user" />
                    <span>Profile</span>
                  </a>
                </li>
                <li className="dropdown-item py-2">
                  <a href="javascript:;" className="text-body ms-0">
                    <i className="me-2 icon-md" data-feather="edit" />
                    <span>Edit Profile</span>
                  </a>
                </li>
                <li className="dropdown-item py-2">
                  <a href="javascript:;" className="text-body ms-0">
                    <i className="me-2 icon-md" data-feather="repeat" />
                    <span>Switch User</span>
                  </a>
                </li>
                <li className="dropdown-item py-2">
                  <a href="javascript:;" className="text-body ms-0">
                    <i className="me-2 icon-md" data-feather="log-out" />
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    {/* partial */}
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
        <div>
          <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
        </div>
        <div className="d-flex align-items-center flex-wrap text-nowrap">
          <div className="input-group flatpickr wd-200 me-2 mb-2 mb-md-0" id="dashboardDate">
            <span className="input-group-text input-group-addon bg-transparent border-primary" data-toggle><i data-feather="calendar" className="text-primary" /></span>
            <input type="text" className="form-control bg-transparent border-primary" placeholder="Select date" data-input />
          </div>
          <button type="button" className="btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
            <i className="btn-icon-prepend" data-feather="printer" />
            Print
          </button>
          <button type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0">
            <i className="btn-icon-prepend" data-feather="download-cloud" />
            Download Report
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xl-12 stretch-card">
          <div className="row flex-grow-1">
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">New Customers</h6>
                    <div className="dropdown mb-2">
                      <a type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">3,897</h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-success">
                          <span>+3.3%</span>
                          <i data-feather="arrow-up" className="icon-sm mb-1" />
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div id="customersChart" className="mt-md-3 mt-xl-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">New Orders</h6>
                    <div className="dropdown mb-2">
                      <a type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">35,084</h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-danger">
                          <span>-2.8%</span>
                          <i data-feather="arrow-down" className="icon-sm mb-1" />
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div id="ordersChart" className="mt-md-3 mt-xl-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">Growth</h6>
                    <div className="dropdown mb-2">
                      <a type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                        <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">89.87%</h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-success">
                          <span>+2.8%</span>
                          <i data-feather="arrow-up" className="icon-sm mb-1" />
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div id="growthChart" className="mt-md-3 mt-xl-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* row */}
      <div className="row">
        <div className="col-12 col-xl-12 grid-margin stretch-card">
          <div className="card overflow-hidden">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-4 mb-md-3">
                <h6 className="card-title mb-0">Revenue</h6>
                <div className="dropdown">
                  <a type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                  </div>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col-md-7">
                  <p className="text-muted tx-13 mb-3 mb-md-0">Revenue is the income that a business has from its normal business activities, usually from the sale of goods and services to customers.</p>
                </div>
                <div className="col-md-5 d-flex justify-content-md-end">
                  <div className="btn-group mb-3 mb-md-0" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-primary">Today</button>
                    <button type="button" className="btn btn-outline-primary d-none d-md-block">Week</button>
                    <button type="button" className="btn btn-primary">Month</button>
                    <button type="button" className="btn btn-outline-primary">Year</button>
                  </div>
                </div>
              </div>
              <div id="revenueChart" />
            </div>
          </div>
        </div>
      </div> {/* row */}
      <div className="row">
        <div className="col-lg-7 col-xl-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h6 className="card-title mb-0">Monthly sales</h6>
                <div className="dropdown mb-2">
                  <a type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton4">
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                  </div>
                </div>
              </div>
              <p className="text-muted">Sales are activities related to selling or the number of goods or services sold in a given time period.</p>
              <div id="monthlySalesChart" />
            </div> 
          </div>
        </div>
        <div className="col-lg-5 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline">
                <h6 className="card-title mb-0">Cloud storage</h6>
                <div className="dropdown mb-2">
                  <a type="button" id="dropdownMenuButton5" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                  </div>
                </div>
              </div>
              <div id="storageChart" />
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-end">
                  <div>
                    <label className="d-flex align-items-center justify-content-end tx-10 text-uppercase fw-bolder">Total storage <span className="p-1 ms-1 rounded-circle bg-secondary" /></label>
                    <h5 className="fw-bolder mb-0 text-end">8TB</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <label className="d-flex align-items-center tx-10 text-uppercase fw-bolder"><span className="p-1 me-1 rounded-circle bg-primary" /> Used storage</label>
                    <h5 className="fw-bolder mb-0">~5TB</h5>
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Upgrade storage</button>
              </div>
            </div>
          </div>
        </div>
      </div> {/* row */}
      <div className="row">
        <div className="col-lg-5 col-xl-4 grid-margin grid-margin-xl-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h6 className="card-title mb-0">Inbox</h6>
                <div className="dropdown mb-2">
                  <a type="button" id="dropdownMenuButton6" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton6">
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <a href="javascript:;" className="d-flex align-items-center border-bottom pb-3">
                  <div className="me-3">
                    <img src="../assets/images/faces/face2.jpg" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Leonardo Payne</h6>
                      <p className="text-muted tx-12">12.30 PM</p>
                    </div>
                    <p className="text-muted tx-13">Hey! there I'm available...</p>
                  </div>
                </a>
                <a href="javascript:;" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="../assets/images/faces/face3.jpg" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Carl Henson</h6>
                      <p className="text-muted tx-12">02.14 AM</p>
                    </div>
                    <p className="text-muted tx-13">I've finished it! See you so..</p>
                  </div>
                </a>
                <a href="javascript:;" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="../assets/images/faces/face4.jpg" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Jensen Combs</h6>
                      <p className="text-muted tx-12">08.22 PM</p>
                    </div>
                    <p className="text-muted tx-13">This template is awesome!</p>
                  </div>
                </a>
                <a href="javascript:;" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="../assets/images/faces/face5.jpg" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Amiah Burton</h6>
                      <p className="text-muted tx-12">05.49 AM</p>
                    </div>
                    <p className="text-muted tx-13">Nice to meet you</p>
                  </div>
                </a>
                <a href="javascript:;" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="../assets/images/faces/face6.jpg" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Yaretzi Mayo</h6>
                      <p className="text-muted tx-12">01.19 AM</p>
                    </div>
                    <p className="text-muted tx-13">Hey! there I'm available...</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-xl-8 stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h6 className="card-title mb-0">Projects</h6>
                <div className="dropdown mb-2">
                  <a type="button" id="dropdownMenuButton7" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton7">
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" className="icon-sm me-2" /> <span className>View</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" className="icon-sm me-2" /> <span className>Edit</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" className="icon-sm me-2" /> <span className>Delete</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" className="icon-sm me-2" /> <span className>Print</span></a>
                    <a className="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" className="icon-sm me-2" /> <span className>Download</span></a>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th className="pt-0">#</th>
                      <th className="pt-0">Project Name</th>
                      <th className="pt-0">Start Date</th>
                      <th className="pt-0">Due Date</th>
                      <th className="pt-0">Status</th>
                      <th className="pt-0">Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>NobleUI jQuery</td>
                      <td>01/01/2022</td>
                      <td>26/04/2022</td>
                      <td><span className="badge bg-danger">Released</span></td>
                      <td>Leonardo Payne</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>NobleUI Angular</td>
                      <td>01/01/2022</td>
                      <td>26/04/2022</td>
                      <td><span className="badge bg-success">Review</span></td>
                      <td>Carl Henson</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>NobleUI ReactJs</td>
                      <td>01/05/2022</td>
                      <td>10/09/2022</td>
                      <td><span className="badge bg-info">Pending</span></td>
                      <td>Jensen Combs</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>NobleUI VueJs</td>
                      <td>01/01/2022</td>
                      <td>31/11/2022</td>
                      <td><span className="badge bg-warning">Work in Progress</span>
                      </td>
                      <td>Amiah Burton</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>NobleUI Laravel</td>
                      <td>01/01/2022</td>
                      <td>31/12/2022</td>
                      <td><span className="badge bg-danger">Coming soon</span></td>
                      <td>Yaretzi Mayo</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>NobleUI NodeJs</td>
                      <td>01/01/2022</td>
                      <td>31/12/2022</td>
                      <td><span className="badge bg-primary">Coming soon</span></td>
                      <td>Carl Henson</td>
                    </tr>
                    <tr>
                      <td className="border-bottom">3</td>
                      <td className="border-bottom">NobleUI EmberJs</td>
                      <td className="border-bottom">01/05/2022</td>
                      <td className="border-bottom">10/11/2022</td>
                      <td className="border-bottom"><span className="badge bg-info">Pending</span></td>
                      <td className="border-bottom">Jensen Combs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> 
          </div>
        </div>
      </div> {/* row */}
    </div>
    {/* partial:partials/_footer.html */}
    <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small">
      <p className="text-muted mb-1 mb-md-0">Copyright © 2022 <a href="https://www.nobleui.com/" target="_blank">NobleUI</a>.</p>
      <p className="text-muted">Handcrafted With <i className="mb-1 text-primary ms-1 icon-sm" data-feather="heart" /></p>
    </footer>
    {/* partial */}
  </div>
</div>

  )
}
