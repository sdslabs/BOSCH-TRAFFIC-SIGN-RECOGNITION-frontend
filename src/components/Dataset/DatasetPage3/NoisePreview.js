import React from 'react'
import Sample from '../../../assets/images/sample.jpg'
import Cross from '../../../assets/images/cross.svg'
import {
  applyAugmentation,
  getModifiedImages,
  undoAugmentationAPI,
} from '../../../api/datasetAPI'
class NoisePreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mean: 0,
      deviation: 0,
      undoDisabled: true,
    }
  }

  setMean = mean => {
    console.log(mean)
    mean = mean.target.value
    this.setState({ mean })
  }
  setDeviation = deviation => {
    console.log(deviation)
    deviation = deviation.target.value
    this.setState({ deviation })
  }
  undoAugmentation = async () => {
    let res = await undoAugmentationAPI()
    if (res.status === 200) {
      res = await getModifiedImages()
      this.props.setModifiedImages(res.images)
      this.setState({ undoDisabled: true })
    }
  }

  applyNoise = async () => {
    const data = {
      name: 'noise',
      params: {
        mean: parseFloat(this.state.mean),
        variance: this.state.deviation * this.state.deviation,
      },
    }
    let res = await applyAugmentation(data)
    if (res.status === 200) {
      console.log('image noised in the backend')
      res = await getModifiedImages()
      this.props.setModifiedImages(res.images)
      this.setState({ undoDisabled: false })
    }
  }
  render() {
    return (
      <div>
        <div className="confirm-cancel">
          <button className="primary-cta-sec" onClick={this.applyNoise}>
            Execute
          </button>
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
            <img src={`http://localhost:5000/${this.props.image.path}`}></img>
          </div>
          <div className="augmentation-input">
            <div className="action-option">Mean</div>
            <input
              type="number"
              step="0.01"
              className="input-box"
              placeholder="Mean"
              name="Mean"
              value={this.state.mean}
              onChange={this.setMean}
            />
          </div>
          <div className="augmentation-input">
            <div className="action-option">Standard Deviation</div>
            <input
              type="number"
              step="0.01"
              className="input-box"
              placeholder="Standard Deviation"
              name="Standard Deviation"
              value={this.state.deviation}
              onChange={this.setDeviation}
            />
          </div>
          <button
            className="secondary-cta mt-3"
            disabled={this.state.undoDisabled}
            onClick={this.undoAugmentation}
          >
            Undo
          </button>
        </div>
      </div>
    )
  }
}

export default NoisePreview
