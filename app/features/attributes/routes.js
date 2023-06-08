import React from 'react';
import {Route} from 'react-router';
import {AttributesListPage} from './components';

export default (
  <Route>
    <Route path="attributes" component={AttributesListPage} />
  </Route>
);
