import _ from 'lodash';
import * as types from '../constants/actionTypes';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.FETCH_HOUSEHOLDS:
      // Object-based storage with household id as key
      const newHouseholds = _.mapKeys(action.payload, 'id');
      return { ...state, ...newHouseholds };
    default:
      return state;
  }
}
