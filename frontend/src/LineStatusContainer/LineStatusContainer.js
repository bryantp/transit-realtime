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
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
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
