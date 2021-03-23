import React from 'react'
import { Container, Col } from 'react-bootstrap'
import NewFolder from './NewFolder'
import Upload from './Upload'

class RightSidebar extends React.Component {
  render() {
    return (
      <div className="action-area">
        <div
          className="action-area-close"
          onClick={() => {
            this.props.toggleUpload(false)
            this.props.toggleNewFolder(false)
          }}
        />
        {this.props.isUpload && (
          <Upload
            isUpload={this.props.isUpload}
            toggleUpload={this.props.toggleUpload}
            structure={this.props.structure}
            setStructure={this.props.setStructure}
          />
        )}
        {this.props.isNewFolder && (
          <NewFolder
            isNewFolder={this.props.isNewFolder}
            toggleNewFolder={this.props.toggleNewFolder}
            structure={this.props.structure}
            setStructure={this.props.setStructure}
          />
        )}
      </div>
    )
  }
}

export default RightSidebar
