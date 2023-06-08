import React from 'react';
import {Route} from 'react-router';
import {UnitsOfMeasureListPage, UnitOfMeasureStandardsListPage} from './components';

export default (
  <Route>
    <Route path="units-of-measure" component={UnitsOfMeasureListPage} />
    <Route path="uom-where-used/:id" component={UnitOfMeasureStandardsListPage} />
  </Route>
);
