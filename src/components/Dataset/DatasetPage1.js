import { React, useState } from 'react'

import { Row, Col, Form, Container } from 'react-bootstrap'
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg'
import { ReactComponent as NewFolderIcon } from '../../assets/images/newfolder.svg'
import { ReactComponent as ArrowDownIcon } from '../../assets/images/arrowdown.svg'

const getSelectedImagesCount = images => {
  let count = 0
  images.forEach(image => {
    if (image.selected == 'true') {
      count++
    }
  })
  return count
}

const generateImage = (imageName, folderName) => {
  return {
    element: (
      <Row className="mx-0 px-0 border-bottom d-flex align-items-center">
        <Col xs={1} className="d-flex justify-content-center">
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" id={imageName + folderName} />
          </Form.Group>
        </Col>
        <Col
          xs={1}
          className="d-flex justify-content-start align-items-center"
          onClick={() => {
            console.log(image)
          }}
        >
          <ArrowDownIcon />
        </Col>
        <Col className="">{imageName}</Col>
      </Row>
    ),
    id: imageName + folderName,
  }
}

const DatasetPage1 = () => {
  const [images, setImages] = useState([])

  const addImages = (folder, folderName) => {
    folder.images.map(image => {
      setImages(images => [...images, generateImage(image.name, folderName)])
    })
  }

  // useEffect(() => {
  //   console.log(images)
  // }, [images])

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
            selected: 'false',
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
    <Container fluid className="mx-0 px-0">
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
        <Col
          xs={1}
          className="d-flex align-items-center justify-content-center"
        >
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
      <Row className="ml-0">
        <Form className="w-100">
          <Container fluid className="mx-0 px-0">
            <Col className="mx-0 px-0">
              {structure.folders.map((folder, id) => (
                <Row
                  key={id}
                  className="mx-0 px-0 border-bottom d-flex align-items-center"
                >
                  <Col xs={1} className="d-flex justify-content-center">
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" id={id} />
                    </Form.Group>
                  </Col>
                  <Col
                    xs={1}
                    className="d-flex justify-content-start align-items-center"
                    onClick={() => {
                      addImages(folder, id)
                    }}
                  >
                    <ArrowDownIcon />
                  </Col>
                  <Col className="">
                    {JSON.stringify(folder.name)
                      .replace('"', '')
                      .replace('"', '')}
                  </Col>
                  <Col className="">{folder.images.length.toString(2)}</Col>
                  <Col>{getSelectedImagesCount(folder.images).toString(2)}</Col>
                </Row>
              ))}
              {images.map(image => (
                <div key={image.id}>{image.element}</div>
              ))}
            </Col>
          </Container>
        </Form>
      </Row>
    </Container>
  )
}

export default DatasetPage1
