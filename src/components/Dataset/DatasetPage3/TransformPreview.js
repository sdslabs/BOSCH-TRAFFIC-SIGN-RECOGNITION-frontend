import React from 'react'
import Cross from '../../../assets/images/cross.svg'
import Select from 'react-select'
import Info from '../../../assets/images/info.svg'
const transforms = [
  {
    label: 'Wavelet Transform',
    value: 'Wavelet',
    types: [
      { name: 'kjsgljlajslfjfla', info: 'kfjaklfjalkjfda' },
      { name: 'aksfdhajksfhkjfhkj', info: 'akjfhdajkh' },
      { name: 'alksfjaklfjdalf', info: 'alksfjalkjfalk' },
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
        </div>
      </div>
    )
  }
}

export default TransformPreview
