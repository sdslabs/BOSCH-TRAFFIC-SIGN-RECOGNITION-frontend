import React from 'react'
import Sidebar from '../Common/Sidebar.js'
import DatasetPage2 from './DatasetPage2/DatasetPage2'
import RightSidebar from '../Common/RightSidebar'
import DatasetPage1 from './DatasetPage1.js'
// import structure from './structure.json'
import { Container, Row, Col } from 'react-bootstrap'

const Dataset = () => {
  // [TODO] Fetch structure here with an API call

  return (
    <Container fluid className="h-100 mx-0 px-0">
      <Row className="mx-auto h-100">
        <Col xs={2.4}>
          {' '}
          <Sidebar />{' '}
        </Col>
        <Col className="mx-0 px-0">
          {/* <DatasetPage1 /> */}
          <DatasetPage2 />
        </Col>
        <Col xs={2.4}>
          {' '}
          <RightSidebar />{' '}
        </Col>
      </Row>
    </Container>
  )
}

export default Dataset
