import React from 'react'
import { Container, Col } from 'react-bootstrap'
import NewFolder from './NewFolder'
import Upload from './Upload'

class RightSidebar extends React.Component {
  render() {
    return (
      <Container>
        <Col>
          {this.props.isUpload ? (
            <Upload
              isUpload={this.props.isUpload}
              toggleUpload={this.props.toggleUpload}
            />
          ) : (
            <NewFolder
              isNewFolder={this.props.isNewFolder}
              toggleNewFolder={this.props.toggleNewFolder}
            />
          )}
        </Col>
      </Container>
    )
  }
}

export default RightSidebar
