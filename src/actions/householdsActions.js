import axios from 'axios';
import * as types from '../constants/actionTypes';
import { HOUSEHOLD_ENDPOINT } from '../constants/apiEndpoints';

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
