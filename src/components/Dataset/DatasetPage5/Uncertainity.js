import React, { useState, useEffect } from 'react'
import { getGraphData3 } from '../../../api/datasetAPI'
import BarGraph from '../../Common/BarGraph'
import { generalData } from '../../../constants/Analysis'
const Uncertainity = props => {
  const [graphData, setGraphData] = useState(null)
  useEffect(() => {
    graphDataHandler()
    props.setGeneralData(generalData[2])
  }, [])

  const graphDataHandler = async () => {
    const res = await getGraphData3()
    setGraphData(res)
    console.log(res)
  }
  return (
    <div className="analysis-page">
      <div className="analysis-heading">Confidence Plots</div>
      <div className="uncertainity-container">
        <div className="analysis-graph-uc">
          {graphData && (
            <BarGraph
              title={'Correct'}
              data={graphData.UC_Hist.correct.data}
              labels={graphData.UC_Hist.correct.labels}
              isHistogram={true}
            />
          )}
        </div>
        <div className="analysis-graph-uc">
          {graphData && (
            <BarGraph
              title={'Incorrect'}
              data={graphData.UC_Hist.wrong.data}
              labels={graphData.UC_Hist.wrong.labels}
              isHistogram={true}
            />
          )}
        </div>
      </div>
      <div className="analysis-heading">Confidence Plots Per Class</div>
      <div className="uncertainity-container">
        <div className="analysis-graph-uc">
          {graphData && (
            <BarGraph
              title={'Aleatoric'}
              data={graphData.UC_Bar.aleatoric.data}
              labels={graphData.UC_Bar.aleatoric.labels}
            />
          )}
        </div>
        <div className="analysis-graph-uc">
          {graphData && (
            <BarGraph
              title={'Epistemic'}
              data={graphData.UC_Bar.epistemic.data}
              labels={graphData.UC_Bar.epistemic.labels}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default Uncertainity
