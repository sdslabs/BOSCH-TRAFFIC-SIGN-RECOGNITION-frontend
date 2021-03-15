import React from 'react'
import { Container, Col } from 'react-bootstrap'
// import NewFolder from './NewFolder'
import Upload from './Upload'

class RightSidebar extends React.Component {
  render() {
    return (
      <Container>
        <Col>
          <Upload />
        </Col>
      </Container>
    )
  }
}

export default RightSidebar
