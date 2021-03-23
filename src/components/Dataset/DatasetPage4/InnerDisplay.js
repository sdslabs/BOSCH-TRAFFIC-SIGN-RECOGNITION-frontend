import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import arrowdown4 from '../../../assets/images/arrowdown4.svg'
import arrowdown from '../../../assets/images/arrowdown.svg'
import arrowup from '../../../assets/images/arrowup.svg'
import { useEffect, useState } from 'react'
import plus from '../../../assets/images/plus.svg'
import hiddenlayers from '../../../assets/images/hiddenlayers.svg'
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
      <h2> Hidden Layers </h2>
      <Row className="upperlayer">
        <div className="image">
          <img className="img-inner" src={hiddenlayers} alt="Image here" />
        </div>
      </Row>
      <Row className="lowerleft">
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
                {index > 2 ? (
                  <div className="layer-inner">
                    <div className={'layer-text-' + layer.name}>
                      {layer.name}
                    </div>
                    <div className="trash-outer">
                      <img
                        className={'trash-' + layer.name}
                        src={trash}
                        onClick={() => {
                          deleteLayer(index)
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={'layer-text'}>{layer.name}</div>
                )}
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
