import React from 'react'
import { Container, Button, Col, Row, Form } from 'react-bootstrap'
import cross from '../../assets/images/cross.svg'

class Upload extends React.Component {
  render() {
    return (
      <Container className="upload">
        <div className="head">
          <span className="button">Upload</span>
          <span className="exit">
            <img src={cross} />
          </span>
        </div>
        <Row className="heading"> Upload </Row>
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
        <Row className="heading-2"> Choose Folder for uploading </Row>
        <Form>
          <Form.Check type="radio" label="Class 1" />
          <Form.Check type="radio" label="Class 1" />
          <Form.Check type="radio" label="Class 1" />
          <Form.Check type="radio" label="Class 1" />
        </Form>
      </Container>
    )
  }
}

export default Upload
