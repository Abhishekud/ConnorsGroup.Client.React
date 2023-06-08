import React from 'react';
import {Route} from 'react-router';
import {IndustryStandardProfilePage} from './components';

export default (
  <Route>
    <Route path="industry-standards/:id" component={IndustryStandardProfilePage} />
  </Route>
);
