import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HouseholdsIndex from './containers/HouseholdsIndex';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HouseholdsIndex}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
