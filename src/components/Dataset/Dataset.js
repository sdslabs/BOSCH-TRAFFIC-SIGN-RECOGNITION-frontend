import React from 'react'
import Sidebar from '../Common/Sidebar.js'
// import structure from './structure.json'
import { Container, Row, Col } from 'react-bootstrap'
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg'
import { ReactComponent as NewFolderIcon } from '../../assets/images/newfolder.svg'

const Dataset = () => {
  // structure = JSON.parse(structure)
  // console.log(structure)

  return (
    <Container fluid>
      <Row className="mx-auto">
        <Col xs={2.4}>
          {' '}
          <Sidebar />{' '}
        </Col>
        <Col>
          <Row className="py-3 border-bottom mx-0 px-0">
            <Col xs={2}>
              <div className="primary-cta bw-8">
                <UploadIcon className="mr-3" />
                Upload
              </div>
            </Col>
            <Col className="p-auto my-auto">
              <NewFolderIcon className="mr-3" />
              New Folder
            </Col>
          </Row>
          <Row>
            <div className="">Select Dataset</div>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Dataset
