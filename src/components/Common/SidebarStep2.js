import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
import { splitDataset } from '../../api/datasetAPI'
class Step2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
    }
  }
  splitData = async () => {
    this.setState({ disabled: true })
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
          <Row className="d-flex mb-0.8">
            <div className="stepHeading">Step 2</div>
            {this.props.done && <img src={Tick} />}
          </Row>
          <Row>
            <div className="stepInfo">
              Split Selected Data into Training and Test Data{' '}
            </div>
          </Row>
          {!this.props.done && (
            <Row className="d-flex justify-content-flex-start mt-3">
              <button
                className="primary-cta primary-shadow"
                onClick={this.splitData}
                disabled={this.state.disabled}
              >
                Split Data
              </button>
            </Row>
          )}
        </Col>
      </Container>
    )
  }
}

export default Step2
