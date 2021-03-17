import React from 'react'
import Select from 'react-select'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import Cross from '../../../assets/images/cross.svg'
import {
  applyAugmentation,
  getModifiedImages,
  undoAugmentationAPI,
} from '../../../api/datasetAPI'
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
      blur: 1,
      sharpen: 0,
      undoDisabled: true,
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
  applyAdjust = async () => {
    if (this.state.selectedOption.value === 'blur') {
      const data = {
        name: 'blur',
        params: {
          k_dim: this.state.blur,
        },
      }
      let res = await applyAugmentation(data)
      if (res.status === 200) {
        console.log('image blurred in the backend')
        res = await getModifiedImages()
        this.props.setModifiedImages(res.images)
        this.setState({ undoDisabled: false })
      }
    }
    if (this.state.selectedOption.value === 'sharpen') {
      const data = {
        name: 'sharpen',
        params: {
          amount: this.state.sharpen,
        },
      }
      let res = await applyAugmentation(data)
      if (res.status === 200) {
        console.log('image shapren in the backend')
        res = await getModifiedImages()
        this.props.setModifiedImages(res.images)
        this.setState({ undoDisabled: false })
      }
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
    const { selectedOption } = this.state
    return (
      <div>
        <div className="confirm-cancel">
          <button className="primary-cta" onClick={this.applyAdjust}>
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
            <img src={`http://localhost:5000/${this.props.image.path}`}></img>
          </div>
          {selectedOption && (
            <div className="action-option">{selectedOption.label}</div>
          )}
          {selectedOption && selectedOption.value === 'blur' && (
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={1}
              min={1}
              max={4}
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

export default AdjustPreview
