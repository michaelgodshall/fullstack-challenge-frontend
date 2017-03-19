import axios from 'axios';
import { browserHistory } from 'react-router'
import * as types from '../constants/actionTypes';
import { VEHICLES_ENDPOINT } from '../constants/apiEndpoints';

// Fetch a list of vehicles by household id
export function fetchVehicles(householdId) {
  let params = {household: householdId};
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
