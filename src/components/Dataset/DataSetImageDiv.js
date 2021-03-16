import { React } from 'react'
import { Row, Col } from 'react-bootstrap'

const DatasetImageDiv = props => {
  const handleImageCheckbox = async checked => {
    // update structure
    const newStructure = { ...props.structure }
    for (let i = 0; i < newStructure.folders.length; i++) {
      for (let j = 0; j < newStructure.folders[i].images.length; j++) {
        if (newStructure.folders[i].images[j].name === props.image.name) {
          newStructure.folders[i].images[j].selected =
            props.image.can_be_modified === 'true' && checked ? 'true' : 'false'
        }
      }
    }
    props.setStructure(newStructure)
    // update UI
    const newImages = props.images.slice()
    for (let i = 0; i < newImages.length; i++) {
      if (newImages[i].name === props.image.name) {
        newImages[i].selected =
          props.image.can_be_modified === 'true' && checked ? 'true' : 'false'
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
            id={props.image.name}
            checked={props.image.selected === 'true'}
            disabled={props.image.can_be_modified === 'false'}
            onChange={e => handleImageCheckbox(e.currentTarget.checked)}
          />
        </Col>
      )}
      <Col xs={1}></Col>
      <Col className="">{props.image.name}</Col>
    </Row>
  )
}
export default DatasetImageDiv
