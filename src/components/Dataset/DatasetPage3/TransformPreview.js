import React from 'react'
import Cross from '../../../assets/images/cross.svg'
import Select from 'react-select'
import Info from '../../../assets/images/info.svg'
import {
  applyAugmentation,
  getModifiedImages,
  undoAugmentationAPI,
} from '../../../api/datasetAPI'
const transforms = [
  {
    label: 'Wavelet Transform',
    value: 'Wavelet',
    types: [
      { name: 'haar', info: '' },
      { name: 'coif10', info: '' },
      { name: 'db10', info: '' },
      { name: 'sym10', inof: '' },
    ],
  },
  {
    label: 'Colour Transform',
    value: 'Colour',
    types: [
      { name: 'RGB', info: '' },
      { name: 'HSV', info: '' },
      { name: 'LAB', info: '' },
      { name: 'Grey', info: '' },
    ],
  },
  {
    label: 'Surround Transform',
    value: 'Surround',
    types: [
      { name: 'add_brightness', info: '' },
      { name: 'add_shadow', info: '' },
      { name: 'add_snow', info: '' },
      { name: 'add_rain', info: '' },
      { name: 'add_fog', info: '' },
    ],
  },
  {
    label: 'Histogram Transform',
    value: 'histogram',
    types: [
      { name: 'Hist_Eq', info: '' },
      { name: 'CLAHE', info: '' },
    ],
  },
]
class TransformPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transform: null,
      transformType: null,
      showInfoTransformType: null,
      undoDisabled: true,
    }
  }

  setTransform = transform => {
    this.setState({ transform })
  }
  setTransformType = e => {
    this.setState({ transformType: e.target.value })
  }
  setShowInfoTransformType = showInfoTransformType => {
    this.setState({ showInfoTransformType })
  }
  applyTransform = async () => {
    let data = {
      name: this.state.transformType,
      params: {},
    }
    if (this.state.transform.value === 'Wavelet') {
      data = {
        name: 'Discrete_Wavelet',
        params: {
          type: this.state.transformType,
        },
      }
    }
    let res = await applyAugmentation(data)
    if (res.status === 200) {
      console.log('image transformed in the backend')
      res = await getModifiedImages()
      this.props.setModifiedImages(res.images)
      this.setState({ undoDisabled: false })
    }
  }
  undoAugmentation = async () => {
    let res = await undoAugmentationAPI()
    if (res.status === 200) {
      res = await getModifiedImages()
      this.props.setModifiedImages(res.images)
      this.setState({ undoDisabled: true })
    }
  }
  render() {
    return (
      <div>
        <div className="confirm-cancel">
          <button
            className="primary-cta"
            onClick={() => {
              this.applyTransform()
            }}
          >
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
            <div className="action-name">Transform</div>
          </div>
          <Select
            value={this.state.transform}
            onChange={this.setTransform}
            options={transforms}
            className="react-select-container react-select-large"
            classNamePrefix="react-select"
            isSearchable={false}
          ></Select>
          {this.state.transform && (
            <div className="action-option action-option-large">
              {this.state.transform.value + ' Transform type'}
            </div>
          )}
          {this.state.transform &&
            this.state.transform.types.map(type => {
              return (
                <div key={type.name} className="transform-radio-row">
                  {this.state.showInfoTransformType === type.name && (
                    <div className="transform-info">{type.info}</div>
                  )}
                  <img
                    src={Info}
                    className="transform-icon"
                    onMouseOver={() => {
                      this.setShowInfoTransformType(type.name)
                    }}
                    onMouseOut={() => {
                      this.setShowInfoTransformType(null)
                    }}
                  ></img>
                  <input
                    type="radio"
                    name={type.name}
                    value={type.name}
                    checked={this.state.transformType === type.name}
                    onChange={this.setTransformType}
                  />
                  <span className="action-option">{type.name}</span>
                </div>
              )
            })}
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

export default TransformPreview
