import React from 'react'
import { transforms } from '../../../constants/AugmentationNavbarItems'
class AugmentationNavbar extends React.Component {
  showActionArea(title) {
    this.props.augActionHandler(title)
    this.props.showActionAreaHandler(true)
  }
  render() {
    return (
      <div className="augmentation-navbar">
        <button className="primary-cta augmentation-navbar-element">
          Copy and Save
        </button>
        <button className="secondary-cta augmentation-navbar-element">
          Replace and Save
        </button>
        {transforms.map(transform => {
          return (
            <button
              key={transform.title}
              className="tertiary-cta augmentation-navbar-element"
              onClick={() => {
                this.showActionArea(transform.title)
              }}
            >
              {transform.icon && (
                <img src={transform.icon} className="augmentation-icon" />
              )}
              {transform.title}
            </button>
          )
        })}
      </div>
    )
  }
}

export default AugmentationNavbar
