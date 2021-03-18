import React from 'react'
import CropPreview from './CropPreview'
import RotatePreview from './RotatePreview'
import AdjustPreview from './AdjustPreview'
import NoisePreview from './NoisePreview'
import TransformPreview from './TransformPreview'
import ErasePreview from './ErasePreview'
import RandomPreview from './RandomPreview'
class ActionArea extends React.Component {
  render() {
    if (this.props.action) {
      return (
        <div className="action-area">
          {this.props.action === 'Rotate' && (
            <RotatePreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              image={this.props.image}
              setModifiedImages={this.props.setModifiedImages}
            />
          )}
          {this.props.action === 'Crop' && (
            <CropPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              image={this.props.image}
              setModifiedImages={this.props.setModifiedImages}
            />
          )}
          {this.props.action === 'Adjust' && (
            <AdjustPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              image={this.props.image}
              setModifiedImages={this.props.setModifiedImages}
            />
          )}
          {this.props.action === 'Noise' && (
            <NoisePreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              image={this.props.image}
              setModifiedImages={this.props.setModifiedImages}
            />
          )}
          {this.props.action === 'Erase' && (
            <ErasePreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              image={this.props.image}
              setModifiedImages={this.props.setModifiedImages}
            />
          )}
          {this.props.action === 'Transform' && (
            <TransformPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              image={this.props.image}
              setModifiedImages={this.props.setModifiedImages}
            />
          )}
          {this.props.action === 'Random' && (
            <RandomPreview
              showActionAreaHandler={this.props.showActionAreaHandler}
              image={this.props.image}
              editingHandler={this.props.editingHandler}
            />
          )}
        </div>
      )
    } else return <div></div>
  }
}

export default ActionArea
