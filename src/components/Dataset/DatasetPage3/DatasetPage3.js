import React from 'react'
import AugmentationNavbar from './AugmentationNavbar'
import ActionArea from './ActionArea'
class DatasetPage2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showActionArea: false,
      augAction: null,
    }
    this.showActionAreaHandler = this.showActionAreaHandler.bind(this)
    this.augActionHandler = this.augActionHandler.bind(this)
  }

  showActionAreaHandler(show) {
    this.setState({ showActionArea: show })
  }

  augActionHandler(action) {
    this.setState({ augAction: action })
  }

  render() {
    return (
      <div>
        <AugmentationNavbar
          showActionAreaHandler={this.showActionAreaHandler}
          augActionHandler={this.augActionHandler}
        />
        {this.state.showActionArea && (
          <ActionArea
            showActionAreaHandler={this.showActionAreaHandler}
            action={this.state.augAction}
          />
        )}
      </div>
    )
  }
}

export default DatasetPage2
