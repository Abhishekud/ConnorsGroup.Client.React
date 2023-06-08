import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {VolumeDriverValueSetsListPage} from './components';
import {BETA_FEATURES_ACCESS} from '../authentication/constants/permissions';

export default (
  <Route permissions={[BETA_FEATURES_ACCESS]} component={Authorize} >
    <Route path="volume-driver-value-sets" component={VolumeDriverValueSetsListPage} />
  </Route>
);
