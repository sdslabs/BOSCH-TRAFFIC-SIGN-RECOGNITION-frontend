import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'

import Select from 'react-select'
export const RightSidebar = props => {
  const handleSelectedChange = e => {
    const newValues = { ...props.selectedValues }
    switch (e.target.id) {
      case 'learningRate':
        newValues.learningRate = e.target.value
        props.setSelectedValues(newValues)
        break
      case 'epochs':
        newValues.epochs = e.target.value
        props.setSelectedValues(newValues)
        break
      case 'centroidSize':
        newValues.centroidSize = e.target.value
        props.setSelectedValues(newValues)
        break
      case 'lm':
        newValues.lm = e.target.value
        props.setSelectedValues(newValues)
        break
      case 'weightDecay':
        newValues.weightDecay = e.target.value
        props.setSelectedValues(newValues)
        break
      case 'batchSize':
        newValues.batchSize = e.target.value
        props.setSelectedValues(newValues)
        break
    }
  }
  const optimizerChoose = choice => {
    const newValues = { ...props.selectedValues }
    newValues.optimizer = choice.value
    props.setSelectedValues(newValues)
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
            // value={props.selectedValues.optimizer}
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
            <Row className="p-0 m-0">Learning Rate</Row>
            <input
              type="number"
              id="learningRate"
              // value={props.selectedValues.learningRate}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            <Row className="p-0 m-0"> Epochs</Row>
            <input
              type="number"
              id="epochs"
              // value={props.selectedValues.epochs}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col className="p-0 m-0">
            <Row className="p-0 m-0"> Batch Size</Row>
            <input
              type="number"
              id="batchSize"
              // value={props.selectedValues.batchSize}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            <Row className="p-0 m-0">Centroid Size</Row>
            <input
              type="number"
              id="centroidSize"
              // value={props.selectedValues.centroidSize}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col className="p-0 m-0">
            <Row className="p-0 m-0">Weight Decay</Row>
            <input
              type="number"
              id="weightDecay"
              // value={props.selectedValues.weightDecay}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            <Row className="p-0 m-0">LM</Row>
            <input
              type="number"
              id="lm"
              // value={props.selectedValues.lm}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row>DATA STATS</Row>
      </Col>
    </Container>
  )
}
