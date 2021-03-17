import { Container, Col, Row } from 'react-bootstrap'
import { Topbar } from './TopBar'
import { InnerDisplay } from './InnerDisplay'
import { RightSidebar } from './RightSideBar'

const DatasetPage4 = props => {
  return (
    <Container fluid className="m-0 p-0">
      <Col className="m-0 p-0">
        <Row className="m-0 p-0">
          <Topbar />
        </Row>
        <Row>
          <Col xs={7} className="border-right">
            <InnerDisplay />
          </Col>
          <Col xs={5} className="py-2">
            <RightSidebar />
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default DatasetPage4
