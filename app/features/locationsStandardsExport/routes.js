import React from 'react';
import {Route} from 'react-router';
import {StandardsAndUomsByLocationListPage} from './components';

export default (
  <Route>
    <Route path="locations-standards-export" component={StandardsAndUomsByLocationListPage} />
    <Route path="locations-standards-export/:outputType" component={StandardsAndUomsByLocationListPage} />
  </Route>
);
