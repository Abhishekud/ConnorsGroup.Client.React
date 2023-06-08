import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {ADMIN_USERS} from '../authentication/constants/permissions';
import {UsersListPage} from './components';

export default (
  <Route permissions={[ADMIN_USERS]} component={Authorize}>
    <Route path="admin/users" component={UsersListPage} />
  </Route>
);
