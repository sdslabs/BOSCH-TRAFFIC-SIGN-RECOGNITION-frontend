import { Container, Row, Col } from 'react-bootstrap'
import { sendHP, getEmbedLink } from '../../../api/datasetAPI'

export const Topbar = props => {
  const handleSend = async () => {
    props.setReadyToSend(false)
    console.log('Sending Selected Values: ', props.selectedValues)
    sendHP(props.selectedValues).then(response => {
      console.log(
        'Training has been completed, now you can go to the next page',
        response,
      )
      props.setTrainingCompleted(true)
    })
    pingForEmbedLink()
  }

  const pingForEmbedLink = async () => {
    const embedLinkPinger = setInterval(() => {
      console.log('Asking for embed link...')
      const res = getEmbedLink()
      if (res) {
        res.then(resp => {
          console.log('Got tensorflow link: ', resp)
          if (!(resp.link_exists === 'false')) {
            props.setTensorFlowLink(resp.link)
            console.log(
              'Link is ready! Taking you to the embedding wala page: ',
              resp,
            )
            props.setDatasetStep(6)
            clearInterval(embedLinkPinger)
          }
        })
      }
    }, 5000)
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
