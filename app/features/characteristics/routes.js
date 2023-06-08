import React from 'react';
import {Route} from 'react-router';
import {CharacteristicsListPage, CharacteristicStandardsListPage} from './components';

export default (
  <Route>
    <Route path="characteristics" component={CharacteristicsListPage} />
    <Route path="characteristics-where-used/:id" component={CharacteristicStandardsListPage} />
  </Route>
);
