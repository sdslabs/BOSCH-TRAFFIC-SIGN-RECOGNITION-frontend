import React, { useState } from 'react'
import crossIcon from '../../assets/images/cross.svg'

const Upload = props => {
  const [noOfFiles, setnooffiles] = useState(0) // number of files to be uploaded
  const [targetFolderName, setTargetFolderName] = useState('') // folder in which files will be uploaded
  const [files, setFiles] = useState([]) // currently selected files

  const handleCreateFile = () => {
    if (files.length != 0) {
      const newStructure = { ...props.structure }
      newStructure.folders.forEach((folder, i) => {
        // find the concerned folder in structure
        if (folder.name === targetFolderName) {
          for (var i = 0; i < files.length; i++) {
            folder.images.push({
              name: files[i].name,
              path: files[i].path,
              can_be_modified: 'true',
              selected: 'true',
            })
            folder.imageCount += 1
            folder.selectedCount += 1
          }
          setFiles([])
          setTargetFolderName('')
          setnooffiles(0)
        }
      })
      props.setStructure(newStructure)
    }
    props.toggleUpload(false)
  }

  const handleFileSelected = e => {
    console.log('Files selected: ', e.target.files)
    setnooffiles(e.target.files.length)
    setFiles(e.target.files)
  }

  const handleFileDeselected = () => {
    setFiles([])
    setnooffiles(0)
    document.getElementById('file-input').value = ''
  }

  return (
    <div className="action-wrapper scroller">
      <div className="confirm-cancel">
        <button
          className="primary-cta-sec"
          disabled={noOfFiles === 0 || !targetFolderName}
          onClick={handleCreateFile}
        >
          Create
        </button>
        <img
          src={crossIcon}
          onClick={() => {
            props.toggleUpload(false)
          }}
          className="crossIcon"
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
              onChange={handleFileSelected}
            />
            Browse
          </label>
          {noOfFiles != 0 && (
            <div className="inside">
              <img
                src={crossIcon}
                onClick={handleFileDeselected}
                className="crossIcon"
              />
              <div>{noOfFiles} images</div>
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
                      checked={folder.name === targetFolderName}
                      onChange={() => {
                        setTargetFolderName(folder.name)
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
