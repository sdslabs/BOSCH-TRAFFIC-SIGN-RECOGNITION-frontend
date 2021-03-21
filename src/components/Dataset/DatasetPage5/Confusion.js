import React, { useState, useEffect } from 'react'
import { getGraphData2 } from '../../../api/datasetAPI'
import {generalData} from "../../../constants/Analysis"
const Confusion = (props) => {
  const [graphData, setGraphData] = useState(null)
  useEffect(() => {
    graphDataHandler()
    props.setGeneralData(generalData[1])
  }, [])

  const graphDataHandler = async () => {
    const res = await getGraphData2()
    setGraphData(res)
    console.log(res)
  }
  return (
    <div className="analysis-page">
      <div className="analysis-heading">Confusion Matrix</div>
      {graphData && (
        <img
          src={`http://localhost:5000/${graphData.CM}`}
          className="confusion-matrix"
        ></img>
      )}
    </div>
  )
}
export default Confusion
