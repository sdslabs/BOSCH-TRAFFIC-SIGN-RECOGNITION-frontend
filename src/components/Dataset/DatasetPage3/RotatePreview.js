import React from 'react'
import Select from 'react-select'
import Sample from '../../../assets/images/sample.jpg'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import VerticalFlip from '../../../assets/images/vertical-flip.svg'
import HorizontalFlip from '../../../assets/images/horizontal-flip.svg'
import Cross from '../../../assets/images/cross.svg'
const rotationOptions = [
  { value: 'angle', label: 'Angle' },
  { value: 'flip', label: 'Flip' },
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
class RotatePreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      rotation: 0,
      flipStyle: '',
    }
  }

  handleChange = selectedOption => {
    if (selectedOption.value === 'angle') {
      this.setState({ flipStyle: '' })
    } else if (selectedOption.value === 'flip') {
      this.setState({ rotation: 0 })
    }
    this.setState({ selectedOption })
  }

  setRotation = rotation => {
    this.setState({ rotation })
  }
  flipHorizontally = () => {
    this.setState({ flipStyle: ' scaleX(-1)' })
  }
  flipVertically = () => {
    this.setState({ flipStyle: ' scaleY(-1)' })
  }
  render() {
    const { selectedOption, rotation } = this.state
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
            <div className="action-name">Rotate</div>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={rotationOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
            ></Select>
          </div>
          <div className="aug-image-preview">
            <img
              src={Sample}
              style={{
                transform: `rotate(${rotation}deg)` + this.state.flipStyle,
              }}
            ></img>
          </div>
          {selectedOption && selectedOption.value === 'angle' && (
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={0}
              min={-180}
              max={180}
              step={0.1}
              value={this.state.rotation}
              onChange={(e, val) => this.setRotation(val)}
            />
          )}
          {selectedOption && selectedOption.value === 'flip' && (
            <div className="flip-btn">
              <button className="action-cta" onClick={this.flipHorizontally}>
                <img src={HorizontalFlip} />
                Horizontal
              </button>
              <button className="action-cta" onClick={this.flipVertically}>
                <img src={VerticalFlip} />
                Vertical
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default RotatePreview
