import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import HouseholdIndex from './containers/HouseholdIndex';
import HouseholdNew from './containers/HouseholdNew';
import HouseholdShow from './containers/HouseholdShow';
import PersonNew from './containers/PersonNew';
import VehicleNew from './containers/VehicleNew';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HouseholdIndex}/>
    <Route path="households/new" component={HouseholdNew}/>
    <Route path="households/:id" component={HouseholdShow}/>
    <Route path="households/:id/persons/new" component={PersonNew}/>
    <Route path="households/:id/vehicles/new" component={VehicleNew}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
