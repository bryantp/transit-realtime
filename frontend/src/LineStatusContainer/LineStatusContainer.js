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
    return <div>Loading...</div>;
  }

  if(props.isInError) {
    return <div>Unable to retrieve statuses</div>;
  }

  return (
    <div className="status_list">
      <ul>{renderStatusList}</ul>
    </div>
  );
};

export default LineStatusContainer;
