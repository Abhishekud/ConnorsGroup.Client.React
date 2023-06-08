import React from 'react';
import {Route} from 'react-router';
import {VolumeDriverMappingsListPage} from './components';

export default (
  <Route>
    <Route path="volume-driver-mappings" component={VolumeDriverMappingsListPage} />
  </Route>
);
