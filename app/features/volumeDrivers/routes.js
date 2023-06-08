import React from 'react';
import {Route} from 'react-router';
import {VolumeDriversListPage} from './components';

export default (
  <Route>
    <Route path="volume-drivers" component={VolumeDriversListPage} />
  </Route>
);
