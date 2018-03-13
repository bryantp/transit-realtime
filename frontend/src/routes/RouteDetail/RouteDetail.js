import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./RouteDetail.css";

const getDangerousHtmlObject = html => {
  return { __html: html };
};

const RouteDetail = props => {
  const id = props.match.params.id;
  const statuses = props.statuses || [];

  const status = statuses.find(status => status.route.id === id);

  if (!status) {
    return (
      <div className="route_status_header_error">
        <h1>Not able to find Route Details for {id}.</h1>
        <button>
          <Link to="/">Back</Link>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="route_status_header">
        <h1 className="route_status">Route Status: {id}</h1>
        <button>
          <Link to="/">Back</Link>
        </button>
      </div>
      <div
        className="route_long_description"
        dangerouslySetInnerHTML={getDangerousHtmlObject(status.longDescription)}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    statuses: state.statuses
  };
};

export default connect(mapStateToProps)(RouteDetail);
