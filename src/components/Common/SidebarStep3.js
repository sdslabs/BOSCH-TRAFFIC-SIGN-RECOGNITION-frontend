import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
import { useHistory } from 'react-router-dom'
const Step3 = (props) => {
  const history = useHistory()
  return (
    <Container
      fluid
      className={'stepContainer ' + (props.done ? 'grey-bg' : '')}
    >
      <Col>
        <Row className="d-flex mb-0.8">
          <div className="stepHeading">Step 3</div>
          {props.done && <img src={Tick} />}
        </Row>
        <Row>
          <div className="stepInfo">
            Apply Augumentation and Transformation on Data and continue to Model
            Building after necessary changes in dataset are made
          </div>
        </Row>
        {!props.done && (
          <Row className="d-flex justify-content-flex-start mt-3">
            <button
              className="primary-cta primary-shadow"
              onClick={() => {
                history.push('/trainedmodels')
                window.location.reload(false)
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

export default Step3
