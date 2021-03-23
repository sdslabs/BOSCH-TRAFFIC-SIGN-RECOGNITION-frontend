import React, { useState, useEffect } from 'react'
import { getGraphData1 } from '../../../api/datasetAPI'
import BarGraph from '../../Common/BarGraph'
import LineGraph from '../../Common/LineGraph'
import {generalData} from "../../../constants/Analysis"
const Model = props => {
  const [graphData, setGraphData] = useState(null)
  useEffect(() => {
    graphDataHandler()
    props.setGeneralData(generalData[0])
  }, [])

  const graphDataHandler = async () => {
    const res = await getGraphData1()
    setGraphData(res)
    console.log(res)
  }
  return (
    <div className="analysis-page">
      <div className="analysis-heading">F1 Score</div>
      <div className="f1-container">
        <div className="analysis-graph-f1">
          {graphData && (
            <BarGraph
              title={'F1 Score of each class'}
              data={graphData.F1.f1_class.data}
              labels={graphData.F1.f1_class.labels}
            />
          )}
        </div>
        {graphData && (
          <div className="f1-score-display">
            <span>Total F1 Score</span>
            <span>{graphData.F1.score}</span>
          </div>
        )}
      </div>
      <div className="analysis-heading">Precision Curve</div>
      <div className="f1-container">
        <div className="analysis-graph-f1">
          {graphData && (
            <BarGraph
              title={'Precision Values for each class'}
              data={graphData.Precision.precision_class.data}
              labels={graphData.Precision.precision_class.labels}
            />
          )}
        </div>
      </div>
      <div className="analysis-heading">ROC Curves</div>
      <div className="analysis-graph-multiple">
        {graphData &&
          graphData.ROC.roc_curve.map((curve, index) => {
            return (
              <div key={index} className="analysis-roc-curve">
                <LineGraph data={curve} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default Model
