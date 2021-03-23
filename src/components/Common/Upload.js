import React, { useState } from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import cross from '../../assets/images/cross.svg'
import { sendFile } from '../../api/datasetAPI'

const Upload = props => {
  const [folderName, setFolderName] = useState('')
  const [nooffiles, setnooffiles] = useState(0)
  const [files, setFiles] = useState([])
  const onFileChange = event => {
    setnooffiles(event.target.files.length)
    setFiles(event.target.files)
  }
  const setSelectedFolderName = e => {
    if (folderName != '') {
      document.getElementById(folderName).checked = false
    }
    e.target.checked ? setFolderName(e.target.name) : setFolderName('')
  }
  const uploadFiles = () => {
    if (files.length != 0) {
      props.structure.folders.forEach(element => {
        if (element.name === folderName) {
          for (let i = 0; i < files.length; i++) {
            const path = element.path + '/' + files[i].name
            element.images.push({
              name: files[i].name,
              can_be_modified: 'true',
              selected: 'true',
              path: path,
            })
            element.imageCount += 1
            element.selectedCount += 1
            sendFile(files[i], path)
          }
        }
        setFiles([])
        setFolderName('')
        document.getElementById(folderName).checked = false
        setnooffiles(0)
        props.toggleUpload()
      })
      props.setStructure({ ...props.structure })
    }
  }
  const deselectFiles = () => {
    setnooffiles(0)
    setFiles([])
    document.getElementById('file-input').value = ''
  }
  return (
    <Container className="upload">
      <div className="head">
        <span className="button" onClick={uploadFiles}>
          Upload
        </span>
        <span className="exit">
          <img src={cross} onClick={props.toggleUpload} />
        </span>
      </div>
      <Row className="heading"> Upload </Row>
      <Row className="heading-2"> Choose Images to Upload </Row>
      <Row>
        <Col>
          <form>
            <label
              style={{
                color: '#335BC0',
                borderColor: '#335BC0',
                backgroundColor: 'white',
                marginTop: '10%',
                borderStyle: 'solid',
                padding: '3px',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple={true}
                capture={true}
                style={{ display: 'none' }}
                onChange={onFileChange}
              />
              Browse
            </label>
          </form>
        </Col>
        {nooffiles != 0 ? (
          <Col className="delete-images">
            <Row className="inside">
              <img className="img" src={cross} onClick={deselectFiles} />
              <p className="text">{nooffiles} images</p>
            </Row>
          </Col>
        ) : null}
      </Row>
      <Row className="heading-2"> Choose Folder for uploading </Row>
      {!props.structure.empty
        ? props.structure.folders.map((folder, id) => (
            <Form key={id}>
              <Form.Check
                type="checkbox"
                label={folder.name}
                key={id}
                name={folder.name}
                id={folder.name}
                onChange={setSelectedFolderName}
              />
            </Form>
          ))
        : null}
    </Container>
  )
}

export default Upload
