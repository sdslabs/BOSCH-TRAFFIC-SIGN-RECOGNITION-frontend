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

  useEffect(() => {
    setCheckAllFolders(props.allChecked)
  }, [props.allChecked])

  useEffect(() => {
    console.log('images updated in state: ', images)
  }, [images])

  useEffect(() => {
    console.log('checkAllFolders updated in state: ', checkAllFolders)
  }, [checkAllFolders])

  const handleCheckMultiple = e => {
    const itemName = e.target.name
    // checkAll the folders
    if (itemName === 'checkAll') {
      setCheckAllFolders(e.target.checked)
      const newFolders = props.folders.slice()
      newFolders.forEach(folder => {
        folder.checked = e.target.checked
      })
      props.setFolders(newFolders)
      // update structure
      const newStructure = { ...props.structure }
      for (let i = 0; i < newStructure.folders.length; i++) {
        for (let j = 0; j < newStructure.folders[i].images.length; j++) {
          newStructure.folders[i].images[j].selected =
            newStructure.folders[i].images[j].can_be_modified === 'true'
              ? e.target.checked.toString()
              : newStructure.folders[i].images[j].selected
        }
      }
      props.setStructure(newStructure)
    }
    // handle checkAll Images in a folder
    else {
      const newFolders = props.folders.slice()
      for (let i = 0; i < newFolders.length; i++) {
        if (newFolders[i].id.toString() === e.target.id) {
          // update folder check in UI
          newFolders[i].checked = e.target.checked
          // to make all images true
          if (e.target.checked) {
            // load all image and set them to true
            newFolders[i].currentlySelected = true
            const newStructure = { ...props.structure }
            newStructure.folders.forEach(sFolder => {
              if (i === sFolder.id) {
                const newImages = sFolder.images.slice()

                newImages.forEach(image => {
                  if (image.can_be_modified === 'true') {
                    newFolders[i].selectedCount =
                      image.selected === 'true'
                        ? newFolders[i].selectedCount
                        : newFolders[i].selectedCount + 1
                    image.selected = 'true'
                  }
                })
                setImages(newImages)
                // update structure
                sFolder.images.forEach(image => {
                  if (image.can_be_modified === 'true') {
                    sFolder.selectedCount =
                      image.selected === 'true'
                        ? sFolder.selectedCount
                        : sFolder.selectedCount + 1
                    image.selected = 'true'
                  }
                })
                props.setStructure(newStructure)
              }
            })
            // to make all images false
          } else {
            // uncheck super check in UI
            setCheckAllFolders(false)
            // update images state
            newFolders[i].currentlySelected = true
            const newStructure = { ...props.structure }
            newStructure.folders.forEach(sFolder => {
              if (i === sFolder.id) {
                const newImages = sFolder.images.slice()
                newImages.forEach(image => {
                  if (image.can_be_modified === 'true') {
                    newFolders[i].selectedCount =
                      image.selected === 'false'
                        ? newFolders[i].selectedCount
                        : newFolders[i].selectedCount - 1
                    image.selected = 'false'
                  }
                })
                setImages(newImages)
                // update structure
                sFolder.images.forEach(image => {
                  if (image.can_be_modified === 'true') {
                    sFolder.selectedCount =
                      image.selected === 'false'
                        ? sFolder.selectedCount
                        : sFolder.selectedCount - 1
                    image.selected = 'false'
                  }
                })
                props.setStructure(newStructure)
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
          {props.showUploadTools ? (
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
          ) : props.showEmptyHeader ? (
            <div className="empty-header w-100"></div>
          ) : (
            <div></div>
          )}
          {!props.dontShowHeading && (
            <Row>
              {props.preview || props.showTrainRow || props.showTestRow ? (
                <div className="ml-5 heading">Dataset</div>
              ) : (
                <div className="ml-5 heading">Select Dataset</div>
              )}
            </Row>
          )}
          {props.showTestRow && (
            <Row className="ml-2 mb-2 select-dataset-header">
              <Col>Test Data</Col>
            </Row>
          )}
          {props.showTrainRow && (
            <Row className="ml-2 mb-2 select-dataset-header">
              <Col>Train Data</Col>
            </Row>
          )}
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
                        <Col className="">{folder.imageCount.toString()}</Col>
                        <Col>{folder.selectedCount.toString()}</Col>
                      </Row>

                      {folder.currentlySelected ? (
                        images.map(image => (
                          <DatasetImageDiv
                            key={image.name}
                            image={image}
                            folders={props.folders}
                            setFolders={props.setFolders}
                            folder={folder}
                            images={images}
                            setImages={setImages}
                            structure={props.structure}
                            setStructure={props.setStructure}
                            preview={props.preview}
                          />
                        ))
                      ) : (
                        <div key={'none' + folder.id.toString()}></div>
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
