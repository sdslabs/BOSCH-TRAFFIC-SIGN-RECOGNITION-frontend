import { Container, Row, Col } from 'react-bootstrap'
import { sendHP, getEmbedLink } from '../../../api/datasetAPI'

export const Topbar = props => {
  const handleSend = async () => {
    console.log('Sending Selected Values: ', props.selectedValues)
    const response = await sendHP(props.selectedValues)
    console.log(
      'received response from backend after sending selected values... initializing tensorboard UI ',
      response,
    )
    props.setDatasetStep(6)
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
