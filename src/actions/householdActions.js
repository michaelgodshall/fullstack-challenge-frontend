import axios from 'axios';
import { browserHistory } from 'react-router'
import * as types from '../constants/actionTypes';
import { HOUSEHOLDS_ENDPOINT } from '../constants/apiEndpoints';

// Fetch a list of households
export function fetchHouseholds() {
  const request = axios.get(HOUSEHOLDS_ENDPOINT);

  return (dispatch) => {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    request.then(({data}) => {
      dispatch({
        type: types.FETCH_HOUSEHOLDS,
        households: data
      });
    });
  };
}

// Fetch a single household by id
export function fetchHousehold(id) {
  const request = axios.get(`${HOUSEHOLDS_ENDPOINT}/${id}`);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.FETCH_HOUSEHOLD,
        household: data
      });
    });
  }
}

// Create a new household
export function createHousehold(props, successRedirect = '/') {
  const request = axios.post(HOUSEHOLDS_ENDPOINT, props);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.CREATE_HOUSEHOLD,
        household: data
      });
      // Redirect after create success
      browserHistory.push(successRedirect);
    });
  }
}

// Delete a household by id
export function deleteHousehold(id, successRedirect = '/') {
  const request = axios.delete(`${HOUSEHOLDS_ENDPOINT}/${id}`);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.DELETE_HOUSEHOLD,
        householdId: id
      });
      // Redirect after after delete success
      browserHistory.push(successRedirect);
    });
  }
}
