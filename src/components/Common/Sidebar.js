import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Step1 from './SidebarStep1.js'
import Step2 from './SidebarStep2.js'
import Step3 from './SidebarStep3.js'
class Sidebar extends React.Component {
  render() {
    return (
      <Container className="sidebar border-right border-dark p-0">
        <Col className="p-0">
          <Row className="border-bottom heading">Heading for model</Row>
          {this.props.datasetStep >= 1 && (
            <Step1 done={this.props.datasetStep > 1} />
          )}
          {this.props.datasetStep >= 2 && (
            <Step2 done={this.props.datasetStep > 2} />
          )}
          {this.props.datasetStep >= 3 && (
            <Step3 done={this.props.datasetStep > 3} />
          )}
        </Col>
      </Container>
    )
  }
}

export default Sidebar
