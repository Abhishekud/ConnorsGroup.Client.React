import React from 'react';
import {Route} from 'react-router';
import {LocationMappingListPage} from './components';

export default (
  <Route>
    <Route path="location-mapping" component={LocationMappingListPage} />
  </Route>
);
