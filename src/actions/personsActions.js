import axios from 'axios';
import { browserHistory } from 'react-router'
import * as types from '../constants/actionTypes';
import { PERSONS_ENDPOINT } from '../constants/apiEndpoints';

// Fetch a list of persons by household id
export function fetchPersons(householdId) {
  let params = {household: householdId};
  const request = axios.get(PERSONS_ENDPOINT, params);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: types.FETCH_PERSONS,
        payload: data,
        householdId
      });
    });
  };
}
