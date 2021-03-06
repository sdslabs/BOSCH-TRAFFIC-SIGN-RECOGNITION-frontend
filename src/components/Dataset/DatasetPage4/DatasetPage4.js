import { Container, Col, Row } from 'react-bootstrap'
import { Topbar } from './TopBar'
import { InnerDisplay } from './InnerDisplay'
import { RightSidebar } from './RightSideBar'
import { useEffect, useState } from 'react'

const DatasetPage4 = props => {
  const [selectedValues, setSelectedValues] = useState({
    layers: [{ name: 'Conv' }, { name: 'Conv' }, { name: 'Conv' }],
    optimizer: 'Adam',
    learningRate: 0.0005,
    epochs: 1,
    centroidSize: 100,
    lm: 0.1,
    weightDecay: 0.0001,
    batchSize: 64,
  })
  const [readyToSend, setReadyToSend] = useState(false)

  useEffect(() => {
    console.log('selectedValues updated in state', selectedValues)
    const newValues = { ...selectedValues }
    setReadyToSend(
      'learningRate' in newValues &&
        'epochs' in newValues &&
        'centroidSize' in newValues &&
        'lm' in newValues &&
        'weightDecay' in newValues &&
        'batchSize' in newValues &&
        'optimizer' in newValues,
    )
  }, [selectedValues])

  useEffect(() => {
    console.log('Ready to send updated: ', readyToSend)
  }, [readyToSend])

  return (
    <Container fluid className="m-0 p-0">
      <Col className="m-0 p-0">
        <Row className="m-0 p-0">
          <Topbar
            selectedValues={selectedValues}
            readyToSend={readyToSend}
            setReadyToSend={setReadyToSend}
            setDatasetStep={props.setDatasetStep}
            tensorFlowLink={props.tensorFlowLink}
            setTensorFlowLink={props.setTensorFlowLink}
            trainingCompleted={props.trainingCompleted}
            setTrainingCompleted={props.setTrainingCompleted}
            tl={props.tl}
          />
        </Row>
        <Row className="m-0 p-0">
          <Col xs={7} className="border-right m-0 p-0">
            <InnerDisplay
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </Col>
          <Col xs={5} className="m-0 p-0">
            <RightSidebar
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              tl={props.tl}
            />
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default DatasetPage4
