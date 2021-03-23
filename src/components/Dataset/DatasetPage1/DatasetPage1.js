// libs
import { React, useState, useEffect } from 'react'
import { Row, Col, Form, Container } from 'react-bootstrap'
// assets
import { ReactComponent as UploadIcon } from '../../../assets/images/upload.svg'
import ArrowDownIcon from '../../../assets/images/arrowdown.svg'
import { ReactComponent as NewFolderIcon } from '../../../assets/images/newfolder.svg'
import ArrowUpIcon from '../../../assets/images/arrowup.svg'
// components
import DatasetImageDiv from './DataSetImageDiv'

const DatasetPage1 = props => {
  const [checkAllFolders, setCheckAllFolders] = useState(false) // are all folders checked?
  const [images, setImages] = useState([]) // the currently loaded images in frontend

  useEffect(() => {
    console.log('images updated in state: ', images)
  }, [images])

  useEffect(() => {
    console.log('checkAllFolders updated in state: ', checkAllFolders)
  }, [checkAllFolders])

  const handleCheckMultiple = e => {
    const itemName = e.target.name
    const checked = e.target.checked
    const id = e.target.id
    // checkAll the folders
    if (itemName === 'checkAll') {
      // set the checkbox
      setCheckAllFolders(checked)
      // update the structure
      const newStructure = { ...props.structure }
      for (let i = 0; i < newStructure.folders.length; i++) {
        // set checkbox
        newStructure.folders[i].checked = checked
        // set all images that can be modified to checked
        for (let j = 0; j < newStructure.folders[i].images.length; j++) {
          if (newStructure.folders[i].images[j].can_be_modified === 'true') {
            if (checked) {
              if (!(newStructure.folders[i].images[j].selected === 'true')) {
                newStructure.folders[i].selectedCount++
              }
            } else {
              newStructure.folders[i].selectedCount--
            }
            newStructure.folders[i].images[j].selected = checked.toString()
          }
        }
      }
      props.setStructure(newStructure)
    }

    // handle checkAll Images in a folder
    else {
      // if unchecked, then uncheck the super check
      if (!checked) {
        setCheckAllFolders(false)
      }
      const newStructure = { ...props.structure }
      let checkedCount = 0
      for (let i = 0; i < newStructure.folders.length; i++) {
        // find the folder in question
        if (newStructure.folders[i].id.toString() === id) {
          // iterate over all images of that folder
          for (let j = 0; j < newStructure.folders[i].images.length; j++) {
            if (newStructure.folders[i].images[j].can_be_modified === 'true') {
              if (checked) {
                if (!(newStructure.folders[i].images[j].selected === 'true')) {
                  newStructure.folders[i].selectedCount++
                }
              } else {
                newStructure.folders[i].selectedCount--
              }
              newStructure.folders[i].images[j].selected = checked.toString()
            }
          }
          newStructure.folders[i].checked = checked
        }
        // handle manually select all folders
        if (newStructure.folders[i].checked) {
          checkedCount++
        }
      }
      // handle manually select all folders
      if (checkedCount === newStructure.folders.length) {
        setCheckAllFolders(true)
      }
      props.setStructure(newStructure)
    }
  }

  return (
    <>
      {!props.structure.empty ? (
        <Container
          fluid
          className="dataset-page-1 p-0"
          style={{
            backgroundColor:
              props.isUpload || props.isNewFolder
                ? 'rgba(196, 196, 196, 0.2)'
                : 'white',
          }}
        >
          <Col className="p-0">
            {props.showUploadTools ? (
              <Row className="empty-header border-bottom header-step3">
                <button
                  className="primary-cta-sec ml-3"
                  onClick={() => props.toggleUpload()}
                >
                  <UploadIcon className="mr-3" />
                  Upload
                </button>
                <button
                  className="tertiary-cta ml-2"
                  onClick={() => props.toggleNewFolder()}
                  style={{ cursor: 'pointer' }}
                >
                  <NewFolderIcon className="mr-3" />
                  New Folder
                </button>
              </Row>
            ) : props.showEmptyHeader ? (
              <div className="empty-header w-100"></div>
            ) : null}
            {!props.dontShowHeading && (
              <Row>
                {props.preview || props.showTrainRow || props.showTestRow ? (
                  <div className="ml-5 heading">Dataset</div>
                ) : (
                  <div className="ml-5 heading">Select Dataset</div>
                )}
              </Row>
            )}
            {props.sp && (
              <div className="ml-5 heading mt-0">Generate Dataset</div>
            )}
            {props.showTestRow && (
              <Row className="ml-2 mb-2 select-dataset-header">
                <Col>Validation Data</Col>
              </Row>
            )}
            {props.showTrainRow && (
              <Row className="ml-2 mb-2 select-dataset-header">
                <Col>Train Data</Col>
              </Row>
            )}
            <Col className="p-0">
              {!props.notShowHeader && (
                <Row className="m-0 select-dataset-header">
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
                        className="checkbox-default"
                      ></input>
                    </Col>
                  )}
                  <Col xs={1}></Col>
                  <Col
                    xs={1}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {' '}
                    Name
                  </Col>
                  <Col
                    xs={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {' '}
                    No of Images
                  </Col>
                  <Col
                    xs={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    Images Selected
                  </Col>
                  <Col></Col>
                </Row>
              )}
              <Row className="m-0">
                <Form className="w-100">
                  <Container fluid className="m-0 p-0">
                    <Col className="m-0 p-0">
                      {props.structure.folders.map(folder => (
                        <div key={folder.id}>
                          <Row className="m-0 p-0 border-bottom select-dataset-folder">
                            {!props.preview && (
                              <Col
                                xs={1}
                                className="d-flex justify-content-center align-items-center"
                              >
                                <input
                                  type="checkbox"
                                  className="checkbox-default"
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
                                  // Folder is currently selected, unselect it
                                  const newStructure = { ...props.structure }
                                  for (
                                    let i = 0;
                                    i < newStructure.folders.length;
                                    i++
                                  ) {
                                    if (
                                      newStructure.folders[i].id === folder.id
                                    ) {
                                      newStructure.folders[
                                        i
                                      ].currentlySelected = false
                                    }
                                  }
                                  props.setStructure(newStructure)
                                  setImages([])
                                } else {
                                  // Folder is currently unselected, select it
                                  const newStructure = { ...props.structure }
                                  for (
                                    let i = 0;
                                    i < newStructure.folders.length;
                                    i++
                                  ) {
                                    if (
                                      newStructure.folders[i].id === folder.id
                                    ) {
                                      newStructure.folders[
                                        i
                                      ].currentlySelected = true
                                    } else {
                                      newStructure.folders[
                                        i
                                      ].currentlySelected = false
                                    }
                                  }
                                  props.setStructure(newStructure)
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
                            <Col
                              xs={props.isAugmentation ? 3 : 1}
                              className="d-flex align-items-center justify-content-center"
                            >
                              {JSON.stringify(folder.name)
                                .replace('"', '')
                                .replace('"', '')}
                            </Col>
                            <Col
                              xs={props.isAugmentation ? 5 : 2}
                              className={
                                props.isAugmentation
                                  ? 'pl-5 ml-5 d-flex align-items-center justify-content-center'
                                  : 'd-flex align-items-center justify-content-center'
                              }
                            >
                              {folder.imageCount.toString()}
                            </Col>
                            {!props.isAnalysis && (
                              <Col
                                xs={2}
                                className="d-flex align-items-center justify-content-center"
                              >
                                {folder.selectedCount.toString()}
                              </Col>
                            )}
                            {props.isAugmentation ? null : <Col></Col>}
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
                                isAnalysis={props.isAnalysis}
                                setSelectedImg={props.setSelectedImg}
                                selectedImg={props.selectedImg}
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
            </Col>
          </Col>
        </Container>
      ) : (
        <div>loading....</div>
      )}
    </>
  )
}

export default DatasetPage1
