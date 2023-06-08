import React from 'react';
import {Route} from 'react-router';
import {AllowancesListPage, AllowanceBuilderPage} from './components';

export default (
  <Route>
    <Route path="allowances" component={AllowancesListPage} />
    <Route path="allowances/:id" component={AllowanceBuilderPage} />
  </Route>
);
