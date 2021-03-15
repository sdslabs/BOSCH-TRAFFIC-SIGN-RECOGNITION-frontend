import React, { useState } from 'react'
import DatasetPage1 from './DatasetPage1.js'
import DatasetPage2 from './DatasetPage2.js'
import DatasetPage3 from './DatasetPage3/DatasetPage3'
// import structure from './structure.json'
import { Container, Row, Col } from 'react-bootstrap'
import Step1 from '../Common/SidebarStep1.js'
import Step2 from '../Common/SidebarStep2.js'
import Step3 from '../Common/SidebarStep3.js'
const Dataset = () => {
  // [TODO] Fetch structure here with an API call
  const [datasetStep, setDatasetStep] = useState(1)
  const [initialData, setInitialData] = useState({ empty: true })
  const [splitDataTraining, setSplitDataTraining] = useState(0)
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
            <DatasetPage1 initialDataHandler={setInitialData} />
          )}
          {datasetStep === 2 && (
            <DatasetPage2 setSplitDataTraining={setSplitDataTraining} />
          )}
          {datasetStep === 3 && <DatasetPage3 />}
        </Col>
      </Row>
    </Container>
  )
}

export default Dataset
