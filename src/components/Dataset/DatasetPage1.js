import { React, useState, useEffect } from 'react'
import { Row, Col, Form, Container } from 'react-bootstrap'
import { getInitialData } from '../../api/datasetAPI'
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg'
import { ReactComponent as NewFolderIcon } from '../../assets/images/newfolder.svg'
import ArrowDownIcon from '../../assets/images/arrowdown.svg'
import ArrowUpIcon from '../../assets/images/arrowup.svg'

const DatasetPage1 = props => {
  const [images, setImages] = useState([]) // the currently loaded images in frontend
  const [selectedFolderName, setSelectedFolderName] = useState('') // the folder currentl selected for dropdown
  const [structure, setStructure] = useState({ empty: true }) // main structure
  const [checkedFolders, setCheckedFolders] = useState([]) // list of folders status on checked
  const [checkedAll, setCheckedAll] = useState(false) // are all folders checked?
  const addImages = (folder, folderName) => {
    setImages([])
    folder.images.map(image => {
      setImages(images => [...images, generateImage(image, folderName)])
    })
  }

  // const getImageCheckedStatus = (folderName, imageName) => {
  //   return (
  //     structure.folders
  //       .find(a => {
  //         return a.name === folderName
  //       })
  //       .images.find(a => {
  //         return a.name === imageName
  //       }).selected === 'true'
  //   )
  // }

  const generateImage = (image, folderName) => {
    console.log(
      'Image:',
      image.name,
      'selected',
      image.selected,
      'modified',
      image.can_be_modified,
    )
    return {
      element: (
        <Row className="mx-0 px-0 border-bottom d-flex align-items-center select-dataset-image">
          {!props.preview && (
            <Col
              xs={1}
              className="d-flex justify-content-center align-items-center"
            >
              <input
                type="checkbox"
                id={image.name + folderName}
                checked={(() => {
                  console.log('this is called')
                  return false
                })()}
                disabled={image.can_be_modified === 'false' && false}
                onChange={e =>
                  handleImageCheckbox(
                    folderName,
                    image.name,
                    e.currentTarget.checked,
                  )
                }
              />
            </Col>
          )}
          <Col xs={1}></Col>
          <Col className="">{image.name}</Col>
        </Row>
      ),
      id: image.name + folderName,
      folderName: folderName,
    }
  }

  const handleGetInitialData = async () => {
    const checkedFolders = []
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
      checkedFolders.push({
        folderName: folder.name,
        checked: false,
      })
    })
    console.log('Got structure from backend: ', structure)
    setCheckedFolders(checkedFolders)
    setStructure(structure)

    // isko mat hataana setstructure jaise hi hai ye
    if (props.initialDataHandler) {
      props.initialDataHandler(structure)
    }
  }

  const getFolderCheckedStatus = folderName => {
    return checkedFolders.find(element => element.folderName === folderName)
      .checked
  }

  const handleCheckMultiple = e => {
    const itemName = e.target.name
    const checked = e.target.checked
    if (itemName === 'checkAll') {
      setCheckedAll(checked)

      const newCheckedFolders = checkedFolders

      newCheckedFolders.forEach(folder => {
        folder.checked = checked
      })
      setCheckedFolders(newCheckedFolders)
    } else {
      const newCheckedFolders = checkedFolders.slice()
      for (let i = 0; i < newCheckedFolders.length; i++) {
        if (newCheckedFolders[i].folderName === e.target.name) {
          newCheckedFolders[i].checked = e.target.checked
          if (e.target.checked === false) {
            setCheckedAll(false)
          }
        }
      }
      setCheckedFolders(newCheckedFolders)
    }
  }

  const handleImageCheckbox = (folderName, imageName, selected) => {
    const newstructure = { ...structure }
    newstructure.folders.forEach(folder => {
      if (folder.name === folderName) {
        folder.selectedCount = selected
          ? folder.selectedCount + 1
          : folder.selectedCount - 1
        folder.images.forEach(image => {
          if (image.name == imageName) {
            image.selected = selected.toString()
            console.log(folderName, imageName, selected)
          }
        })
      }
    })

    setStructure(newstructure)

    // isko mat hataana setstructure jaise hi hai ye
    if (props.initialDataHandler) {
      props.initialDataHandler(structure)
    }
  }

  useEffect(() => {
    console.log('useEffect called!')
    handleGetInitialData()
  }, [])

  useEffect(() => {
    console.log('Structure updated in state: ', structure)
  }, [structure])

  useEffect(() => {
    console.log('CheckedFolder updated in state: ', checkedFolders)
  }, [checkedFolders])

  return (
    <>
      {!structure.empty ? (
        <Container fluid className="mx-0 px-0 dataset-page-1">
          {!props.preview ? (
            <Row className="py-3 border-bottom mx-0 px-0">
              <Col xs={2}>
                <button className="primary-cta bw-8">
                  <UploadIcon className="mr-3" />
                  Upload
                </button>
              </Col>
              <Col className="p-auto my-auto">
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
                  checked={checkedAll}
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
                  {structure.folders.map((folder, id) => (
                    <div key={'parent' + id.toString(2)}>
                      <Row
                        key={id}
                        className="mx-0 px-0 border-bottom d-flex align-items-center select-dataset-folder"
                      >
                        {!props.preview && (
                          <Col
                            xs={1}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <input
                              type="checkbox"
                              id={id}
                              name={folder.name}
                              checked={getFolderCheckedStatus(folder.name)}
                              className="d-flex align-items-center"
                              onChange={handleCheckMultiple}
                            />
                          </Col>
                        )}
                        <Col
                          xs={1}
                          className="d-flex justify-content-center align-items-center pointer"
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
