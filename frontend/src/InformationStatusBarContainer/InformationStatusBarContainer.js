import React from "react";
import TimeInformation from "./TimeInformation/TimeInformation";
import RefreshCounter from "./RefreshCounter/RefreshCounter";
import {Link} from 'react-router-dom';
import "./InformationStatusBarContainer.css";

class InformationStatusBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  }

  getLink = () => this.state.menuOpen ? <Link to="/" onClick={() => this.setState({menuOpen: false})}>Home</Link> : <Link to="/menu" onClick={() => this.setState({menuOpen: true})}>Menu</Link>;
  
  render() {
    return (
      <header className="header">
        <div>
          <button>         
            {this.getLink()}
          </button>
        </div>
        <div className="time_information">
          <TimeInformation />
        </div>
        <div>
          <RefreshCounter
            refreshIntervalSeconds={this.props.refreshIntervalSeconds}
            refreshCallback={this.props.refreshCallback}
          />
        </div>
      </header>
    )
  }
}

export default InformationStatusBarContainer;
