import React from 'react';
import {Route} from 'react-router';
import {VolumeDriverValuesListPage} from './components';

export default (
  <Route>
    <Route path="volume-driver-values" component={VolumeDriverValuesListPage} />
    <Route path="volume-driver-value-sets/:id/volume-driver-values" component={VolumeDriverValuesListPage} />
  </Route>
);
