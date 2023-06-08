import React from 'react';
import {Route} from 'react-router';
import {JobClassesListPage} from './components';

export default (
  <Route>
    <Route path="job-classes" component={JobClassesListPage} />
  </Route>
);
