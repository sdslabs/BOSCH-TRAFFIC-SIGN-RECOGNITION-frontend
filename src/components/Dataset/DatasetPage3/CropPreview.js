import React, { useState, useEffect, useRef, useCallback } from 'react'
import Cropper from 'react-perspective-cropper'
import ReactCrop from 'react-image-crop'
import Select from 'react-select'
import Cross from '../../../assets/images/cross.svg'
import Sample from '../../../assets/images/sample.jpg'
import {
  applyAugmentation,
  getModifiedImages,
  undoAugmentationAPI,
} from '../../../api/datasetAPI'
const rotationOptions = [
  { value: 'free', label: 'Free' },
  { value: 'perspective', label: 'Perspective' },
]
const CropPreview = props => {
  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const [cropState, setCropState] = useState({
    'left-top': { x: 0, y: 0 },
    'left-bottom': { x: 0, y: 150 },
    'right-top': { x: 150, y: 0 },
    'right-bottom': { x: 150, y: 150 },
    isLoading: false,
  })
  const cropperRef = useRef()
  const onDragStop = useCallback(s => setCropState(s), [])
  const onChange = useCallback(s => setCropState(s), [])
  const [selectedOption, setSelectedOption] = useState(null)
  const [undoDisabled, setUndoDisabled] = useState(true)
  const [img, setImg] = useState(null)
  useEffect(() => {
    console.log('Sample', Sample)
    getImage()
  }, [])
  useEffect(() => {
    getImage()
  }, [props.image])
  const doSomething = async () => {
    if (selectedOption.value === 'free') {
      console.log(crop)
      const data = {
        name: 'crop',
        params: {
          pt1: [(crop.x / 150) * 32, (crop.y / 150) * 32],
          pt2: [((crop.x + crop.width) / 150) * 32, (crop.y / 150) * 32],
          pt3: [(crop.x / 150) * 32, ((crop.y + crop.height) / 150) * 32],
          pt4: [
            ((crop.x + crop.width) / 150) * 32,
            ((crop.y + crop.height) / 150) * 32,
          ],
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
    } else if (selectedOption.value === 'perspective') {
      const data = {
        name: 'perspective_transform',
        params: {
          pt1: [
            (cropState['left-top'].x / 150) * 32,
            (cropState['left-top'].y / 150) * 32,
          ],
          pt2: [
            (cropState['right-top'].x / 150) * 32,
            (cropState['right-top'].y / 150) * 32,
          ],
          pt3: [
            (cropState['left-bottom'].x / 150) * 32,
            (cropState['left-bottom'].y / 150) * 32,
          ],
          pt4: [
            (cropState['right-bottom'].x / 150) * 32,
            (cropState['right-bottom'].y / 150) * 32,
          ],
        },
      }
      let res = await applyAugmentation(data)
      if (res.status === 200) {
        console.log('image cropped in the backend')
        res = await getModifiedImages()
        props.setModifiedImages(res.images)
        setCropState({
          'left-top': { x: 0, y: 0 },
          'left-bottom': { x: 0, y: 150 },
          'right-top': { x: 150, y: 0 },
          'right-bottom': { x: 150, y: 150 },
          isLoading: false,
        })
        setUndoDisabled(false)
      }
    }
  }
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  const getImage = async () => {
    const response = await fetch(`http://localhost:5000/${props.image.path}`)
    const blob = await response.blob()
    const file = new File([blob], props.image.name, { type: blob.type })
    const fileBase64 = await toBase64(file)
    setImg(fileBase64)
    console.log(fileBase64)
  }
  const undoAugmentation = async () => {
    let res = await undoAugmentationAPI()
    if (res.status === 200) {
      res = await getModifiedImages()
      props.setModifiedImages(res.images)
      setCrop({ aspect: 1 / 1 })
      setCropState(null)
      setUndoDisabled(true)
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
          {!selectedOption && (
            <img src={`http://localhost:5000/${props.image.path}`}></img>
          )}
          {selectedOption && selectedOption.value === 'perspective' && (
            <Cropper
              class="perspective-crop"
              ref={cropperRef}
              image={img}
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
              src={`http://localhost:5000/${props.image.path}`}
              crop={crop}
              onChange={newCrop => setCrop(newCrop)}
            />
          )}
        </div>
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

export default CropPreview
