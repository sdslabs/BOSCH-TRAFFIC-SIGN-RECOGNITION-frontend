import { React, useState, useEffect } from 'react'
import { Row, Col, Form, Container } from 'react-bootstrap'
import getInitialData from '../../api/datasetAPI'
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg'
import { ReactComponent as NewFolderIcon } from '../../assets/images/newfolder.svg'
import { ReactComponent as ArrowDownIcon } from '../../assets/images/arrowdown.svg'
import { ReactComponent as ArrowUpIcon } from '../../assets/images/arrowup.svg'

// const getSelectedImagesCount = images => {
//   let count = 0
//   images.forEach(image => {
//     if (image.selected == 'true') {
//       count++
//     }
//   })
//   return count
// }

const DatasetPage1 = () => {
  const [images, setImages] = useState([])
  const [selectedFolderName, setSelectedFolderName] = useState('')
  const [structure, setStructure] = useState({ empty: true })

  const addImages = (folder, folderName) => {
    setImages([])
    folder.images.map(image => {
      setImages(images => [...images, generateImage(image, folderName)])
    })
  }

  const generateImage = (image, folderName) => {
    return {
      element: (
        <Row className="mx-0 px-0 border-bottom d-flex align-items-center">
          <Col
            xs={1}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group controlId="formBasicCheckbox d-flex justify-content-center align-items-center">
              <Form.Check
                type="checkbox"
                id={image.name + folderName}
                defaultChecked={image.selected === 'true'}
                disabled={image.can_be_modified === 'false' && false}
                onChange={e =>
                  handleCheckbox(
                    folderName,
                    image.name,
                    e.currentTarget.checked,
                  )
                }
              />
            </Form.Group>
          </Col>
          <Col xs={1}></Col>
          <Col className="">{image.name}</Col>
        </Row>
      ),
      id: image.name + folderName,
      folderName: folderName,
    }
  }
  const handleGetInitialData = async () => {
    const structure = await getInitialData()
    structure.empty = false
    structure.folders.forEach(folder => {
      let count = 0
      folder.images.forEach(image => {
        if (image.selected === 'true') {
          count++
        }
      })
      folder.selectedCount = count
    })
    console.log('Got structure from backend: ', structure)
    setStructure(structure)
  }

  const handleCheckbox = async (folderName, imageName, selected) => {
    const newstructure = structure
    newstructure.folders.forEach(folder => {
      if (folder.name === folderName) {
        folder.selectedCount = selected
          ? folder.selectedCount + 1
          : folder.selectedCount - 1
        folder.images.forEach(image => {
          if (image.name == imageName) {
            image.selected = selected.toString()
            console.log(folderName, imageName, image.selected)
          }
        })
      }
    })
    setStructure(newstructure)
    console.log(structure)
  }

  useEffect(() => {
    handleGetInitialData()
  }, [])

  useEffect(() => {
    console.log('Structure updated in state: ', structure)
  }, [structure])

  return (
    <>
      {!structure.empty ? (
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
            <Col xs={1}></Col>
            <Col> Name</Col>
            <Col> No of Images</Col>
            <Col>Images Selected</Col>
          </Row>
          <Row className="ml-0">
            <Form className="w-100">
              <Container fluid className="mx-0 px-0">
                <Col className="mx-0 px-0">
                  {structure.folders.map((folder, id) => (
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
                            if (selectedFolderName === folder.name) {
                              setSelectedFolderName('')
                              setImages([])
                            } else {
                              setSelectedFolderName(folder.name)
                              addImages(folder, folder.name)
                            }
                          }}
                        >
                          {selectedFolderName === folder.name ? (
                            <ArrowUpIcon />
                          ) : (
                            <ArrowDownIcon />
                          )}
                        </Col>
                        <Col className="">
                          {JSON.stringify(folder.name)
                            .replace('"', '')
                            .replace('"', '')}
                        </Col>
                        <Col className="">
                          {folder.images.length.toString(2)}
                        </Col>
                        <Col>{folder.selectedCount.toString(2)}</Col>
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
