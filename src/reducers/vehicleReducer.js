import _ from 'lodash';
import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
  all: {},
  filter: {householdId: null}
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.FETCH_VEHICLES:
      // Object-based storage with vehicle id as key
      const newVehicles = _.mapKeys(action.vehicles, 'id');
      return {
        ...state,
        all: { ...state.all, ...newVehicles},
        filter: { ...state.filter, householdId: parseInt(action.householdId) }
      };
    case types.CREATE_VEHICLE:
      // Add a new vehicle to the list
      return {
        ...state,
        all: { ...state.all, [action.vehicle.id]: action.vehicle }
      };
    case types.RESET_CURRENT_HOUSEHOLD:
      return {
        ...state,
        filter: { ...state.filter, householdId: null }
      };
    default:
      return state;
  }
}
