import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {PROFILING_LIST_MANAGEMENT} from '../authentication/constants/permissions';
import {OrgHierarchyLevelsListPage} from './components';

export default (
  <Route path="admin" permissions={[PROFILING_LIST_MANAGEMENT]} component={Authorize}>
    <Route path="org-hierarchy-levels" component={OrgHierarchyLevelsListPage} />
  </Route>
);
