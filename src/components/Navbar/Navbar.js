import React from 'react'
import { MenuItems } from '../../constants/NavbarItems'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import Logo from '../../assets/images/main-logo.png'
const Navbar = () => {
  const history = useHistory()
  const location = useLocation()
  return (
    <nav className="navbar-container">
      <div className="navbar-logo-container">
        <img src={Logo} className="main-logo" />
      </div>
      <div className="navbar-links-container">
        <ul className="navbar-links-list">
          {MenuItems.map(item => {
            return (
              <li key={item.title} className="navbar-link-element">
                <NavLink
                  className={'navbar-link' + (true ? ' disabled-link' : '')}
                  activeClassName="active"
                  to={item.url}
                >
                  {item.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
        {location.pathname !== '/' && (
          <button
            className="primary-cta invert-btn-color row-last-button mr-2"
            onClick={() => {
              history.push('/')
              window.location.reload(false)
            }}
          >
            Restart Process
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
