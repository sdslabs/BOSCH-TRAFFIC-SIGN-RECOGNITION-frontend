import React, { useState, useEffect } from 'react'
import DatasetPage1 from '../DatasetPage1/DatasetPage1'
import { getSplitData, selectAugmentationManual } from '../../../api/datasetAPI'
import { Row } from 'react-bootstrap'
import Select from 'react-select'
import ActionArea from './ActionArea'
import DatasetPage3 from './DatasetPage3'
const DatasetPage3Data = () => {
  const [trainStructure, setTrainStructure] = useState({ empty: true })
  const [testStructure, setTestStructure] = useState({ empty: true })
  const [testFolders, setTestFolders] = useState([])
  const [trainFolders, setTrainFolders] = useState([])
  const [imageSelectable, setImageSelectable] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showActionArea, setShowActionArea] = useState(false)
  const [augmentationDataSelected, setAugmentationDataSelected] = useState(
    false,
  )
  useEffect(() => {
    handleGetAugmentationData()
  }, [])
  const handleGetAugmentationData = async () => {
    const trainFolders = []
    const testFolders = []
    const structure = await getSplitData()
    structure.train.empty = false
    structure.test.empty = false
    console.log(structure)
    structure.test.folders.forEach((folder, id) => {
      let selectedCount = 0
      let imageCount = 0
      folder.images.forEach(image => {
        imageCount++
        if (image.selected === 'true') {
          selectedCount++
        }
      })
      folder.selectedCount = selectedCount
      folder.imageCount = imageCount
      folder.id = id
      testFolders.push({
        name: folder.name,
        selectedCount: selectedCount,
        imageCount: imageCount,
        id: id,
        currentlySelected: false,
        checked: false,
      })
    })
    structure.train.folders.forEach((folder, id) => {
      let selectedCount = 0
      let imageCount = 0
      folder.images.forEach(image => {
        imageCount++
        if (image.selected === 'true') {
          selectedCount++
        }
      })
      folder.selectedCount = selectedCount
      folder.imageCount = imageCount
      folder.id = id
      trainFolders.push({
        name: folder.name,
        selectedCount: selectedCount,
        imageCount: imageCount,
        id: id,
        currentlySelected: false,
        checked: false,
      })
    })
    setTrainFolders(trainFolders)
    setTestFolders(testFolders)
    setTestStructure(structure.test)
    setTrainStructure(structure.train)
    console.log(structure)
  }

  const handleSelectedChange = selectedOption => {
    setImageSelectable(selectedOption.value === 'manual')
    setShowActionArea(selectedOption.value === 'random')
    setSelectedOption(selectedOption)
  }

  const removeActionArea = e => {
    setShowActionArea(e)
    if (!e) {
      setSelectedOption(null)
    }
  }

  const sendManualAugmentationData = async () => {
    const structure = {}
    structure.test = testStructure
    structure.train = trainStructure
    const res = await selectAugmentationManual(structure)
    if (res.status === 200) {
      console.log('Manual data sent respectfully')
      setAugmentationDataSelected(true)
    }
  }

  const options = [
    { value: 'random', label: 'Random Selection' },
    { value: 'manual', label: 'Manual Selection' },
  ]
  if (augmentationDataSelected) {
    return <DatasetPage3 />
  }
  return (
    <div className="dataset-page2 h-100">
      <div className="data h-100">
        <div className="empty-header header-step3">
          {selectedOption === null && (
            <Select
              value={selectedOption}
              onChange={handleSelectedChange}
              options={options}
              className="react-select2-container"
              classNamePrefix="react-select2"
              isSearchable={false}
              placeholder={'Data Selection'}
            ></Select>
          )}
          {selectedOption && selectedOption.value === 'manual' && (
            <div className="manual-options">
              <button
                className="primary-cta"
                onClick={() => {
                  sendManualAugmentationData()
                }}
              >
                Augment and Transform
              </button>
              <button
                className="secondary-cta"
                onClick={() => {
                  setSelectedOption(null)
                  setImageSelectable(false)
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <DatasetPage1
          initialDataHandler={setTestStructure}
          structure={testStructure}
          setStructure={setTestStructure}
          folders={testFolders}
          setFolders={setTestFolders}
          showTestRow={true}
          preview={!imageSelectable}
        />
        <Row className="mb-5"></Row>
        <DatasetPage1
          initialDataHandler={setTrainStructure}
          structure={trainStructure}
          setStructure={setTrainStructure}
          folders={trainFolders}
          setFolders={setTrainFolders}
          dontShowHeading={true}
          showTrainRow={true}
          preview={!imageSelectable}
        />
        <Row className="mb-5"></Row>
      </div>
      {showActionArea && (
        <ActionArea
          showActionAreaHandler={removeActionArea}
          action={'Random'}
          editingHandler={setAugmentationDataSelected}
        />
      )}
    </div>
  )
}

export default DatasetPage3Data
