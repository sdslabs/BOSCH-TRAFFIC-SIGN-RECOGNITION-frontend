import React from 'react'
import { MenuItems } from '../../constants/NavbarItems'
import { Link } from 'react-router-dom'
class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar-container">
        <div className="navbar-logo-container">
          <img src="../../assets/images/main-logo.svg" className="main-logo" />
        </div>
        <div className="navbar-links-container">
          <ul className="navbar-links-list">
            {MenuItems.map(item => {
              return (
                <li key={item.title} className="navbar-link-element">
                  <Link
                    className={`navbar-link ${
                      window.location.pathname === item.url ? 'active' : ''
                    }`}
                    to={item.url}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
