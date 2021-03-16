import React, { useState, useEffect } from 'react'
import AugmentationNavbar from './AugmentationNavbar'
import ActionArea from './ActionArea'
import Preview from './Preview'
import { getOriginalImages, getModifiedImages } from '../../../api/datasetAPI'
const DatasetPage2 = () => {
  const [showActionArea, setShowAction] = useState(false)
  const [augAction, setAugAction] = useState(null)
  const [originalImages, setOriginalImages] = useState([])
  const [modifiedImages, setModifiedImages] = useState([])
  useEffect(() => {
    getImages()
  }, [])

  const getImages = async () => {
    let res = await getOriginalImages()
    setOriginalImages(res.images)
    res = await getModifiedImages()
    setModifiedImages(res.images)
  }
  return (
    <div className="h-100">
      <AugmentationNavbar
        showActionAreaHandler={setShowAction}
        augActionHandler={setAugAction}
      />
      <Preview
        originalImages={originalImages}
        modifiedImages={modifiedImages}
        setOriginalImages={setOriginalImages}
        setModifiedImages={setModifiedImages}
      />
      {showActionArea && (
        <ActionArea showActionAreaHandler={setShowAction} action={augAction} />
      )}
    </div>
  )
}

export default DatasetPage2
