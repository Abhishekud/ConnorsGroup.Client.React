import React from 'react';
import {Route} from 'react-router';
import {ClassificationsListPage} from './components';

export default (
  <Route>
    <Route path="classifications" component={ClassificationsListPage} />
  </Route>
);
