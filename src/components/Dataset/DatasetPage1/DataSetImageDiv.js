import { React } from 'react'
import { Row, Col } from 'react-bootstrap'

const DatasetImageDiv = props => {
  const handleImageCheckbox = async checked => {
    // update structure
    const newStructure = { ...props.structure }
    for (let i = 0; i < newStructure.folders.length; i++) {
      for (let j = 0; j < newStructure.folders[i].images.length; j++) {
        // find the image in question
        if (newStructure.folders[i].images[j].name === props.image.name) {
          // check if it can be modified
          if (newStructure.folders[i].images[j].can_be_modified === 'true') {
            // if it has to be checked to true
            if (checked) {
              // if it is not selected
              if (!(newStructure.folders[i].images[j].selected === 'true')) {
                newStructure.folders[i].selectedCount++
              }
              newStructure.folders[i].images[j].selected = 'true'
            } else {
              // if image is unchecked, then uncheck the parent folder as well
              newStructure.folders[i].checked = false
              newStructure.folders[i].selectedCount--
              newStructure.folders[i].images[j].selected = 'false'
            }
          }
        }
      }
      if (
        newStructure.folders[i].imageCount ===
        newStructure.folders[i].selectedCount
      ) {
        newStructure.folders[i].checked = true
      }
    }
    props.setStructure(newStructure)

    // update the images state
    const newImages = props.images.slice()
    for (let i = 0; i < newImages.length; i++) {
      if (newImages[i].name === props.image.name) {
        if (props.image.can_be_modified === 'true') {
          newImages[i].selected = checked ? 'true' : 'false'
        }
      }
    }
    await props.setImages(newImages)
  }

  return (
    <Row className="mx-0 px-0 border-bottom d-flex align-items-center select-dataset-image">
      {!props.preview && (
        <Col
          xs={1}
          className="d-flex justify-content-center align-items-center"
        >
          <input
            type="checkbox"
            className="checkbox-default"
            id={props.image.name}
            checked={props.image.selected === 'true'}
            disabled={props.image.can_be_modified === 'false'}
            onChange={e => handleImageCheckbox(e.currentTarget.checked)}
          />
        </Col>
      )}
      {props.isAnalysis && (
        <Col
          xs={1}
          className="d-flex justify-content-center align-items-center"
        >
          <input
            type="radio"
            id={props.image.name}
            checked={props.selectedImg === props.image.path}
            onChange={e => {
              props.setSelectedImg(props.image.path)
            }}
          />
        </Col>
      )}
      <Col xs={1}></Col>
      <Col className="">{props.image.name}</Col>
    </Row>
  )
}
export default DatasetImageDiv
