import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
class Step5 extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={'stepContainer ' + (this.props.done ? 'grey-bg' : '')}
      >
        <Col>
          <Row className="d-flex mb-0.8">
            <div className="stepHeading">Step 5</div>
            {this.props.done && <img src={Tick} />}
          </Row>
          <Row className="stepInfo">
            Modify the layers of model to be trained & train the model and then
            continue to analyse part for analysis of model
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Step5
