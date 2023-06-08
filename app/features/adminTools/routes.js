import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {ADMIN_TOOLS_EDIT} from '../authentication/constants/permissions';
import AdminToolsPage from './components/AdminToolsPage';

export default (
  <Route path="admin" permissions={[ADMIN_TOOLS_EDIT]} component={Authorize}>
    <Route path="tools" component={AdminToolsPage} />
  </Route>
);
