import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import cross from '../../assets/images/cross.svg'

const NewFolder = props => {
  const [folderName, setFolderName] = useState('')
  const [nooffiles, setnooffiles] = useState(0)
  const [files, setFiles] = useState([])
  const onFileChange = event => {
    console.log(event.target.files, event.target)
    setnooffiles(event.target.files.length)
    setFiles(event.target.files)
    console.log(files)
  }
  const setSelectedFolderName = e => {
    setFolderName(e.target.value)
  }
  const uploadFiles = () => {
    if (files.length != 0) {
      structure.folders.forEach(element => {
        if (element.name === folderName) {
          console.log(element)
          const newStructure = [
            ...element.images,
            {
              name: files[0].name,
              can_be_modified: true,
              selected: true,
            },
          ]
          console.log(newStructure, files[0])
        }
      })
    }
  }
  const deselectFiles = () => {
    setnooffiles(0)
    setFiles([])
    document.getElementById('file-input').value = ''
  }
  useEffect(() => {
    console.log(folderName)
  })
  return (
    <Container className="newfolder">
      <div className="head">
        {nooffiles != 0 ? (
          <span className="button" onClick={uploadFiles}>
            Create
          </span>
        ) : (
          <span className="disabled-button"> Create </span>
        )}
        <span className="exit">
          <img src={cross} onClick={props.toggleNewFolder} />
        </span>
      </div>
      <Row className="heading"> New Folder </Row>
      <Form.Group>
        <Form.Label> Name </Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          onChange={setSelectedFolderName}
        />
      </Form.Group>
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
    </Container>
  )
}

export default NewFolder
