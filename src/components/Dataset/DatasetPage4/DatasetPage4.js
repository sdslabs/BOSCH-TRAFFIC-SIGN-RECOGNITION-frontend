import { Container, Col, Row } from 'react-bootstrap'
import { Topbar } from './TopBar'
import { InnerDisplay } from './InnerDisplay'
import { RightSidebar } from './RightSideBar'
import { useEffect, useState } from 'react'

const DatasetPage4 = props => {
  const [selectedValues, setSelectedValues] = useState({
    layers: [{ name: 'Conv' }, { name: 'Conv' }, { name: 'Conv' }],
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
          />
        </Row>
        <Row>
          <Col xs={7} className="border-right">
            <InnerDisplay
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </Col>
          <Col xs={5} className="py-2">
            <RightSidebar
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default DatasetPage4
