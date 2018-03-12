import React from "react";
import TimeInformation from "./TimeInformation/TimeInformation";
import RefreshCounter from "./RefreshCounter/RefreshCounter";
import "./InformationStatusBarContainer.css";

const InformationStatusBarContainer = props => {
  return (
    <header className="header">
      <div>
        <button>Menu</button>
      </div>
      <div className="time_information">
        <TimeInformation />
      </div>
      <div>
        <RefreshCounter refreshIntervalSeconds={props.refreshIntervalSeconds} />
      </div>
    </header>
  );
};

export default InformationStatusBarContainer;
