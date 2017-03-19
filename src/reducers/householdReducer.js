import _ from 'lodash';
import * as types from '../constants/actionTypes';

const INITIAL_STATE = { all: {}, currentId: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.FETCH_HOUSEHOLDS:
      // Object-based storage with household id as key
      const newHouseholds = _.mapKeys(action.households, 'id');
      return {
        ...state,
        all: { ...state.all, ...newHouseholds}
      };
    case types.FETCH_HOUSEHOLD:
      // Add household to list or replace an existing one
      return {
        ...state,
        all: { ...state.all, [action.household.id]: action.household },
        currentId: action.household.id
      };
    case types.CREATE_HOUSEHOLD:
      // Add a new household to the list
      return {
        ...state,
        all: { ...state.all, [action.household.id]: action.household }
      };
    case types.DELETE_HOUSEHOLD:
      // action.payload === id of household to delete
      return {
        ...state,
        all: _.omit(state.all, action.householdId)
      };
    default:
      return state;
  }
}
