import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
class Step2 extends React.Component {
  render() {
    return (
      <Container fluid className="m-0 p-0">
        <Col>
          <Row>
            <h3>Step 2</h3>
          </Row>
          <Row>
            <div>Split Selected Data into Training and Test Data </div>
          </Row>
          <Row className="d-flex justify-content-center mt-3">
            <div className="primary-cta bw-10">Split Data</div>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Step2
