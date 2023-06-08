import React from 'react';
import {Route} from 'react-router';
import {AllowanceRestsListPage} from './components';

export default (
  <Route>
    <Route path="allowance-rests" component={AllowanceRestsListPage} />
  </Route>
);
