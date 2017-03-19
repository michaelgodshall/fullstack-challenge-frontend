import _ from 'lodash';
import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
  all: {},
  filter: {householdId: null}
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.FETCH_PERSONS:
      // Object-based storage with person id as key
      const newPersons = _.mapKeys(action.payload, 'id');
      return {
        ...state,
        all: { ...state.all, ...newPersons},
        filter: { ...state.filter, householdId: parseInt(action.householdId) }
      };
    default:
      return state;
  }
}
