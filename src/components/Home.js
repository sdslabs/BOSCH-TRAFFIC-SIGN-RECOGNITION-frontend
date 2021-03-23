import React from 'react'
import { Redirect } from 'react-router-dom'
import Illustration  from '../assets/images/main-illustration.svg'
class Home extends React.Component {
  state = {
    redirect: false,
  }
  startBuildingModel() {
    this.setState({ redirect: true })
  }
  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="/dataset" />
    }
    return (
      <div className="home-main-container">
        <div className="home-illustration">
          <img src={Illustration} />
        </div>
        <button
          className="primary-cta"
          onClick={() => this.startBuildingModel()}
        >
          Let's Start Building This Model
        </button>
      </div>
    )
  }
}

export default Home
