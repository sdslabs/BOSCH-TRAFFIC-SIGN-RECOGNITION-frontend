import React from 'react'
import Sidebar from '../Common/Sidebar.js'
import { Container, Row, Col } from 'react-bootstrap'

class Dataset extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row className="mx-auto">
          <Col xs={2.4}>
            {' '}
            <Sidebar />{' '}
          </Col>
          <Col>
            <div className="primary-cta">Data Selection</div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dataset
