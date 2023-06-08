import React from 'react';
import {Route} from 'react-router';
import {LocationDepartmentsListPage} from './components';

export default (
  <Route>
    <Route path="location-departments" component={LocationDepartmentsListPage} />
  </Route>
);
