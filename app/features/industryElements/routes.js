import React from 'react';
import {Route} from 'react-router';
import {MOSTElementProfilePage, NonMOSTElementProfilePage} from './components';

export default (
  <Route>
    <Route path="most-industry-elements/:id" component={MOSTElementProfilePage} />
    <Route path="non-most-industry-elements/:id" component={NonMOSTElementProfilePage} />
  </Route>
);
