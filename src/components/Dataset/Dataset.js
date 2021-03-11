import React from 'react'
import Sidebar from '../Common/Sidebar.js'
import DatasetPage1 from './DatasetPage1.js'
// import structure from './structure.json'
import { Container, Row, Col } from 'react-bootstrap'

const Dataset = () => {
  // [TODO] Fetch structure here with an API call

  return (
    <Container fluid className="h-100">
      <Row className="mx-auto h-100">
        <Col xs={2.4}>
          {' '}
          <Sidebar />{' '}
        </Col>
        <Col>
          <DatasetPage1 />
        </Col>
      </Row>
    </Container>
  )
}

export default Dataset
