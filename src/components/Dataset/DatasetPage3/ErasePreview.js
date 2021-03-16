import React, { useState } from 'react'
import Sample from '../../../assets/images/sample.jpg'
import ReactCrop from 'react-image-crop'
import Cross from '../../../assets/images/cross.svg'

const ErasePreview = props => {
  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const doSomething = async () => {
    console.log(crop)
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
          <div className="action-name">Erase</div>
        </div>
        <div className="aug-image-preview">
          <ReactCrop
            src={Sample}
            crop={crop}
            onChange={newCrop => setCrop(newCrop)}
          />
        </div>
        <button className="secondary-cta">Apply</button>
      </div>
    </div>
  )
}

export default ErasePreview
