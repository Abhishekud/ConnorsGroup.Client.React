import React from 'react';
import {Route} from 'react-router';
import {IndustryAllowanceDetailsPage} from './components';
import {Authorize} from '../authentication/components';
import {ALLOWANCES_EDIT, BETA_FEATURES_ACCESS} from '../authentication/constants/permissions';

export default (
  <Route permissions={[BETA_FEATURES_ACCESS]} component={Authorize}>
    <Route permissions={[ALLOWANCES_EDIT]} component={Authorize}>
      <Route path="industry-allowance/:selectedIndustrySourceId/details/:id" component={IndustryAllowanceDetailsPage} />
    </Route>
  </Route>
);
