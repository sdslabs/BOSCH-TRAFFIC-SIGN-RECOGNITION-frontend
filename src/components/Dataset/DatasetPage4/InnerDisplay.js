import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import arrowdown4 from '../../../assets/images/arrowdown4.svg'
import arrowdown from '../../../assets/images/arrowdown.svg'
import arrowup from '../../../assets/images/arrowup.svg'
import { useEffect, useState } from 'react'
import plus from '../../../assets/images/plus.svg'
import hiddenlayersImage from '../../../assets/images/hiddenlayers.svg'
import trash from '../../../assets/images/trash.png'

export const InnerDisplay = props => {
  const addLayer = layerName => {
    const newValues = { ...props.selectedValues }
    newValues.layers.push({ name: layerName })
    props.setSelectedValues(newValues)
  }

  const deleteLayer = index => {
    const newValues = { ...props.selectedValues }
    newValues.layers.splice(index, 1)
    props.setSelectedValues(newValues)
  }

  return (
    <Container className="innerdisplay">
      <Row className="upperlayer">
        <div className="image">
          <img className="img-inner" src={hiddenlayersImage} alt="Image here" />
        </div>
      </Row>
      <Row className="lowerleft d-flex justify-content-center">
        <Col>
          <Row className="middlelayer">
            <img src={arrowdown4} />
            <div className="input-text">Input</div>
          </Row>
          <div className="layers">
            {props.selectedValues.layers.map((layer, index) => (
              <div
                className="layer d-flex align-items-center justify-content-center"
                key={index}
              >
                <div className="layer-text">{layer.name}</div>
                {index > 2 ? (
                  <img
                    className="trash"
                    src={trash}
                    onClick={() => {
                      deleteLayer(index)
                    }}
                  />
                ) : (
                  <img className="trash" src={''} alt={''} />
                )}
                <div />
              </div>
            ))}
          </div>

          <Row className="button">
            <img className="plus" src={plus} />
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" as="span">
                Add layer
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => addLayer('Conv')}>
                  Conv
                </Dropdown.Item>
                <Dropdown.Item onClick={() => addLayer('Relu')}>
                  Relu
                </Dropdown.Item>
                <Dropdown.Item onClick={() => addLayer('Batch_Norm')}>
                  Batch_Norm
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          <div className="const-btn">FC</div>
          <div className="const-btn">FC</div>
        </Col>
      </Row>
    </Container>
  )
}
