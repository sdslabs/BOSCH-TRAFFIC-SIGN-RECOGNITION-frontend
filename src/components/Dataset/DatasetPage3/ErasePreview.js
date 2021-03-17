import React, { useEffect, useState } from 'react'
import ReactCrop from 'react-image-crop'
import Cross from '../../../assets/images/cross.svg'
import {
  applyAugmentation,
  getModifiedImages,
  undoAugmentationAPI,
} from '../../../api/datasetAPI'
const ErasePreview = props => {
  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const [undoDisabled, setUndoDisabled] = useState(true)
  const [grayScale, setgrayScale] = useState(0)
  const [mean, setMean] = useState(0)
  const [variance, setVariance] = useState(0)
  const [randomize, setRandomize] = useState(false)
  const undoAugmentation = async () => {
    let res = await undoAugmentationAPI()
    if (res.status === 200) {
      res = await getModifiedImages()
      props.setModifiedImages(res.images)
      setCrop({ aspect: 1 / 1 })
      setUndoDisabled(true)
    }
  }
  useEffect(() => {
    console.log(randomize)
  }, [randomize])
  const doSomething = async () => {
    const data = {
      name: 'erase',
      params: {
        pt1: [(crop.x / 150) * 32, (crop.y / 150) * 32],
        pt2: [((crop.x + crop.width) / 150) * 32, (crop.y / 150) * 32],
        pt3: [(crop.x / 150) * 32, ((crop.y + crop.height) / 150) * 32],
        pt4: [
          ((crop.x + crop.width) / 150) * 32,
          ((crop.y + crop.height) / 150) * 32,
        ],
        randomize,
        grayIndex: parseInt(grayScale),
        mean: parseFloat(mean),
        variance: parseFloat(variance),
      },
    }
    let res = await applyAugmentation(data)
    if (res.status === 200) {
      console.log('image rotated in the backend')
      res = await getModifiedImages()
      props.setModifiedImages(res.images)
      setCrop({ aspect: 1 / 1 })
      setUndoDisabled(false)
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
          <div className="action-name">Erase</div>
        </div>
        <div className="aug-image-preview">
          <ReactCrop
            src={`http://localhost:5000/${props.image.path}`}
            crop={crop}
            onChange={newCrop => setCrop(newCrop)}
          />
        </div>
        <div className="augmentation-input-checkbox">
          <span className="action-option">Randomize</span>
          <input
            type="checkbox"
            className="input-box"
            value={randomize}
            onChange={() => {
              setRandomize(!randomize)
            }}
          />
        </div>
        <div className="augmentation-input">
          <div className="action-option">Gray Scale</div>
          <input
            type="number"
            step="1"
            className="input-box"
            placeholder="Gray Scale"
            name="Gray Scale"
            value={grayScale}
            onChange={e => {
              if (e.target.value > 255) {
                setgrayScale(255)
              } else if (e.target.value < 0) {
                setgrayScale(0)
              } else {
                setgrayScale(e.target.value)
              }
            }}
            min={0}
            max={255}
          />
        </div>
        {randomize && (
          <div>
            <div className="augmentation-input">
              <div className="action-option">Mean</div>
              <input
                type="number"
                step="0.01"
                className="input-box"
                placeholder="Mean"
                name="Mean"
                value={mean}
                onChange={e => {
                  setMean(e.target.value)
                }}
              />
            </div>
            <div className="augmentation-input">
              <div className="action-option">Variance</div>
              <input
                type="number"
                step="0.01"
                className="input-box"
                placeholder="Standard Deviation"
                name="Standard Deviation"
                value={variance}
                onChange={e => {
                  setVariance(e.target.value)
                }}
              />
            </div>
          </div>
        )}
        <button
          className="secondary-cta mt-3"
          disabled={undoDisabled}
          onClick={undoAugmentation}
        >
          Undo
        </button>
      </div>
    </div>
  )
}

export default ErasePreview
