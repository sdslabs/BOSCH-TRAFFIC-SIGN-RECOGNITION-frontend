import React from 'react'
import { transforms } from '../../../constants/AugmentationNavbarItems'
import { copyAndSaveAPI, replaceAndSaveAPI } from '../../../api/datasetAPI'
class AugmentationNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.props.setShowSidebar(false)
    this.state={
      copyDisabled:false,
      replaceDisabled:false
    }
  }
  showActionArea(title) {
    this.props.augActionHandler(title)
    this.props.showActionAreaHandler(true)
  }
  copyAndSave = async () => {
    this.props.tl(true)
    this.setState({copyDisabled:true})
    const res = await copyAndSaveAPI()
    if (res.status === 200) {
      console.log('data copied and saved successfully')
      this.props.setAugmentationDataSelected(false)
      this.props.setSelectedOption(null)
      this.props.setImageSelectable(false)
      this.props.setShowActionArea(false)
      this.props.setShowSidebar(true)
      this.setState({copyDisabled:false})
      await this.props.handleGetAugmentationData()
    }
  }
  replaceAndSave = async () => {
    this.props.tl(true)
    this.setState({replaceDisabled:true})
    const res = await replaceAndSaveAPI()
    if (res.status === 200) {
      console.log('data replace and saved successfully')
      this.props.setAugmentationDataSelected(false)
      this.props.setSelectedOption(null)
      this.props.setImageSelectable(false)
      this.props.setShowActionArea(false)
      this.props.setShowSidebar(true)
      this.setState({replaceDisabled:false})
      await this.props.handleGetAugmentationData()
    }
  }
  render() {
    return (
      <div className="augmentation-navbar">
        <button
          className="primary-cta-sec augmentation-navbar-element-btn first"
          onClick={this.copyAndSave}
          disabled={this.state.copyDisabled}
        >
          Copy and Save
        </button>
        <button
          className="primary-cta-sec augmentation-navbar-element-btn"
          onClick={this.replaceAndSave}
          disabled={this.state.replaceDisabled}
        >
          Replace and Save
        </button>
        <button
          className="secondary-cta augmentation-navbar-element-btn"
          onClick={() => {
            this.props.setAugmentationDataSelected(false)
            this.props.setSelectedOption(null)
            this.props.setImageSelectable(false)
            this.props.setShowActionArea(false)
            this.props.setShowSidebar(true)
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
