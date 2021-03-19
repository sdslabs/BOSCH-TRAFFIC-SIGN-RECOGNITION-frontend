import { Container, Col, Row } from 'react-bootstrap'
import { Topbar } from './TopBar'
import { InnerDisplay } from './InnerDisplay'
import { RightSidebar } from './RightSideBar'
import { useState } from 'react'

const DatasetPage4 = props => {
  const [selectedValues, setSelectedValues] = useState('')
  return (
    <Container fluid className="m-0 p-0">
      <Col className="m-0 p-0">
        <Row className="m-0 p-0">
          <Topbar />
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
