import fetch from "cross-fetch";

export const STATUSES_RECEIVED = "STATUSES_RECEIVED";
export const RETRIEVING_STATUSES = "RETRIEVING_STATUSES";

export function statusesRetrieved(statuses) {
  return {
    type: STATUSES_RECEIVED,
    payload: statuses
  };
}

export function retrievingStatuses() {
  return {
    type: RETRIEVING_STATUSES
  };
}

export function retrieveStatuses() {
  return dispatch => {
    // Update the state to be in the process of retrieving the statuses
    dispatch(retrievingStatuses());
    return fetch("http://localhost:5000/api/status")
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(statusesRetrieved(json)));
  };
}
