import React from 'react'
import { transforms } from '../../../constants/AugmentationNavbarItems'
import { copyAndSaveAPI } from '../../../api/datasetAPI'
class AugmentationNavbar extends React.Component {
  showActionArea(title) {
    this.props.augActionHandler(title)
    this.props.showActionAreaHandler(true)
  }
  copyAndSave = async () => {
    const res = await copyAndSaveAPI()
    if (res.status === 200) {
      console.log('data copied and saved successfully')
      this.props.setAugmentationDataSelected(false)
      this.props.setSelectedOption(null)
      this.props.setImageSelectable(false)
      await this.props.handleGetAugmentationData()
    }
  }
  render() {
    return (
      <div className="augmentation-navbar">
        <button
          className="primary-cta augmentation-navbar-element"
          onClick={this.copyAndSave}
        >
          Copy and Save
        </button>
        <button
          className="secondary-cta augmentation-navbar-element"
          onClick={() => {
            this.props.setAugmentationDataSelected(false)
            this.props.setSelectedOption(null)
            this.props.setImageSelectable(false)
          }}
        >
          Cancel
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
