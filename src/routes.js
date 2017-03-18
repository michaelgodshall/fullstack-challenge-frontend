import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import HouseholdsIndex from './containers/HouseholdsIndex';
import HouseholdsShow from './containers/HouseholdsShow';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HouseholdsIndex}/>
    <Route path="households/:id" component={HouseholdsShow}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
