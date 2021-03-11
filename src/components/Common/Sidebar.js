import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Step1 from './SidebarStep1.js'
import Step2 from './SidebarStep2.js'
import Step3 from './SidebarStep3.js'
class Sidebar extends React.Component {
  render() {
    return (
      <Container className="sidebar border-right border-dark p-0">
        <Col>
          <Row className="border-bottom">Heading for model</Row>
          <Step1 />
          <Step2 />
          <Step3 />
        </Col>
      </Container>
    )
  }
}

export default Sidebar
