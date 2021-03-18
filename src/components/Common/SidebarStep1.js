import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
import { generateDataset } from '../../api/datasetAPI'
class Step1 extends React.Component {
  submitInitialDataset = async () => {
    console.log('submit initial dataset!!!')
    const res = await generateDataset(JSON.stringify(this.props.initialData))
    console.log('response received: ', res)
    if (res.status === 200) {
      console.log('setDatasetstep = 2')
      this.props.setDatasetStep(2)
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
            <div className="stepHeading">Step 1</div>
            {this.props.done && <img src={Tick} className="mr-2" />}
          </Row>
          <Row>
            <div className="stepInfo">
              Select and generate dataset for model building
            </div>
          </Row>
          <Row className="d-flex justify-content-flex-start mt-3">
            <button
              className="primary-cta primary-shadow"
              onClick={this.submitInitialDataset}
              disabled={this.props.done}
            >
              Generate Dataset
            </button>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Step1
