import { React, useState, useEffect } from 'react'
import { Row, Col, Form, Container } from 'react-bootstrap'
import getInitialData from '../../api/datasetAPI'
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
        <Col
          xs={1}
          className="d-flex justify-content-center align-items-center"
        >
          <Form.Group controlId="formBasicCheckbox d-flex justify-content-center align-items-center">
            <Form.Check type="checkbox" id={imageName + folderName} />
          </Form.Group>
        </Col>
        <Col xs={1}></Col>
        <Col className="">{imageName}</Col>
      </Row>
    ),
    id: imageName + folderName,
    folderName: folderName,
  }
}

const DatasetPage1 = () => {
  const [pending, setPending] = useState(false)
  const [images, setImages] = useState([])
  const [selectedFolderName, setSelectedFolderName] = useState('')
  const [structure, setStructure] = useState({})
  console.log(selectedFolderName)

  const addImages = (folder, folderName) => {
    setImages([])
    folder.images.map(image => {
      setImages(images => [...images, generateImage(image.name, folderName)])
    })
  }

  useEffect(() => {
    handleGetInitialData()
  }, [])

  useEffect(() => {
    console.log('Structure updated: ', structure)
  }, [structure])

  const handleGetInitialData = async () => {
    setPending(true)
    const structure = await getInitialData()
    console.log('got structure: ', structure)
    setStructure(structure)
    setPending(false)
  }

  return (
    <>
      {!pending ? (
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
                  {false &&
                    structure.folders.map((folder, id) => (
                      <div key={'parent' + id.toString(2)}>
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
                              setSelectedFolderName(folder.name)
                              addImages(folder, folder.name)
                            }}
                          >
                            <ArrowDownIcon />
                          </Col>
                          <Col className="">
                            {JSON.stringify(folder.name)
                              .replace('"', '')
                              .replace('"', '')}
                          </Col>
                          <Col className="">
                            {folder.images.length.toString(2)}
                          </Col>
                          <Col>
                            {getSelectedImagesCount(folder.images).toString(2)}
                          </Col>
                        </Row>

                        {selectedFolderName === folder.name ? (
                          images.map(image => (
                            <div key={image.id}>{image.element}</div>
                          ))
                        ) : (
                          <div key={'none' + id.toString(2)}></div>
                        )}
                      </div>
                    ))}
                </Col>
              </Container>
            </Form>
          </Row>
        </Container>
      ) : (
        <div>loading....</div>
      )}
    </>
  )
}

export default DatasetPage1
