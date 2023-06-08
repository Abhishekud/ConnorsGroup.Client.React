import React from 'react';
import {Route} from 'react-router';
import {LaborCategoriesListPage} from './components';

export default (
  <Route>
    <Route path="labor-categories" component={LaborCategoriesListPage} />
  </Route>
);
