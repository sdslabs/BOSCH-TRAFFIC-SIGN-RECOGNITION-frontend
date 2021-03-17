import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Select from 'react-select'
export const RightSidebar = props => {
  const [selectedValues, setSelectedValues] = useState('')

  useEffect(() => {
    console.log('selectedValues updated in state', selectedValues)
  }, [selectedValues])

  const handleSelectedChange = e => {
    const newValues = { ...selectedValues }
    switch (e.target.id) {
      case 'learningRate1':
        newValues.learningRate1 = e.target.value
        setSelectedValues(newValues)
        break
      case 'learningRate2':
        newValues.learningRate2 = e.target.value
        setSelectedValues(newValues)
        break
      case 'learningRate3':
        newValues.learningRate3 = e.target.value
        setSelectedValues(newValues)
        break
      case 'learningRate4':
        newValues.learningRate4 = e.target.value
        setSelectedValues(newValues)
        break
      case 'lambda':
        newValues.lambda = e.target.value
        setSelectedValues(newValues)
        break
      case 'batchSize':
        newValues.batchSize = e.target.value
        setSelectedValues(newValues)
        break
    }
  }
  const optimizerChoose = choice => {
    const newValues = { ...selectedValues }
    newValues.optimizer = choice.value
    setSelectedValues(newValues)
  }
  const options = [
    { value: 'Adam', label: 'Adam' },
    { value: 'SGD', label: 'SGD' },
  ]
  const customStyles = {
    container: provided => ({
      ...provided,
      width: 237,
    }),
  }

  return (
    <Container>
      <Col>
        <Row className="training-heading">Training Parameters</Row>
        <Row>
          <Select
            styles={customStyles}
            value={selectedValues.optimizer}
            onChange={optimizerChoose}
            options={options}
            id="optimizer"
            classNamePrefix="react-select2"
            isSearchable={false}
            placeholder={'Select type of Optimizer'}
          ></Select>
        </Row>
        <Row className="py-3">
          <Col className="p-0 m-0">
            Learning Rate
            <input
              type="number"
              id="learningRate1"
              value={selectedValues.learningRate1}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            Learning Rate
            <input
              type="number"
              id="learningRate2"
              value={selectedValues.learningRate2}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col className="p-0 m-0">
            {' '}
            Batch Size
            <input
              type="number"
              id="batchSize"
              value={selectedValues.batchSize}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            {' '}
            Learning Rate
            <input
              type="number"
              id="learningRate3"
              value={selectedValues.learningRate3}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col className="p-0 m-0">
            {' '}
            <Row className="p-0 m-0">Lambda</Row>
            <input
              type="number"
              id="lambda"
              value={selectedValues.lambda}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            {' '}
            Learning Rate
            <input
              type="number"
              id="learningRate4"
              value={selectedValues.learningRate4}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row>DATA STATS</Row>
      </Col>
    </Container>
  )
}
