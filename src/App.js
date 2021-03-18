import Navbar from './components/Navbar/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TrainedModels from './components/TrainedModels/TrainedModels'
import Analysis from './components/Analysis/Analysis'
import DatasetView from './views/DatasetView.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-container">
          <Switch>
            <Route exact path="/dataset" component={DatasetView} />
            <Route path="/trainedmodels">
              <TrainedModels />
            </Route>
            <Route path="/analysis">
              <Analysis />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
