import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
class Step1 extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={'stepContainer ' + (this.props.done ? 'grey-bg' : '')}
      >
        <Col>
          <Row className="d-flex mb-2">
            <div className="stepHeading">Step 1</div>
            {this.props.done && <img src={Tick} className="mr-2" />}
          </Row>
          <Row>
            <div className="stepInfo">
              Select and generate dataset for model building
            </div>
          </Row>
          <Row className="d-flex justify-content-flex-start mt-3">
            <button className="primary-cta primary-shadow">
              Generate Dataset
            </button>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Step1
