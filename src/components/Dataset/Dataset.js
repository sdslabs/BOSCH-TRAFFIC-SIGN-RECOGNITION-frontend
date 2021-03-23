// libs
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// commponents
import RightSidebar from '../Common/RightSidebar'
import LeftSidebar from '../Common/LeftSidebar'
import DatasetPage1 from './DatasetPage1/DatasetPage1'
import DatasetPage2 from './DatasetPage2/DatasetPage2'
import DatasetPage3Data from './DatasetPage3/DatasetPage3Data'
import DatasetPage4 from './DatasetPage4/DatasetPage4.js'
import DatasetPage6 from './DatasetPage6/DatasetPage6.js'
import DatasetPage5 from './DatasetPage5/DatasetPage5.js'
// apis
import { getInitialData } from '../../api/datasetAPI'

const Dataset = props => {
  const [datasetStep, setDatasetStep] = useState(props.page) // current step of dataset generation
  const [splitDataTraining, setSplitDataTraining] = useState(70) // percentage of training data in split
  const [isUpload, setUpload] = useState(false)
  const [isNewFolder, setNewFolder] = useState(false)
  const [tensorFlowLink, setTensorFlowLink] = useState()
  const [trainingCompleted, setTrainingCompleted] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [structure, setStructure] = useState({ empty: true }) // main structure (this is initialData)

  useEffect(() => {
    handleGetInitialData()
  }, [])

  useEffect(() => {
    console.log('structure updated in state: ', structure)
  }, [structure])
  useEffect(() => {
    console.log('TensorFlow link updated: ', tensorFlowLink)
  }, [tensorFlowLink])

  useEffect(() => {
    console.log('trainingCompleted updated: ', trainingCompleted)
  }, [trainingCompleted])

  const handleGetInitialData = async () => {
    const structure = await getInitialData()
    structure.empty = false
    structure.folders.forEach((folder, id) => {
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
      folder.currentlySelected = false
      folder.checked = imageCount === selectedCount
    })
    setStructure(structure)
  }

  const toggleUpload = () => {
    console.log('toggle upload')
    setUpload(!isUpload)
    setNewFolder(false)
  }

  const toggleNewFolder = () => {
    console.log('toggle new folder')
    setNewFolder(!isNewFolder)
    setUpload(false)
  }
  return (
    <Container fluid className="p-0">
      <Row className="h-100">
        <Col xs={3} className="h-100 p-0">
          <LeftSidebar
            isUpload={isUpload}
            isNewFolder={isNewFolder}
            structure={structure}
            datasetStep={datasetStep}
            setDatasetStep={setDatasetStep}
            splitDataTraining={splitDataTraining}
          />
        </Col>
        <Col xs={7} className="h-100 p-0">
          {datasetStep === 1 && (
            <DatasetPage1
              xs={7}
              structure={structure}
              setStructure={setStructure}
              toggleUpload={() => {
                setUpload(true)
                setNewFolder(false)
              }}
              toggleNewFolder={() => {
                setNewFolder(true)
                setUpload(false)
              }}
              isUpload={isUpload}
              isNewFolder={isNewFolder}
              showUploadTools={true}
            />
          )}
          {datasetStep === 2 && (
            <DatasetPage2
              setSplitDataTraining={setSplitDataTraining}
              structure={structure}
              setStructure={setStructure}
            />
          )}
          {datasetStep === 3 && <DatasetPage3Data />}
          {datasetStep === 4 && (
            <DatasetPage4
              structure={structure}
              setStructure={setStructure}
              setDatasetStep={setDatasetStep}
            />
          )}
          {datasetStep === 6 && (
            <DatasetPage6
              structure={structure}
              setStructure={setStructure}
              setDatasetStep={setDatasetStep}
            />
          )}
          {datasetStep === 5 && <DatasetPage5 />}
        </Col>
        {isUpload || isNewFolder ? (
          <Col xs={2} className="h-100 p-0">
            <RightSidebar
              isUpload={isUpload}
              toggleUpload={toggleUpload}
              isNewFolder={isNewFolder}
              toggleNewFolder={toggleNewFolder}
              structure={structure}
              setStructure={setStructure}
            />{' '}
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

export default Dataset
