import React, { useState } from 'react'
import RightSidebar from '../Common/RightSidebar'
import DatasetPage1 from './DatasetPage1.js'
import DatasetPage2 from './DatasetPage2.js'
import DatasetPage3Data from './DatasetPage3/DatasetPage3Data'
// import structure from './structure.json'
import { Container, Row, Col } from 'react-bootstrap'
import Step1 from '../Common/SidebarStep1.js'
import Step2 from '../Common/SidebarStep2.js'
import Step3 from '../Common/SidebarStep3.js'
const Dataset = () => {
  // [TODO] Fetch structure here with an API call
  const [datasetStep, setDatasetStep] = useState(1)
  const [initialData, setInitialData] = useState({ empty: true })
  const [splitDataTraining, setSplitDataTraining] = useState(70)
  const [isUpload, setUpload] = useState(false)
  const [isNewFolder, setNewFolder] = useState(false)

  const toggleUpload = () => {
    console.log('toggle upload')
    setUpload(!isUpload)
  }

  const toggleNewFolder = () => {
    setNewFolder(!isNewFolder)
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
                  initialData={initialData}
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
              initialDataHandler={setInitialData}
              toggleUpload={toggleUpload}
              toggleNewFolder={toggleNewFolder}
            />
          )}
          {datasetStep === 2 && (
            <DatasetPage2 setSplitDataTraining={setSplitDataTraining} />
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
            />{' '}
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

export default Dataset
