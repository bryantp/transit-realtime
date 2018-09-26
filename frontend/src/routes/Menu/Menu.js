import React, {Component} from "react";
import { connect } from "react-redux";

import DeviceInfo from "./DeviceInfo/DeviceInfo";
import {retrieveSystemInfo} from "../../actions";


class Menu extends Component {
  componentDidMount() {
    if (!this.props.isSystemInfoLoaded) {
      this.props.retrieveSystemInfo();
    }
  }

  render() {
    return (
      <div>
          {<DeviceInfo systemInfo={this.props.systemInfo}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSystemInfoLoaded: state.isSystemInfoLoaded,
    systemInfo: state.systemInfo
  };
};

export default connect(mapStateToProps, { retrieveSystemInfo })(Menu);
