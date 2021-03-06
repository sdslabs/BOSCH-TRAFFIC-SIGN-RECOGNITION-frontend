import React from 'react'

const ImageDisplayer = props => {
  return (
    <div className="preview-container">
      <div className="preview-img-container">
        {props.images.map(image => {
          return (
            <img
              key={image.name}
              src={`http://localhost:5000/${image.path}`}
              className="preview-image"
            />
          )
        })}
      </div>
      <div className="heading">{props.imagesType}</div>
    </div>
  )
}

const Preview = props => {
  return (
    <div className="images-preview">
      <ImageDisplayer
        imagesType={'Original'}
        images={props.originalImages.slice(0, 16)}
      />
      <ImageDisplayer
        imagesType={'Modified'}
        images={props.modifiedImages.slice(0, 16)}
      />
    </div>
  )
}

export default Preview
