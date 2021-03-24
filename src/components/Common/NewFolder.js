import React, { useState, useEffect } from 'react'
import crossIcon from '../../assets/images/cross.svg'

const NewFolder = props => {
  const [noOfFiles, setNoOfFiles] = useState(0) // number of files to be uploaded
  const [targetFolderName, setTargetFolderName] = useState(43) // the name of the target folder
  const [files, setFiles] = useState([]) // currently selected files

  const handleCreateFile = () => {
    console.log('files: ', files)
    console.log('targetFolderName: ', targetFolderName)
    console.log('noOfFiles: ', noOfFiles)

    const isFolderInStructure = props.structure.folders.find(
      folder => targetFolderName === folder.name,
    )
    if (isFolderInStructure) {
    } else {
      const newStructure = { ...props.structure }
      if (files.length != 0) {
        const newImages = []
        for (let i = 0; i < files.length; i++) {
          newImages.push({
            name: files[i].name,
            path: files[i].path,
            can_be_modified: 'true',
            selected: 'true',
          })
        }

        newStructure.folders.push({
          name: targetFolderName.toString(),
          path: files[0].path.slice(0, files[0].path.lastIndexOf('/')),
          images: newImages,
          checked: true,
          currentlySelected: false,
          imageCount: files.length,
          selectedCount: files.length,
          id: newStructure.folders.length,
        })
        props.setStructure(newStructure)
      }
    }
    props.toggleNewFolder(false)
  }

  const handleFileSelected = e => {
    console.log('Files selected: ', e.target.files)
    setNoOfFiles(e.target.files.length)
    setFiles(e.target.files)
  }

  const handleFileDeselected = () => {
    setNoOfFiles(0)
    setFiles([])
    document.getElementById('file-input').value = ''
  }

  const handleFolderChange = e => {
    setTargetFolderName(e.target.value)
  }

  return (
    <div className="action-wrapper">
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
            props.toggleNewFolder(false)
          }}
          className="crossIcon"
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
            value={targetFolderName}
            onChange={handleFolderChange}
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
      </div>
    </div>
  )
}

export default NewFolder
