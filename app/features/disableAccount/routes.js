import {DisableAccountPage} from './components';
import React from 'react';
import {Route} from 'react-router';

export default (
  <Route>
    <Route path="disable-account/:disableAccountToken" component={DisableAccountPage} />
  </Route>
);
