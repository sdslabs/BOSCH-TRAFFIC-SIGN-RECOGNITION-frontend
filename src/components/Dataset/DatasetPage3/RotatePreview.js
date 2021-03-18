import React from 'react'
import Select from 'react-select'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import VerticalFlip from '../../../assets/images/vertical-flip.svg'
import HorizontalFlip from '../../../assets/images/horizontal-flip.svg'
import Cross from '../../../assets/images/cross.svg'
import {
  applyAugmentation,
  getModifiedImages,
  undoAugmentationAPI,
} from '../../../api/datasetAPI'
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
      flipway: '',
      undoDisabled: true,
    }
  }

  handleChange = selectedOption => {
    if (selectedOption.value === 'angle') {
      this.setState({ flipStyle: '' })
      this.setState({ flipway: '' })
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
    this.setState({ flipway: 'horizontal_flip' })
  }
  flipVertically = () => {
    this.setState({ flipStyle: ' scaleY(-1)' })
    this.setState({ flipway: 'vertical_flip' })
  }
  applyRotation = async () => {
    if (this.state.selectedOption.value === 'angle') {
      const data = {
        name: 'rotate',
        params: {
          angle: -this.state.rotation,
        },
      }
      let res = await applyAugmentation(data)
      if (res.status === 200) {
        console.log('image rotated in the backend')
        res = await getModifiedImages()
        this.props.setModifiedImages(res.images)
        this.setState({ rotation: 0 })
        this.setState({ undoDisabled: false })
      }
    }
    if (this.state.selectedOption.value === 'flip') {
      const data = {
        name: this.state.flipway,
        params: {},
      }
      let res = await applyAugmentation(data)
      if (res.status === 200) {
        console.log('image flipped in the backend')
        res = await getModifiedImages()
        this.props.setModifiedImages(res.images)
        this.setState({ flipStyle: '' })
        this.setState({ flipway: '' })
        this.setState({ undoDisabled: false })
      }
    }
  }
  undoAugmentation = async () => {
    let res = await undoAugmentationAPI()
    if (res.status === 200) {
      res = await getModifiedImages()
      this.props.setModifiedImages(res.images)
      this.setState({ rotation: 0 })
      this.setState({ undoDisabled: true })
    }
  }
  render() {
    const { selectedOption } = this.state
    return (
      <div>
        <div className="confirm-cancel">
          <button
            className="primary-cta"
            onClick={() => {
              this.applyRotation()
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
              src={`http://localhost:5000/${this.props.image.path}`}
              style={{
                transform:
                  `rotate(${this.state.rotation}deg)` + this.state.flipStyle,
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

export default RotatePreview
