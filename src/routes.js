import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import HouseholdsIndex from './containers/HouseholdsIndex';
import HouseholdsNew from './containers/HouseholdsNew';
import HouseholdsShow from './containers/HouseholdsShow';
import PersonNew from './containers/PersonNew';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HouseholdsIndex}/>
    <Route path="households/new" component={HouseholdsNew}/>
    <Route path="households/:id" component={HouseholdsShow}/>
    <Route path="households/:id/persons/new" component={PersonNew}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
