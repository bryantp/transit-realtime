import React, { Component } from "react";
import { connect } from "react-redux";

import "./Main.css";
import LineStatusContainer from "../../LineStatusContainer/LineStatusContainer";
import { retrieveStatuses } from "../../actions";

class App extends Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.retrieveStatuses();
    }
  }

  render() {
    return (
      <div>
        <LineStatusContainer
          statusList={this.props.statuses}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    isLoaded: state.isLoaded,
    statuses: state.statuses
  };
};

export default connect(mapStateToProps, { retrieveStatuses })(App);
