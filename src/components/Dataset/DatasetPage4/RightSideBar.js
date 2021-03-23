import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Select from 'react-select'
import { getGraphStats } from '../../../api/datasetAPI'
import BarGraph from '../../Common/BarGraph'
export const RightSidebar = props => {
  const [graphData, setGraphData] = useState(null)
  useEffect(() => {
    getGraphData()
  }, [])
  const getGraphData = async () => {
    const res = await getGraphStats()
    props.tl(false)
    setGraphData(res)
  }
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
    <Container className="m-0 p-0 ">
      <Col className="mx-4 p-0 ">
        <Row className="m-0 p-0">
          <h2> Training Parameters</h2>
        </Row>
        <Row className="m-0 p-0">
          <Select
            styles={customStyles}
            value={{
              value: props.selectedValues.optimizer,
              label: props.selectedValues.optimizer,
            }}
            onChange={optimizerChoose}
            options={options}
            id="optimizer"
            classNamePrefix="react-select2"
            isSearchable={false}
            placeholder={'Select type of Optimizer'}
          ></Select>
        </Row>
        <Row className="py-3 m-0">
          <Col className="p-0 m-0">
            <Row className="p-0 m-0">Learning Rate</Row>
            <input
              type="number"
              id="learningRate"
              step={0.01}
              value={props.selectedValues.learningRate}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            <Row className="p-0 m-0"> Epochs</Row>
            <input
              type="number"
              id="epochs"
              value={props.selectedValues.epochs}
              onChange={handleSelectedChange}
              min={1}
            />
          </Col>
        </Row>
        <Row className="py-3 m-0">
          <Col className="p-0 m-0">
            <Row className="p-0 m-0"> Batch Size</Row>
            <input
              type="number"
              id="batchSize"
              value={props.selectedValues.batchSize}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            <Row className="p-0 m-0">Centroid Size</Row>
            <input
              type="number"
              id="centroidSize"
              value={props.selectedValues.centroidSize}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row className="py-3 m-0">
          <Col className="p-0 m-0">
            <Row className="p-0 m-0">Weight Decay</Row>
            <input
              type="number"
              id="weightDecay"
              value={props.selectedValues.weightDecay}
              onChange={handleSelectedChange}
            />
          </Col>
          <Col className="p-0 m-0">
            <Row className="p-0 m-0">LM</Row>
            <input
              type="number"
              id="lm"
              value={props.selectedValues.lm}
              onChange={handleSelectedChange}
            />
          </Col>
        </Row>
        <Row className="p-0 m-0">DATA STATS</Row>
        {/* yaahaaa css fix karni ho to apni class bananaa isko mat change karna kahi aur bhi used hai */}
        <div className="graph-stat-container">
          {graphData && (
            <BarGraph
              data={graphData}
              showMultiple={true}
              title={'Images selected in each class'}
            />
          )}
        </div>
      </Col>
    </Container>
  )
}
