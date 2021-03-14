import React, { useState, useRef, useCallback } from 'react'
import Sample from '../../../assets/images/sample.jpg'
import Cropper from 'react-perspective-cropper'
import ReactCrop from 'react-image-crop'
import Select from 'react-select'
import Cross from '../../../assets/images/cross.svg'
const rotationOptions = [
  { value: 'free', label: 'Free' },
  { value: 'perspective', label: 'Perspective' },
]

const CropPreview = props => {
  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const [cropState, setCropState] = useState(null)
  const cropperRef = useRef()
  const onDragStop = useCallback(s => setCropState(s), [])
  const onChange = useCallback(s => setCropState(s), [])
  const [selectedOption, setSelectedOption] = useState(null)
  const doSomething = async () => {
    if (selectedOption.value === 'free') {
      console.log(crop)
    } else if (selectedOption.value === 'perspective') {
      console.log(cropState)
    }
  }

  return (
    <div>
      <div className="confirm-cancel">
        <button className="primary-cta" onClick={doSomething}>
          Execute
        </button>
        <img
          src={Cross}
          className="cross"
          onClick={() => {
            props.showActionAreaHandler(false)
          }}
        ></img>
      </div>
      <div className="rotate-preview">
        <div className="rotate-heading">
          <div className="action-name">Crop</div>
          <Select
            value={selectedOption}
            onChange={e => setSelectedOption(e)}
            options={rotationOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
          ></Select>
        </div>
        <div className="aug-image-preview">
          {!selectedOption && <img src={Sample}></img>}
          {selectedOption && selectedOption.value === 'perspective' && (
            <Cropper
              class="perspective-crop"
              ref={cropperRef}
              image={Sample}
              onChange={onChange}
              onDragStop={onDragStop}
              maxWidth={150}
              maxHeight={150}
              pointSize={15}
              pointColor={'#335bc0'}
              lineColor={'#335bc0'}
              lineWidth={2}
            />
          )}
          {selectedOption && selectedOption.value === 'free' && (
            <ReactCrop
              src={Sample}
              crop={crop}
              onChange={newCrop => setCrop(newCrop)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CropPreview
