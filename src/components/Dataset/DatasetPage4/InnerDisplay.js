import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import arrowdown4 from '../../../assets/images/arrowdown4.svg'
import arrowdown from '../../../assets/images/arrowdown.svg'
import arrowup from '../../../assets/images/arrowup.svg'
import { useEffect, useState } from 'react'
import plus from '../../../assets/images/plus.svg'
import hiddenlayersImage from '../../../assets/images/hiddenlayers.png'
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
        <div className="image mb-5">
          <img className="img-inner" src={hiddenlayersImage} alt="Image here" />
        </div>
      </Row>
      <Row className="mt-5 lowerleft d-flex justify-content-center">
        <Col className="d-flex flex-column align-items-center">
          <Row className="  middle-layer-div">
            <Col className="borde px-3 pt-0 pb-3">
              {props.selectedValues.layers.map((layer, index) => (
                <Row className="border  border-dark mt-1 mx-2" key={index}>
                  <Col
                    xs={10}
                    className="pl-5 py-0 d-flex align-items-center justify-content-center"
                  >
                    {layer.name}
                  </Col>
                  {index > 2 ? (
                    <Col
                      xs={2}
                      className="p-0 d-flex align-items-center justify-content-center"
                    >
                      <img
                        className="trash"
                        src={trash}
                        onClick={() => {
                          deleteLayer(index)
                        }}
                      />
                    </Col>
                  ) : (
                    <Col
                      xs={2}
                      className="p-0 d-flex align-items-center justify-content-center"
                    >
                      <img className="trash" src={''} alt={''} />
                    </Col>
                  )}
                </Row>
              ))}
            </Col>
          </Row>

          <Row className="force-left">
            <button className="secondary-cta ml-3 dropdown-btn">
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
            </button>
          </Row>
          <Row className="border middle-layer-div-sec border-dark py-2 mx-2 mt-1 d-flex align-items-center justify-content-center">
            FC
          </Row>
          <Row className="border  middle-layer-div-sec border-dark py-2 mx-2 mt-1 d-flex align-items-center justify-content-center">
            FC
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
