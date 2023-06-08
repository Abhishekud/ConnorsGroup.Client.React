import React from 'react';
import {Route} from 'react-router';
import {StandardsListManagementPage} from './components';

export default (
  <Route>
    <Route path="standards-list-management" component={StandardsListManagementPage} />
  </Route>
);
