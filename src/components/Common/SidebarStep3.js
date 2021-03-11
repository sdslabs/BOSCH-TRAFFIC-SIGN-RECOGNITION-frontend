import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
class Step3 extends React.Component {
  render() {
    return (
      <Container fluid className="m-0 p-0">
        <Col>
          <Row>
            <h3>Step 3</h3>
          </Row>
          <Row>
            <div className="font-size-1628  ">Apply Augumentation and</div>
          </Row>
          <Row className="d-flex justify-content-center mt-3">
            <div className="primary-cta bw-10">Build Model</div>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Step3
