import React from 'react'
import { Container, Button, Col, Row, Form } from 'react-bootstrap'
import cross from '../../assets/images/cross.svg'

class NewFolder extends React.Component {
  render() {
    return (
      <Container className="newfolder">
        <div className="head">
          <span className="button">New Folder</span>
          <span className="exit">
            <img src={cross} />
          </span>
        </div>
        <Row className="heading"> New Folder </Row>
        <Form.Group>
          <Form.Label> Name </Form.Label>
          <Form.Control type="text" placeholder="Name" />
        </Form.Group>
        <Row className="heading-2"> Choose Images to Upload </Row>
        <Row>
          <Col>
            <Button
              style={{
                color: '#335BC0',
                borderColor: '#335BC0',
                backgroundColor: 'white',
                marginTop: '10%',
              }}
            >
              Browse
            </Button>
          </Col>
          <Col className="delete-images">
            <Row className="inside">
              <img className="img" src={cross} />
              <p className="text">1000 images</p>
            </Row>
            <Row className="inside">
              <img className="img" src={cross} />
              <p className="text">40 images</p>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NewFolder