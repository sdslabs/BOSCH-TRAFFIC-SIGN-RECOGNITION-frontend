import React from 'react'

import { Row, Col, Form, Button } from 'react-bootstrap'
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg'
import { ReactComponent as NewFolderIcon } from '../../assets/images/newfolder.svg'

const DatasetPage1 = () => {
  const structure = {
    folders: [
      {
        name: '00014',
        path: './GTSRB/trainingset/00014',
        images: [
          {
            name: '00001_00002.ppm',
            path: './GTSRB/trainingset/00014/00001_00002.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00019_00018.ppm',
            path: './GTSRB/trainingset/00014/00019_00018.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00020_00028.ppm',
            path: './GTSRB/trainingset/00014/00020_00028.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00010_00008.ppm',
            path: './GTSRB/trainingset/00014/00010_00008.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00001_00008.ppm',
            path: './GTSRB/trainingset/00014/00001_00008.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
        ],
      },
      {
        name: '00019',
        path: './GTSRB/trainingset/00019',
        images: [
          {
            name: '00001_00002.ppm',
            path: './GTSRB/trainingset/00019/00001_00002.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00001_00008.ppm',
            path: './GTSRB/trainingset/00019/00001_00008.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00002_00003.ppm',
            path: './GTSRB/trainingset/00019/00002_00003.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00004_00010.ppm',
            path: './GTSRB/trainingset/00019/00004_00010.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00003_00011.ppm',
            path: './GTSRB/trainingset/00019/00003_00011.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
        ],
      },
      {
        name: '00023',
        path: './GTSRB/trainingset/00023',
        images: [
          {
            name: '00001_00002.ppm',
            path: './GTSRB/trainingset/00023/00001_00002.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00010_00008.ppm',
            path: './GTSRB/trainingset/00023/00010_00008.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00001_00008.ppm',
            path: './GTSRB/trainingset/00023/00001_00008.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00016_00005.ppm',
            path: './GTSRB/trainingset/00023/00016_00005.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00002_00003.ppm',
            path: './GTSRB/trainingset/00023/00002_00003.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
        ],
      },
      {
        name: '00024',
        path: './GTSRB/trainingset/00024',
        images: [
          {
            name: '00001_00002.ppm',
            path: './GTSRB/trainingset/00024/00001_00002.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00001_00008.ppm',
            path: './GTSRB/trainingset/00024/00001_00008.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00002_00003.ppm',
            path: './GTSRB/trainingset/00024/00002_00003.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00004_00010.ppm',
            path: './GTSRB/trainingset/00024/00004_00010.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00008_00013.ppm',
            path: './GTSRB/trainingset/00024/00008_00013.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
        ],
      },
      {
        name: '00042',
        path: './GTSRB/trainingset/00042',
        images: [
          {
            name: '00001_00002.ppm',
            path: './GTSRB/trainingset/00042/00001_00002.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00001_00008.ppm',
            path: './GTSRB/trainingset/00042/00001_00008.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00002_00003.ppm',
            path: './GTSRB/trainingset/00042/00002_00003.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00004_00010.ppm',
            path: './GTSRB/trainingset/00042/00004_00010.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
          {
            name: '00003_00011.ppm',
            path: './GTSRB/trainingset/00042/00003_00011.ppm',
            can_be_modified: 'false',
            selected: 'true',
          },
        ],
      },
    ],
  }

  return (
    <>
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
        <h1 className="ml-5">Select Dataset</h1>
      </Row>
      <Row className="ml-0">
        <Col className="ml-4">
          {' '}
          <Form>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" id="select-all" />
            </Form.Group>
          </Form>
        </Col>
        <Col> Name</Col>
        <Col> No of Images</Col>
        <Col>Images Selected</Col>
      </Row>
      <Row>
        <Form>
          <Col className="ml-5">
            {structure.folders.map((folder, id) => (
              <Row key={id}>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" id={id} />
                </Form.Group>
                <div>{JSON.stringify(folder.name)}</div>
              </Row>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Form>
      </Row>
    </>
  )
}

export default DatasetPage1
