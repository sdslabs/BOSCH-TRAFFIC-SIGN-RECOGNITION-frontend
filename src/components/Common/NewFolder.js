import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import cross from '../../assets/images/cross.svg'

const NewFolder = props => {
  const [folderName, setFolderName] = useState(43)
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
    const images = []
    if (files.length != 0) {
      for (let i = 0; i < files.length; i++) {
        images.push({
          name: files[i].name,
          can_be_modified: true,
          selected: true,
        })
      }
      props.structure.folders.push({
        name: folderName,
        images: images,
        checked: false,
        currentlySelected: false,
        imageCount: files.length,
        selectedCount: files.length,
        id: props.structure.folders[props.structure.folders.length - 1].id + 1,
      })
      props.setStructure({ ...props.structure })
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
    <div className="action-wrapper">
      <div className="confirm-cancel">
        <button
          className="primary-cta-sec"
          disabled={nooffiles === 0 || !folderName}
          onClick={uploadFiles}
        >
          Create
        </button>
        <img
          src={cross}
          onClick={() => {
            props.toggleNewFolder(false)
          }}
          className="cross"
        />
      </div>
      <div className="rotate-preview">
        <div className="rotate-heading">
          <div className="action-name">New Folder</div>
        </div>
        <div className="augmentation-input">
          <div className="action-option">Folder Name</div>
          <input
            type="number"
            min={43}
            className="input-box"
            placeholder="Folder Name"
            name="Folder Name"
            value={folderName}
            onChange={e => {
              setFolderName(e.target.value)
            }}
          />
        </div>
        <div className="augmentation-input">
          <div className="action-option">Choose images to upload</div>
          <label
            className="secondary-cta"
            style={{
              width: '5rem',
              paddingLeft: 'auto',
              paddingRight: 'auto',
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
          {nooffiles != 0 && (
            <div className="inside">
              <img src={cross} onClick={deselectFiles} className="cross" />
              <div>{nooffiles} images</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewFolder
