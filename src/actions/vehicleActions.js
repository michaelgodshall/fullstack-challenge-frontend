import axios from 'axios';
import { browserHistory } from 'react-router'
import * as types from '../constants/actionTypes';
import { VEHICLES_ENDPOINT } from '../constants/apiEndpoints';

// Fetch a list of vehicles by household id
export function fetchVehicles(householdId) {
  let params = {params: {household: householdId}};
  const request = axios.get(VEHICLES_ENDPOINT, params);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.FETCH_VEHICLES,
        vehicles: data,
        householdId
      });
    });
  };
}

// Create a new vehicle
export function createVehicle(householdId, props, successRedirect = '/') {
  // Set the household for which the vehicle will be created
  let params = {...props, household: householdId};
  const request = axios.post(VEHICLES_ENDPOINT, params);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.CREATE_VEHICLE,
        vehicle: data,
        householdId
      });
      // Redirect after create success
      browserHistory.push(successRedirect);
    });
  };
}

