import { Container, Row, Col } from 'react-bootstrap'
import { sendHP } from '../../../api/datasetAPI'

export const Topbar = props => {
  const handleSend = () => {
    sendHP(props.selectedValues)
  }
  return (
    <Container fluid className="m-0 p-0">
      <Row className="w-100 bg-grey m-0 p-0">
        <Col xs={7}></Col>
        {!props.readyToSend ? (
          <Col xs={5} className="py-2">
            <button className="secondary-cta-disabled" disabled>
              Train Model
            </button>
          </Col>
        ) : (
          <Col xs={5} className="py-2">
            <button className="secondary-cta-enabled" onClick={handleSend}>
              Train Model
            </button>
          </Col>
        )}
      </Row>
    </Container>
  )
}
