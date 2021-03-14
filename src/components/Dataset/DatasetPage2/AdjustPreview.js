import React from 'react'
import Select from 'react-select'
import Sample from '../../../assets/images/sample.jpg'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import Cross from '../../../assets/images/cross.svg'
const adjustOptions = [
  { value: 'blur', label: 'Blur' },
  { value: 'sharpen', label: 'Sharpen' },
]
const PrettoSlider = withStyles({
  root: {
    color: '#335bc0',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider)
class AdjustPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      blur: 0,
      sharpen: 0,
    }
  }

  handleChange = selectedOption => {
    if (selectedOption.value === 'blur') {
      this.setState({ sharpen: '' })
    } else if (selectedOption.value === 'sharpen') {
      this.setState({ blur: 0 })
    }
    this.setState({ selectedOption })
  }

  setBlur = blur => {
    this.setState({ blur })
  }
  setSharpness = sharpen => {
    this.setState({ sharpen })
  }
  render() {
    const { selectedOption } = this.state
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
            <div className="action-name">Adjust</div>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={adjustOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
            ></Select>
          </div>
          <div className="aug-image-preview">
            <img src={Sample}></img>
          </div>
          {selectedOption && (
            <div className="action-option">{selectedOption.label}</div>
          )}
          {selectedOption && selectedOption.value === 'blur' && (
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={0}
              min={0}
              max={32}
              step={1}
              value={this.state.blur}
              onChange={(e, val) => this.setBlur(val)}
            />
          )}
          {selectedOption && selectedOption.value === 'sharpen' && (
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={0}
              min={0}
              max={1}
              step={0.01}
              value={this.state.sharpen}
              onChange={(e, val) => this.setSharpness(val)}
            />
          )}
          {selectedOption && <button className="secondary-cta">Apply</button>}
        </div>
      </div>
    )
  }
}

export default AdjustPreview
