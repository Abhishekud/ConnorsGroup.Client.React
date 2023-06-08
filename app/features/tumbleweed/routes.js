import React from 'react';
import {Route} from 'react-router';
import TumbleweedEndpointPage from './components/TumbleweedEndpointPage';
import TumbleweedSchedulingPage from './components/TumbleweedSchedulingPage';
import TumbleweedLogsPage from './components/TumbleweedLogsPage';


export default (
  <Route>
    <Route path="export-scheduler/endpoint" component={TumbleweedEndpointPage} />
    <Route path="export-scheduler/scheduling" component={TumbleweedSchedulingPage} />
    <Route path="export-scheduler/scheduling/logs/:scheduleType" component={TumbleweedLogsPage} />
  </Route>
);
