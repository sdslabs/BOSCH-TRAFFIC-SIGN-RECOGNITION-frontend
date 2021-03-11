import React from 'react'
import Sidebar from '../Common/Sidebar.js'
import { Container, Row, Col } from 'react-bootstrap'
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg'
import { ReactComponent as NewFolderIcon } from '../../assets/images/newfolder.svg'

class Dataset extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row className="mx-auto">
          <Col xs={2.4}>
            {' '}
            <Sidebar />{' '}
          </Col>
          <Col>
            <Row className="p-3">
              <Col xs={2}>
                <div className="primary-cta bw-10">
                  <UploadIcon />
                  Upload
                </div>
              </Col>
              <Col className="p-auto my-auto">
                <NewFolderIcon className="mr-3" />
                New Folder
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dataset
