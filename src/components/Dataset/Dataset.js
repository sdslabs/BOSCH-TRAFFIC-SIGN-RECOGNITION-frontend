import React, { useState, useEffect } from 'react'
import RightSidebar from '../Common/RightSidebar'
import DatasetPage1 from './DatasetPage1.js'
import DatasetPage2 from './DatasetPage2.js'
import DatasetPage3Data from './DatasetPage3/DatasetPage3Data'
// import structure from './structure.json'
import { Container, Row, Col } from 'react-bootstrap'
import Step1 from '../Common/SidebarStep1.js'
import Step2 from '../Common/SidebarStep2.js'
import Step3 from '../Common/SidebarStep3.js'
import { getInitialData } from '../../api/datasetAPI'

const Dataset = () => {
  const [datasetStep, setDatasetStep] = useState(1) // current step of dataset generation
  const [splitDataTraining, setSplitDataTraining] = useState(70) // percentage of training data in split
  const [isUpload, setUpload] = useState(false)
  const [isNewFolder, setNewFolder] = useState(false)

  const [structure, setStructure] = useState({ empty: true }) // main structure (this is initialData)
  const [folders, setFolders] = useState([]) // list of folders
  const [allChecked, setAllChecked] = useState(false) // list of folders

  useEffect(() => {
    handleGetInitialData()
  }, [])

  useEffect(() => {
    console.log('structure updated in state: ', structure)
  }, [structure])

  useEffect(() => {
    console.log('allChecked updated in state: ', allChecked)
  }, [allChecked])

  useEffect(() => {
    console.log('folders updated in state: ', folders)
    let allChecked = true
    folders.forEach(folder => {
      if (!folder.checked) {
        allChecked = false
      }
    })
    setAllChecked(allChecked)
  }, [folders])

  const handleGetInitialData = async () => {
    const folders = []
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
      folders.push({
        name: folder.name,
        selectedCount: selectedCount,
        imageCount: imageCount,
        id: id,
        currentlySelected: false,
        checked: imageCount === selectedCount,
      })
    })
    setFolders(folders)
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
    <Container fluid className="h-100 mx-0 px-0">
      <Row className="mx-auto h-100">
        <Col xs={2.4} className="h-100">
          {' '}
          <Container className="sidebar border-right border-dark p-0">
            <Col className="p-0">
              <Row className="border-bottom heading">Heading for model</Row>
              {datasetStep >= 1 && (
                <Step1
                  done={datasetStep > 1}
                  initialData={structure}
                  setDatasetStep={setDatasetStep}
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
            </Col>
          </Container>
        </Col>
        <Col className="mx-0 px-0">
          {datasetStep === 1 && (
            <DatasetPage1
              initialDataHandler={setStructure}
              structure={structure}
              setStructure={setStructure}
              folders={folders}
              setFolders={setFolders}
              allChecked={allChecked}
              toggleUpload={() => {
                setUpload(true)
                setNewFolder(false)
              }}
              toggleNewFolder={() => {
                setNewFolder(true)
                setUpload(false)
              }}
              showUploadTools={true}
            />
          )}
          {datasetStep === 2 && (
            <DatasetPage2
              setSplitDataTraining={setSplitDataTraining}
              structure={structure}
              folders={folders}
              setFolders={setFolders}
            />
          )}
          {datasetStep === 3 && <DatasetPage3Data />}
        </Col>
        {isUpload || isNewFolder ? (
          <Col xs={2.4}>
            {' '}
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
