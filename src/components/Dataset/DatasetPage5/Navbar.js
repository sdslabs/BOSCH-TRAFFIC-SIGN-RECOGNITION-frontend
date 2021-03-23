import React from 'react'
import { NavLink } from 'react-router-dom'
const MenuItems = [
  {
    title: 'Model Evaluation',
    url: '/analysis/model',
  },
  {
    title: 'Confusion Matrix analysis',
    url: '/analysis/confusion',
  },
  {
    title: 'Uncertainity analysis',
    url: '/analysis/uncertainity',
  },
  {
    title: 'Augmentation analysis',
    url: '/analysis/augmentation',
  },
  {
    title: 'Weight analysis',
    url: '/analysis/weight',
  },
]
class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar-container-sec">
        <div className="navbar-links-container ml-5">
          <ul className="navbar-links-list">
            {MenuItems.map(item => {
              return (
                <li key={item.title} className="navbar-link-element">
                  <NavLink
                    className="navbar-link"
                    activeClassName="active"
                    to={item.url}
                  >
                    {item.title}
                  </NavLink>
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
