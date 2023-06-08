import React from 'react';
import {Route} from 'react-router';
import {DepartmentsListPage} from './components';

export default (
  <Route>
    <Route path="departments" component={DepartmentsListPage} />
  </Route>
);
