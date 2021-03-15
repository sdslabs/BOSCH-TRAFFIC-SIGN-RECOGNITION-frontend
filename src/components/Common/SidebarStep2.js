import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
import { splitDataset } from '../../api/datasetAPI'
class Step2 extends React.Component {
  splitData = async () => {
    const res = await splitDataset({
      training_data: this.props.splitDataTraining,
    })
    if (res.status === 200) {
      this.props.setDatasetStep(3)
    }
  }
  render() {
    return (
      <Container
        fluid
        className={'stepContainer ' + (this.props.done ? 'grey-bg' : '')}
      >
        <Col>
          <Row className="d-flex mb-2">
            <div className="stepHeading">Step 2</div>
            {this.props.done && <img src={Tick} className="mr-2" />}
          </Row>
          <Row>
            <div className="stepInfo">
              Split Selected Data into Training and Test Data{' '}
            </div>
          </Row>
          <Row className="d-flex justify-content-flex-start mt-3">
            <button
              className="primary-cta primary-shadow"
              onClick={this.splitData}
            >
              Split Data
            </button>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Step2
