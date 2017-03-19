import axios from 'axios';
import * as types from '../constants/actionTypes';
import { HOUSEHOLD_ENDPOINT } from '../constants/apiEndpoints';

// Fetch a list of households
export function fetchHouseholds() {
  const request = axios.get(HOUSEHOLD_ENDPOINT);

  return (dispatch) => {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    request.then(({data}) => {
      dispatch({
        type: types.FETCH_HOUSEHOLDS,
        payload: data
      });
    });
  };
}

// Fetch a single household by id
export function fetchHousehold(id) {
  const request = axios.get(`${HOUSEHOLD_ENDPOINT}/${id}`);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.FETCH_HOUSEHOLD,
        payload: data
      });
    });
  }
}

// Create a new household
export function createHousehold(props) {
  const request = axios.post(`${HOUSEHOLD_ENDPOINT}`, props);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.CREATE_HOUSEHOLD,
        payload: data
      });
    });
  }
}
