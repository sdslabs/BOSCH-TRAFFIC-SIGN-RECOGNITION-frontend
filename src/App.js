import Navbar from './components/Navbar/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DatasetView from './views/DatasetView.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="empty-header h-4" />
        <div className="main-container">
          <Switch>
            <Route path="/dataset">
              <DatasetView page={1} />
            </Route>
            <Route path="/trainedmodels">
              <DatasetView page={4} />
            </Route>
            <Route path="/analysis">
              <DatasetView page={7} />
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
