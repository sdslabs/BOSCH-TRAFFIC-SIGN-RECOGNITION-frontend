import React, { useState, useEffect } from 'react'
import DatasetPage1 from '../DatasetPage1/DatasetPage1'
import {
  getSplitData,
  selectAugmentationManual,
  getGraphStats,
} from '../../../api/datasetAPI'
import { Row } from 'react-bootstrap'
import Select from 'react-select'
import ActionArea from './ActionArea'
import DatasetPage3 from './DatasetPage3'
import BarGraph from '../../Common/BarGraph'
const DatasetPage3Data = props => {
  const [trainStructure, setTrainStructure] = useState({ empty: true })
  const [testStructure, setTestStructure] = useState({ empty: true })
  const [imageSelectable, setImageSelectable] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showActionArea, setShowActionArea] = useState(false)
  const [augmentationDataSelected, setAugmentationDataSelected] = useState(
    false,
  )
  const [graphData, setGraphData] = useState(null)
  const [manualAug, setManualAug] = useState(false)
  useEffect(() => {
    handleGetAugmentationData()
    getGraphData()
  }, [])
  useEffect(() => {
    if (!augmentationDataSelected) {
      getGraphData()
    }
    if(manualAug) {
      setManualAug(false)
    }
  }, [augmentationDataSelected])
  const getGraphData = async () => {
    const res = await getGraphStats()
    console.log(res)
    setGraphData(res)
  }
  const handleGetAugmentationData = async () => {
    const structure = await getSplitData()
    structure.train.empty = false
    structure.valid.empty = false
    console.log(structure)
    structure.valid.folders.forEach((folder, id) => {
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
    })
    setTestStructure(structure.valid)
    setTrainStructure(structure.train)
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
    structure.valid = testStructure
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
    return (
      <DatasetPage3
        setAugmentationDataSelected={setAugmentationDataSelected}
        setSelectedOption={setSelectedOption}
        handleGetAugmentationData={handleGetAugmentationData}
        setImageSelectable={setImageSelectable}
        setShowActionArea={setShowActionArea}
        setShowSidebar={props.setShowSidebar}
      />
    )
  }
  return (
    <div className="dataset-page3 h-100">
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
                className="primary-cta-sec"
                onClick={() => {
                  sendManualAugmentationData()
                  setManualAug(true)
                }}
                disabled={manualAug}
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
          showTestRow={true}
          preview={!imageSelectable}
        />
        <Row className="mb-5"></Row>
        <DatasetPage1
          initialDataHandler={setTrainStructure}
          structure={trainStructure}
          setStructure={setTrainStructure}
          dontShowHeading={true}
          showTrainRow={true}
          preview={!imageSelectable}
        />
        <Row className="mb-5"></Row>
      </div>
      <div className="action-area-ter">
        <div className="action-area-ter-void" />
        <div className="empty-header" />
        <div className="heading center-heading">Data statistics</div>
        <div className="graph-stat-container">
          {graphData && (
            <BarGraph
              data={graphData}
              showMultiple={true}
              title={'Images selected in each class'}
            />
          )}
        </div>
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
