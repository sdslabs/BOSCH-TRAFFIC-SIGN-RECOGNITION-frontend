import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
class Step1 extends React.Component {
  render() {
    return (
      <Container fluid className="m-0 p-0">
        <Col>
          <Row>
            <h3>Step 1</h3>
          </Row>
          <Row>
            <div>Select and generate dataset for model building</div>
          </Row>
          <Row className="d-flex justify-content-center mt-3">
            <div className="primary-cta bw-10">Generate Dataset</div>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Step1
