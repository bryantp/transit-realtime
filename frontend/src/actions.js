import fetch from "cross-fetch";

export const STATUSES_RECEIVED = "STATUSES_RECEIVED";
export const RETRIEVING_STATUSES = "RETRIEVING_STATUSES";
export const ERROR_DURING_RETRIEVAL = "ERROR_DURING_RETRIEVAL";
export const RETRIEVING_SYSTEM_INFO = "RETRIEVING_SYSTEM_INFO";
export const SYSTEM_INFO_RETRIEVED = "SYSTEM_INFO_RETRIEVED";
export const ERROR_RETRIEVING_SYSTEM_INFO = "ERROR_RETRIEVING_SYSTEM_INFO";

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

export function systemInfoRetrieved(info) {
  return {
    type: SYSTEM_INFO_RETRIEVED,
    payload: info
  };
}

export function retrievingSystemInfo() {
  return {
    type: RETRIEVING_SYSTEM_INFO
  };
}

export function errorRetrievingSystemInfo(error) {
  return {
    type: ERROR_RETRIEVING_SYSTEM_INFO,
    error: error
  };
}


export function retrieveSystemInfo() {
  return dispatch => {
    // Update the state to be in the process of retrieving the system info
    dispatch(retrievingSystemInfo());
    return fetch("http://localhost:5000/api/system")
      .then(
        response => response.json(),
        error => {throw new Error(error)}
      )
      .then(json => dispatch(systemInfoRetrieved(json)))
      .catch(error => dispatch(errorRetrievingSystemInfo(error)));
  };
}
