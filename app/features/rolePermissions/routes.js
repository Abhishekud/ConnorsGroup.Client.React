import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {SUPER_ADMIN_MANAGE_PERMISSIONS} from '../authentication/constants/permissions';
import {RolesListPage} from './components';

export default (
  <Route path="admin" permissions={[SUPER_ADMIN_MANAGE_PERMISSIONS]} component={Authorize}>
    <Route path="roles" component={RolesListPage} />
  </Route>
);
