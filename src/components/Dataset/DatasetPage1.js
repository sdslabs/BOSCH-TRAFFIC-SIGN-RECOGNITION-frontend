// libs
import { React, useState, useEffect } from 'react'
import { Row, Col, Form, Container } from 'react-bootstrap'
// assets
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg'
import ArrowDownIcon from '../../assets/images/arrowdown.svg'
import { ReactComponent as NewFolderIcon } from '../../assets/images/newfolder.svg'
import ArrowUpIcon from '../../assets/images/arrowup.svg'
// components
import DatasetImageDiv from './DataSetImageDiv'

const DatasetPage1 = props => {
  const [checkAllFolders, setCheckAllFolders] = useState(false) // are all folders checked?
  const [images, setImages] = useState([]) // the currently loaded images in frontend
  const [imageRandom, setImageRandom] = useState(100) // random

  useEffect(() => {
    console.log('images updated in state: ', images)
  }, [images])

  useEffect(() => {
    console.log('checkAllFolders updated in state: ', checkAllFolders)
  }, [checkAllFolders])

  const handleCheckMultiple = e => {
    const itemName = e.target.name
    // handle check All folders
    if (itemName === 'checkAll') {
      setCheckAllFolders(e.target.checked)
      const newFolders = props.folders.slice()
      newFolders.forEach(folder => {
        folder.checked = e.target.checked
      })
      props.setFolders(newFolders)
    }
    // handle checkAll Images
    else {
      const newFolders = props.folders.slice()
      for (let i = 0; i < newFolders.length; i++) {
        if (newFolders[i].id.toString() === e.target.id) {
          // update check in UI
          newFolders[i].checked = e.target.checked
          if (e.target.checked) {
            // load all image and set them to true
            newFolders[i].currentlySelected = true
            props.structure.folders.forEach(sFolder => {
              if (i === sFolder.id) {
                const newImages = sFolder.images.slice()
                newImages.forEach(
                  image =>
                    (image.selected =
                      image.can_be_modified === 'true'
                        ? 'true'
                        : image.selected),
                )
                setImages(newImages)
                setImageRandom(imageRandom + 1)
              }
            })
          } else {
            // uncheck super check in UI
            setCheckAllFolders(false)
            // update images state
            newFolders[i].currentlySelected = true
            props.structure.folders.forEach(sFolder => {
              if (i === sFolder.id) {
                const newImages = sFolder.images.slice()
                newImages.forEach(
                  image =>
                    (image.selected =
                      image.can_be_modified === 'true'
                        ? 'false'
                        : image.selected),
                )
                setImages(newImages)
                setImageRandom(imageRandom + 1)
              }
            })
          }

          break
        }
      }
      props.setFolders(newFolders)
    }
  }

  return (
    <>
      {!props.structure.empty ? (
        <Container fluid className="mx-0 px-0 dataset-page-1">
          {!props.preview ? (
            <Row className="py-3 border-bottom mx-0 px-0">
              <Col xs={2}>
                <button
                  className="primary-cta bw-8"
                  onClick={() => props.toggleUpload()}
                >
                  <UploadIcon className="mr-3" />
                  Upload
                </button>
              </Col>
              <Col
                className="p-auto my-auto"
                onClick={() => props.toggleNewFolder()}
                style={{ cursor: 'pointer' }}
              >
                <NewFolderIcon className="mr-3" />
                New Folder
              </Col>
            </Row>
          ) : (
            <div className="empty-header w-100"></div>
          )}
          <Row>
            {props.preview ? (
              <div className="ml-5 heading">Dataset</div>
            ) : (
              <div className="ml-5 heading">Select Dataset</div>
            )}
          </Row>
          <Row className="ml-0 select-dataset-header">
            {!props.preview && (
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                <input
                  type="checkbox"
                  name="checkAll"
                  checked={checkAllFolders}
                  onChange={handleCheckMultiple}
                  className="d-flex align-items-center"
                ></input>
              </Col>
            )}
            <Col xs={1}></Col>
            <Col> Name</Col>
            <Col> No of Images</Col>
            <Col>Images Selected</Col>
          </Row>
          <Row className="ml-0">
            <Form className="w-100">
              <Container fluid className="mx-0 px-0">
                <Col className="mx-0 px-0">
                  {props.folders.map(folder => (
                    <div key={folder.id}>
                      <Row className="mx-0 px-0 border-bottom d-flex align-items-center select-dataset-folder">
                        {!props.preview && (
                          <Col
                            xs={1}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <input
                              type="checkbox"
                              id={folder.id}
                              name={folder.name}
                              checked={folder.checked}
                              onChange={handleCheckMultiple}
                            />
                          </Col>
                        )}
                        <Col
                          xs={1}
                          className="d-flex justify-content-center align-items-center pointer"
                          folder={folder}
                          onClick={async () => {
                            if (folder.currentlySelected === true) {
                              const newFolders = props.folders.slice()
                              for (let i = 0; i < newFolders.length; i++) {
                                if (newFolders[i].id === folder.id) {
                                  newFolders[i].currentlySelected = false
                                }
                              }
                              props.setFolders(newFolders)
                              setImages([])
                            } else {
                              const newFolders = props.folders.slice()
                              for (let i = 0; i < newFolders.length; i++) {
                                if (newFolders[i].id === folder.id) {
                                  newFolders[i].currentlySelected = true
                                } else {
                                  newFolders[i].currentlySelected = false
                                }
                              }
                              props.setFolders(newFolders)
                              props.structure.folders.forEach(sFolder => {
                                if (folder.id === sFolder.id) {
                                  setImages(sFolder.images)
                                }
                              })
                            }
                          }}
                        >
                          {folder.currentlySelected ? (
                            <img
                              src={ArrowUpIcon}
                              className="open-close-folder d-flex justify-content-center"
                            />
                          ) : (
                            <img
                              src={ArrowDownIcon}
                              className="open-close-folder d-flex justify-content-center"
                            />
                          )}
                        </Col>
                        <Col className="">
                          {JSON.stringify(folder.name)
                            .replace('"', '')
                            .replace('"', '')}
                        </Col>
                        <Col className="">{folder.imageCount.toString(2)}</Col>
                        <Col>{folder.selectedCount.toString(2)}</Col>
                      </Row>

                      {imageRandom > 0 && folder.currentlySelected ? (
                        images.map(image => (
                          <DatasetImageDiv
                            key={image.name}
                            image={image}
                            images={images}
                            setImages={setImages}
                          />
                        ))
                      ) : (
                        <div key={'none' + folder.id.toString(2)}></div>
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
