import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
class Step3 extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={'stepContainer ' + (this.props.done ? 'grey-bg' : '')}
      >
        <Col>
          <Row className="d-flex mb-0.8">
            <div className="stepHeading">Step 3</div>
            {this.props.done && <img src={Tick} />}
          </Row>
          <Row>
            <div className="stepInfo">
              Apply Augumentation and Transformation on Data and continue to
              Model Building after necessary changes in dataset are made
            </div>
          </Row>
          {!this.props.done && (
            <Row className="d-flex justify-content-flex-start mt-3">
              <button
                className="primary-cta primary-shadow"
                onClick={() => {
                  this.props.setDatasetStep(4)
                }}
              >
                Build Model
              </button>
            </Row>
          )}
        </Col>
      </Container>
    )
  }
}

export default Step3
