import React, { useState, useEffect } from 'react'
import RightSidebar from '../Common/RightSidebar'
import DatasetPage1 from './DatasetPage1/DatasetPage1'
import DatasetPage2 from './DatasetPage2/DatasetPage2'
import DatasetPage3Data from './DatasetPage3/DatasetPage3Data'
import DatasetPage4 from './DatasetPage4/DatasetPage4.js'
import DatasetPage6 from './DatasetPage6/DatasetPage6.js'
import DatasetPage5 from './DatasetPage5/DatasetPage5.js'
// import structure from './structure.json'
import { Container, Row, Col } from 'react-bootstrap'
import Step1 from '../Common/SidebarStep1.js'
import Step2 from '../Common/SidebarStep2.js'
import Step3 from '../Common/SidebarStep3.js'
import Step4 from '../Common/SidebarStep4.js'
import Step5 from '../Common/SidebarStep5.js'
import { getInitialData } from '../../api/datasetAPI'
import DatasetPage3 from './DatasetPage3/DatasetPage3'

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
    <Row className="h-100">
      <Col xs={3} className="h-100">
        <Container
          className="sidebar border-right border-dark p-0"
          style={{
            backgroundColor:
              isUpload || isNewFolder ? 'rgba(196, 196, 196, 0.2)' : 'white',
          }}
        >
          <Col className="p-0">
            <Row className="border-bottom heading">Heading for model</Row>
            {datasetStep >= 1 && (
              <Step1
                done={datasetStep > 1}
                initialData={structure}
                setDatasetStep={setDatasetStep}
                isUpload={isUpload}
                isNewFolder={isNewFolder}
              />
            )}
            {datasetStep >= 2 && (
              <Step2
                done={datasetStep > 2}
                splitDataTraining={splitDataTraining}
                setDatasetStep={setDatasetStep}
              />
            )}
            {datasetStep >= 3 && (
              <Step3 done={datasetStep > 3} setDatasetStep={setDatasetStep} />
            )}
            {datasetStep >= 4 && (
              <Step4 done={datasetStep > 4} setDatasetStep={setDatasetStep} />
            )}
            {datasetStep >= 5 && (
              <Step5 done={datasetStep > 5} setDatasetStep={setDatasetStep} />
            )}
          </Col>
        </Container>
      </Col>
      <Col className="mx-0 px-0">
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
        <Col xs={2}>
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
  )
}

export default Dataset
