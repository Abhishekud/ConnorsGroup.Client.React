import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import {Authorize} from '../authentication/components';
import {AttributesPage} from './attribute/components';
import {StoreAttributesPage} from './storeAttribute/components';
import {LaborStandardsPage} from './laborStandard/components';
import {IntegrationEndpointsPage} from './integrationEndpoint/components';
import {
  EndpointRequestsListPage,
  IntegrationStatusPage,
  AttributeStatusesListPage,
  LocationStatusesListPage,
} from './integrationStatus/components';
import {BETA_FEATURES_ACCESS} from '../authentication/constants/permissions';

export default (
  <Route path="reflexis" checkReflexis component={Authorize}>
    <IndexRedirect to="labor-standards" />
    <Route path="attributes" component={AttributesPage} />
    <Route path="labor-standards" component={LaborStandardsPage} />
    <Route path="integration-endpoints" component={IntegrationEndpointsPage} />
    <Route permissions={[BETA_FEATURES_ACCESS]} component={Authorize} >
      <Route path="store-attributes" component={StoreAttributesPage} />
    </Route>
    <Route path="attributes/:id/statuses" component={AttributeStatusesListPage} />
    <Route path="locations/:id/statuses" component={LocationStatusesListPage} />
    <Route path="integration-endpoints/:id/requests" component={EndpointRequestsListPage} />
    <Route path="integration-endpoints/:endpointId/requests/:id" component={IntegrationStatusPage} />
  </Route>
);
