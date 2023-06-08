import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import {LaborDriversListPage} from './laborDriver/components';
import {
  LaborPeriodsListPage,
  EditLaborPeriodPage,
  CreateLaborPeriodPage,
} from './laborPeriod/components';
import {EndpointsListPage} from './integrationEndpoint/components';
import {JobsListPage} from './job/components';
import {TaskGroupsListPage} from './taskGroup/components';
import {TasksListPage} from './task/components';
import {LaborStandardsListPage} from './laborStandard/components';
import {Authorize} from '../authentication/components';
import {KRONOS_INTEGRATION_ENDPOINTS_EDIT} from '../authentication/constants/permissions';

export default (
  <Route path="kronos" checkKronos component={Authorize}>
    <IndexRedirect to="laborstandards" />
    <Route path="labordrivers" component={LaborDriversListPage} />
    <Route path="laborperiods" component={LaborPeriodsListPage} />
    <Route path="laborperiods/create" component={CreateLaborPeriodPage} />
    <Route path="laborperiods/:id" component={EditLaborPeriodPage} />
    <Route permissions={[KRONOS_INTEGRATION_ENDPOINTS_EDIT]} component={Authorize} >
      <Route path="endpoints" component={EndpointsListPage} />
    </Route>
    <Route path="jobs-deprecated" component={JobsListPage} />
    <Route path="taskgroups" component={TaskGroupsListPage} />
    <Route path="tasks" component={TasksListPage} />
    <Route path="laborstandards" component={LaborStandardsListPage} />
  </Route>
);
