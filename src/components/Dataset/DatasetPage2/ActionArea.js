import React from 'react'
import CropPreview from './CropPreview'
import RotatePreview from './RotatePreview'
import AdjustPreview from './AdjustPreview'
import NoisePreview from './NoisePreview'
import TransformPreview from './TransformPreview'
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
        </div>
      )
    } else return <div></div>
  }
}

export default ActionArea
