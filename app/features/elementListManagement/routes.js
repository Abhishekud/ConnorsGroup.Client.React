import React from 'react';
import {Route} from 'react-router';
import {ElementListManagementListPage} from './components';

export default (
  <Route>
    <Route path="element-list-management" component={ElementListManagementListPage} />
  </Route>
);
