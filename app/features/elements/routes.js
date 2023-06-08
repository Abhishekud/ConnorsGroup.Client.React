import React from 'react';
import {Route} from 'react-router';
import {
  ElementsListPage,
  MOSTElementProfilePage,
  NonMOSTElementProfilePage,
} from './components';

export default (
  <Route>
    <Route path="elements" component={ElementsListPage} />
    <Route path="elements/most/:id" component={MOSTElementProfilePage} />
    <Route path="elements/non-most/:id" component={NonMOSTElementProfilePage} />
  </Route>
);
