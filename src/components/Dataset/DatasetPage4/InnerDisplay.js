import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import arrowdown4 from '../../../assets/images/arrowdown4.svg'
import arrowdown from '../../../assets/images/arrowdown.svg'
import arrowup from '../../../assets/images/arrowup.svg'
import { useEffect, useState } from 'react'
import plus from '../../../assets/images/plus.svg'
import hiddenlayers from '../../../assets/images/hiddenlayers.svg'
import trash from '../../../assets/images/trash.png'

export const InnerDisplay = props => {
  const [nooflayers, setNoofLayers] = useState(0)
  const [layers, setLayers] = useState([])
  const increaseLayers = () => {
    setNoofLayers(nooflayers + 1)
  }
  const decreaseLayers = () => {
    nooflayers > 0 ? setNoofLayers(nooflayers - 1) : null
  }
  const addLayer = layer => {
    layers.push({ name: layer, id: nooflayers })
    increaseLayers()
    console.log(props.selectedValues)
    const newValues = { ...props.selectedValues }
    newValues.layers = layers
    props.setSelectedValues(newValues)
    console.log(props.selectedValues)
  }
  const deleteLayer = id => {
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].id == id) {
        layers.splice(i, 1)
        decreaseLayers()
        const newValues = { ...props.selectedValues }
        newValues.layers = layers
        props.setSelectedValues(newValues)
        console.log(props.selectedValues)
        break
      }
    }
  }
  useEffect(() => {
    console.log(layers)
  }, [layers])
  return (
    <Container className="innerdisplay">
      <h2> Hidden Layers </h2>
      <Row className="upperlayer">
        <Col className="image">
          <img className="img-inner" src={hiddenlayers} alt="Image here" />
        </Col>
        <Col className="number-picker-outer">
          <p className="num-pick-text">Number of Hidden layers</p>
          <Row className="number-picker-inner">
            <input className="num-pick-input" value={nooflayers} />
            <Col className="num-pick-arrows">
              <img
                className="num-pick-down"
                src={arrowup}
                onClick={increaseLayers}
              />
              <img
                className="num-pick-up"
                src={arrowdown}
                onClick={decreaseLayers}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Col className="lowerleft">
        <Row className="middlelayer">
          <img src={arrowdown4} />
          <div className="input-text">Input</div>
        </Row>
        {layers.length != 0 ? (
          <div className="layers">
            {layers.map(layer => (
              <div className="layer" key={layer.id}>
                <div className="layer-text">{layer.name}</div>
                <img
                  className="trash"
                  src={trash}
                  onClick={() => {
                    deleteLayer(layer.id)
                  }}
                />
                <div />
              </div>
            ))}
          </div>
        ) : null}
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
      <Col className="lowerright"> Text here </Col>
    </Container>
  )
}
