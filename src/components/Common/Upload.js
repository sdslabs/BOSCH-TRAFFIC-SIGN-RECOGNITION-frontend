import React, { useState } from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import cross from '../../assets/images/cross.svg'

const Upload = props => {
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
    if (folderName != '') {
      document.getElementById(folderName).checked = false
    }
    e.target.checked ? setFolderName(e.target.name) : setFolderName('')
  }
  const uploadFiles = () => {
    if (files.length != 0) {
      const newStructure = { ...props.structure }
      newStructure.folders.forEach((folder, i) => {
        // find the concerned folder in structure
        if (folder.name === folderName) {
          for (var i = 0; i < files.length; i++) {
            folder.images.push({
              name: files[i].name,
              path: files[i].path,
              can_be_modified: 'true',
              selected: 'true',
            })
          }
          folder.imageCount += 1
          folder.selectedCount += 1
          setFiles([])
          setFolderName('')
          setnooffiles(0)
          // document.getElementById(folderName).checked = false
        }
      })
      props.setStructure({ ...newStructure })
    }
  }
  const deselectFiles = () => {
    setnooffiles(0)
    setFiles([])
    document.getElementById('file-input').value = ''
  }
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
            props.toggleUpload(false)
          }}
          className="cross"
        />
      </div>
      <div className="rotate-preview">
        <div className="rotate-heading">
          <div className="action-name">Upload</div>{' '}
        </div>
        <div className="augmentation-input">
          <div className="action-option">Choose images to upload</div>
          <label
            className="secondary-cta"
            style={{
              width: '5rem',
              paddingLeft: 'auto',
              paddingRight: 'auto',
              marginTop: '1rem',
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
        <div className="augmentation-input">
          <div className="action-option">Choose folder for uploading</div>
          <div className="folder-radios">
            {!props.structure.empty &&
              !props.structure.empty &&
              props.structure.folders.map(folder => {
                return (
                  <div key={folder.name} className="folder-radio">
                    <input
                      type="radio"
                      checked={folder.name === folderName}
                      onChange={() => {
                        setFolderName(folder.name)
                      }}
                    />
                    <div>Class {folder.name}</div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
