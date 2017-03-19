import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import householdsReducer from './householdsReducer';

const rootReducer = combineReducers({
  households: householdsReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
