import React from "react";
import LineStatus from "./LineStatus/LineStatus";
import "./LineStatusContainer.css";

const LineStatusContainer = props => {
  const statusList = props.statusList || [];

  const renderStatusList = statusList.map(status => {
    const alerted = status.reason.includes("Delay");

    return (
      <li key={status.route.id}>
        <LineStatus
          route={status.route.id}
          color={`#${status.route.color}`}
          status={status.reason}
          reportedDateTime={status.startTime}
          express={status.route.express}
          alert={alerted}
        />
      </li>
    );
  });

 if (props.isLoading) {
    return (
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>)
  }

  if(props.isInError) {
    return <div className="error_status">Unable to retrieve statuses</div>;
  }

  return (
    <div className="status_list">
      <ul>{renderStatusList}</ul>
    </div>
  );
};

export default LineStatusContainer;
