import axios from 'axios';
import * as types from '../constants/actionTypes';
import { PERSONS_ENDPOINT } from '../constants/apiEndpoints';

// Fetch a list of persons by household id
export function fetchPersons(householdId) {
  let params = {params: {household: householdId}};
  const request = axios.get(PERSONS_ENDPOINT, params);

  return (dispatch) => {
    return request.then(({data}) => {
      dispatch({
        type: types.FETCH_PERSONS,
        persons: data,
        householdId
      });
    });
  };
}

// Create a new person
export function createPerson(householdId, props) {
  // Set the household for which the person will be created
  let params = {...props, household: householdId};
  const request = axios.post(PERSONS_ENDPOINT, params);

  return (dispatch) => {
    return request.then(({data}) => {
      dispatch({
        type: types.CREATE_PERSON,
        person: data,
        householdId
      });
    });
  };
}
