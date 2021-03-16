import React from 'react'
import CropPreview from './CropPreview'
import RotatePreview from './RotatePreview'
import AdjustPreview from './AdjustPreview'
import NoisePreview from './NoisePreview'
import TransformPreview from './TransformPreview'
import RandomPreview from './RandomPreview'
class ActionArea extends React.Component {
  render() {
    if (this.props.action) {
      return (
        <div className="action-area">
          {this.props.action === 'Rotate' && (
            <RotatePreview
              showActionAreaHandler={this.props.showActionAreaHandler}
            />
          )}
          {this.props.action === 'Crop' && (
            <CropPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
            />
          )}
          {this.props.action === 'Adjust' && (
            <AdjustPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
            />
          )}
          {this.props.action === 'Noise' && (
            <NoisePreview
              showActionAreaHandler={this.props.showActionAreaHandler}
            />
          )}
          {this.props.action === 'Transform' && (
            <TransformPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
            />
          )}
          {this.props.action === 'Random' && (
            <RandomPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              editingHandler={this.props.editingHandler}
            />
          )}
        </div>
      )
    } else return <div></div>
  }
}

export default ActionArea
