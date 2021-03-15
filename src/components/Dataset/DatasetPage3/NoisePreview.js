import React from 'react'
import Sample from '../../../assets/images/sample.jpg'
import Cross from '../../../assets/images/cross.svg'

class NoisePreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mean: 0,
      deviation: 0,
    }
  }

  setMean = mean => {
    this.setState({ mean })
  }
  setDeviation = deviation => {
    this.setState({ deviation })
  }
  render() {
    return (
      <div>
        <div className="confirm-cancel">
          <button className="primary-cta">Execute</button>
          <img
            src={Cross}
            className="cross"
            onClick={() => {
              this.props.showActionAreaHandler(false)
            }}
          ></img>
        </div>
        <div className="rotate-preview">
          <div className="rotate-heading">
            <div className="action-name">Noise</div>
          </div>
          <div className="aug-image-preview">
            <img src={Sample}></img>
          </div>
          <div className="augmentation-input">
            <div className="action-option">Mean</div>
            <input
              type="text"
              className="input-box"
              placeholder="Mean"
              name="Mean"
            />
          </div>
          <div className="augmentation-input">
            <div className="action-option">Standard Deviation</div>
            <input
              type="text"
              className="input-box"
              placeholder="Standard Deviation"
              name="Standard Deviation"
            />
          </div>
          <button className="secondary-cta">Apply</button>
        </div>
      </div>
    )
  }
}

export default NoisePreview
