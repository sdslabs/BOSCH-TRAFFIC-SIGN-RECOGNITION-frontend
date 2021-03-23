import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Tick from '../../assets/images/tick.svg'
import { useHistory } from 'react-router-dom'

const Step4 = props => {
  const history = useHistory()

  return (
    <Container
      fluid
      className={'stepContainer ' + (props.done ? 'grey-bg' : '')}
    >
      <Col>
        <Row className="d-flex mb-0.8">
          <div className="stepHeading">Step 4</div>
          {props.done && <img src={Tick} />}
        </Row>
        <Row className="stepInfo">
          Modify the layers of model to be trained & train the model and then
          continue to analyse part for analysis of model
        </Row>
        {!props.done && (
          <Row className="d-flex justify-content-flex-start mt-3">
            <button
              className="primary-cta primary-shadow"
              onClick={() => {
                history.push('/analysis')
                window.location.reload(false)
              }}
              disabled={!props.trainingCompleted}
            >
              Model Analysis
            </button>
          </Row>
        )}
      </Col>
    </Container>
  )
}

export default Step4
