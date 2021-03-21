import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import Model from './Model'
import Confusion from './Confusion'
import Uncertainity from './Uncertainity'
import Augmentation from './Augmentation'
import Weight from './Weight'
const DatasetPage5 = () => {
  const history = useHistory()
  const gotoDefault = () => {
    history.push('/dataset/analysis/model')
  }
  const [generalData, setGeneralData] = useState('')
  useEffect(() => {
    gotoDefault()
  }, [])
  return (
    <div className="dataset-page2">
      <Navbar />
      <div className="action-area">
        <div className="empty-header"></div>
        <div className="rotate-preview">
          <div className="analysis-heading mt-2">General</div>
          <div className="analysis-about">
            <p>{generalData}</p>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path="/dataset/analysis/model">
          <Model setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/dataset/analysis/confusion">
          <Confusion setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/dataset/analysis/uncertainity">
          <Uncertainity setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/dataset/analysis/augmentation">
          <Augmentation setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/dataset/analysis/weight">
          <Weight setGeneralData={setGeneralData} />
        </Route>
      </Switch>
    </div>
  )
}
export default DatasetPage5
