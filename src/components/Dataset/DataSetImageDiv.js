import { React, useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

const DatasetImageDiv = props => {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    console.log('isChecked updated in state: ', isChecked)
  }, [isChecked])

  useEffect(() => {
    setIsChecked(props.image.selected === 'true')
  }, [])

  const handleImageCheckbox = checked => {
    setIsChecked(checked)
    // const newstructure = { ...structure }
    // newstructure.folders.forEach(folder => {
    //   if (folder.name === folderName) {
    //     folder.selectedCount = selected
    //       ? folder.selectedCount + 1
    //       : folder.selectedCount - 1
    //     folder.images.forEach(image => {
    //       if (image.name == imageName) {
    //         image.selected = selected.toString()
    //         console.log(folderName, imageName, selected)
    //       }
    //     })
    //   }
    // })

    // setStructure(newstructure)

    // // isko mat hataana setstructure jaise hi hai ye
    // if (props.initialDataHandler) {
    //   props.initialDataHandler(structure)
    // }
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
            checked={isChecked}
            disabled={props.image.can_be_modified === 'false' && false}
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
