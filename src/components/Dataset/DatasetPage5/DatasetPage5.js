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
import Markdown from 'markdown-it'
const DatasetPage5 = () => {
  const history = useHistory()
  const md = new Markdown()
  const gotoDefault = () => {
    history.push('/analysis/model')
  }
  const [generalData, setGeneralData] = useState('')
  useEffect(() => {
    gotoDefault()
  }, [])
  return (
    <div className="dataset-page2">
      <Navbar />
      <div className="action-area-sec">
        <div className="rotate-preview">
          <div className="analysis-heading">General</div>
          <div className="analysis-about"></div>
          <div
            className="analysis-about"
            dangerouslySetInnerHTML={{ __html: md.render(generalData) }}
          ></div>
        </div>
      </div>
      <Switch>
        <Route exact path="/analysis/model">
          <Model setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/analysis/confusion">
          <Confusion setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/analysis/uncertainity">
          <Uncertainity setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/analysis/augmentation">
          <Augmentation setGeneralData={setGeneralData} />
        </Route>
        <Route exact path="/analysis/weight">
          <Weight setGeneralData={setGeneralData} />
        </Route>
      </Switch>
    </div>
  )
}
export default DatasetPage5
