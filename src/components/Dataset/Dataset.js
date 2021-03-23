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
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
const Dataset = props => {
  const [datasetStep, setDatasetStep] = useState(props.page) // current step of dataset generation
  const [splitDataTraining, setSplitDataTraining] = useState(70) // percentage of training data in split
  const [isUpload, setUpload] = useState(false)
  const [isNewFolder, setNewFolder] = useState(false)
  const [tensorFlowLink, setTensorFlowLink] = useState()
  const [trainingCompleted, setTrainingCompleted] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [structure, setStructure] = useState({ empty: true }) // main structure (this is initialData)
  const [showLoader, tl] = useState(false)
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
    tl(true)
    const structure = await getInitialData()
    tl(false)
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
    setNewFolder(!isNewFolder)
    setUpload(false)
  }
  return (
    <Row className="h-100">
      {showLoader && (
        <div className="loader-wrapper">
          <div className="loader">
            <Loader
              type="BallTriangle"
              color="#335BC0"
              height={150}
              width={150}
            />
          </div>
        </div>
      )}
      {showSidebar && <div className="stepbar-void"></div>}
      {showSidebar && (
        <div className="h-100 steps-bar">
          {' '}
          <Container className="sidebar border-right border-dark p-0">
            <Col className="p-0">
              <Row className="border-bottom heading">STN + EDUQ</Row>
              {datasetStep >= 1 && (
                <Step1
                  done={datasetStep > 1}
                  initialData={structure}
                  setDatasetStep={setDatasetStep}
                  tl={tl}
                />
              )}
              {datasetStep >= 2 && (
                <Step2
                  done={datasetStep > 2}
                  splitDataTraining={splitDataTraining}
                  setDatasetStep={setDatasetStep}
                  tl={tl}
                />
              )}
              {datasetStep >= 3 && (
                <Step3 done={datasetStep > 3} setDatasetStep={setDatasetStep} tl={tl}/>
              )}
              {datasetStep >= 3.5 && (
                <Step4
                  done={datasetStep > 4}
                  setDatasetStep={setDatasetStep}
                  trainingCompleted={trainingCompleted}
                />
              )}
              {datasetStep >= 7 && (
                <Step5 done={datasetStep > 7} setDatasetStep={setDatasetStep} />
              )}
            </Col>
          </Container>
        </div>
      )}
      <Col className="mx-0 px-0">
        {datasetStep === 1 && (
          <DatasetPage1
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
            showUploadTools={true}
            sp={true}
          />
        )}
        {datasetStep === 2 && (
          <DatasetPage2
            setSplitDataTraining={setSplitDataTraining}
            structure={structure}
            setStructure={setStructure}
          />
        )}
        {datasetStep === 3 && (
          <DatasetPage3Data setShowSidebar={setShowSidebar} tl={tl}/>
        )}
        {datasetStep === 4 && (
          <DatasetPage4
            structure={structure}
            setStructure={setStructure}
            setDatasetStep={setDatasetStep}
            tensorFlowLink={tensorFlowLink}
            setTensorFlowLink={setTensorFlowLink}
            trainingCompleted={trainingCompleted}
            setTrainingCompleted={setTrainingCompleted}
            tl={tl}
          />
        )}
        {datasetStep === 3.5 && (
          <DatasetPage6
            structure={structure}
            setStructure={setStructure}
            setDatasetStep={setDatasetStep}
            tensorFlowLink={tensorFlowLink}
            setTensorFlowLink={setTensorFlowLink}
          />
        )}
        {datasetStep === 7 && <DatasetPage5 tl={tl}/>}
      </Col>
      {isUpload || isNewFolder ? (
        <RightSidebar
          isUpload={isUpload}
          toggleUpload={setUpload}
          isNewFolder={isNewFolder}
          toggleNewFolder={setNewFolder}
          structure={structure}
          setStructure={setStructure}
        />
      ) : null}
    </Row>
  )
}

export default Dataset
