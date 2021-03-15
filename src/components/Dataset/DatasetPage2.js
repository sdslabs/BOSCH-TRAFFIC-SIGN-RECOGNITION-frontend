import React, { useState } from 'react'
import DatasetPage1 from './DatasetPage1.js'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'

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

const DatasetPage2 = props => {
  const [training, setTraining] = useState(70)
  return (
    <div className="dataset-page2 h-100">
      <div className="data h-100">
        <DatasetPage1 preview={true} />
      </div>
      <div className="action-area">
        <div className="empty-header" />
        <div className="rotate-preview split-data">
          <div className="action-name split-heading">Split Data</div>
          <div className="action-option">Training Data</div>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={0}
            min={0}
            max={100}
            step={1}
            value={training}
            onChange={(e, val) => {
              setTraining(val)
              props.setSplitDataTraining(val)
            }}
          />
          <div className="action-option">Test Data</div>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={100}
            min={0}
            max={100}
            step={1}
            value={100 - training}
            onChange={(e, val) => {
              setTraining(100 - val)
              props.setSplitDataTraining(100 - val)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DatasetPage2
