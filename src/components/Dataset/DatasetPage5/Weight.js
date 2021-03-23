import React, { useState, useEffect } from 'react'
import { getGraphData5 } from '../../../api/datasetAPI'
import { generalData } from '../../../constants/Analysis'
const Weight = props => {
  const [graphData, setGraphData] = useState(null)
  useEffect(() => {
    graphDataHandler()
    props.setGeneralData(generalData[4])
  }, [])

  const graphDataHandler = async () => {
    const res = await getGraphData5()
    setGraphData(res)
    console.log(res)
  }
  return (
    <div className="analysis-page">
      <div className="analysis-heading">Violin Plots</div>
      {graphData && (
        <img
          src={`http://localhost:5000/${graphData.VP}`}
          className="confusion-matrix"
        ></img>
      )}
    </div>
  )
}
export default Weight
