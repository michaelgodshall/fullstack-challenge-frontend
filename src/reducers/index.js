import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import householdsReducer from './householdsReducer';

const rootReducer = combineReducers({
  households: householdsReducer,
  routing: routerReducer
});

export default rootReducer;
