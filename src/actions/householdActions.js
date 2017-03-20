import axios from 'axios';
import * as types from '../constants/actionTypes';
import { HOUSEHOLDS_ENDPOINT } from '../constants/apiEndpoints';

// Fetch a list of households
export function fetchHouseholds() {
  const request = axios.get(HOUSEHOLDS_ENDPOINT);

  return (dispatch) => {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    return request.then(({data}) => {
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
    return request.then(({data}) => {
      dispatch({
        type: types.FETCH_HOUSEHOLD,
        household: data
      });
    });
  }
}

// Create a new household
export function createHousehold(props) {
  const request = axios.post(HOUSEHOLDS_ENDPOINT, props);

  return (dispatch) => {
    return request.then(({data}) => {
      return dispatch({
        type: types.CREATE_HOUSEHOLD,
        household: data
      });
    });
  }
}

// Delete a household by id
export function deleteHousehold(id) {
  const request = axios.delete(`${HOUSEHOLDS_ENDPOINT}/${id}`);

  return (dispatch) => {
    return request.then(({data}) => {
      dispatch({
        type: types.DELETE_HOUSEHOLD,
        householdId: id
      });
    });
  }
}
