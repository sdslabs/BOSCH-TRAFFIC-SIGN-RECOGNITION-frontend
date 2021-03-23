import React from 'react'
import Select from 'react-select'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import Cross from '../../../assets/images/cross.svg'
import { selectAugmentationRandom } from '../../../api/datasetAPI'
const options = [
  { value: 'complete', label: 'Complete Data' },
  { value: 'valid', label: 'Validation Data' },
  { value: 'train', label: 'Train Data' },
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
class RandomPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      percentage: 50,
      disabled: false,
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
    this.setState({ percentage: 50 })
  }

  setPercentage = percentage => {
    this.setState({ percentage })
  }

  sendPercentageData = async () => {
    this.setState({ disabled: true })
    const res = await selectAugmentationRandom({
      type_of_data: this.state.selectedOption.value,
      percentage: this.state.percentage,
    })
    if (res.status === 200) {
      console.log('send respectfully')
      this.props.editingHandler(true)
    }
  }

  render() {
    const { selectedOption } = this.state
    return (
      <div>
        <div className="confirm-cancel">
          <button
            className="primary-cta-sec p-05"
            onClick={() => {
              this.sendPercentageData()
            }}
            disabled={!this.state.selectedOption || this.state.disabled}
          >
            Augmentation & Transform
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
            <div className="action-name">Random Selection</div>
          </div>{' '}
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            className="react-select-container w-80"
            classNamePrefix="react-select"
            isSearchable={false}
          ></Select>
          {selectedOption && (
            <div className="action-option mt-3">
              Percentage of {selectedOption.label} to be selected
            </div>
          )}
          {selectedOption && (
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={50}
              min={0}
              max={100}
              step={1}
              value={this.state.percentage}
              onChange={(e, val) => this.setPercentage(val)}
            />
          )}
        </div>
      </div>
    )
  }
}

export default RandomPreview
