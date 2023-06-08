import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {PartsListPage} from './components';

export default (
  <Route checkParts component={Authorize}>
    <Route path="parts" component={PartsListPage} />
  </Route>
);
