import _ from 'lodash';
import * as types from '../constants/actionTypes';

const INITIAL_STATE = { all: {}, showId: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.FETCH_HOUSEHOLDS:
      // Object-based storage with household id as key
      const newHouseholds = _.mapKeys(action.payload, 'id');
      return {
        ...state,
        all: { ...state.all, ...newHouseholds}
      };
    case types.FETCH_HOUSEHOLD:
      // Add household to list or replace an existing one
      const household = action.payload;
      return {
        ...state,
        all: { ...state.all, [household.id]: household },
        showId: household.id
      };
    case types.DELETE_HOUSEHOLD:
      // action.payload === id of household to delete
      console.log(state.all);
      return {
        ...state,
        all: _.omit(state.all, action.payload)
      };
    default:
      return state;
  }
}
