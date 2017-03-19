import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import householdReducer from './householdReducer';
import personReducer from './personReducer';

const rootReducer = combineReducers({
  households: householdReducer,
  persons: personReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
