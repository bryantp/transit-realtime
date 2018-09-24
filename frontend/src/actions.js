import fetch from "cross-fetch";

export const STATUSES_RECEIVED = "STATUSES_RECEIVED";
export const RETRIEVING_STATUSES = "RETRIEVING_STATUSES";
export const ERROR_DURING_RETRIEVAL = "ERROR_DURING_RETRIEVAL";

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

export function errorDuringRetrieval(error) {
  return {
    type: ERROR_DURING_RETRIEVAL,
    error: error
  };
}

export function retrieveStatuses() {
  return dispatch => {
    // Update the state to be in the process of retrieving the statuses
    dispatch(retrievingStatuses());
    return fetch("http://localhost:5000/api/status")
      .then(
        response => response.json(),
        error => {throw new Error(error)}
      )
      .then(json => dispatch(statusesRetrieved(json)))
      .catch(error => dispatch(errorDuringRetrieval(error)));
  };
}
