import React from 'react';
import {Route} from 'react-router';
import {VolumeDriverMappingVariablesListPage} from './components';
import {BETA_FEATURES_ACCESS} from '../authentication/constants/permissions';
import {Authorize} from '../authentication/components';

export default (
  <Route permissions={[BETA_FEATURES_ACCESS]} component={Authorize} >
    <Route path="volume-driver-mapping-variables" component={VolumeDriverMappingVariablesListPage} />
  </Route>
);
