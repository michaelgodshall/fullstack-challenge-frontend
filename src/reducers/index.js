import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import householdsReducer from './householdsReducer';
import personsReducer from './personsReducer';

const rootReducer = combineReducers({
  households: householdsReducer,
  persons: personsReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
