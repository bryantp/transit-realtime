import React from "react";
import "./LineStatus.css";
import { withRouter } from "react-router-dom";

const LineStatus = props => {
  const alertClass = props.alert ? "alert_notifier" : "";
  const line = props.express ? `<${props.route}>` : `(${props.route})`;

  const onClick = () => props.history.push(`/detail/${props.route}`);

  return (
    <div
      className={`line_status ${alertClass}`}
      style={{ backgroundColor: props.color }}
      onClick={onClick}
    >
      <div className="status">
        <span>{props.status}</span>
        <span className="reported_line">
          &nbsp;-&nbsp;Reported on {props.reportedDateTime}
        </span>
      </div>
      <div className="line_number">{line}</div>
    </div>
  );
};

export default withRouter(LineStatus);
