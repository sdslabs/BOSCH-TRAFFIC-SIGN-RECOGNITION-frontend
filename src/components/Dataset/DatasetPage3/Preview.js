import React from 'react'

class ImageDisplayer extends React.Component {
  render() {
    return (
      <div class="preview-container">
        <div class="preview-img-container"></div>
      </div>
    )
  }
}

class Preview extends React.Component {
  render() {
    return (
      <div class="images-preview">
        <ImageDisplayer imagesType={'Original'} />
        <ImageDisplayer imagesType={'Modified'} />
      </div>
    )
  }
}

export default Preview
